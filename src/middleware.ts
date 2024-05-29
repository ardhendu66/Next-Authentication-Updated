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
    
    if(token && 
        url.pathname.startsWith("/sign-in") ||
        url.pathname.startsWith("/register") || 
        url.pathname.startsWith("/verify") || 
        url.pathname.startsWith("/dashboard")
    )  
    {
        NextResponse.redirect(new URL('/dashboard', request.url))
    }
}

export const config = {
    matcher: [
        "/sign-in", 
        "/register", 
        "/dashboard/:path*",
        "/verify/:path*"
    ]
}