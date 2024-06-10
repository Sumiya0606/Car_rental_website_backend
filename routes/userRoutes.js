import express from 'express'

import { Signin, Signup, User_Logout, updateUser } from '../controlers/userController.js';
import authToken from '../middlewares/userMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
import { OrderCreation, getuserAllOrders, getuserSingleOrder } from '../controlers/orderController.js';
import { getCars } from '../controlers/carController.js';
import { getAllOffice, getOfficebylocation } from '../controlers/officeController.js';

const userRouter=express.Router();
userRouter.post("/signup",Signup)
userRouter.post("/signin",Signin)
userRouter.get('/getcars',getCars)
userRouter.get("/getOfficebylocation/:city",getOfficebylocation)
userRouter.get("/getAllOffices",getAllOffice)
userRouter.get("/logout",authToken.isUserAuthenticated,User_Logout)
userRouter.patch("/updateuser/:id",authToken.isUserAuthenticated,upload.single("profilePicture"),updateUser)
userRouter.post("/createorder",authToken.isUserAuthenticated,OrderCreation)
userRouter.get("/getorderbyid/:id",authToken.isUserAuthenticated,getuserSingleOrder)
userRouter.get("/getorder",authToken.isUserAuthenticated,getuserAllOrders)
export default userRouter