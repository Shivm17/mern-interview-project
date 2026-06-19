import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const createProduct = async (req, res, next) => {
  try {
    const { name, description = '', quantity, categories } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Product name is required',
      });
    }

    if (quantity === undefined || quantity === null || quantity === '') {
      return res.status(400).json({
        success: false,
        message: 'Quantity is required',
      });
    }

    const qtyNum = Number(quantity);
    if (!Number.isInteger(qtyNum) || qtyNum < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a whole number, 0 or greater',
      });
    }

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Select at least one category',
      });
    }

    const escapedName = name.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const existing = await Product.findOne({
      name: { $regex: `^${escapedName}$`, $options: 'i' },
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `A product named "${name}" already exists`,
      });
    }

    const validCategories = await Category.countDocuments({ _id: { $in: categories } });
    if (validCategories !== categories.length) {
      return res.status(400).json({
        success: false,
        message: 'Selected categories do not exist',
      });
    }

    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      quantity: qtyNum,
      categories,
    });

    const populated = await product.populate('categories', 'name');
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
   const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const filter = {};
    
    if (req.query.search) {
      filter.name = { $regex: req.query.search.trim(), $options: 'i' };
    }
    if (req.query.categories) {
      filter.categories = { $in: req.query.categories.split(',') };
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('categories', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.max(Math.ceil(total / limit), 1);

    res.json({
      success: true,
      data: products,
      pagination: { total, page, limit, totalPages },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
