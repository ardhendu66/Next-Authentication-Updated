"use client"
import { useSession } from "next-auth/react"
import Link from "next/link";

export default function Dashboard() {
    const { data: session, status } = useSession();

    if(status === "loading") {
        <main className="w-[100vw] min-h-screen flex items-center justify-center">
            <div className="flex items-center justify-center w-52 h-48">
                Details are loading
            </div>
        </main>
    }
    else if(status === "authenticated") {
        return (
            <div>
                <h1>Username: {session?.user.username}</h1>
                <h2>Email: {session?.user.email}</h2>
            </div>
        )
    }

    return (
        <main className="w-[100vw] min-h-screen flex items-center justify-center">
            <div className="flex items-center justify-center w-52 h-48">
                <Link href={'/api/auth/signin'} className="p-2 bg-sky-600 text-white rounded-md">
                    Sign-in
                </Link>
            </div>
        </main>
    )
}