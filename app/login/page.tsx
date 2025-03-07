"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mock login - in a real application, you would validate credentials against your backend
    if (email === 'admin@tryalma.ai' && password === 'admin') {
      // Set mock token
      document.cookie = 'admin-token=mock-admin-token; path=/';
      router.push('/admin');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7EA] flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm">
        <div>
          <Image 
            src="/alma-logo.svg" 
            alt="Alma" 
            width={120}
            height={32}
            className="mx-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-bold text-[#1A1A1A]">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-black hover:bg-gray-900 text-white rounded-xl font-medium text-base"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}