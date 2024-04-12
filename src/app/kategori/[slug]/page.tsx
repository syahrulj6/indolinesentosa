'use client';
import { ProductCard } from '@/components/sharedComponents/cardProduct/productCard';
import { useState, useEffect } from 'react';

interface Product {
  _id: string;
  img: string;
  slug: string;
  title: string;
  category: string;
}

const KategoriPage = ({ params }: { params: any }) => {
  const { slug } = params;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/product');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((item) => slug === item.category);

  return (
    <div className="flex flex-col pt-32 min-h-screen md:pt-40 pb-12 md:pb-16">
      <div className="md:px-32 px-3 mb-8">
        <h2 className="text-4xl font-semibold text-center md:text-start">{slug}</h2>
        <div className="w-full h-1 bg-black mt-2" />
      </div>
      <div className="grid grid-cols-2 px-2 md:grid-cols-4 gap-2 md:gap-5 w-full md:px-28 justify-center">
        {filteredProducts.length === 0 ? <p className="my-auto mx-auto">No items found in this category.</p> : filteredProducts.map((item) => <ProductCard key={item._id} img={item.img} slug={item.slug} title={item.title} />)}
      </div>
    </div>
  );
};

export default KategoriPage;
