'use client'
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
    const { data: session } = useSession();

    if(!session) {
        return (
            <div>
                <h1> Not Verified </h1>
                <br />
                <Link 
                    href={'/api/auth/signin'}
                    className="p-3 m-2 rounded-lg bg-sky-700 text-white" 
                >   Sign in  </Link>
            </div>
        )
    }

    return (
        <main>
            <div>Signed in as: {session.user.email}</div>
            <br />
            <button 
              className="p-2 m-4 rounded-md bg-sky-700 text-white"
              onClick={() => signOut()}
            >Sign-Out</button>
            <br />
            <Link 
                href={'/dashboard'} 
                className="p-2 m-4 rounded-md bg-sky-700 text-white"
            >Dashboard</Link>
        </main>
    )
}