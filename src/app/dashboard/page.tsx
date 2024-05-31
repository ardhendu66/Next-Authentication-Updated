"use client"
import { useSession, signOut } from "next-auth/react"
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
                <br />
                <Link href={'/'} className="p-2 bg-sky-600 text-white rounded-md">
                    Go Home
                </Link>
                &nbsp;&nbsp;
                <button 
                    className="p-2 bg-sky-600 text-white rounded-md"
                    onClick={() => signOut()}
                >
                    Log out
                </button>
            </div>
        )
    }

    return (
        <main className="w-[100vw] min-h-screen flex items-center justify-center">
            <div className="flex items-center flex-col justify-center w-52 h-48 border shadow-xl rounded-md gap-2">
                <Link href={'/signin'} 
                    className="flex items-center justify-center p-2 bg-sky-600 text-white rounded-lg w-3/4 h-2/5 text-2xl font-medium shadow-md"
                >
                    Sign in
                </Link>
                <Link href={'/'} 
                    className="flex items-center justify-center p-2 bg-sky-600 text-white rounded-lg w-3/4 h-2/5 text-2xl font-medium shadow-md"
                >
                    Go Home
                </Link>
            </div>
        </main>
    )
}