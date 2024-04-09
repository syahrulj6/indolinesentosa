'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/schemas';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { CardWrapper } from './card-wrapper';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { login } from '@/lib/actions';

export const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  return (
    <CardWrapper headerLabel="Login" backButtonLabel="Don't have an account?" backButtonHref="/auth/signup">
      <Form {...form}>
        <form action={formAction} className="space-y-6 ">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your name" type="Username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="*****" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
          {state?.error}
        </form>
      </Form>
    </CardWrapper>
  );
};
