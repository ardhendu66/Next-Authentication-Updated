import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Connect } from '@/db/dbConfig';
import UserModel from "@/model/userModel";
import { envVariables } from '@/config/config';
import axios from "axios";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text", placeholder: "Enter username"},
                password: {label: "Password", type: "password", placeholder: "Enter password"},
            },
            async authorize(credentials): Promise<any> {
                console.log("cred ", credentials);
                
                await Connect()
                try {
                    // const user = await UserModel.findOne({$or: [
                    //     {email: credentials?.email}, {username: credentials?.username}
                    // ]})
                    const user = await UserModel.findOne({username: credentials?.username})
                    if(!user) {
                        throw new Error("No user found with this username")
                    }
                    if(!user.isVerified) {
                        throw new Error("Verify your account before login")
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                        <string>credentials?.password, user.password
                    )

                    if(isPasswordCorrect) {
                        return user;
                    }
                    else {
                        throw new Error('Incorrect password')
                    }
                }
                catch(err: any) {
                    throw new Error(err)
                }
            }
        })
    ],
    // pages: {
    //     signIn: '/signin',
    // },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
        updateAge: 60 * 60,
    },
    secret: envVariables.secretToken as string,
    callbacks: {
        async session({session, token}) {
            if(token) {
                session.user._id = token._id?.toString()
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessages = token.isAcceptingMessages
                session.user.username = token.username
            }
            return session;
        },
        async jwt({token, user}) {
            if(user) {
                token._id = user._id?.toString()
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages
                token.username = user.username
            }
            return token;
        },
    }
}