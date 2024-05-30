import { Connect } from "@/db/dbConfig";
import UserModel from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcryptjs'
import { sendEmail } from "@/utils/mailer";

Connect()

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { username, email, password } = await req.json();

        // check user by username
        const existingUserByVerifiedUsername = await UserModel.findOne({
            username, isVerified: true
        })
        if(existingUserByVerifiedUsername) {
            return NextResponse.json({status: 400, message: "Username already exists"})
        }

        // check user by email
        const user = await UserModel.findOne({email})
        const verifyCode = Math.floor(Math.random()*100000 + 100000)
        if(user) {
            if(user.isVerified) {
                return NextResponse.json({
                    status: 400, success: false, message: "User already exists with the email"
                })
            }
            else {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)
                const expiryDate = new Date()
                expiryDate.setHours(expiryDate.getHours() + 1)
                await UserModel.findByIdAndUpdate(user._id, {
                    password: hashedPassword, isVerified: true, verifyToken: verifyCode,
                    verifyTokenExpiry: expiryDate
                })
                return NextResponse.json({
                    status: 400, success: true, message: "User has been verified"
                })
            }
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1)
        const newUser = await UserModel.create({
            username, email, password: hashedPassword, verifyToken: verifyCode, 
            verifyTokenExpiry: expiryDate, isAcceptingMessages: true, messages: [] 
        })

        // send verification mail
        // await sendEmail({email, emailType: 'VERIFY', userId: newUser._id})

        return NextResponse.json({message: "User registered successfully", status: 201, newUser})
    }
    catch(err: any) {
        return NextResponse.json({errorMessage: err.message, status: 500})
    }
}