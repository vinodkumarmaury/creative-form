"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Settings, Users } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const activePage = pathname;

  return (
    <div className="grid grid-cols-[16rem,1fr] h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 pb-4 border-b">
          <Image src="/alma-logo.svg" alt="Alma" width={120} height={32} />
        </div>
        {/* Navigation Links */}
        <nav className="flex-1 p-6 pt-4 flex flex-col justify-between">
          <div>
            <Link 
              href="/admin"
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium ${
                activePage === '/admin'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Users className="mr-3 h-5 w-5" />
              Leads
            </Link>
            <Link 
              href="/admin/settings"
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium mt-1 ${
                activePage === '/admin/settings'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
            <Link href={`/login`} className="flex items-center px-4 py-3 rounded-lg text-sm font-medium mt-1 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
            ${
                activePage === '/admin/settings'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
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
            </Link>
          </div>
        </nav>
      </aside>

      <main className="overflow-hidden h-full">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
