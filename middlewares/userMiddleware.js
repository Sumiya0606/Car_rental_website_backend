import dotenv from "dotenv";
import jwt from 'jsonwebtoken'
dotenv.config();

function authenticateUser(req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, process.env.SECRET_CODE, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;
    console.log(req.user.role);

    next();
  });
}

export default authenticateUser;