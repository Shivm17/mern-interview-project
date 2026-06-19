export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  //Yeh total pages ke count ke barabar ek array banata hai
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const btnBase =
    'min-w-[2.25rem] h-9 px-2.5 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-150';

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={`${btnBase} text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed shadow-sm`}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`${btnBase} ${
            p === page
              ? 'bg-indigo-600 text-white font-semibold border border-indigo-600 shadow-sm'
              : 'text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={`${btnBase} text-slate-500 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white disabled:cursor-not-allowed shadow-sm`}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
}
