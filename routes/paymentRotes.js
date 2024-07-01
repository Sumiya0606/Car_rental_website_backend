import express from "express";
import {createRazorpayOrder,verifyRazorpayPayment} from '../controlers/paymentController'
const router = express.Router();

router.post("/create-order", createRazorpayOrder);
router.post("/verify-payment", verifyRazorpayPayment);

module.exports = router;
