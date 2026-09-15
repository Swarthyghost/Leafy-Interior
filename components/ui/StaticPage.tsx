export default function StaticPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-[800px] mx-auto w-full px-6 md:px-10 py-16">
      <h1 className="text-3xl font-extrabold mb-8">{title}</h1>
      <div className="space-y-6 text-sub text-sm leading-relaxed [&_h2]:text-text [&_h2]:font-bold [&_h2]:text-lg [&_h2]:mb-1 [&_p]:text-sub">
        {children}
      </div>
    </section>
  );
}
