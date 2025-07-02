import { NextResponse } from 'next/server';

export function middleware(request) {
  // 한국어 버전 - 항상 한국어로 고정
  const response = NextResponse.next();
  response.cookies.set('language', 'ko', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30 // 30일
  });
  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}