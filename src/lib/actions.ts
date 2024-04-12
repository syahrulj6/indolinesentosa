'use server';

import { revalidatePath } from 'next/cache';
import { Product, Admin } from './models';
import { connectToDB } from './db';
// import { signIn, signOut } from './auth';
import bcryptjs from 'bcryptjs';
import { signOut, signIn } from './auth';

export const addProduct = async (prevState: any, formData: any) => {
  function removeSpacesAndReplaceWithHyphen(str: string) {
    // Replace spaces with hyphens using regular expression
    return str.toLocaleLowerCase().replace(/[^\w\-]+/g, '-');
  }

  const { title, desc, category, userId, img } = Object.fromEntries(formData);

  try {
    connectToDB();
    const newProduct = new Product({
      title,
      desc,
      slug: removeSpacesAndReplaceWithHyphen(title),
      category: removeSpacesAndReplaceWithHyphen(category),
      adminId: userId,
      img,
    });

    await newProduct.save();
    console.log('saved to db');
    revalidatePath('/adminform/form/admin');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};

export const deleteProduct = async (formData: any) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await Product.findByIdAndDelete(id);
    console.log('deleted from db');
    revalidatePath('/adminform/form/admin');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};

export const addAdmin = async (prevState: any, formData: any) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDB();
    const newUser = new Admin({
      username,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log('saved to db');
    revalidatePath('/adminform/form/admin');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};

export const deleteAdmin = async (formData: any) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await Product.deleteMany({ userId: id });
    await Admin.findByIdAndDelete(id);
    console.log('deleted from db');
    revalidatePath('/adminform/form/admin');
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};

export const handleLogout = async () => {
  'use server';
  await signOut();
};

export const register = async (previousState: any, formData: any) => {
  const { username, email, password, img } = Object.fromEntries(formData);

  try {
    connectToDB();

    const admin = await Admin.findOne({ username });

    if (admin) {
      return { error: 'Username already exists' };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new Admin({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log('saved to db');
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: 'Something went wrong!' };
  }
};

export const login = async (prevState: any, formData: any) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', { username, password });
    return { success: true };
  } catch (err: any) {
    console.log(err);

    if (err.message.includes('CredentialsSignin')) {
      return { error: 'Invalid username or password' };
    }
    throw err;
  }
};

export const searchProductByTitle = async (searchTerm: string) => {
  try {
    connectToDB(); // Connect to MongoDB
    const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search
    const product = await Product.find({ title: regex });
    return product;
  } catch (error: any) {
    throw new Error('Error searching product', error);
  }
};
