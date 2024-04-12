import { auth } from '@/lib/auth';
import { Navbar } from './Navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { handleLogout } from '@/lib/actions';

export const MainNav = async () => {
  const session = await auth();

  return (
    <div className="flex w-full justify-between items-center z-10 py-2 lg:px-20  px-5 bg-white shadow-md fixed">
      <Navbar>
        <div className="flex md:hidden mt-4">
          {session?.user && (
            <div className="flex gap-2 w-full">
              <Button className="flex-1" asChild size={'sm'}>
                <Link href={'/adminform/form/admin'}>Add product</Link>
              </Button>
              <form action={handleLogout}>
                <Button className="flex-1" variant={'destructive'} size={'sm'}>
                  Logout
                </Button>
              </form>
            </div>
          )}
        </div>
      </Navbar>

      {/* Desktop */}
      <div className="hidden md:flex mr-8 md:mr-0">
        {session?.user && (
          <div className="flex gap-2 w-full">
            <Button className="flex-1" asChild size={'sm'}>
              <Link href={'/adminform/form/admin'}>Add product</Link>
            </Button>
            <form action={handleLogout}>
              <Button className="flex-1" variant={'destructive'} size={'sm'}>
                Logout
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile */}
    </div>
  );
};
