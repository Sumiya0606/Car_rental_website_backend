import cors from 'cors'
import express from 'express'
import dbConnect from './config/dbconfg.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import adminRouter from './routes/adminRoutes.js'
import paymentRouter from './route/paymentRotes.js'





const app = express()
const port = 3000
const allowedOrigins = [
  'https://car-rental-website-frontend-roan.vercel.app',

];
app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
})); 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cookieParser())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
dbConnect();


