import express from 'express'

import { Signin, Signup, User_Logout, updateUser } from '../controlers/userController.js';
import authenticateUser from '../middlewares/userMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const userRouter=express.Router();
userRouter.post("/signup",Signup)
userRouter.post("/signin",Signin)
userRouter.get("/logout",authenticateUser,User_Logout)
userRouter.patch("/updateuser/:id",authenticateUser,upload.single("profilePicture"),updateUser)
export default userRouter