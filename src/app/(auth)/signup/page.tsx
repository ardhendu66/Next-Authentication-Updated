"use client"
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
    const {data: session, status} = useSession();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showMessage, setShowMessage] = useState<null | string>(null);

    if(status === "authenticated") {
        router.push("/dashboard")
    }

    const handleOnSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(username !== "" && password !== "" && email !== "") {
            try {
                const res = await axios.post('/api/users/signup', {username, password, email})
                if(res) {
                    setShowMessage(res.data.message)
                    // await signIn('credentials', {
                    //     username, password,
                    //     redirect: false,
                    //     callbackUrl: '/dashboard',
                    // })
                }
                else {
                    setShowMessage("something went wrong")
                }
            }
            catch(err: any) {
                console.error(err)                
                setShowMessage(err.message)
            }
        }   
    }

    return (
        <div className="flex items-center justify-center w-[100vw] min-h-screen">
            <div 
                className="flex flex-col w-2/3 h-1/3 p-6 shadow-2xl rounded-md border-sky-400 border-t-4"
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
                    Email
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        placeholder="Enter your email" 
                        onChange={e => setEmail(e.target.value)}
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
                    onClick={e => handleOnSignUp(e)}
                > 
                    Sign up 
                </button>
                <br />
                <div 
                    className={`${!showMessage && "hidden"} p-2 text-white bg-green-600 rounded-md`}
                >{showMessage}</div>
            </div>
        </div>
    )
}