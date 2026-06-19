import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || 'Something went wrong';
      return Promise.reject({ message, status: error.response.status });
    }
    if (error.request) {
      return Promise.reject({ message: 'Server is unreachable' });
    }
    return Promise.reject({ message: error.message || 'Unexpected error' });
  }
);

export default api;
