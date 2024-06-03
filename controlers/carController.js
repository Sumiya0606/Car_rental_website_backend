import Car from "../models/carModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js";
import OfficeLocation from "../models/officelocationModel.js";
export const createCar = async (req, res) => {
    try {
      console.log("hitted");
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
  
        const {carName, carModel, carCompany, carPicture, carCategory,carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge,officeemail } = body;
          
        const findlocation = await OfficeLocation.findOne({ email: officeemail });

        if (!findlocation) {
          return res.send("please add instructor first");
        }
  
        const createCar = new Car({
            carName, carModel, carCompany, carPicture:imageUrl, carCategory,
            carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge,office: findlocation._id
        });
        
        
        const newCarCreated = await createCar.save();
        if (!newCarCreated) {
          return res.send("car is not created");
        }
        return res.send(newCarCreated);
      });
    } catch (error) {
      console.log("something went wrong", error);
      res.send("failed to create course");
    }
  };
  //get all cars
  export const getCars = async (req, res) => {
    const cars = await Car.find();
    res.send(cars);
  };
  //update 
  
export const updateCar = async (req, res) => {
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
  const {carName, carModel, carCompany,carCategory,carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge}=req.body;
 const carPicture=imageUrl
 console.log(carPicture)
    const updatedCar = await Car.findOneAndUpdate(
      { _id: id },
      { carName, carModel, carCompany,carPicture:imageUrl, carCategory,carEngine,carMileage, carSeatCapacity, carFuelType,rentalPriceCharge },
      {
        new: true,
      }
    );
  
    if (!updatedCar) {
      return res.send("Car is not updated");
    }
    console.log(updatedCar);
    return res.send(updatedCar);
 })
  };
  //delete

  export const deleteCar = async (req, res) => {
    const id = req.params.id;
    console.log("hitted")
    const deleteId = await Car.deleteOne({ _id: id });
    if (!deleteId) {
      return res.send("not deleted");
    }
    res.send("deleted car");
  };
