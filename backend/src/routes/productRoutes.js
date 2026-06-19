import express from 'express';
const router = express.Router();
import { createProduct, getProducts, deleteProduct } from '../controllers/productController.js';

router.post('/', createProduct);
router.get('/', getProducts);
router.delete('/:id', deleteProduct);

export default router;
