import { Product, Admin } from './models';
import { connectToDB } from './db';
import { unstable_noStore as noStore } from 'next/cache';

export const getProducts = async () => {
  try {
    connectToDB();
    const products = await Product.find();
    return products;
  } catch (error: any) {
    throw new Error('Error Fetching Products', error);
  }
};

export const getProduct = async (slug: string) => {
  try {
    connectToDB();
    const product = await Product.findOne({ slug });
    return product;
  } catch (error: any) {
    throw new Error('Error Fetching Post', error);
  }
};

export const getAdmin = async (id: any) => {
  noStore();
  try {
    connectToDB();
    const admin = await Admin.findById(id);
    return admin;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch user!');
  }
};

export const getAdmins = async () => {
  try {
    connectToDB();
    const admins = await Admin.find();
    return admins;
  } catch (error: any) {
    throw new Error('Error Fetching Posts', error);
  }
};

export const getProductByCategory = async (category: string) => {
  try {
    connectToDB();
    const product = await Product.findOne({ category });
    return product;
  } catch (error: any) {
    throw new Error('Error Fetching Post', error);
  }
};

export const getRandomProducts = async (page: number = 1, pageSize: number = 15) => {
  try {
    connectToDB();
    const count = await Product.countDocuments(); // Get the total count of products
    const skip = (page - 1) * pageSize; // Calculate the number of products to skip based on the page number

    // Generate random products based on the specified page and pageSize
    const randomProducts = await Product.find().skip(skip).limit(pageSize);

    return randomProducts;
  } catch (error: any) {
    throw new Error('Error Fetching Random Products', error);
  }
};
