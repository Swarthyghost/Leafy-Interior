import StaticPage from "@/components/ui/StaticPage";

export default function ReturnPolicyPage() {
  return (
    <StaticPage title="Return Policy">
      <div>
        <h2>Damaged or Incorrect Items</h2>
        <p>
          If an item arrives damaged or doesn&apos;t match what you ordered, message us on WhatsApp
          within 48 hours of delivery with a photo, and we&apos;ll arrange a replacement or refund.
        </p>
      </div>
      <div>
        <h2>Change of Mind</h2>
        <p>
          Unused items in their original condition can be returned within 7 days of delivery.
          Delivery fees are non-refundable for change-of-mind returns.
        </p>
      </div>
      <div>
        <h2>How to Start a Return</h2>
        <p>Reach out to us on WhatsApp with your order details and the reason for the return, and we&apos;ll guide you through the next steps.</p>
      </div>
    </StaticPage>
  );
}
