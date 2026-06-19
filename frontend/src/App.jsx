import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import ProductListPage from './pages/ProductListPage';
import AddProductPage from './pages/AddProductPage';
import { fetchCategories } from './api/categoryApi';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => setCategoriesError(err.message || 'Failed to load categories'));
  }, []);

  return (
    <Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#ffffff',
            color: '#1e293b',
            border: '1px solid #e2e8f0',
            fontSize: '14px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<ProductListPage categories={categories} />} />
        <Route path="/add" element={<AddProductPage categories={categories} />} />
      </Routes>
    </Layout>
  );
}
