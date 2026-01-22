'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@camnextgen/ui';
import { useLoginMutation } from '@camnextgen/lib';
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
  const mutation = useLoginMutation();

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
      const payload = await mutation.mutateAsync(values);

      if (payload.user.role === 'STUDENT') {
        router.replace('/home');
        router.refresh();
        return;
      }

      const adminBase = process.env.NEXT_PUBLIC_ADMIN_BASE_URL;
      if (adminBase) {
        window.location.href = `${adminBase}/dashboard?access=denied`;
        return;
      }

      router.replace('/home');
      router.refresh();
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
        <p className="text-sm text-muted-foreground">Continue your learning journey.</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          <Button className="w-full" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Signing in...' : 'Sign in'}
          </Button>
          <Button variant="ghost" className="w-full" type="button" onClick={() => router.push('/auth/forgot-password')}>
            Forgot password?
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
