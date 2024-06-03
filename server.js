import cors from 'cors'
import express from 'express'
import dbConnect from './config/dbconfg.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import adminRouter from './routes/adminRoutes.js'


const app = express()
const port = 3000
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend origin
  credentials: true, // Allow credentials if needed
}));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/admin",adminRouter)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
dbConnect();


