'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@camnextgen/ui';
import { useLoginMutation } from '@camnextgen/lib';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

type FormValues = z.infer<typeof schema>;

export const LoginForm = () => {
  const router = useRouter();
  const mutation = useLoginMutation({
    onSuccess: (payload) => {
      if (payload.user.role === 'ADMIN') {
        router.replace('/dashboard');
        router.refresh();
        return;
      }

      const studentBase = process.env.NEXT_PUBLIC_STUDENT_BASE_URL;
      if (studentBase) {
        window.location.href = `${studentBase}/home?access=denied`;
        return;
      }

      router.replace('/dashboard');
      router.refresh();
    }
  });

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
        <CardTitle>Admin Sign In</CardTitle>
        <p className="text-sm text-muted-foreground">Manage courses, users, and platform operations.</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@camnextgen.edu" {...register('email')} />
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
        </form>
      </CardContent>
    </Card>
  );
};
