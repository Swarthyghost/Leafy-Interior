import AuthGate from "@/components/admin/AuthGate";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1100px] mx-auto w-full px-6 md:px-10 py-12">
      <AuthGate>
        <AdminNav />
        {children}
      </AuthGate>
    </div>
  );
}
