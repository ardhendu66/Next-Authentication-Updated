import mongoose, { Schema, Document } from "mongoose"

export interface Message extends Document {
    content: string,
    createdAt: Date,
}

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    }
})

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    isVerified: boolean,
    isAdmin: boolean,
    forgotPasswordToken: string,
    forgotPasswordExpiry: Date,
    verifyToken: string,
    verifyTokenExpiry: Date,
    isAcceptingMessages: boolean,
    messages: Message[],
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiry: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: {
        type: [messageSchema]
    }
})

const UserModel = mongoose.models?.User || mongoose.model("User", userSchema)


export default UserModel;