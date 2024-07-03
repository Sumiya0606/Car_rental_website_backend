
import Razorpay from 'razorpay'
const razorpayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

module.exports = razorpayInstance;
