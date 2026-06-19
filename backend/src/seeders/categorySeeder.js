import 'dotenv/config';
import mongoose from 'mongoose';
import Category from '../models/Category.js';

const categories = [
  'Electronics',
  'Clothing',
  'Groceries',
  'Books',
  'Toys',
  'Furniture',
  'Sports & Outdoors',
  'Beauty & Personal Care',
  'Home & Kitchen',
  'Stationery',
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Category.deleteMany({});
    const created = await Category.insertMany(categories.map((name) => ({ name })));

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();
