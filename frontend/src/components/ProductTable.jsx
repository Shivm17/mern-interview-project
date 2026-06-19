export default function ProductTable({ products, loading, onDeleteRequest }) {
  if (loading) {
    return (
      <div className="py-8 text-center text-slate-500 font-medium bg-white rounded-xl border border-slate-200">
        Loading products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white py-16 text-center shadow-sm">
        <p className="text-slate-400 text-sm font-semibold">No products found</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
          <tr>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Categories</th>
            <th className="px-5 py-3">Added On</th>
            <th className="px-5 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((p) => (
            <tr key={p._id} className="hover:bg-slate-50/40 transition-colors">
              <td className="px-5 py-4 font-semibold text-slate-900">{p.name}</td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-1.5 max-w-md">
                  {p.categories.map((c) => (
                    <span
                      key={c._id}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 whitespace-nowrap"
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-5 py-4 text-slate-500 text-xs whitespace-nowrap">
                {new Date(p.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </td>
              <td className="px-5 py-4 text-right">
                <button
                  onClick={() => onDeleteRequest(p)}
                  className="text-slate-400 hover:text-red-600 text-xs font-semibold transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
