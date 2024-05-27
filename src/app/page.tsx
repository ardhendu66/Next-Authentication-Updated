'use client'
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();

    if(!session) {
        return (
            <div>
                <h1> Not Verified </h1>
                <button 
                  className="bg-white text-black p-2 m-4 rounded-md" 
                  onClick={() => signIn()}
                >Sign-in</button>
            </div>
        )
    }

    return (
        <main>
            <div>Signed in as: {session.user.email}</div><br /><br />
            <button 
              className="bg-white text-black p-2 m-4 rounded-md"
              onClick={() => signOut()}
            >Sign-Out</button>
        </main>
    )
}