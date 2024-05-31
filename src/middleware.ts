import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export { default } from 'next-auth/middleware';

export async function middleware(request: NextRequest) {
    const token = await getToken({req: request})
    const url = request.nextUrl

    if(!token) {
        NextResponse.redirect(new URL('/', request.url))
    }

    if(token && (url.pathname.startsWith("/signup"))
        || url.pathname.startsWith("/dashboard")
        || url.pathname.startsWith("/signin")
    )
    {
        NextResponse.redirect(new URL('/dashboard', request.url))
    }
}

export const config = {
    matcher: [
        "/signin", 
        "/signup", 
        "/dashboard/:path*",
        "/verify/:path*"
    ]
}