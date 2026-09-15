const REVIEWS = [
  {
    name: "Kwame A.",
    stars: 5,
    text: "Delivered same week, and the pot pairing option made it so easy to match my living room.",
  },
  {
    name: "Efua D.",
    stars: 5,
    text: "Ordered on WhatsApp, no stress with cards. The figurines make my desk look so put-together.",
  },
  {
    name: "Yaw M.",
    stars: 4,
    text: "The faux monstera looks better than my real one ever did, and it never sheds leaves.",
  },
];

export default function Reviews() {
  return (
    <section className="pb-20 md:pb-[90px]">
      <div className="max-w-[1200px] mx-auto w-full px-6 md:px-10">
        <div className="section-title text-center mb-12">
          <h2 className="text-[30px] font-extrabold">Customer Review</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((review) => (
            <div key={review.name} className="glass p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C8A6E] to-[#3F4A32] shrink-0" />
                <div>
                  <b className="text-sm block">{review.name}</b>
                  <div className="text-lime text-[11px]">{"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}</div>
                </div>
              </div>
              <p className="text-[13px] text-sub">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
