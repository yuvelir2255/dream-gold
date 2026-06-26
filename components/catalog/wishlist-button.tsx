"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { toggleWishlist } from "@/lib/actions/wishlist";

/**
 * Heart toggle for saving a product. Optimistic: flips immediately, then
 * confirms via the server action. Guests are sent to /account to sign in.
 * Rendered as a sibling of the card link (never nested in an <a>).
 */
export function WishlistButton({
  slug,
  initialSaved,
  authed,
  className = "",
}: {
  slug: string;
  initialSaved: boolean;
  authed: boolean;
  className?: string;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function onClick() {
    if (!authed) {
      router.push("/account");
      return;
    }
    const wasSaved = saved;
    setSaved(!wasSaved); // optimistic
    startTransition(async () => {
      const res = await toggleWishlist(slug, wasSaved);
      if (res.error === "auth") {
        setSaved(wasSaved);
        router.push("/account");
      } else if (res.error) {
        setSaved(wasSaved); // revert on failure
      } else {
        setSaved(res.saved);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-pressed={saved}
      aria-label={saved ? "Прибрати зі збереженого" : "Зберегти"}
      className={`inline-flex items-center justify-center transition-colors disabled:opacity-60 ${className}`}
    >
      <Heart
        className={`size-5 transition-all ${saved ? "fill-gold-deep text-gold-deep" : ""}`}
        strokeWidth={1.5}
      />
    </button>
  );
}
