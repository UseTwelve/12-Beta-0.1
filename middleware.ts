import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { nextUrl } = request;
  const googleUser = (token as any)?.gUser;  // Google authenticated user
  const regularUser = (token as any)?.user?.user;  // Regular authenticated user

  // Redirect to sign-in if no token is found
  if (!token && (nextUrl.pathname.startsWith("/admin") || nextUrl.pathname.startsWith("/client"))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Check for admin access
  if (nextUrl.pathname.startsWith("/admin")) {
    // If Google user, ensure they are an admin
    if (googleUser && googleUser.userType?.name !== "admin") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    // If regular user, ensure they are an admin
    if (regularUser && regularUser.userType?.name !== "admin") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // Check for client access
  if (nextUrl.pathname.startsWith("/client")) {
    // If Google user, ensure they are a client
    if (googleUser && googleUser.userType?.name !== "client") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
    // If regular user, ensure they are a client
    if (regularUser && regularUser.userType?.name !== "client") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/client/:path*"],
};
