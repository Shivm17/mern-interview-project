import { Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

export default function AddProductPage({ categories }) {
  return (
    <div>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add Product</h1>
          <p className="text-slate-500 text-sm mt-1">Register a new item in the inventory</p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-semibold text-sm shadow-sm transition-all"
        >
          ← Back to Products
        </Link>
      </header>

      <ProductForm categories={categories} />
    </div>
  );
}
