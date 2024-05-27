import UserModel from '@/model/user.model'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import { envVariables } from '@/config/config'

export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)

        if(emailType === 'VERIFY') {
            await UserModel.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            })
        }
        else if(emailType === 'RESET') {
            await UserModel.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000,
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "9ebc4e57d54fe1",
              pass: "f038683b2a1bb5"
            }
        })

        const verifyBody = `<p>Click <a href="${envVariables.domainName}/verify-email?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy paste the link below in your browser. </br> ${envVariables.domainName}/verify-email?token=${hashedToken}</p>`

        const mailOptions = {
            from: "ardhenduroy600@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? "Verify email" : "Reset password",
            html: verifyBody
        }

        const mailResponse = await transport.sendMail(mailOptions)

        return mailResponse
    }
    catch(err: any) {
        throw new Error(err.message)        
    }
}