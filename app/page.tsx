import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Explore } from "@/components/sections/explore";
import { Works } from "@/components/sections/works";
import { Inquiry } from "@/components/sections/inquiry";
import { getWishlist } from "@/lib/wishlist";

export default async function Home() {
  const { authed, slugs } = await getWishlist();

  return (
    <>
      <Hero />
      <Manifesto />
      <Explore />
      <Works authed={authed} savedSlugs={slugs} />
      <Inquiry />
    </>
  );
}
