export default function CategoryTag({ name }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100 whitespace-nowrap">
      {name}
    </span>
  );
}
