const router = require("express").Router();
const Property = require("../models/property");
const User = require("../models/user");

router.post("/admin/search", async (req, res) => {
  const { address } = req.body;
  console.log("addressss", address);

  const emailExist = address?.includes("@");

  try {
    let user;
    if (emailExist) {
      user = await User.findOne({ email: address });
    } else {
      var regexAddress = new RegExp(address, "i");
    }
    console.log("user=================>", user);

    const result = await Property.find({
      $or: [{ location: regexAddress }, { propertyBy: user?._id }],
    }).populate("propertyBy", "fname lname email");
    console.log("result=================>", result);
    if (result == []) {
      res.status(400).json({ message: "property not found" });
    } else {
      res.status(200).json({ message: "result found", result });
    }
  } catch (err) {
    res.status(400).json({ message: "property not found" });
    console.log(err);
  }
});

// router.post("/search", async (req, res) => {
//   const { city, buildingType, startPrice, endPrice } = req.body;
//   console.log(city, buildingType, startPrice, endPrice);

//   try {
//     const result = await Property.find({
//       $or: [
//         { priceOfProperty: { $gte: startPrice, $lt: endPrice } },
//         { buildingType },
//         { city },
//       ],
//     });
//     if (result == []) {
//       res.status(400).json({ message: "property not found" });
//     } else {
//       res.status(200).json({ message: "result found", result });
//     }
//   } catch (err) {
//     res.status(400).json({ message: "property not found" });
//     console.log(err);
//   }
// });

router.post("/search/property", async (req, res) => {
  const { city, houseType, startPrice, endPrice } = req.body;
  console.log(city, houseType, startPrice, endPrice);
  var regexCity = new RegExp(city, "i");
  var regexCommunity = new RegExp(city, "i");
  console.log("response", req.body);

  let capitalizeHouseType;
  let capitalizeCommunity;
  city !== "" ? (capitalizeHouseType = capitalizeFirstLetter(city)) : "";
  function capitalizeFirstLetter(name) {
    return name.replace(/^./, name[0].toUpperCase());
  }
  city !== ""
    ? (capitalizeCommunity = capitalizeCommunityFirstLetter(city))
    : "";
  function capitalizeCommunityFirstLetter(name) {
    return name.replace(/^./, name[0].toUpperCase());
  }
  // var regexHouseType = new RegExp(houseType, "i");
  // console.log("regexCity", regexCity);
  // console.log("regexHouseType", regexHouseType);
  console.log("city concwer=============>", capitalizeHouseType);
  try {
    const result = await Property.find({
      $or: [
        { priceOfProperty: { $gte: startPrice, $lt: endPrice } },
        { houseType },
        {
          city: capitalizeHouseType === undefined ? "" : capitalizeHouseType,
        },
        {
          community: regexCity,
        },
      ],
      $and: [{ propertyStatus: "approved" }],
    });
    if (result == []) {
      res.status(400).json({ message: "property not found" });
    } else {
      res.status(200).json({ message: "result found", result });
    }
  } catch (err) {
    res.status(400).json({ message: "property not found" });
    console.log(err);
  }
});
module.exports = router;

// { priceOfProperty: { $in: [startPrice, endPrice] } }
//   { $set: { sale: true } }
