'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui';
import { useResetPasswordMutation } from '@/lib';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  otp: z.string().min(6, 'Enter a valid OTP'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters')
});

type FormValues = z.infer<typeof schema>;

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const mutation = useResetPasswordMutation({
    onSuccess: () => {
      toast.success('Password reset successful', {
        description: 'You can now sign in with your new password.'
      });
      router.push('/auth/login');
    }
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      toast.error('Reset failed', {
        description: 'Please check your OTP and try again.'
      });
    }
  };

  return (
    <Card className="border-0 bg-card/95 shadow-2xl">
      <CardHeader>
        <CardTitle>Create new password</CardTitle>
        <p className="text-sm text-muted-foreground">Enter the OTP sent to your email and your new password.</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" readOnly {...register('email')} />
            {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
          </div>
          <div className="space-y-4">
            <Label htmlFor="otp">OTP Code</Label>
            <div className="flex">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputOTP maxLength={6} {...field} className={errors.otp ? 'ring-destructive' : ''}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
            </div>
            {errors.otp ? <p className="text-xs text-destructive">{errors.otp.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="Enter your new password" {...register('newPassword')} />
            {errors.newPassword ? (
              <p className="text-xs text-destructive">{errors.newPassword.message}</p>
            ) : null}
          </div>
          <Button className="w-full" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Resetting...' : 'Reset password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
