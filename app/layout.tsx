import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { Cursor } from "@/components/layout/cursor";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RouteTransition } from "@/components/layout/route-transition";
import { InquiryProvider } from "@/components/inquiry/inquiry-provider";
import { Preloader } from "@/components/preloader/preloader";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_TITLE = "Dream Gold — авторські ювелірні прикраси на замовлення";
const SITE_DESCRIPTION =
  "Dream Gold — авторські ювелірні вироби ручної роботи. Втілюємо будь-яку ідею: від ескізу до готового виробу із сертифікованим діамантом. Власне виробництво в Україні.";

export const metadata: Metadata = {
  // Resolves OG/Twitter image URLs. Swap NEXT_PUBLIC_SITE_URL in once the
  // domain is bought; falls back to localhost in dev.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Dream Gold",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "Dream Gold",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/hero-ring.jpg",
        width: 2200,
        height: 1228,
        alt: "Золота каблучка ручної роботи Dream Gold на теплому мармурі",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/hero-ring.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f0e6", // ivory — matches the page top so mobile chrome blends in
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Preloader gate — runs before first paint so the overlay never
            flashes: lock scroll on a fresh session, or hide the overlay
            outright on a repeat load within the same tab. Pairs with the
            sessionStorage flag the Preloader writes on finish. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('dg-preloaded')){document.documentElement.classList.add('dg-preloaded')}else{document.documentElement.classList.add('dg-preloading')}}catch(e){}",
          }}
        />
        <Cursor />
        <SmoothScroll>
          <InquiryProvider>
            <Preloader />
            <SiteHeader />
            <main>
              <RouteTransition>{children}</RouteTransition>
            </main>
            <SiteFooter />
          </InquiryProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
