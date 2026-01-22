'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Label } from '@camnextgen/ui';
import { authApi } from '@camnextgen/lib';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email('Enter a valid email')
});

type FormValues = z.infer<typeof schema>;

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await authApi.forgotPassword(values);
      router.push('/auth/check-email');
    } catch (error) {
      toast.error('Request failed', {
        description: 'Please check your email and try again.'
      });
    }
  };

  return (
    <Card className="border-0 bg-card/95 shadow-2xl">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <p className="text-sm text-muted-foreground">We will email you a reset link.</p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="student@camnextgen.edu" {...register('email')} />
            {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
          </div>
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
