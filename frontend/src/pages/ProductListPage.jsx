import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MultiSelect } from "react-multi-select-component";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";
import Pagination from "../components/Pagination";
import ConfirmDialog from "../components/ConfirmDialog";
import useDebounce from "../hooks/useDebounce";
import { fetchProducts, deleteProduct } from "../api/productApi";

const LIMIT = 10;

export default function ProductListPage({ categories }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const [categoryIds, setCategoryIds] = useState([]);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchProducts({
        page,
        limit: LIMIT,
        search: debouncedSearch,
        categoryIds,
      });

      setProducts(res?.data || []);
      setTotalPages(res?.pagination?.totalPages || 1);
      setTotal(res?.pagination?.total || 0); 

    } catch (err) {
      toast.error(err.message || "Failed to load products");
      setProducts([]);
      setTotalPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, categoryIds]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, categoryIds]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteTarget._id);
      toast.success(`"${deleteTarget.name}" deleted`);
      setDeleteTarget(null);
      if (products.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        loadProducts();
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Products
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {total} item{total !== 1 ? "s" : ""} in inventory
          </p>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Product
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <MultiSelect
          options={categories.map((c) => ({ value: c._id, label: c.name }))}
          value={categories
            .filter((c) => categoryIds.includes(c._id))
            .map((c) => ({ value: c._id, label: c.name }))}
          onChange={(selectedOptions) =>
            setCategoryIds(
              selectedOptions ? selectedOptions.map((o) => o.value) : [],
            )
          }
          labelledBy="Filter by categories"
          overrideStrings={{ selectSomeItems: "Filter by categories" }}
        />
      </div>

      <ProductTable
        products={products}
        loading={loading}
        onDeleteRequest={setDeleteTarget}
      />

      <div className="mt-6 flex justify-center">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete product?"
        message={`This will permanently remove "${deleteTarget?.name}" from inventory. This cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
