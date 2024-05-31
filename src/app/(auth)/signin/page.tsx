"use client"
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {data: session, status} = useSession();
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if(status === "authenticated") {
            router.push("/dashboard")
        }
    }, [status, router, pathName])

    const signInWithCredentials = async (event: any) => {
        event.preventDefault();
        console.log(username, password)
        try {
            const res = await signIn('credentials', {
                username, password,
                redirect: false,
                callbackUrl: '/dashboard',
            })
            console.log("response1: ", res);
            if(res?.ok) {
                router.push('/dashboard')
            }
            else {
                console.error("Authentication error: ", res?.error)
            }
            console.log("response2: ", res)        
        }
        catch(err) {
            console.error("signIn Error: ", err)            
        }
    }

    return (
        <div className="flex items-center justify-center w-[100vw] min-h-screen">
            <form 
                className="flex flex-col w-2/3 h-1/3 p-6 shadow-2xl rounded-md border-sky-400 border-t-4"
                onSubmit={e => signInWithCredentials(e)}
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
                    type="submit"
                    className="bg-sky-600 text-white p-3 rounded-md font-semibold text-lg shadow-md"
                > 
                    Sign in 
                </button>
            </form>
        </div>
    )
}