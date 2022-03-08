// const router = require("express").Router();
// const User = require("../models/user");
// const Property = require("../models/property");
// const Transaction = require("../models/transaction");

// const requireLogin = (req, res, next) => {
//   console.log("hello");
//   const { authorization } = req.headers;
//   if (!authorization) {
//     return res.status(401).json({ error: "You must be logged in" });
//   }
//   try {
//     const { userId } = jwt.verify(authorization, JWT_SECRET);
//     req.user = userId;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: err }); //"You must be logged in"
//   }
// };

// router.put("/updatePaymentStatus/:_id", requireLogin, async (req, res, err) => {
//   const { orderId, paymentVerified, buildingType, price } = req.body;
//   console.log("hello buddy", req.body);
//   // try {
//   if (!orderId || !paymentVerified || !buildingType || !price) {
//     return res.status(422).json({ error: "Please add all the fields" });
//   }
//   const result = await new Transaction({
//     orderId,
//     userId: req.user,
//     paymentVerified,
//     buildingType,
//     price,
//   }).save();
//   const update = {
//     $set: {
//       paymentVerified: "paid",
//       transactionId,
//     },
//   };
//   const transactionId = result[0]?._id;
//   await Property.findByIdAndUpdate(
//     { _id: req.params._id },
//     update,
//     (err, data) => {
//       if (!err) {
//         return res.status(200).json({ data: data, message: "success" });
//       } else {
//         return res.status(500).json({ message: err });
//       }
//     }
//   );

//   // console.log("result", result);
//   // res.status(200).json({ message: "success", result: result });
//   // } catch (err) {
//   //   return res.status(500).json({ error: err });
//   // }

//   // try {

//   // } catch (error) {
//   //   return res.status(500).json({ message: err });
//   // }
// });

// module.exports = router;
