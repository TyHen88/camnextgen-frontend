'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@/components/ui';
import { useResetPasswordMutation } from '@/lib';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

const schema = z
  .object({
    email: z.string().email('Enter a valid email'),
    otp: z.string().min(6, 'Missing verification code'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm your password')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type FormValues = z.infer<typeof schema>;

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const otp = searchParams.get('otp') ?? '';

  const mutation = useResetPasswordMutation({
    onSuccess: () => {
      toast.success('Password updated', {
        description: 'You can now sign in with your new password.'
      });
      router.push('/auth/login');
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email, otp }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await mutation.mutateAsync({
        email: values.email,
        otp: values.otp,
        newPassword: values.newPassword
      });
    } catch (error) {
      toast.error('Reset failed', {
        description: 'Something went wrong. Please try resetting your password again.'
      });
    }
  };

  if (!email || !otp) {
    return (
      <Card className="border-0 bg-card/95 shadow-2xl">
        <CardContent className="p-8 text-center space-y-4">
          <p className="text-muted-foreground">Invalid or expired reset session.</p>
          <Button onClick={() => router.push('/auth/forgot-password')}>
            Back to Forgot Password
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-md border-0 bg-card/95 shadow-2xl">
      <CardHeader>
        <CardTitle>Create new password</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Resetting password for <span className="font-medium text-foreground">{email}</span>
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Internal Hidden Fields */}
          <input type="hidden" {...register('email')} />
          <input type="hidden" {...register('otp')} />

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Min. 8 characters"
              {...register('newPassword')}
            />
            {errors.newPassword ? (
              <p className="text-xs text-destructive">{errors.newPassword.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repeat password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword ? (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            ) : null}
          </div>

          <Button
            className="w-full h-11 text-base font-bold mt-4"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Updating...' : 'Reset password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
