import { LoginForm } from '@/components/auth/login-form';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import Link from 'next/link';

const SigninPage = async () => {
  const session = await auth();
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {session !== null ? (
        <Button asChild>
          <Link href={'https://indoline-sentosa.com/'}>Go to Homepage</Link>
        </Button>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default SigninPage;
