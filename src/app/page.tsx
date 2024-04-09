import { BrandSlider } from '@/components/sharedComponents/brand/brandSlider';

import { RandomProduct } from '@/components/sharedComponents/product/randomProduct';

import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center h-screen gap-2 md:gap-24 w-full items-center ">
        <div className="md:flex- relative w-44 h-44 md:h-60 md:w-60">
          <Image src={'/logoIs.jpg'} alt="logo img" fill className="object-contain  w-full h-full " />
        </div>
        <div className=" flex flex-col items-center md:items-start gap-2 px-3">
          <h2 className="font-semibold text-3xl md:text-5xl ">CV Indo-Line Sentosa</h2>
          <p className="text-semibold text-xl text-center">Produk terbaik menimbang produk anda</p>
          <p className="text-gray-800 text-center">Produk kami di berbagai bidang dan kebutuhan bisnis</p>
          <a href="#product" className="py-2 px-4 bg-primary text-white rounded-full hover:bg-slate-700">
            See Product
          </a>
        </div>
      </div>

      {/* Product section */}
      <div id="product">
        <RandomProduct />
      </div>

      <div className="flex flex-col h-60 mt-20">
        <BrandSlider />
      </div>
    </>
  );
}
