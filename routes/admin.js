const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const { JWT_SECRET } = require("../config/keys");

// Signup Post Method
router.post("/admin/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  try {
    if (!email || !password || !name) {
      return res.json({ error: "Please add all the fields" });
    }
    const user = await Admin.findOne({ email });
    if (user) {
      return res.json({ error: "email already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await new Admin({
      name,
      email,
      password: hashedPassword,
      //   profileImage,
    }).save();
    res.status(200).json({ message: "signup successfull..." });
  } catch (err) {
    console.log(err);
  }
});

// admin login Api using post method
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("req body", req.body);
  if (!email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    const user = await Admin.findOne({ email });
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

module.exports = router;
