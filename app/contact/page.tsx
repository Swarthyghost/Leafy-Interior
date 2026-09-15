import StaticPage from "@/components/ui/StaticPage";
import { STORE_WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function ContactPage() {
  return (
    <StaticPage title="Contact Us">
      <p>Have a question about a product, an order, or a custom request? Reach us directly:</p>
      <div className="glass p-6 !text-text space-y-3">
        <p>
          <span className="text-sub">WhatsApp:</span>{" "}
          <a
            href={`https://wa.me/${STORE_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lime hover:underline"
          >
            +{STORE_WHATSAPP_NUMBER}
          </a>
        </p>
        <p>
          <span className="text-sub">Email:</span>{" "}
          <a href="mailto:hello@leafyinterior.com" className="text-lime hover:underline">
            hello@leafyinterior.com
          </a>
        </p>
        <p>
          <span className="text-sub">Location:</span> Accra, Ghana
        </p>
      </div>
    </StaticPage>
  );
}
