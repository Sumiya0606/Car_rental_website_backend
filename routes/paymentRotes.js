import express from "express";
import {createRazorpayOrder,verifyRazorpayPayment} from '../controlers/paymentController.js'
const router = express.Router();

router.post("/create-order", createRazorpayOrder);
router.post("/verify-payment", verifyRazorpayPayment);

export default router;
