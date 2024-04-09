import { Product } from '@/lib/models';
import { connectToDB } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: any }) => {
  const { slug } = params;

  try {
    connectToDB();

    const product = await Product.findOne({ slug });
    return NextResponse.json(product);
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch post!');
  }
};

export const DELETE = async (request: NextRequest, { params }: { params: any }) => {
  const { slug } = params;

  try {
    connectToDB();

    await Product.deleteOne({ slug });
    return NextResponse.json('Post deleted');
  } catch (err) {
    console.log(err);
    throw new Error('Failed to delete post!');
  }
};
