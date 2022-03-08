const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { encrypt, decrypt } = require("./crypto");
const PORT = process.env.PORT || 5000;
// const http = require("http");
// const { Server } = require("socket.io");
const newsletter = require("./routes/newsletter");
const search = require("./routes/search");
const chatRoute = require("./routes/chat");
const AdminRoute = require("./routes/admin");
const payment = require("./routes/payment");
const BlogRoute = require("./routes/blog");
const TransactionRoute = require("./routes/transaction");
const ContactRoute = require("./routes/contact");
const SubscriptionRoute = require("./routes/subscription");

// Importing models
const User = require("./models/user");
const Admin = require("./models/admin");
const Property = require("./models/property");
const Room = require("./models/room");
const Message = require("./models/message");
const Transaction = require("./models/transaction");

const {
  MONGO_URL,
  JWT_SECRET,
  APP_URL,
  MAIL_USERNAME,
  MAIL_PASSWORD,
} = require("./config/keys");
const router = express.Router;

const app = express();
app.use("/uploads", express.static("uploads"));

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", (err) => {
  if (!err) {
    console.log("DB connected Successfully");
  } else {
    console.log(err, "error in connecting db");
  }
});
app.use(cors());
app.use(express.json());

// Multer configurations
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

var uploadMultiple = upload.fields([
  { name: "images", maxCount: 25 },
  { name: "ownershipDoc", maxCount: 1 },
  { name: "driverLicence", maxCount: 1 },
]);

// authentication middleware
const requireLogin = (req, res, next) => {
  console.log("hello");
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  try {
    const { userId } = jwt.verify(authorization, JWT_SECRET);
    req.user = userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: err }); //"You must be logged in"
  }
};

app.get("/", async (req, res) => {
  res.send("hello world");
});

// total records api for dashboard
app.get("/api/total/records", requireLogin, async (req, res) => {
  console.log("user id", req.user);
  try {
    const user = await User.find().count();
    const rent = await Property.find({ buildingType: "Rent" }).count();
    const sale = await Property.find({ buildingType: "Sale" }).count();
    console.log("User", user);

    const result = {
      status: true,
      users: {
        total: user,
      },
      property: {
        rents: {
          total: rent,
        },
        sales: {
          total: sale,
        },
      },
    };

    res.json(result);
  } catch (err) {
    res.json({ error });
  }
});

// me for admin
app.get("/me", requireLogin, async (req, res) => {
  console.log("user id", req.user);
  try {
    const user = await Admin.findById({ _id: req.user }).select(
      "-password -updatedAt -__v"
    );
    console.log("User", user);
    if (!user) {
      return res.status(404).json({ message: "404 not found" });
    }

    res.json(user);
  } catch (err) {
    res.json({ error: err });
  }
});

// me for users
app.get("/api/user/me", requireLogin, async (req, res) => {
  console.log("user id", req.user);
  try {
    const user = await User.findById({ _id: req.user }).select(
      "-password -updatedAt -__v"
    );
    console.log("User", user);
    if (!user) {
      return res.status(404).json({ message: "404 not found" });
    }

    res.json(user);
  } catch (err) {
    res.json({ error: err });
  }
});

// Signup Post Method
app.post("/getUserData", requireLogin, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user });
    if (user) {
      return res.status(200).json({ user });
    } else {
      console.log("user not found");
      res.status(200).json({ error: "user not found" });
    }
  } catch (err) {
    console.log(err);
    console.log("user not found");
    res.status(200).json({ error: "user not found" });
  }
});

// Signup Post Method
app.post("/signup", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  console.log(fname, lname, email, password);
  try {
    if (!email || !password || !fname || !lname) {
      return res.json({ error: "Please add all the fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ error: "email already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      //   profileImage,
    }).save();
    res
      .status(200)
      .json({ message: "signup successfull! redirecting to login..." });
  } catch (err) {
    console.log(err);
  }
});

// login Api using post method
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ error: "email doesn't exist" });
    }
    const doMatch = await bcrypt.compare(password, user.password);
    // console.log(doMatch);
    if (doMatch) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      res.status(201).json({ token, user });
      // console.log("doMatch", doMatch);
    } else {
      console.log("doMatch1", doMatch);

      return res.status(401).json({ error: "email or password is wrong" });
    }
  } catch (err) {
    console.log(err);
  }
});

//------------------------------------Create Property-------------------------------

app.post(
  "/createProperty",
  requireLogin,
  uploadMultiple,
  async (req, res, next) => {
    req.body;
    console.log("req.body", req.body.roomDimension[0]);

    const {
      des,
      priceOfProperty,
      location,
      city,
      community,
      dateForRent,
      yearBuild,
      parkingSpots,
      bedrooms,
      floors,
      bathrooms,
      houseType,
      viewType,
      frontType,
      siteAmenities,
      constructionMaterial,
      homeAmenities,
      roomAmenities,
      kitchenAmenities,
      bathAmenities,
      flooring,
      buildingType,
      squareFeet,
      heatingType,
      basement,
      coolingType,
      heatingFuel,
      waterType,
      houseTiming,
      roomDimension,
      firePlaces,
      roofingType,
      neighbouringAmenities,
      exteriorConstruction,
      propertyTax,
      propertyTaxYear,
      firePlacesFuel,
      associationPOTLFee,
      assessmentAmount,
      assessmentYear,
      appliances,
      sewerType,
    } = req.body;
    // console.log("form data", req.body);
    console.log("console.on f", req.body);
    // console.table("dfsdfasdf", req.body);

    const room = JSON.parse(roomDimension);
    const timing = JSON.parse(houseTiming);
    const bath = JSON.parse(bathAmenities);
    const kitchen = JSON.parse(kitchenAmenities);
    const home = JSON.parse(homeAmenities);
    const rooms = JSON.parse(roomAmenities);
    const floorings = JSON.parse(flooring);
    const exterior = JSON.parse(exteriorConstruction);
    const neighbouringAmenitiess = JSON.parse(neighbouringAmenities);
    const constructionMaterials = JSON.parse(constructionMaterial);
    const site = JSON.parse(siteAmenities);
    const basements = JSON.parse(basement);
    const appliance = JSON.parse(appliances);
    let buildingT, driverL;
    if (req.files?.ownershipDoc || req.files?.driverLicence) {
      buildingT = req.files?.ownershipDoc;
      driverL = req.files?.driverLicence;
    } else {
      buildingT = "NA";
      driverL = "NA";
    }
    try {
      const data = await new Property({
        images: req.files.images,
        des,
        priceOfProperty,
        location,
        city,
        community,
        dateForRent,
        yearBuild,
        parkingSpots,
        bedrooms,
        floors,
        bathrooms,
        houseType,
        viewType,
        frontType,
        siteAmenities: site,
        constructionMaterial: constructionMaterials,
        homeAmenities: home,
        roomAmenities: rooms,
        kitchenAmenities: kitchen,
        bathAmenities: bath,
        flooring: floorings,
        ownershipDoc: buildingT,
        driverLicence: driverL,
        buildingType,
        squareFeet,
        propertyBy: req.user,
        heatingType,
        basement: basements,
        coolingType,
        heatingFuel,
        waterType,
        houseTiming: timing,
        roomDimension: room,
        firePlaces,
        roofingType,
        neighbouringAmenities: neighbouringAmenitiess,
        exteriorConstruction: exterior,
        propertyTax,
        propertyTaxYear,
        firePlacesFuel,
        associationPOTLFee,
        assessmentAmount,
        assessmentYear,
        appliances: appliance,
        sewerType,
      }).save();

      // const updateStatus = {
      //   $set: {
      //     addStatus: true,
      //   },
      // };

      // await Transaction.findByIdAndUpdate(
      //   { _id: transactionId },
      //   updateStatus,
      //   (err, data) => {
      // if (!err) {
      //   return res.status(200).json({ data: data, message: "success" });
      // } else {
      //   return res.status(500).json({ message: err });
      // }
      //   }
      // );

      res.status(201).json({ message: "success", data });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);

app.get("/hello", (req, res, err) => {
  res.send("Hello World");
});
//------------------- GET Login User  -----------------------------
app.get(
  "/api/sale/loggedUserProperties",
  requireLogin,
  async (req, res, err) => {
    try {
      console.log("Req", req.user);
      const data = await Property.find({
        propertyBy: req.user,
        buildingType: "Sale",
      });
      if (data.length > 0) {
        res.status(200).json({ data: data });
        console.log(data);
      } else {
        res.status(500).json({ message: "Property doesn't exist!!!" });
        console.log("property not exist");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//------------------- GET Login User RENT Property -----------------------------
app.get(
  "/api/rent/loggedUserProperties",
  requireLogin,
  async (req, res, err) => {
    try {
      console.log("Req", req.user);
      const data = await Property.find({
        propertyBy: req.user,
        buildingType: "Rent",
      });
      if (data.length > 0) {
        res.status(200).json({ data: data });
        console.log(data);
      } else {
        res.status(500).json({ message: "Property doesn't exist!!!" });
        console.log("property not exist");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//------------------- GET All Property -----------------------------
app.get("/api/getAllProperties", async (req, res, err) => {
  try {
    const data = await Property.find({
      $or: [{ buildingType: { $ne: "" } }],
    });
    if (data.length > 0) {
      res.status(200).json({ data: data });
      console.log(data);
    } else {
      res.status(500).json({ message: "Property doesn't exist!!!" });
      console.log("property not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//------------------- GET All LoggedInUser Property -----------------------------
app.get(
  "/api/loggedInUser/getAllProperties",
  requireLogin,
  async (req, res, err) => {
    try {
      const data = await Property.find({
        $or: [{ buildingType: { $ne: "" } }],
      });
      if (data.length > 0) {
        res.status(200).json({ data: data });
        console.log(data);
      } else {
        res.status(500).json({ message: "Property doesn't exist!!!" });
        console.log("property not exist");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
);
//------------------- GET Properties by ID -----------------------------
app.get("/api/getPropertyByID/:id", async (req, res, err) => {
  const { id } = req.params;

  let propertyCount;
  try {
    const data = await Property.find({ _id: id });
    console.log("data===============>", data);
    console.log("propertyBy id", data[0]?.propertyBy);
    let update;
    if (data.length > 0) {
      if (data[0].propertyStatus === "approved") {
        // if (data[0]?.propertyBy.toString() !== req.user.toString()) {
        propertyCount = data[0].propertyViewed + 1;
        update = {
          $set: {
            propertyViewed: propertyCount,
          },
        };
        // } else {
        //   update = {
        //     $set: {
        //       propertyViewed: data[0].propertyViewed,
        //     },
        //   };
        // }
      }
      const document = await Property.findByIdAndUpdate({ _id: id }, update);
      return res.status(200).json({ data: document });
    } else {
      res.status(500).json({ message: "Property doesn't exist!!!" });
      console.log("property not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//------------------- GET Properties by ID of Logged In user -----------------------------
app.get(
  "/api/loggedInUser/getPropertyByID/:id",
  requireLogin,
  async (req, res, err) => {
    const { id } = req.params;

    let propertyCount;
    try {
      const data = await Property.find({ _id: id });
      console.log("data===============>", data);
      console.log("user id", req.user);
      console.log("propertyBy id", data[0]?.propertyBy);
      let update;
      if (data.length > 0) {
        if (data[0].propertyStatus === "approved") {
          if (data[0]?.propertyBy.toString() !== req.user.toString()) {
            propertyCount = data[0].propertyViewed + 1;
            update = {
              $set: {
                propertyViewed: propertyCount,
              },
            };
          } else {
            update = {
              $set: {
                propertyViewed: data[0].propertyViewed,
              },
            };
          }
        }
        const document = await Property.findByIdAndUpdate({ _id: id }, update);
        return res.status(200).json({ data: document });
      } else {
        res.status(500).json({ message: "Property doesn't exist!!!" });
        console.log("property not exist");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//------------------- GET All Property for Rent -----------------------------
app.get("/api/rent/getProperties", async (req, res, err) => {
  try {
    const data = await Property.find({ buildingType: "Rent" });
    if (data.length > 0) {
      res.status(200).json({ data: data });
      console.log(data);
    } else {
      res.status(500).json({ message: "Property doesn't exist!!!" });
      console.log("property not exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//------------------- GET All Property for SALE ---------------------------
app.get("/api/sale/getProperties", async (req, res, err) => {
  try {
    const data = await Property.find({ buildingType: "Sale" });
    if (data.length > 0) {
      res.status(200).json({ data: data });
    } else {
      res.status(500).json({ message: "Property doesn't exist!!!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//------------------- GET All Property Admin for SALE ---------------------------
app.get("/api/admin/property/sale", async (req, res, err) => {
  try {
    const data = await Property.find({ buildingType: "Sale" })
      .select("-_v")
      .populate("transactionId")
      .populate("propertyBy", "fname lname email");
    if (data.length > 0) {
      res.status(200).json({ data: data });
    } else {
      res.status(500).json({ message: "Property doesn't exist!!!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//------------------- GET All Property Admin for RENT ---------------------------
app.get("/api/admin/property/rent", async (req, res, err) => {
  try {
    const data = await Property.find({ buildingType: "Rent" })
      .select("-_v")
      .populate("transactionId")
      .populate("propertyBy", "fname lname email");
    if (data.length > 0) {
      res.status(200).json({ data: data });
    } else {
      res.status(500).json({ message: "Property doesn't exist!!!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//--------------------------- Update Property --------------------------------
app.put(
  "/updateProperty/:_id",
  requireLogin,
  uploadMultiple,
  async (req, res) => {
    const filter = { _id: req.params._id };
    const {
      des,
      priceOfProperty,
      location,
      city,
      community,
      dateForRent,
      yearBuild,
      parkingSpots,
      bedrooms,
      floors,
      bathrooms,
      houseType,
      viewType,
      frontType,
      siteAmenities,
      constructionMaterial,
      homeAmenities,
      roomAmenities,
      kitchenAmenities,
      bathAmenities,
      flooring,
      buildingType,
      squareFeet,
      heatingType,
      basement,
      coolingType,
      heatingFuel,
      waterType,
      houseTiming,
      roomDimension,
      firePlaces,
      roofingType,
      neighbouringAmenities,
      exteriorConstruction,
      propertyTax,
      propertyTaxYear,
      firePlacesFuel,
      associationPOTLFee,
      assessmentAmount,
      assessmentYear,
      appliances,
      sewerType,
      extraImages,
    } = req.body;
    const room = JSON.parse(roomDimension);
    const timing = JSON.parse(houseTiming);
    const bath = JSON.parse(bathAmenities);
    const kitchen = JSON.parse(kitchenAmenities);
    const home = JSON.parse(homeAmenities);
    const rooms = JSON.parse(roomAmenities);
    const floorings = JSON.parse(flooring);
    const exterior = JSON.parse(exteriorConstruction);
    const neighbouringAmenitiess = JSON.parse(neighbouringAmenities);
    const constructionMaterials = JSON.parse(constructionMaterial);
    const site = JSON.parse(siteAmenities);
    const basements = JSON.parse(basement);
    const appliance = JSON.parse(appliances);
    const img = JSON.parse(extraImages);

    console.log("extra after parse", img);
    console.log("room=============>", room);
    let buildingT, driverL;
    if (req.files?.ownershipDoc || req.files?.driverLicence) {
      buildingT = req.files?.ownershipDoc;
      driverL = req.files?.driverLicence;
    } else {
      buildingT = "NA";
      driverL = "NA";
    }
    let newArray = [];

    img.map((item, i) =>
      Object.entries(item).length > 0 ? newArray.push(item) : null
    );

    if (req.files.images) {
      console.log("imagessssssssssssss", req.files.images);
      req?.files?.images?.map((item, index) => {
        newArray.push(item);
      });
    }
    const update = {
      $set: {
        images: newArray,
        des,
        priceOfProperty,
        location,
        city,
        community,
        dateForRent,
        yearBuild,
        parkingSpots,
        bedrooms,
        floors,
        bathrooms,
        houseType,
        viewType,
        frontType,
        siteAmenities: site,
        constructionMaterial: constructionMaterials,
        homeAmenities: home,
        roomAmenities: rooms,
        kitchenAmenities: kitchen,
        bathAmenities: bath,
        flooring: floorings,
        ownershipDoc: buildingT,
        driverLicence: driverL,
        buildingType,
        squareFeet,
        propertyBy: req.user,
        heatingType,
        basement: basements,
        coolingType,
        heatingFuel,
        waterType,
        houseTiming: timing,
        roomDimension: room,
        firePlaces,
        roofingType,
        neighbouringAmenities: neighbouringAmenitiess,
        exteriorConstruction: exterior,
        propertyTax,
        propertyTaxYear,
        firePlacesFuel,
        associationPOTLFee,
        assessmentAmount,
        assessmentYear,
        appliances: appliance,
        sewerType,
      },
    };

    try {
      await Property.findByIdAndUpdate(
        { _id: req.params._id },
        update,
        (err, data) => {
          if (!err) {
            return res.status(200).json({ data: data, message: "success" });
          } else {
            return res.status(500).json({ message: err });
          }
        }
      );
    } catch (error) {
      return res.status(500).json({ message: err });
    }
  }
);

//--------------------------- Update Property --------------------------------
app.put("/api/updatePropertyStatus/:_id", requireLogin, async (req, res) => {
  const { propertyStatus } = req.body;
  console.log("body", req.body);
  console.log("id", req.params._id);
  const update = {
    $set: {
      propertyStatus,
    },
  };

  try {
    await Property.findByIdAndUpdate(
      { _id: req.params._id },
      update,
      (err, data) => {
        if (!err) {
          return res
            .status(200)
            .json({ data: data, message: "status updated" });
        } else {
          return res.status(500).json({ error: err });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ error });
  }
});
//--------------------------- Update Sold Status --------------------------------
app.put("/api/edit/soldStatus/:_id", requireLogin, async (req, res) => {
  const { soldStatus } = req.body;
  console.log("body", req.body);
  console.log("id", req.params._id);
  const update = {
    $set: {
      soldStatus,
    },
  };

  try {
    await Property.findByIdAndUpdate(
      { _id: req.params._id },
      update,
      (err, data) => {
        if (!err) {
          return res
            .status(200)
            .json({ data: data, message: "sold status updated" });
        } else {
          return res.status(500).json({ error: err });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ error });
  }
});
// ---------------------------Remove RENT Property Api-----------------------------------------

app.delete("/removeProperty/:id", requireLogin, async (req, res, err) => {
  try {
    const data = await Property.findOneAndRemove({
      _id: req.params.id,
    });
    if (data !== null) {
      // return res.status(200).json({ message: "success", data: data });
      try {
        const data = await Property.find({ buildingType: "Rent" });
        if (data.length > 0) {
          res.status(200).json({ message: "success", data: data });
          console.log(data);
        } else {
          res.status(500).json({ error: "Property doesn't exist!!!" });
          console.log("property not exist");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      return res.status(500).json({ message: err });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

// ---------------------------Remove  Api-----------------------------------------

app.delete("/removeSaleProperty/:id", requireLogin, async (req, res, err) => {
  console.log("Id", req.params.id);
  try {
    const data = await Property.findOneAndRemove({
      _id: req.params.id,
    });
    if (data !== null) {
      // return res.status(200).json({ message: "success", data: data });
      try {
        const data = await Property.find({ buildingType: "Sale" });
        if (data.length > 0) {
          res.status(200).json({ message: "success", data: data });
          console.log(data);
        } else {
          res.status(500).json({ error: "Property doesn't exist!!!" });
          console.log("property not exist");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      return res.status(500).json({ message: err });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

// ---------------------------Forgot Password Api-----------------------------------------

app.post("/forgotPassword", async (req, res, err) => {
  if (req.body.email === "") {
    res.status(400).json({ error: "email required" });
  }
  console.error(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (user === null) {
    console.error("email doesn't exist");
    res.status(403).json({ error: "Email doesn't Exist" });
  } else {
    const token = user._id;
    // const token = crypto.randomBytes(20).toString("hex");
    console.log("token", token);
    const tokenStored = await User.findOneAndUpdate(
      { email: req.body.email },
      {
        resetPasswordCode: token,
        resetPasswordExpires: Date.now() + 3600000,
      }
    );
    console.log("token stored", tokenStored);
    // let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // type: "OAuth2",
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD,
        // clientId: OAUTH_CLIENTID,
        // clientSecret: OAUTH_CLIENT_SECRET,
        // refreshToken: OAUTH_REFRESH_TOKEN,
      },
      // tls: {
      //   rejectUnauthorized: false,
      // },
    });

    // send mail with defined transport object
    let mailOptions = {
      from: `${MAIL_USERNAME}`, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Link To Reset Password ✔", // Subject line
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
        `${APP_URL}/reset/${token}\n\n` +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n", // plain text body
      // html: "<b>Hello world?</b>", // html body
    };
    console.log("Sending email", mailOptions);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        return res.status(400).json(error);
      } else {
        console.log("here is the res: ", info);
        res.status(200).json({ message: "recovery email sent!" });
      }
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  }
});

// ---------------------------Forgot Password Api-----------------------------------------

// ---------------------------Reset / Update Password Api-----------------------------------------

app.get("/reset/:token", async (req, res, err) => {
  console.log("bodyyy", req.params);
  let user;
  try {
    user = await User.findOne({
      resetPasswordCode: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log("userrr", user);
    if (user) {
      res.status(200).json({
        name: user.fname + user.lname,
        message: "password reset link ok",
      });
    } else {
      console.log(user);
      console.log({ error: "password reset link is invalid or has expired" });
      res.json({ error: "password reset link is invalid or has expired" });
    }
  } catch (error) {
    console.log("dffffffffff", error);
  }
});

// ---------------------------Reset / Update Password Api-----------------------------------------

// ---------------------------Update password via email-----------------------------------------

app.put("/updatePassword/:id", async (req, res, next) => {
  const { password } = req.body;
  console.log("update body", req.body);
  console.log("update id", req.params);
  try {
    const user = await User.findById({ _id: req.params.id });
    if (user !== null) {
      console.log("user exists in db", user);
      const hashedPassword = await bcrypt.hash(password, 12);
      try {
        const updatePassword = await User.findByIdAndUpdate(
          { _id: req.params.id },
          {
            password: hashedPassword,
            resetPasswordCode: null,
            resetPasswordExpires: null,
          }
        );
        if (updatePassword) {
          console.log("password updated", updatePassword);
          res.status(500).json({ message: "password updated" });
        } else {
          console.log("password not updated");
          res.status(500).json({ message: "password not updated" });
        }
      } catch (error) {
        console.log("password not updated");
        res.status(500).json({ message: "password not updated" });
      }
    } else {
      console.log("no user exists in db to update");
      res.status(404).json({ error: "no user exists in db to update" });
    }
  } catch (error) {
    console.log("no user exists in db to update");
    res.status(404).json({ error: "no user exists in db to update" });
  }
});

// chat start here ================== chat start here ///////////////////

// get my rooms , it means get all of my chats, inbox,,
app.post("/getMyRoom", requireLogin, async (req, res) => {
  try {
    const room = await Room.find({
      senderId: req.user,
      receiverId: req.user,
    });

    if (room[0] == null) {
      console.log("room not found");
      res.status(200).json({ error: "No Record Found" });
    } else {
      const roomId = room[0]._id;
      const messages = await Room.find({
        roomId: roomId,
      });
      console.log(messages);
      return res.status(200).json({ messages });
    }
  } catch (err) {
    console.log(err);
    console.log("user not found");
    res.status(200).json({ error: "user not found" });
  }
});

app.delete("/removeRoom/:id", async (req, res, err) => {
  try {
    await Room.findOneAndRemove({
      _id: req.params.id,
    });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

app.post("/sendMessage", requireLogin, async (req, res) => {
  console.log("req.user", req.user);
  console.log("req.body.rid", req.body.rid);
  try {
    const room = await Room.find({
      $and: [{ senderId: req.user }, { receiverId: req.body.rid }],
    });
    console.log("room object", room);
    var reqBodyId = mongoose.Types.ObjectId(req.body.rid);
    const userNAme = await User.findById({
      _id: reqBodyId,
    });

    // if (userName === null) {
    //   const userNAme = await Admin.findById({
    //     _id: reqBodyId,
    //   });
    // }

    console.log("here is reqBODY ID IN object ID ===>>>> ", userNAme);
    let roomId = "";
    if (room[0] == null) {
      console.log("Rooom", room[0]);

      console.log("here is userNAme ===>>>> ", userNAme);
      var newRoom = await new Room({
        senderId: req.user,
        senderName: req.body.senderName,
        receiverName: `${userNAme.fname} ${userNAme.lname}`,
        receiverId: req.body.rid,
        lastMessage: req.body.mes,
        status: "unread",
        click: false,
      }).save();
      roomId = newRoom._id;
      await new Message({
        roomId: roomId,
        senderId: req.user,
        receiverId: req.body.rid,
        senderName: req.body.senderName,
        receiverName: `${userNAme.fname} ${userNAme.lname}`,
        mes: req.body.mes,
        status: "unread",
        click: false,
      }).save();
    } else {
      console.log("ab room mil gaya hai us ko ");
      roomId = room[0]._id;
      await new Message({
        roomId: roomId,
        senderId: req.user,
        receiverId: req.body.rid,
        mes: req.body.mes,
        senderName: req.body.senderName,
        receiverName: `${userNAme.fname} ${userNAme.lname}`,
        status: "unread",
      }).save();

      const updatePassword = await Room.findByIdAndUpdate(
        { _id: roomId },
        {
          lastMessage: req.body.mes,
        }
      );
      console.log("updated last seen message", updatePassword);
      //res.status(200).json({ error: "No Record Found" });
    }

    return res
      .status(200)
      .json({ message: "Message sent successfully..", roomId });
  } catch (err) {
    console.log(err);
    console.log("Any error in saving message");
    //res.status(200).json({ error: "user not found" });
  }
});

app.get("/getMyRoomInbox", requireLogin, async (req, res) => {
  try {
    const room = await Room.find({
      $or: [{ senderId: req.user }, { receiverId: req.user }],
    });

    if (room[0] == null) {
      console.log("room not found");
      res.status(200).json({ error: "No Record Found" });
    } else {
      console.log(room);
      return res.status(200).json({ room });
    }
  } catch (err) {
    console.log(err);
    console.log("Server error");
    res.status(200).json({ error: "Server error" });
  }
});

//send message with inbox page
app.post("/inbox/messages/send", requireLogin, async (req, res) => {
  const { roomId, senderId, receiverId, senderName, mes } = req.body;

  console.log("receiner id", req.body);
  var reqBodyId = mongoose.Types.ObjectId(receiverId);
  const userNAme = await User.findById({
    _id: reqBodyId,
  });
  console.log("useranam", userNAme);
  try {
    await new Message({
      roomId,
      senderId,
      receiverId,
      mes,
      senderName,
      receiverName: `${userNAme.fname} ${userNAme.lname}`,
      status: "unread",
    }).save();
    await Room.findByIdAndUpdate(
      { _id: roomId },
      {
        lastMessage: mes,
      }
    );
    return res.status(200).json({ message: "Message sent successfully.." });
  } catch (error) {
    console.log(error);
    console.log("Server error");
    res.status(200).json({ error: "Server error" });
  }
});

// get all messages from chat
app.get("/messages/all/:roomId", requireLogin, async (req, res) => {
  try {
    const messages = await Message.find({
      roomId: req.params.roomId,
    });

    if (messages[0] == null) {
      console.log("message not found");
      res.status(200).json({ error: "No Record Found" });
    } else {
      return res.status(200).json({ messages });
    }
  } catch (err) {
    console.log(err);
    console.log("user not found");
    res.status(200).json({ error: "user not found" });
  }
});

app.post("/api/payment/checkout", requireLogin, async (req, res) => {
  const { orderId, userId, paymentVerified, buildingType, price } = req.body;
  console.log("hello buddy", req.body);
  try {
    if (!orderId || !userId || !paymentVerified || !buildingType || !price) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const result = await new Transaction({
      orderId,
      userId,
      paymentVerified,
      buildingType,
      price,
    }).save();
    res.status(200).json({ message: "success", result: result });
    console.log("result", result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// Signup Post Method
app.get("/api/transactions", requireLogin, async (req, res) => {
  // try {

  console.log("userId", req.user);
  const result = await Transaction.find({ userId: req.user }, null, {
    sort: { createdAt: -1 },
  });
  if (result.length > 0) {
    console.log("reseult", result);
    return res.status(200).json({ result: result });
  } else {
    console.log("result not found");
    res.status(200).json({ error: "result not found" });
  }
  // } catch (err) {
  //   console.log(err);
  //   console.log("user not found");
  //   res.status(200).json({ error: "result not found" });
  // }
});
// Signup Post Method
app.get("/api/admin/transactions", requireLogin, async (req, res) => {
  try {
    console.log("userId", req.user);
    const result = await Property.find(null, null, {
      sort: { createdAt: -1 },
    })
      .select("transactionId priceOfProperty buildingType houseType createdAt")
      .populate("transactionId", "-addStatus")
      .populate("propertyBy", "fname lname");
    if (result.length > 0) {
      console.log("reseult", result);
      return res.status(200).json({ result: result });
    } else {
      console.log(" catch result not found");
      res.status(200).json({ error: "result not found" });
    }
  } catch (err) {
    console.log(err);
    console.log("user not found");
    res.status(200).json({ error: "result not found" });
  }
});
app.put(
  "/api/updatePaymentStatus/:_id",
  requireLogin,
  async (req, res, err) => {
    const { details, paymentVerified, buildingType, price } = req.body;
    console.log("hello buddy", req.body);
    // try {
    if (!details || !paymentVerified || !buildingType || !price) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const result = await new Transaction({
      details,
      userId: req.user,
      paymentVerified,
      buildingType,
      price,
    }).save();

    console.log("hello result transaction", result);

    const transactionId = result?._id;
    console.log();
    const update = {
      $set: {
        paymentVerified: "paid",
        transactionId,
      },
    };
    await Property.findByIdAndUpdate(
      { _id: req.params._id },
      update,
      (err, data) => {
        if (!err) {
          return res.status(200).json({ data: data, message: "success" });
        } else {
          return res.status(500).json({ message: err });
        }
      }
    );

    // console.log("result", result);
    // res.status(200).json({ message: "success", result: result });
    // } catch (err) {
    //   return res.status(500).json({ error: err });
    // }

    // try {

    // } catch (error) {
    //   return res.status(500).json({ message: err });
    // }
  }
);
// chat end here ================== chat end here ///////////////////
// update profile apis
app.put("/api/profile/:_id", requireLogin, async (req, res, err) => {
  const { fname, lname, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.findById({ _id: req.params._id });
    if (!user) {
      return res.status(422).json({ error: "user doesn't exist" });
    }
    const update = {
      $set: {
        fname: fname ? fname : user?.fname,
        lname: lname ? lname : user?.lname,
        email: email ? email : user?.email,
        password: password ? hashedPassword : user?.password,
      },
    };
    await User.findByIdAndUpdate(
      { _id: req.params._id },
      update,
      (err, data) => {
        if (!err) {
          return res.status(200).json({ data: data, message: "success" });
        } else {
          return res.status(500).json({ message: err });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});
app.use("/api/contact", ContactRoute);
app.use("/", chatRoute);
app.use("/api", AdminRoute);
app.use("/blog", BlogRoute);
app.use("/newsletter", newsletter);
app.use("/api", search);
app.use("/api/subscription", SubscriptionRoute);
// app.use("/api", payment);
// app.use("/api", TransactionRoute);

// app.use(chatRoute);
// ---------------------------Update password via email-----------------------------------------

//     app.delete('/remove/:id',requireLogin, async(req, res, err)=> {
//         const data = await Todo.findOneAndRemove({
//             _id:req.params.id
//         })
//         res.status(200).json({message:data})

//     })
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
