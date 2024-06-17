import cors from 'cors'
import express from 'express'
import dbConnect from './config/dbconfg.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import adminRouter from './routes/adminRoutes.js'


const corsOptions = {
  origin: [ 'https://master--quiet-granita-d62216.netlify.app'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));app = express()
const port = 3000

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


