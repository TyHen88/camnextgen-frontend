'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Input, Label, useTheme } from '@/components/ui';
import { useRegisterMutation } from '@/lib';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === 'dark' ? '/CamNextGen2.png' : '/CamNextGen.png';

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
    <Card className="group overflow-hidden p-0 border-0 bg-card/40 shadow-premium backdrop-blur-xl flex flex-col md:flex-row min-h-[600px] transition-all hover:shadow-glow">
      {/* Left Column - Image */}
      <div className="hidden md:flex w-[45%] relative bg-muted p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 via-brand-teal/10 to-transparent z-10" />
        <div className="relative z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3" />
            Join the Future
          </div>
          <h2 className="text-3xl font-display font-bold leading-tight text-foreground">
            Start Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">
              Journey Today
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground/80 text-sm leading-relaxed max-w-[280px]">
            Created for Cambodia's visionaries. Build the skills that will shape the next decade of technology.
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
      <div className="w-full md:w-[55%] p-8 md:p-12 lg:p-14 flex flex-col justify-center">
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">Create account</h1>
          <p className="text-muted-foreground mt-1">Join our community of student engineers</p>
        </div>

        <form id="register-form" className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="fullName">Full name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-brand-teal" />
              <Input
                id="fullName"
                placeholder="Sokha Chea"
                className="pl-10 h-11 bg-muted/50 border-muted-foreground/10 focus:border-brand-teal focus:ring-brand-teal/20"
                {...register('fullName')}
              />
            </div>
            {errors.fullName ? <p className="text-xs text-destructive font-medium mt-1">{errors.fullName.message}</p> : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-brand-teal" />
              <Input
                id="email"
                type="email"
                placeholder="student@camnextgen.edu"
                className="pl-10 h-11 bg-muted/50 border-muted-foreground/10 focus:border-brand-teal focus:ring-brand-teal/20"
                {...register('email')}
              />
            </div>
            {errors.email ? <p className="text-xs text-destructive font-medium mt-1">{errors.email.message}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-brand-teal" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-11 bg-muted/50 border-muted-foreground/10 focus:border-brand-teal focus:ring-brand-teal/20"
                {...register('password')}
              />
            </div>
            {errors.password ? <p className="text-xs text-destructive font-medium mt-1">{errors.password.message}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-brand-teal" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="pl-10 h-11 bg-muted/50 border-muted-foreground/10 focus:border-brand-teal focus:ring-brand-teal/20"
                {...register('confirmPassword')}
              />
            </div>
            {errors.confirmPassword ? (
              <p className="text-xs text-destructive font-medium mt-1">{errors.confirmPassword.message}</p>
            ) : null}
          </div>

          <div className="md:col-span-2 pt-2">
            <Button
              className="w-full h-12 text-base font-bold shadow-soft bg-gradient-to-r from-brand-blue to-brand-teal hover:opacity-90 transition-all hover:scale-[1.01] active:scale-[0.99]"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create account
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>

          <div className="md:col-span-2 text-center text-sm text-muted-foreground pt-4">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/auth/login')}
              className="text-brand-blue font-bold hover:underline underline-offset-4"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};
