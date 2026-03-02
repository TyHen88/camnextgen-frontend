'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Input, Label, useTheme } from '@/components/ui';
import { useLoginMutation } from '@/lib';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

import { Mail, Lock, CheckCircle2, ArrowRight, Link } from 'lucide-react';
import Image from 'next/image';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

type FormValues = z.infer<typeof schema>;

export const LoginForm = () => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === 'dark' ? '/CamNextGen2.png' : '/CamNextGen.png';

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
    <Card className="group overflow-hidden p-0 border-0 bg-card/40 shadow-premium backdrop-blur-xl flex flex-col md:flex-row min-h-[600px] transition-all hover:shadow-glow">
      {/* Left Column - Image */}
      <div className="hidden md:flex w-[45%] relative bg-muted p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-brand-teal/10 to-transparent z-10" />
        <div className="relative z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
            <CheckCircle2 className="w-3 h-3" />
            Accredited Learning
          </div>
          <h2 className="text-3xl font-display font-bold leading-tight text-foreground">
            Empower Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">
              Digital Future
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground/80 text-sm leading-relaxed max-w-[280px]">
            Access world-class IT education and become part of Cambodia's next generation of engineers.
          </p>
        </div>

        <div className="mb-10 animate-fade-in">
          <div className="flex flex-col items-center gap-4 group">
            <div className="relative h-20 w-20 transition-transform duration-500 ">
              <Image
                src={logoSrc}
                alt="CamNextGen Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-display font-bold tracking-tight">
                <span className="text-brand-blue uppercase">Cam</span>
                <span className="text-brand-teal uppercase">NextGen</span>
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-foreground/40 font-semibold mt-1">IT Education Platform</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl" />
      </div>

      {/* Right Column - Form */}
      <div className="w-full md:w-[55%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Log in to your student dashboard</p>
        </div>

        <form id="login-form" className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-brand-blue" />
              <Input
                id="email"
                type="email"
                placeholder="student@camnextgen.edu"
                className="pl-10 h-12 bg-muted/50 border-muted-foreground/10 focus:border-brand-blue focus:ring-brand-blue/20"
                {...register('email')}
              />
            </div>
            {errors.email ? <p className="text-xs text-destructive font-medium mt-1">{errors.email.message}</p> : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={() => router.push('/auth/forgot-password')}
                className="text-xs text-brand-blue hover:underline font-medium"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-brand-blue" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-12 bg-muted/50 border-muted-foreground/10 focus:border-brand-blue focus:ring-brand-blue/20"
                {...register('password')}
              />
            </div>
            {errors.password ? (
              <p className="text-xs text-destructive font-medium mt-1">{errors.password.message}</p>
            ) : null}
          </div>

          <Button
            className="w-full h-12 text-base font-bold shadow-soft bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            type="submit"
            form="login-form"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Sign in
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>

          <div className="relative pt-4">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-muted-foreground/10" />
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground font-medium">Or continue with</span>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground pt-2">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/auth/register')}
              className="text-brand-blue font-bold hover:underline underline-offset-4"
            >
              Start learning for free
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};
