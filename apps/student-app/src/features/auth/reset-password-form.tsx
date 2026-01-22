'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@camnextgen/ui';
import { authApi } from '@camnextgen/lib';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

const schema = z.object({
  newPassword: z.string().min(8, 'Password must be at least 8 characters')
});

type FormValues = z.infer<typeof schema>;

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    if (!token) {
      toast.error('Missing reset token');
      return;
    }

    try {
      await authApi.resetPassword({ token, newPassword: values.newPassword });
      router.push('/auth/login');
    } catch (error) {
      toast.error('Reset failed', {
        description: 'Please request a new reset link.'
      });
    }
  };

  return (
    <Card className="border-0 bg-card/95 shadow-2xl">
      <CardHeader>
        <CardTitle>Create a new password</CardTitle>
        <p className="text-sm text-muted-foreground">Choose a strong password to secure your account.</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New password</Label>
            <Input id="newPassword" type="password" placeholder="New password" {...register('newPassword')} />
            {errors.newPassword ? (
              <p className="text-xs text-destructive">{errors.newPassword.message}</p>
            ) : null}
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
