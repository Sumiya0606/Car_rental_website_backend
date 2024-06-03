import express from 'express'
import upload from '../middlewares/uploadMiddleware.js';
import authToken from '../middlewares/userMiddleware.js';
import { createCar, deleteCar, getCars, updateCar } from '../controlers/carController.js';
import { Updateuserasadmin,  deleteUserAcount, getAllUsers } from '../controlers/adminController.js';
import { addOffice, deleteOffice, getAllOffice, getOfficebylocation, updateOffice } from '../controlers/officeController.js';
const adminRouter=express.Router();

adminRouter.post("/add-cars", authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),upload.single("carPicture"), createCar);
adminRouter.get('/getcars',authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),getCars)
 adminRouter.patch("/updatecar/:id",authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),upload.single("carPicture"),updateCar)
 adminRouter.delete("/deletecar/:id",authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),deleteCar)

adminRouter.get("/getAllUsers",authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),getAllUsers)
adminRouter.post("/updateuserrole/:id",authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),Updateuserasadmin);
adminRouter.delete("/deleteuser/:id",authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),deleteUserAcount)


adminRouter.post("/addOfficeLocation",authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),addOffice);
adminRouter.get("/getAllOffices",authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),getAllOffice)
adminRouter.get("/getOfficebylocation/:city",authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),getOfficebylocation)
adminRouter.patch("/updateOffice/:id",authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),updateOffice)
adminRouter.delete("/deleteOffice/:id",authToken.isUserAuthenticated,authToken.authorizedRoles('admin'),deleteOffice)


export default adminRouter