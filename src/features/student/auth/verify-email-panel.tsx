'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useVerifyEmailMutation } from '@/lib';
import { toast } from 'sonner';

export const VerifyEmailPanel = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const mutation = useVerifyEmailMutation({
    onSuccess: (payload) => {
      if (payload?.tokens) {
        router.push('/home');
        return;
      }

      router.push('/auth/login?verified=1');
    }
  });

  useEffect(() => {
    if (!token) {
      toast.error('Missing verification token');
      return;
    }

    const timeout = setTimeout(() => {
      mutation.mutate({ token });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [token, mutation]);

  return (
    <Card className="border-0 bg-card/95 shadow-2xl">
      <CardHeader>
        <CardTitle>Verifying your email</CardTitle>
        <p className="text-sm text-muted-foreground">Hang tight while we confirm your address.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {mutation.isPending ? (
          <p className="text-sm text-muted-foreground">Checking token...</p>
        ) : null}
        {mutation.isError ? (
          <div className="space-y-3">
            <p className="text-sm text-destructive">Verification failed. Please try again.</p>
            <Button onClick={() => token && mutation.mutate({ token })}>Retry</Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};
