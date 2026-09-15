import StaticPage from "@/components/ui/StaticPage";

export default function DeliveryInformationPage() {
  return (
    <StaticPage title="Delivery Information">
      <div>
        <h2>Accra Deliveries</h2>
        <p>Orders within Accra are typically delivered within 2-4 business days of confirmation on WhatsApp.</p>
      </div>
      <div>
        <h2>Outside Accra</h2>
        <p>
          We deliver nationwide. Delivery windows and fees for other regions are confirmed with you
          directly once your order details are received on WhatsApp.
        </p>
      </div>
      <div>
        <h2>Delivery Fees</h2>
        <p>
          Fees depend on your location and order size, and are shared before you confirm — nothing
          is charged automatically.
        </p>
      </div>
      <div>
        <h2>Tracking Your Order</h2>
        <p>
          Since every order is confirmed over WhatsApp, our team will keep you updated on your
          order&apos;s status directly in that chat.
        </p>
      </div>
    </StaticPage>
  );
}
