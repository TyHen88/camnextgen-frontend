import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen flex-col lg:flex-row">
    <Sidebar />
    <div className="flex min-w-0 flex-1 flex-col">
      <Topbar />
      <main className="flex-1 bg-background px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
    </div>
  </div>
);
