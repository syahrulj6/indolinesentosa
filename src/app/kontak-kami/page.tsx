'use client';

import { Button } from '@/components/ui/button';
import { useForm, ValidationError } from '@formspree/react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

const KontakKamiPage = () => {
  const [state, handleSubmit] = useForm('xbjnavwj');
  if (state.succeeded) {
    return (
      <div className="min-h-screen flex w-full items-center justify-center flex-col">
        <h2>Email Successfully sent!</h2>
        <Button asChild>
          <Link href={'/'}>Back to Home</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="min-h-screen items-center justify-center gap-2 flex p-24 flex-col">
      <form onSubmit={handleSubmit} className="h-full  md:w-1/3 space-y-4">
        <div className="flex flex-col items-start justify-start">
          <h1 className="text-xl font-semibold">Message</h1>
        </div>
        <div className="relative flex flex-col space-y-1">
          <label htmlFor="email">Your Email</label>
          <input id="email" type="email" name="email" className="px-4 py-2 rounded-md border-2 border-primary" />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={5} className="px-4 py-2 rounded-md border-2 border-primary" />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
          <Button type="submit" disabled={state.submitting}>
            Send Message
          </Button>
        </div>
      </form>
      <p className="">or</p>
      <Button asChild className="bg-green-500 hover:bg-green-600 md:w-1/3 ">
        <Link target="blank" href="https://wa.me/+6285104000241" className="flex gap-2 items-center">
          Message to Whatsapp <FaWhatsapp className="text-xl" />
        </Link>
      </Button>
    </div>
  );
};

export default KontakKamiPage;
