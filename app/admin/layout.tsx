import AdminLayout from '@/components/AdminLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Simply return children so that the global sidebar in RootLayout remains the only sidebar
  return <>{children}</>;
}