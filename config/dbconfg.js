import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const dbConnect=async()=>{
try{
   
        await mongoose.connect(process.env.DB_URL)
        console.log("Db connected")

    }


catch(error){
    console.log("error",error);
}
}
export default dbConnect;