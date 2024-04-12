'use client';

import { Button } from '@/components/ui/button';
import { ProductCard } from '../cardProduct/productCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Suspense, useEffect, useState } from 'react';
import axios from 'axios';

export const Allproducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const handleNext = (e: any) => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = (e: any) => {
    if (currentPage > 1) {
      // Check if the current page is greater than 1
      setCurrentPage((prev) => prev - 1);
    }
  };

  // pm2 start npm --name indolinesentosa -- start

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`https://indoline-sentosa.vercel.app/api/product/page/${currentPage}`);
      const newProducts = response.data;
      if (newProducts.length === 0) {
        setHasMore(false); // No more data available
      } else {
        setProducts(newProducts);
        setHasMore(true);
      }
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <>
      <div className="grid grid-cols-2 px-2 mb-20 md:grid-cols-4 gap-2 md:gap-5 w-full md:px-28 justify-center  items-center">
        <Suspense fallback={<p>Loading...</p>}>
          {products.map((item: any, index: number) => (
            <ProductCard key={index} img={item.img} title={item.title} slug={item.slug} />
          ))}
          <div className="flex w-full justify-center  ">
            <div className="fixed bottom-0 right-10 flex gap-4 my-8">
              {currentPage > 1 && (
                <div className="">
                  <Button className="bg-primary border-2 border-white  text-white " onClick={handlePrev}>
                    <FaArrowLeft />
                  </Button>
                </div>
              )}
              {hasMore ? (
                <div className="">
                  <Button className="bg-primary border-2 border-white text-white " onClick={handleNext}>
                    <FaArrowRight />
                  </Button>
                </div>
              ) : (
                <div className="hidden">
                  <Button className="bg-primary border-2 border-white text-white " onClick={handleNext}>
                    <FaArrowRight />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
};
