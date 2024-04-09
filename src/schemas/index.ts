import * as z from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(1, 'Please enter username').max(50, 'Username must less than 50'),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email('Email is required!'),
  password: z.string().min(6, 'Password must be atleast 6 characters!'),
  username: z.string().min(3, 'Username must be atleast 3 characters!').max(50, 'Username must less than 50 characters!'),
});

export const ProductSchema = z.object({
  title: z.string().min(5, 'Title must be atleast 5 characters!'),
  slug: z.string(),
  category: z.string().min(1, 'Category is required!'),
  desc: z.string().min(6, 'Desc must be atleast 6 characters!'),
  img: z.string(),
});
