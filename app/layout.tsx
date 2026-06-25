import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RouteTransition } from "@/components/layout/route-transition";
import { InquiryProvider } from "@/components/inquiry/inquiry-provider";

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

export const metadata: Metadata = {
  title: "Dream Gold — авторські ювелірні прикраси на замовлення",
  description:
    "Dream Gold — авторські ювелірні вироби ручної роботи. Втілюємо будь-яку ідею: від ескізу до готового виробу із сертифікованим діамантом. Власне виробництво в Україні.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll>
          <InquiryProvider>
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
