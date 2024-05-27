import Connect from "@/db/db.config";
import UserModel from "@/model/user.model";
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'

Connect()

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json()
        console.log(token)        
    }
    catch(err: any) {
        return NextResponse.json({error: err.message}, {status: 500})
    }
}