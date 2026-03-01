'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label } from '@/components/ui';
import { useRegisterMutation } from '@/lib';
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
    onSuccess: (data, variables) => {
      router.push(`/auth/verify-otp?email=${encodeURIComponent(variables.email)}&purpose=EMAIL_VERIFICATION`);
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
        <CardDescription>Start learning with CamNextGen.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button
          className="w-full h-11 text-base font-bold shadow-soft"
          type="submit"
          form="register-form"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating account...' : 'Create account'}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className="text-primary font-bold hover:underline underline-offset-4"
          >
            Sign in
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};
