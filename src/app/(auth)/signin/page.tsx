"use client"
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
    const {data: session, status} = useSession();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // useEffect(() => {
    //     console.log("render")        
    // }, [session])

    // useEffect(() => {
    //     if(status === "authenticated") {
    //         router.push("/dashboard")
    //     }
    // }, [status, router])

    if(status === "authenticated") {
        router.push("/dashboard")
    }

    async function signInWithCredentials(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log(username, password)
        try {
            const res = await signIn('credentials', {
                username, password,
                redirect: false,
                callbackUrl: '/dashboard',
            })
            if(res?.ok) {
                router.push('/dashboard')
            }
            else {
                console.error("Authentication error: ", res?.error)
            }
            console.log(res)        
        }
        catch(err) {
            console.error("signIn Error: ", err)            
        }
    }

    return (
        <div className="flex items-center justify-center w-[100vw] min-h-screen">
            <div 
                className="flex flex-col w-2/3 h-1/3 p-6 shadow-2xl rounded-md border-sky-400 border-t-4"
                // onSubmit={signInWithCredentials}
            >
                <label className="flex flex-col">
                    Username
                    <input 
                        type="text" 
                        id="username"
                        name="username"
                        placeholder="Enter your username" 
                        onChange={e => setUsername(e.target.value)}
                        className="mt-1 p-2 border-[1.5px] border-gray-300 rounded-sm outline-none font-semibold placeholder:font-normal"
                    />
                </label>
                <br />
                <label className="flex flex-col">
                    Password
                    <input 
                        type="password" 
                        id="password"
                        name="password"
                        placeholder="Enter password" 
                        onChange={e => setPassword(e.target.value)}
                        className="mt-1 p-2 border-[1.5px] border-gray-300 rounded-sm outline-none font-semibold placeholder:font-normal"
                    />
                </label>
                <br />
                <button 
                    type="button"
                    className="bg-sky-600 text-white p-3 rounded-md font-semibold text-lg shadow-md"
                    onClick={signInWithCredentials}
                > 
                    Sign in 
                </button>
            </div>
        </div>
    )
}