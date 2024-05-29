"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { data: session } = useSession();
    const router = useRouter();

    if(!session) {
        router.push("/");
        return;
    }

    return (
        <div>
            <h1>Username: {session?.user.username}</h1>
            <h2>Email: {session?.user.email}</h2>
        </div>
    )
}