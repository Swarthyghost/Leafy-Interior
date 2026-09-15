import StaticPage from "@/components/ui/StaticPage";

const FAQS = [
  {
    q: "Are these plants and figurines real?",
    a: "No — everything we sell is faux (artificial). Our plants are made from high-grade materials designed to look and feel like the real thing, with zero watering or sunlight required.",
  },
  {
    q: "How do I place an order?",
    a: "Add items to your cart, fill in your delivery details at checkout, and tap 'Order via WhatsApp'. This opens WhatsApp with your order pre-filled — just hit send and our team takes it from there.",
  },
  {
    q: "Do you deliver outside Accra?",
    a: "Yes, we deliver across Ghana. Delivery fees and timelines outside Accra are confirmed with you directly on WhatsApp after you place your order.",
  },
  {
    q: "Can I pair a plant with a specific pot?",
    a: "Yes — on any plant that supports it, you'll see an 'Add a pot?' option on the product page where you can pick a colour and size before adding to cart.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We currently confirm orders and payment details directly over WhatsApp — Mobile Money and cash on delivery are both supported.",
  },
];

export default function FAQPage() {
  return (
    <StaticPage title="Frequently Asked Questions">
      {FAQS.map((item) => (
        <div key={item.q}>
          <h2>{item.q}</h2>
          <p>{item.a}</p>
        </div>
      ))}
    </StaticPage>
  );
}
