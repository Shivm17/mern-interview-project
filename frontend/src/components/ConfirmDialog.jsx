export default function ConfirmDialog({ open, title, message, onConfirm, onCancel, loading }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-xl bg-white border border-slate-200 shadow-xl p-6">
        <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100/60 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-lg text-sm bg-red-600 hover:bg-red-700 text-white font-semibold shadow-sm disabled:opacity-50 transition-colors"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
