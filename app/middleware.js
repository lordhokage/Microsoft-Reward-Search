import { NextRequest, NextResponse } from 'next/server';

export function middleware(req) {
  NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: ['*'],
};
