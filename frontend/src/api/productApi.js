import api from './axios';

export const fetchProducts = async ({ page = 1, limit = 10, search = '', categoryIds = [] } = {}) => {
  const params = { page, limit };
  if (search) params.search = search;
  if (categoryIds.length) params.categories = categoryIds.join(',');

  const { data } = await api.get('/products', { params });
  return data;
};

export const createProduct = async (payload) => {
  const { data } = await api.post('/products', payload);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};
