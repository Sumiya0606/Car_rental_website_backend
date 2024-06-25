import express from 'express'
import upload from '../middlewares/uploadMiddleware.js';
import authToken from '../middlewares/userMiddleware.js';
import { createCar, deleteCar, getCars, getcarbyid, updateCar } from '../controlers/carController.js';
import { Updateuserasadmin,  deleteUserAcount, getAllUsers } from '../controlers/adminController.js';
import { addOffice, deleteOffice, getAllOffice, getOfficebylocation, getofficebyid, updateOffice } from '../controlers/officeController.js';
import { getuserAllOrders } from '../controlers/orderController.js';
const adminRouter=express.Router();

adminRouter.post("/add-cars",upload.single("carPicture"),  createCar);
adminRouter.patch("/updatecar/:id",updateCar)
adminRouter.delete("/deletecar/:id",deleteCar)
adminRouter.get('/getcars',getCars)
adminRouter.get('/getcarbyid/:id',getcarbyid)

adminRouter.get("/getAllUsers",getAllUsers)
adminRouter.post("/updateuserrole/:id",Updateuserasadmin);
adminRouter.delete("/deleteuser/:id",deleteUserAcount)
adminRouter.get("/getorder/:id",getuserAllOrders)


adminRouter.post("/addOfficeLocation",addOffice);
adminRouter.get("/getAllOffices",getAllOffice)
adminRouter.get("/getooficebyid/:id",getofficebyid)

adminRouter.patch("/updateOffice/:id",updateOffice)
adminRouter.delete("/deleteOffice/:id",deleteOffice)
// authToken.isUserAuthenticated,authToken.authorizedRoles('admin')

export default adminRouter