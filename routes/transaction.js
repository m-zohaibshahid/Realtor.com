// const router = require("express").Router();
// const Transaction = require("../models/transaction");
// const requireLogin = require("../middleware/requireLogin");

// router.post("/payment/checkout", requireLogin, async (req, res) => {
//   const { orderId, userId, paymentVerified, buildingType } = req.body;
//   console.log("hello buddy", req.body);
//   try {
//     if (!orderId || !userId || !paymentVerified || !buildingType) {
//       return res.status(422).json({ error: "Please add all the fields" });
//     }
//     const result = await new Transaction({
//       orderId,
//       userId,
//       paymentVerified,
//       buildingType,
//     }).save();
//     res.status(200).json({ message: "success", result: result });
//     console.log("result", result);
//   } catch (err) {
//     return res.status(500).json({ error: err });
//   }
// });

// module.exports = router;
