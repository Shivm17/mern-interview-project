import Category from '../models/Category.js';


export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean();
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};
