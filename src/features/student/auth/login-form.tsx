'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label } from '@/components/ui';
import { useLoginMutation } from '@/lib';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

type FormValues = z.infer<typeof schema>;

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const redirect = searchParams.get('redirect');
  const mutation = useLoginMutation({
    onSuccess: (payload) => {
      if (payload.user.role === 'STUDENT') {
        router.replace('/home');
        router.refresh();
        return;
      }

      // const adminBase = process.env.NEXT_PUBLIC_ADMIN_BASE_URL;
      // if (adminBase) {
      //   window.location.href = `${adminBase}/dashboard?access=denied`;
      //   return;
      // }

      router.replace('/home');
      router.refresh();
    }
  });

  useEffect(() => {
    if (token && redirect?.includes('verify')) {
      router.replace(`/auth/verify?token=${token}`);
    }
  }, [token, redirect, router]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      toast.error('Login failed', {
        description: 'Please check your credentials and try again.'
      });
    }
  };

  return (
    <Card className="border-0 bg-card/95 shadow-2xl">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Continue your learning journey.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="student@camnextgen.edu" {...register('email')} />
            {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" {...register('password')} />
            {errors.password ? (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            ) : null}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button className="w-full h-11 text-base font-bold shadow-soft" type="submit" form="login-form" disabled={mutation.isPending}>
          {mutation.isPending ? 'Signing in...' : 'Sign in'}
        </Button>
        <Button
          variant="ghost"
          className="w-full h-9"
          type="button"
          onClick={() => router.push('/auth/forgot-password')}
        >
          Forgot password?
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/auth/register')}
            className="text-primary font-bold hover:underline underline-offset-4"
          >
            Sign up
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};
