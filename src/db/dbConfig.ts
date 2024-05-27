import { envVariables } from "@/config/config"
import mongoose from "mongoose"

export const Connect = async () => {
    try {
        const connection = await mongoose.connect(envVariables.mongoUri)
        if(connection) {
            const connection = mongoose.connection
            
            connection.on("connected", () => {
                console.log('database connected 🙂')
            })

            connection.on("error", (err) => {
                console.log("database connection error!" + err)
                process.exit()
            })
        }
    }
    catch(err: any) {
        console.error(err.message)        
    }
}