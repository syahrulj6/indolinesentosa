'use client';

import * as z from 'zod';

import { addProduct } from '@/lib/actions';
import { ProductSchema } from '@/schemas';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import { useEdgeStore } from '@/lib/edgestore';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Links } from '@/components/sharedComponents/navbar/Links';
import { Textarea } from '@/components/ui/textarea';
// import Link from 'next/link';

const AdminPostForm = ({ userId }: { userId: string | undefined }) => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [position, setPosition] = useState('');
  const [state, formAction] = useFormState(addProduct, undefined);
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: '',
      category: '',
      img: '',
      desc: '',
    },
  });

  return (
    <div className="flex flex-col mb-11 ">
      <h1 className="text-xl font-semibold text-center">Add Product</h1>
      <div className="flex flex-col gap-2 mt-8 -mb-2">
        <Label htmlFor="picture">Picture</Label>
        <Input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        <button
          className="w-full py-2 text-sm border-2 rounded  border-slate-200 hover:bg-slate-200 transition-all duration-100"
          onClick={async () => {
            if (file) {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  setProgress(progress);
                },
              });

              // pass value to img formaction
              form.setValue('img', res.url);
            }
          }}
        >
          Upload
        </button>
        <div className="h-2 overflow-hidden w-full rounded">
          <div className="h-full bg-black transition-all duration-150" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <Form {...form}>
        <form action={formAction} className="space-y-6 -mt-5 ">
          <input type="hidden" name="userId" value={userId} />
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Title" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input {...field} type="text" value={position.toLocaleLowerCase()} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2"></div>
            <DropdownMenu>
              <Label>Category</Label>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  {position.length === 0 ? 'Select Category' : position}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 h-64 overflow-y-scroll">
                <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  {Links.map((category) => (
                    <DropdownMenuRadioItem value={category.title}>{category.title}</DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Description" rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>Picture url</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Picture" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Add product
          </Button>
          {state?.error}
        </form>
      </Form>
    </div>
  );
};

export default AdminPostForm;
