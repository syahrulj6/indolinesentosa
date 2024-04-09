import { Product } from '@/lib/models';
import { connectToDB } from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    connectToDB();

    const products = await Product.find();
    return NextResponse.json(products);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch products!');
  }
};
