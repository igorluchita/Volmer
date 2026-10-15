import {NextResponse, type NextRequest} from 'next/server';

const retiredPricePaths = /^\/(?:ro|ru)\/preturi\/?$/;
const filePath = /(?:^|\/)[^/]+\.[^/]+\/?$/;

export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;

  if (retiredPricePaths.test(pathname) || pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  if (pathname === '/.well-known' || pathname.startsWith('/.well-known/')) {
    return NextResponse.next();
  }

  if (filePath.test(pathname)) {
    return pathname.endsWith('/')
      ? NextResponse.redirect(new URL(pathname.slice(0, -1), request.url), 308)
      : NextResponse.next();
  }

  if (!pathname.endsWith('/')) {
    return NextResponse.redirect(new URL(`${pathname}/`, request.url), 308);
  }

  return NextResponse.next();
}
