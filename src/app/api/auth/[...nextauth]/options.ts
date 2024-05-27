import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { Connect } from "../../../../db/dbConfig"
import UserModel from "../../../../model/user.model";
import { envVariables } from "../../../../config/config"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email", placeholder: "Enter email-id"},
                password: {label: "Password", type: "password", placeholder: "Enter password"},
            },
            async authorize(credentials: any): Promise<any> {
                await Connect()
                try {
                    const user = await UserModel.findOne({$or: [
                        {email: credentials.identifier}, {username: credentials.identifier}
                    ]})
                    if(!user) {
                        throw new Error("No user found with thid email")
                    }
                    if(!user.isVerified) {
                        throw new Error("Verify your account before login")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

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
    pages: {
        signIn: '/register'
    },
    session: {
        strategy: "jwt",
    },
    secret: envVariables.secretToken as string,
    callbacks: {
        async session({session, token}) {
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
        }
    }
}