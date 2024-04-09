import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

interface Card {
  img: string;
  title: string;
  desc?: string;
  slug: string;
  width?: string;
}

export const ProductCard = ({ img, title, desc, slug, width }: Card) => {
  return (
    <Link href={`/${slug}`}>
      <Card className={`w-full  bg-white  py-3 hover:shadow-xl transition-all duration-150 `}>
        <CardContent>
          <div className=" flex flex-col gap-2  justify-center items-center">
            <div className="relative w-44 h-44 md:w-28 md:h-28 lg:w-44 lg:h-44">
              <Image src={img} alt="product img" fill className="" />
            </div>
            <div>
              <p className="text-sm text-center md:text-xs  lg:text-start lg:text-md font-semibold">{title}</p>
              <p className="text-sm lg:text-md">{desc}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
