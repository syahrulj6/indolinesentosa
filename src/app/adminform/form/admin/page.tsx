import { Suspense } from 'react';
import AdminPosts from '@/components/auth/admin/AdminPosts';
import AdminPostForm from '@/components/auth/admin/AdminPostForm';

import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AdminPage = async () => {
  const session = await auth();

  return (
    <div className=" flex flex-col w-full ">
      {session !== null ? (
        <div className="flex gap-10 lg:flex-row flex-col mx-4 md:mx-10 mt-24 md:mt-36 ">
          <div className="flex-1">
            <AdminPostForm userId={session?.user?.id} />
          </div>
          <div className="flex-1">
            <Suspense fallback={<div>Loading...</div>}>
              <AdminPosts />
            </Suspense>
          </div>
        </div>
      ) : (
        <Button asChild>
          <Link href={'https://indoline-sentosa.com/auth/signin'}>Sign in</Link>
        </Button>
      )}
    </div>
  );
};

export default AdminPage;
