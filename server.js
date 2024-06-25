import cors from 'cors'
import express from 'express'
import dbConnect from './config/dbconfg.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import adminRouter from './routes/adminRoutes.js'


const corsOptions = {
  origin:  'http://localhost:5173',
  credentials: true
};


const app = express()
const port = 3000
app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 
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


