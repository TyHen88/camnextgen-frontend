import { NextResponse, type NextRequest } from 'next/server';

const isPublicRoute = (pathname: string) => {
  if (pathname === '/') return true;
  if (pathname.startsWith('/auth')) return true;
  if (pathname.startsWith('/admin/auth')) return true;
  return false;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.get('cnx_session')?.value;
  const role = request.cookies.get('cnx_role')?.value;

  if (!hasSession) {
    const url = request.nextUrl.clone();
    if (pathname.startsWith('/admin')) {
      url.pathname = '/admin/auth/login';
    } else {
      url.pathname = '/auth/login';
    }
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Admin access control
  if (pathname.startsWith('/admin')) {
    if (role !== 'ADMIN') {
      const url = request.nextUrl.clone();
      url.pathname = '/home';
      url.searchParams.set('access', 'denied');
      return NextResponse.redirect(url);
    }
  } else {
    // Student access control
    if (role && role !== 'STUDENT' && role !== 'ADMIN') {
        const url = request.nextUrl.clone();
        url.pathname = '/access-denied';
        return NextResponse.redirect(url);
    }
    // Allow ADMIN to see student pages too? 
    // The original student middleware blocked non-STUDENT users.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
