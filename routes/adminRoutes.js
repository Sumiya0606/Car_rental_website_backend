import express from 'express'
import upload from '../middlewares/uploadMiddleware.js';

import { createCar, deleteCar, getCars, updateCar } from '../controlers/carController.js';
import { carRental_Admin_Delete_User_Account, carRental_Admin_User_Role_Update, getAllUsers } from '../controlers/adminController.js';
import { addOffice, deleteOffice, getAllOffice, getOfficebylocation, updateOffice } from '../controlers/officeController.js';
const adminRouter=express.Router();

adminRouter.post("/add-cars", upload.single("carPicture"), createCar);
adminRouter.get('/getcars',getCars)
 adminRouter.patch("/updatecar/:id",upload.single("carPicture"),updateCar)
 adminRouter.delete("/deletecar/:id",deleteCar)

adminRouter.get("/getAllUsers",getAllUsers)
adminRouter.post("/updateuserrole/:id",carRental_Admin_User_Role_Update);
adminRouter.delete("/deleteuser/:id",carRental_Admin_Delete_User_Account)


adminRouter.post("/addOfficeLocation",addOffice);
adminRouter.get("/getAllOffices",getAllOffice)
adminRouter.get("/getOfficebylocation/:city",getOfficebylocation)
adminRouter.patch("/updateOffice/:id",updateOffice)
adminRouter.delete("/deleteOffice/:id",deleteOffice)


export default adminRouter