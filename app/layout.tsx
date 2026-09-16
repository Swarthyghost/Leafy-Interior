import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NavSpacer from "@/components/layout/NavSpacer";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import FlyToCartLayer from "@/components/cart/FlyToCartLayer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Leafy Interior Ghana | Faux Plants, Pots & Figurines",
  description:
    "Faux plants, flower pots and figurine decor that make every room in Accra feel fresh, styled and alive.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text">
        <Navbar />
        <NavSpacer />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <FlyToCartLayer />
      </body>
    </html>
  );
}
