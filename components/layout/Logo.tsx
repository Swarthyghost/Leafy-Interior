import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 font-extrabold text-lg text-text ${className}`}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-lime shrink-0">
        <path d="M12 2c3 3 3 7 0 10-3-3-3-7 0-10zM2 12c3-3 7-3 10 0-3 3-7 3-10 0zm20 0c-3 3-7 3-10 0 3-3 7-3 10 0zM12 22c-3-3-3-7 0-10 3 3 3 7 0 10z" />
      </svg>
      Leafy Interior
    </Link>
  );
}
