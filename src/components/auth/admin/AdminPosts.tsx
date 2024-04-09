import { getProducts } from '@/lib/data';

import Image from 'next/image';
import { deleteProduct } from '@/lib/actions';

const AdminPosts = async () => {
  const posts = await getProducts();

  return (
    <>
      <h1 className="text-xl font-semibold text-center ">Product list</h1>
      <div className="h-[450px] overflow-y-scroll px-3">
        {posts.map((post) => (
          <div className="my-5 flex items-center justify-between gap-5" key={post.id}>
            <div className="flex items-center gap-5">
              <Image src={post.img || '/noAvatar.png'} alt="" width={50} height={50} />
              <span className="">{post.title}</span>
            </div>
            <form action={deleteProduct}>
              <input type="hidden" name="id" value={post.id} />
              <button className="bg-red-300 text-red-500 px-3 py-2 rounded-md">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminPosts;
