import { Card, CardContent, CardHeader, CardTitle, Button } from '@camnextgen/ui';
import Link from 'next/link';

export const CheckEmailCard = () => (
  <Card className="border-0 bg-card/95 shadow-2xl">
    <CardHeader>
      <CardTitle>Check your email</CardTitle>
      <p className="text-sm text-muted-foreground">
        We sent a verification link to your inbox. Please verify to continue.
      </p>
    </CardHeader>
    <CardContent>
      <Button asChild className="w-full">
        <Link href="/auth/login">Back to login</Link>
      </Button>
    </CardContent>
  </Card>
);
