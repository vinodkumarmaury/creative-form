import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";
import Link from 'next/link';
import Image from 'next/image';
import { Settings, Users } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alma Immigration - Get An Assessment',
  description: 'Get an assessment of your immigration case from our experienced attorneys.',
};

function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
      {/* Logo section (click = home/leadform) */}
      <div className="mb-8 border-b pb-4">
        <Link href="/">
          <Image src="/alma-logo.svg" alt="Alma" width={120} height={32} />
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        <Link 
          href="/admin" 
          className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <Users className="mr-3 h-5 w-5" />
          Leads
        </Link>
        <Link 
          href="/admin/settings" 
          className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </Link>
      </nav>
      
      {/* Admin avatar */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="font-medium text-gray-600">A</span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex bg-gray-50`}>
        <Sidebar />
        <div className="flex-1">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}