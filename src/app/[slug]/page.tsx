import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

const ProductPage = async ({ params }: { params: any }) => {
  const { slug } = params;

  const products = await getProducts();

  const filteredProducts = products.filter((item: any) => slug === item.slug);

  return (
    <div className="flex justify-center pt-14 pb-8 items-center md:h-screen w-full md:px-20 ">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item: any) => (
          <div key={item._id} className="flex flex-col items-center w-full md:flex-row gap-2 mt-7 md:mt-0">
            <div className="md:flex-1 w-80 h-80 md:w-[400px] md:h-[400px] relative">
              <Image src={item.img} alt="product img" fill className="object-contain " />
            </div>
            <div className="md:flex-1  justify-center items-center md:items-start  md:justify-center flex flex-col gap-3 px-8">
              <h3 className="font-semibold text-lg  ">{item.title}</h3>
              <p className="text-center md:text-start">{item.desc}</p>
              <Button asChild className="w-2/4">
                <Link href={`/kontak-kami`}>Pesan</Link>
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>No items found in this category.</p>
      )}
    </div>
  );
};

export default ProductPage;
