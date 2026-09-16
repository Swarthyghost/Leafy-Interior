import Link from "next/link";

export default function BackToProducts() {
  return (
    <Link
      href="/admin/products"
      className="inline-flex items-center gap-1.5 text-sm text-sub hover:text-lime mb-4 transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
      Back to Products
    </Link>
  );
}
