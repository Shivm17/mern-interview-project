export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products by name..."
        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-slate-800 placeholder:text-slate-400 outline-none shadow-sm transition-all"
      />
    </div>
  );
}
