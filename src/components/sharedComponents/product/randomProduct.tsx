'use client';

import axios from 'axios';

import { ProductCard } from '../cardProduct/productCard';
import { Suspense, useEffect, useState } from 'react';

export const RandomProduct = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/product');
        const data = response.data;
        const randomItems: any = [];

        // Generate 4 random indices
        const randomIndices = new Set();
        while (randomIndices.size < 12) {
          randomIndices.add(Math.floor(Math.random() * data.length));
        }

        // Get the data at random indices
        randomIndices.forEach((index: any) => {
          randomItems.push(data[index]);
        });

        setProducts(randomItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 px-2 md:grid-cols-4 gap-2 md:gap-5 w-full md:px-28 justify-center pb-16">
      {products.map((item) => (
        <Suspense fallback={<p>Loading...</p>}>
          <ProductCard key={item._id} img={item.img} title={item.title} slug={item.slug} />
        </Suspense>
      ))}
    </div>
  );
};
