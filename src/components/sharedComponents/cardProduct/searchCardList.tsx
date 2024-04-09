import { Card, CardContent } from '@/components/ui/card';

import Link from 'next/link';

interface Card {
  img: string;
  title: string;
  desc: string;
  slug: string;
  width: string;
}

export const SearchCard = ({ width, img, title, slug }: Card) => {
  return (
    <Link href={`${slug}`}>
      <Card className={`shadow-md w-[200px] md:w-[${width}px]  bg-white  py-3 hover:bg-slate-100 transition-all duration-150 h-14 md:h-12 `}>
        <CardContent>
          <div className="flex-1 flex flex-col gap-1 justify-center items-center">
            <h3 className="text-sm md:text-md font-semibold">{title}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
