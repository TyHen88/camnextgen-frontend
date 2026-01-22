import { NextResponse, type NextRequest } from 'next/server';

const isPublicRoute = (pathname: string) => {
  if (pathname === '/') {
    return true;
  }

  if (pathname.startsWith('/auth')) {
    return true;
  }

  return false;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.get('cnx_session')?.value;
  const role = request.cookies.get('cnx_role')?.value;

  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (role && role !== 'STUDENT') {
    const adminBase = process.env.NEXT_PUBLIC_ADMIN_BASE_URL;
    if (adminBase) {
      return NextResponse.redirect(new URL('/dashboard?access=denied', adminBase));
    }

    const url = request.nextUrl.clone();
    url.pathname = '/access-denied';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)']
};
