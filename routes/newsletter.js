const router = require("express").Router();
const Newsletter = require("../models/newsletter");

router.post("/create", async (req, res) => {
  const { name, email } = req.body;
  console.log(name, email);
  try {
    if (!email || !name) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    await new Newsletter({
      name,
      email,
    }).save();
    res.status(200).json({ message: "success" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
