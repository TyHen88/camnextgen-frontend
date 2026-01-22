import { NextResponse, type NextRequest } from 'next/server';

const isPublicRoute = (pathname: string) => {
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

  if (role && role !== 'ADMIN') {
    const studentBase = process.env.NEXT_PUBLIC_STUDENT_BASE_URL;
    if (studentBase) {
      return NextResponse.redirect(new URL('/home?access=denied', studentBase));
    }

    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    url.searchParams.set('access', 'denied');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)']
};
