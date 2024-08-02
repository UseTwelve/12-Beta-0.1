import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: any) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  const { nextUrl } = request;


  if (nextUrl.pathname.startsWith("/admin") && token?.user.user?.userType?.name !== "admin") {
    return NextResponse.redirect(
      new URL("/signin?error=You Are Not Authorized!", request.url)
    );
  }
  if (nextUrl.pathname.startsWith("/client") && token?.user.user?.userType?.name !== "client") {
    return NextResponse.redirect(
      new URL("/signin?error=You Are Not Authorized!", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*","/client/:path*"],
};
