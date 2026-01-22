import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

export const AppShell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex flex-1 flex-col">
      <Topbar />
      <main className="flex-1 bg-background px-8 py-8">{children}</main>
    </div>
  </div>
);
