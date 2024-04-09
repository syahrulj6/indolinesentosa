'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { debounce } from '@/lib/debounce';

import { cn } from '@/lib/utils';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

import { IoClose } from 'react-icons/io5';
import { IoIosMenu } from 'react-icons/io';
import { Input } from '@/components/ui/input';
import { Product } from '@/lib/types';
import { SearchCard } from '../cardProduct/searchCardList';

import { MdKeyboardArrowDown } from 'react-icons/md';

import { Links } from './Links';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion';
import Image from 'next/image';
import { searchProductByTitle } from '@/lib/actions';

export const Navbar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsopen] = useState(false);
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null); // Ref

  const handleSearch = debounce(async (e: any) => {
    try {
      const title = e.target.value;
      if (title.length === 0) {
        setSearchResult([]); // Set search result to empty
      } else if (title.length >= 2) {
        const res = await searchProductByTitle(title);
        setSearchResult(res);
      }
    } catch (error) {
      console.log('Failed to search post', error);
    }
  }, 300); // 1000 milliseconds debounce time

  const handleProductLinkClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ''; // Set input value to an empty string
      setSearchResult([]);
    }
  };

  return (
    <div className="flex w-full items-center ">
      <div className="w-full flex justify-between items-center ">
        <div>
          <Link href={'/'} className="font-semibold text-2xl">
            <Image src={'/logoIs.jpg'} alt="company logo" width={60} height={60} />
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex ">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>CV Indoline</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a className="flex relative h-full  w-full select-none flex-col justify-end rounded-md p-6 no-underline outline-none focus:shadow-md" href="/">
                        <Image src={'/logoIs.jpg'} alt="company logo" fill className="object-contain  " />
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/about" title="Tentang kami">
                    Baca lebih lanjut
                  </ListItem>
                  <ListItem href="/kontak-kami" title="Pemesanan">
                    Kontak kami
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Kategori</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {Links.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href}></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Products</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/kontak-kami" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Kontak Kami</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div>
          {/* Searc Input */}
          <div className="w-52 md:w-64  gap-1 mr-8 md:mr-2 flex mx-auto">
            <Input type="text" placeholder="Search" className="flex-1 border-slate-400" onChange={handleSearch} ref={inputRef} />
          </div>
        </div>

        {/* Search List Result */}
        <div className="absolute  top-20 right-4 md:right-8 lg:right-20 z-10 ">
          {searchResult.map((product) => (
            <div onClick={handleProductLinkClick}>
              <SearchCard width="400" key={product._id} img={product.img} desc={product.desc} title={product.title} slug={`/${product.slug}`} />
            </div>
          ))}
        </div>

        {/* Hamburger button */}

        <button onClick={() => setIsopen(!isOpen)} className="block absolute right-4 top-5 md:hidden z-10 text-3xl hover:text-sky-500 transition-all  duration-150">
          {isOpen ? <IoClose /> : <IoIosMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col  gap-4 bg-gray-300  overflow-y-scroll absolute top-0 h-screen right-0 w-3/4 pt-14 px-2 -mt-[10px]">
          {children}
          <div className="flex flex-col items-center  w-full justify-center gap-y-5 ">
            <Link href={'/about'} className="text-white hover:bg-slate-800 bg-primary w-full text-center py-2 rounded-full transition-colors">
              Tentang kami
            </Link>
            <Accordion type="single" collapsible className="text-center w-full">
              <AccordionItem value="item-1" className="">
                <AccordionTrigger className="text-white flex justify-center hover:bg-slate-800 bg-primary w-full  py-2 rounded-full transition-colors mb-2 items-center">
                  Kategori <MdKeyboardArrowDown />
                </AccordionTrigger>
                <div className="-mt-2" />
                <AccordionContent className="flex flex-col gap-1">
                  {Links.map((link) => (
                    <Link key={link.title} href={link.href} className=" text-white hover:bg-slate-800 bg-primary w-full text-center py-2 rounded-full transition-colors">
                      {link.title}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link href={'/products'} className="text-white hover:bg-slate-800 bg-primary w-full text-center py-2 rounded-full transition-colors">
              Products
            </Link>
          </div>
          <div className="flex ">
            <Link href={'/kontak-kami'} className="text-white hover:bg-slate-800 bg-primary w-full text-center py-2 rounded-full transition-colors">
              Kontak kami
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn('block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground', className)}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
