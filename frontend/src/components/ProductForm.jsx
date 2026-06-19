import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MultiSelect } from 'react-multi-select-component';
import { createProduct } from '../api/productApi';

const INITIAL_FORM = { name: '', description: '', quantity: '', categories: [] };

export default function ProductForm({ categories }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};

    const trimmedName = form.name.trim();
    if (!trimmedName) next.name = 'Product name is required';

    if (form.quantity === '') {
      next.quantity = 'Quantity is required';
    } else if (!Number.isInteger(Number(form.quantity)) || Number(form.quantity) < 0) {
      next.quantity = 'Quantity must be a whole number, 0 or greater';
    }

    if (form.categories.length === 0) {
      next.categories = 'Select at least one category';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    // console.log(e.target)
    const { name, value } = e.target;
    console.log(name, value)
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await createProduct({
        name: form.name.trim(),
        description: form.description.trim(),
        quantity: Number(form.quantity),
        categories: form.categories,
      });
      toast.success('Product added successfully');
      navigate('/');
    } catch (err) {
      if (err.status === 409) {
        setErrors((er) => ({ ...er, name: err.message }));
      } else if (err.errors?.length) {
        toast.error(err.errors[0]);
      } else {
        toast.error(err.message || 'Failed to add product');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <Field label="Product Name" error={errors.name} required>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Wireless Mechanical Keyboard"
          className={inputClasses(errors.name)}
        />
      </Field>

      <Field label="Description" error={errors.description}>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Brief description of the product..."
          rows={4}
          className={inputClasses(errors.description)}
        />
      </Field>

      <Field label="Quantity" error={errors.quantity} required>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="0"
          min={0}
          step={1}
          className={inputClasses(errors.quantity)}
        />
      </Field>

      <Field label="Categories" error={errors.categories} required>
        <MultiSelect
          options={categories.map((c) => ({ value: c._id, label: c.name }))}
          value={categories
            .filter((c) => form.categories.includes(c._id))
            .map((c) => ({ value: c._id, label: c.name }))}
          onChange={(selectedOptions) => {
            const ids = selectedOptions ? selectedOptions.map((o) => o.value) : [];
            setForm((f) => ({ ...f, categories: ids }));
            if (errors.categories) setErrors((er) => ({ ...er, categories: undefined }));
          }}
          labelledBy="Select categories"
          overrideStrings={{ selectSomeItems: "Select one or more categories" }}
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-sm transition-colors"
      >
        {submitting ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
}

function Field({ label, error, required, children }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

function inputClasses(error) {
  return `w-full px-4 py-2.5 rounded-lg bg-white border text-sm text-slate-800 placeholder:text-slate-400 outline-none shadow-sm transition-all focus:ring-1 focus:ring-indigo-500/50 ${
    error ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-indigo-500'
  }`;
}
