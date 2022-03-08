const router = require("express").Router();
const Contact = require("../models/contact");

router.post("/", async (req, res) => {
  const { name, email, message, phone, company } = req.body;
  console.log(req.body);
  try {
    if (!email || !name || !message) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const result = await new Contact({
      name,
      email,
      phone,
      company,
      message,
    }).save();
    res.status(200).json({ message: "success" });
    console.log("result", result);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get(
  "/",

  async (req, res, next) => {
    try {
      const data = await Contact.find();
      if (data) {
        return res.status(200).json({ data: data, message: "success" });
      } else {
        return res.status(500).json({ message: err });
      }
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
);
module.exports = router;
