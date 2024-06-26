import razorpayInstance from "../config/razorpay";
import Order from "../models/Order";
import Car from "../models/Car";

import OfficeLocation from "../models/OfficeLocation.js";
import UserModel from "../models/userModel";

// Controller to create Razorpay order and handle payment
exports.createRazorpayOrder = async (req, res) => {
    try {
        const { officeLocationId, carId, userId, totalPrice, pickedat, returnedat } = req.body;

        const car = await Car.findById(carId);
        const usr = await UserModel.findById(userId);
        const office = await OfficeLocation.findById(officeLocationId);

        if (!car || !usr || !office) {
            return res.status(400).json({ success: false, message: "Invalid data provided" });
        }

        // Create Razorpay order
        const options = {
            amount: totalPrice * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`,
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        if (!razorpayOrder) {
            return res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
        }

        // Create order in database
        const order = await Order.create({
            officeLocation: office._id,
            car: car._id,
            totalPrice: totalPrice,
            pickedAt: pickedat,
            returnedAt: returnedat,
            user: usr._id,
            razorpayOrderId: razorpayOrder.id,
            orderStatus: 'Processing',
        });

        car.order.push(order.id);
        await car.save();
        usr.order.push(order.id);
        await usr.save();

        res.status(201).json({
            success: true,
            order,
            razorpayOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Controller to verify Razorpay payment
exports.verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const crypto = require("crypto");

        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generated_signature = hmac.digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // Update order status in database
        const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.orderStatus = 'Completed';
        await order.save();

        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
