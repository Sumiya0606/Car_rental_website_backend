import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
import UserModel from "../models/userModel.js";
dotenv.config();

const authToken = {


    
  isUserAuthenticated: async function(req, res, next){
      const {token} = req.cookies;
      // 1) Checking if cookie
      if(!token){
          return res.status(401).send(`Please login again.`)
      }
      // 2) Decoding user
      const decoded = jwt.verify(token, process.env.SECRET_CODE);
      console.log(decoded)
      console.log(decoded.data)

      // 3) Setting User
      req.user = await UserModel.findOne({email:decoded.data});
      console.log(req.user)
      // 5) Calling next
      next();
  },

  authorizedRoles: function(...roles){
      return (req, res, next) => {
        console.log("hit")
          if (!roles.includes(req.user.role)) {
              return res.send(`Role: ${req.user.role} is not allowed`, 403);
              // return res.send("not alowed")
          }
          next();
      }
  }
}
export default authToken;
