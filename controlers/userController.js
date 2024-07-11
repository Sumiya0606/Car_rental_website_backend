import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateTokens.js';
import { cloudinaryInstance } from "../config/cloudinary.js";

//users signup
export const Signup=async(req,res)=>{
    

try{    const {firstName,lastName,email,password}=req.body;
console.log(req.body)
    const userExist=await UserModel.findOne({email})
    if(userExist)
    {
       return  res.send("user already exist")
    }
    const saltrounds=10;
    const hashPassword=await bcrypt.hash(password,saltrounds);
    const newUser=new UserModel({
        firstName,
        lastName,
        email,hashPassword
    })
    console.log(newUser)
    const newUserCreated=await newUser.save();
    if(!newUserCreated){
      return  res.send("User not created");
    }
    console.log(newUserCreated)
    const token=generateToken(email)
    res.cookie("token",token)
  return res.json({ 
    message: "signed in successfully", 
    token, 
    firstName: newUserCreated.firstName,
    id:newUserCreated._id 
  })
}
catch (error) {
    console.log(error, "Something wrong");
    res.status(500).send("Internal Server Error");
  }
}


//signin
export const Signin=async(req,res)=>{
try{
  const {email,password}=req.body;
  const userExist=await UserModel.findOne({email});
  if(!userExist){
    return res.send("user not exist");
    }
  const matchpassword=await bcrypt.compare(password,userExist.hashPassword);
  if(!matchpassword)
  return res.send("Password incorrect")
  const token=generateToken(email)
  res.cookie("token",token)
  return res.json({ 
    message: "Logged in successfully", 
    token, 
    id:userExist._id,
    firstName: userExist.firstName ,
    role:userExist.role
  })
 
  


}
catch(error){
  console.log("error",error)
}


}

//logout
export const User_Logout =async (req, res, next) => {

  // Removing the cookie 
  console.log("hit")
  res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
  })
  // Sending response
  res.status(200).json({
      success: true,
      message: `You are now logged out.`
  })
}
//user profile upadte

export const updateUser = async (req, res) => {
  const id = req.params.id
console.log("hitt")
console.log(id)
if(!req.file) {
  return res.send("file is not visible")
  }
  cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
    if (err) {
      console.log(err, "error");
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }
  
    
    const imageUrl = result.url;
    const body = req.body;
    console.log(imageUrl)
    console.log(body, "body");
const { address,city,state,country,pin,countryCode,contactNumber}=req.body;
const profilePicture=imageUrl
console.log(profilePicture)
  const updateduser = await UserModel.findOneAndUpdate(
    { _id: id },
    { address,city,state,country,pin,countryCode,contactNumber,profilePicture },
    {
      new: true,
    }
  );

  if (!updateduser) {
    return res.send("USer is not updated");
  }
  console.log(updateduser);
  return res.send(updateduser);
})
};