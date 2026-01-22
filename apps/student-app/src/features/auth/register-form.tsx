'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@camnextgen/ui';
import { useRegisterMutation } from '@camnextgen/lib';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const schema = z
  .object({
    fullName: z.string().min(2, 'Name is required'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password')
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type FormValues = z.infer<typeof schema>;

export const RegisterForm = () => {
  const router = useRouter();
  const mutation = useRegisterMutation({
    onSuccess: () => {
      router.push('/auth/check-email');
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await mutation.mutateAsync({
        fullName: values.fullName,
        email: values.email,
        password: values.password
      });
    } catch (error) {
      toast.error('Registration failed', {
        description: 'Please verify your details and try again.'
      });
    }
  };

  return (
    <Card className="border-0 bg-card/95 shadow-2xl">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <p className="text-sm text-muted-foreground">Start learning with CamNextGen.</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="Sokha Chea" {...register('fullName')} />
            {errors.fullName ? <p className="text-xs text-destructive">{errors.fullName.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="student@camnextgen.edu" {...register('email')} />
            {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create a password" {...register('password')} />
            {errors.password ? (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input id="confirmPassword" type="password" placeholder="Repeat password" {...register('confirmPassword')} />
            {errors.confirmPassword ? (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            ) : null}
          </div>
          <Button className="w-full" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
