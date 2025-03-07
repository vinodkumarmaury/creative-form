import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a simple mock authentication check
// In a real application, you would implement proper authentication
const MOCK_TOKEN = 'mock-admin-token';

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token');

    // If token is not present or invalid, redirect to login
    if (!token || token.value !== MOCK_TOKEN) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};