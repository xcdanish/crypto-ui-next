// const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");
// const UserModel = require("../models/userModel");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     // console.log("🚀 token:", token);
//     let decoded = jwt.verify(token, process.env.JWT_KEY);
//     req.userData = decoded;
//     const { id } = decoded;
//     const userData = await UserModel.findOne({ _id: id });
//     if (userData === null || userData.flag != 1) {
//       return res.status(401).json({
//         message: "Auth Fail",
//       });
//     }
//     req.userData = userData;
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       message: "Auth Failed",
//     });
//   }
// };
