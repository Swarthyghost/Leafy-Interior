export default function AdminError({ message }: { message: string }) {
  return (
    <div className="px-4 py-3 rounded-xl bg-clay/10 border border-clay text-clay text-sm">
      {message}
    </div>
  );
}
