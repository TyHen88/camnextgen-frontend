export const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen overflow-hidden bg-foreground text-background">
    <div className="absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-primary/40 blur-[120px]" />
    <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-muted-foreground/40 blur-[120px]" />
    <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">{children}</div>
    </div>
  </div>
);
