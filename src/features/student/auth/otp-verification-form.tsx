'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Label,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from '@/components/ui';
import { useVerifyOtpMutation, useSendOtpMutation } from '@/lib';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { type OtpPurpose } from '@/types';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const schema = z.object({
    email: z.string().email('Enter a valid email'),
    otp: z.string().min(6, 'Enter the 6-digit code'),
    purpose: z.enum(['EMAIL_VERIFICATION', 'PASSWORD_RESET', 'LOGIN_2FA'] as const)
});

type FormValues = z.infer<typeof schema>;
type VerifyStatus = 'idle' | 'loading' | 'success' | 'error';

export const OtpVerificationForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') ?? '';
    const purpose = (searchParams.get('purpose') as OtpPurpose) ?? 'EMAIL_VERIFICATION';

    // Own state for OTP value — avoids react-hook-form Controller conflicts with input-otp
    const [otpValue, setOtpValue] = useState('');
    const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>('idle');

    // Guard against double-fire (StrictMode double-effect or rapid input)
    const isVerifying = useRef(false);

    const { register } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { email, purpose }
    });

    const verifyMutation = useVerifyOtpMutation({
        onSuccess: () => {
            setVerifyStatus('success');
            toast.success('Verification successful');
            setTimeout(() => {
                if (purpose === 'PASSWORD_RESET') {
                    router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
                } else {
                    router.push('/auth/login?verified=1');
                }
            }, 1200);
        }
    });

    const sendOtpMutation = useSendOtpMutation({
        onSuccess: () => {
            toast.success('New code sent', { description: 'Please check your inbox.' });
            setVerifyStatus('idle');
            setOtpValue('');
            isVerifying.current = false;
        }
    });

    const callVerifyApi = async (otp: string) => {
        if (isVerifying.current) return;
        isVerifying.current = true;
        setVerifyStatus('loading');
        try {
            await verifyMutation.mutateAsync({ email, otp, purpose });
        } catch {
            setVerifyStatus('error');
            isVerifying.current = false;
            toast.error('Verification failed', {
                description: 'Invalid or expired code. Please try again.'
            });
        }
    };

    // ✅ This is the single source of truth for OTP change & auto-trigger
    const handleOtpChange = (value: string) => {
        setOtpValue(value);

        // Reset so user can retry after error
        if (verifyStatus === 'error') {
            setVerifyStatus('idle');
            isVerifying.current = false;
        }

        // Auto-trigger API when all 6 digits are filled
        if (value.length === 6 && verifyStatus !== 'success' && !isVerifying.current) {
            callVerifyApi(value);
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otpValue.length === 6) {
            callVerifyApi(otpValue);
        }
    };

    const handleResend = () => {
        if (!email) return;
        setVerifyStatus('idle');
        setOtpValue('');
        isVerifying.current = false;
        sendOtpMutation.mutate({ email, purpose });
    };

    const renderStatusIcon = () => {
        if (verifyStatus === 'loading') {
            return (
                <div className="flex flex-col items-center gap-1 animate-in fade-in">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <p className="text-xs text-muted-foreground">Verifying…</p>
                </div>
            );
        }
        if (verifyStatus === 'success') {
            return (
                <div className="flex flex-col items-center gap-1 animate-in zoom-in-50 duration-300">
                    <CheckCircle2 className="h-10 w-10 text-green-500 drop-shadow-md" />
                    <p className="text-xs font-medium text-green-600">Verified! Redirecting…</p>
                </div>
            );
        }
        if (verifyStatus === 'error') {
            return (
                <div className="flex flex-col items-center gap-1 animate-in zoom-in-50 duration-300">
                    <XCircle className="h-10 w-10 text-destructive drop-shadow-md" />
                    <p className="text-xs font-medium text-destructive">Invalid code. Try again.</p>
                </div>
            );
        }
        return null;
    };

    const isDisabled = verifyStatus === 'loading' || verifyStatus === 'success';

    return (
        <Card className="border-0 bg-card/95 shadow-2xl">
            <CardHeader>
                <CardTitle>Verify your account</CardTitle>
                <p className="text-sm text-muted-foreground">
                    We sent a 6-digit code to{' '}
                    <span className="font-medium text-foreground">{email}</span>.
                </p>
            </CardHeader>
            <CardContent>
                <form className="space-y-5" onSubmit={handleManualSubmit}>
                    <input type="hidden" {...register('email')} />
                    <input type="hidden" {...register('purpose')} />

                    <div className="space-y-4">
                        <Label htmlFor="otp">Verification Code</Label>
                        <div className="flex justify-center">
                            <InputOTP
                                maxLength={6}
                                value={otpValue}
                                onChange={handleOtpChange}
                                disabled={isDisabled}
                            >
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
                        </div>

                        {/* Status icon */}
                        <div className="min-h-[3rem] flex justify-center items-center">
                            {renderStatusIcon()}
                        </div>
                    </div>

                    {/* Manual submit button — fallback for when auto-detect doesn't fire */}
                    {(verifyStatus === 'idle' || verifyStatus === 'error') && (
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={otpValue.length < 6}
                        >
                            Verify Now
                        </Button>
                    )}

                    <div className="text-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            type="button"
                            onClick={handleResend}
                            disabled={sendOtpMutation.isPending || isDisabled}
                        >
                            {sendOtpMutation.isPending ? 'Sending…' : "Didn't get a code? Resend"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
