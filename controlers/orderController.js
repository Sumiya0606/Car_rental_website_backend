import Car from "../models/carModel.js";
import OfficeLocation from "../models/officelocationModel.js";
import Order from "../models/orderModel.js";
import UserModel from "../models/userModel.js";

export const OrderCreation = async(req, res) =>{
    const { officeLocationId, carId,userId, totalPrice,pickedat,returnedat } = req.body;

   

    const orderExist = await Order.findOne({ car: carId, officeLocation: officeLocationId });
    const car = await Car.findById(carId)
    const usr = await UserModel.findById(userId)
    const office = await OfficeLocation.findById(officeLocationId)

    if (orderExist && orderExist.orderStatus==='Processing') {
        return ("Order Already Placed", 400);
    }

    const order = await Order.create({
        officeLocation: office._id,
        car: car._id,
        
       
        totalPrice: totalPrice,
        pickedAt:pickedat,
        returnedAt: returnedat,

        user: usr._id,
    });

    car.order.push(order.id)
    await car.save()
    usr.order.push(order.id)
    await usr.save();

  
    res.status(201).json({
        success: true,
        order,
    });
}
export const getuserSingleOrder =  async(req, res, next) =>{
    const order = await Order.findById(req.params.id).populate("user", "firstName lastName email").populate("car").populate("officeLocation");
    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    console.log(order && !order.pickedAt)
    res.status(200).json({
        success: true,
        order,
    });
}
export const getuserAllOrders =  async(req, res, next) =>{
    console.log(req.user._id)
    const orders = await Order.find({ user: req.user._id  }).populate("user", "firstName lastName email").populate("car").populate("officeLocation").sort({createdAt: -1});

    if (!orders) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });
}
