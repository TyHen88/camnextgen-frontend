import Link from 'next/link';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@camnextgen/ui';

export default function Page() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Access denied</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">You do not have permission to view that page.</p>
          <Button asChild>
            <Link href="/home">Return home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
