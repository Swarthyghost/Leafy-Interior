import Link from "next/link";
import Logo from "./Logo";
import { PRODUCT_CATEGORIES } from "@/lib/categories";
import { STORE_WHATSAPP_NUMBER } from "@/lib/whatsapp";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/leafyinteriorgh",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${STORE_WHATSAPP_NUMBER}`,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.45 1.34 4.95L2 22l5.2-1.36a9.96 9.96 0 0 0 4.84 1.23h.01c5.52 0 10-4.48 10-10s-4.48-9.87-10.01-9.87Zm5.87 14.24c-.25.7-1.45 1.33-2 1.42-.51.08-1.15.11-1.86-.12-.43-.14-.98-.32-1.68-.63-2.96-1.28-4.89-4.25-5.04-4.45-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.78-.37h.56c.18 0 .42-.03.65.5.25.6.85 2.06.92 2.21.07.15.12.33.02.53-.09.2-.14.32-.28.49-.14.17-.29.38-.42.51-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.06.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.27.36-.22.6-.13.25.09 1.6.75 1.87.88.27.14.45.2.51.32.07.11.07.66-.18 1.35Z" />
      </svg>
    ),
  },
];

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  ...PRODUCT_CATEGORIES.map((c) => ({ href: `/shop?type=${c.id}`, label: c.label })),
  { href: "/contact", label: "Contact" },
];

const INFO_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/our-story", label: "Our Story" },
  { href: "/delivery-information", label: "Delivery Information" },
  { href: "/return-policy", label: "Return Policy" },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line pt-14 pb-6">
      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-10 mb-10">
          <div>
            <Logo className="mb-3" />
            <p className="text-sub text-[13.5px] max-w-[32ch] mb-4">
              Faux plants, flower pots and figurine decor for homes and offices across Accra.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-glass-border flex items-center justify-center text-sub hover:text-lime hover:border-lime transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-bold mb-3.5">Quick Links</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.label} className="text-[13.5px] text-sub">
                  <Link href={l.href} className="hover:text-text">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-bold mb-3.5">More Info</h4>
            <ul className="space-y-2">
              {INFO_LINKS.map((l) => (
                <li key={l.label} className="text-[13.5px] text-sub">
                  <Link href={l.href} className="hover:text-text">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 pt-6 border-t border-line text-[12.5px] text-[#828C74]">
          <span>Leafy Interior © {new Date().getFullYear()} All rights reserved</span>
          <span>Accra · Ghana</span>
        </div>
      </div>
    </footer>
  );
}
