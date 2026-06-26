"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ToggleResult = { saved: boolean; error?: "auth" | "failed" };

/**
 * Add/remove a product from the signed-in user's wishlist. `wasSaved` is the
 * state the client saw at click time — we flip it. RLS guarantees a user can
 * only touch their own rows.
 */
export async function toggleWishlist(
  slug: string,
  wasSaved: boolean,
): Promise<ToggleResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { saved: wasSaved, error: "auth" };

  if (wasSaved) {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user.id)
      .eq("product_slug", slug);
    if (error) {
      console.error("[wishlist] delete failed", error.message);
      return { saved: wasSaved, error: "failed" };
    }
  } else {
    const { error } = await supabase
      .from("wishlist")
      .insert({ user_id: user.id, product_slug: slug });
    if (error) {
      console.error("[wishlist] insert failed", error.message);
      return { saved: wasSaved, error: "failed" };
    }
  }

  revalidatePath("/wishlist");
  revalidatePath("/catalog");
  return { saved: !wasSaved };
}
