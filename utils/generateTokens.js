import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const generateToken=(email)=>{
    return jwt.sign({data:email},process.env.SECRET_CODE,{expiresIn :"1d"});
}
export default generateToken;  