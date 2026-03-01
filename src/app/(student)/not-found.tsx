import Link from 'next/link';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">We could not locate that page.</p>
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
