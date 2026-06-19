export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <main className="flex-1 min-w-0">
        <div className="max-w-5xl mx-auto px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
