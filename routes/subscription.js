const router = require("express").Router();
const Subscription = require("../models/subscription");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const { JWT_SECRET } = require("../config/keys");

// const videoStorage = multer.diskStorage({
//   destination: "./uploads", // Destination to store video
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const videoUpload = multer({
//   storage: videoStorage,
//   limits: {
//     fileSize: 10000000, // 10000000 Bytes = 10 MB
//   },
//   fileFilter(req, file, cb) {
//     // upload only mp4 and mkv format
//     if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
//       return cb(new Error("Please upload a video"));
//     }
//     cb(undefined, true);
//   },
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error("Please upload a video"));
    }
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

var uploadMultiple = upload.fields([{ name: "video", maxCount: 1 }]);

const requireLogin = (req, res, next) => {
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

router.post("/create", requireLogin, async (req, res, next) => {
  const { rentPrice, salePrice } = req.body;
  console.log(rentPrice, salePrice);
  const { video } = req.file;
  try {
    if (!rentPrice || !salePrice) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const response = await new Subscription({
      rent: rentPrice,
      sale: salePrice,
    }).save();
    res.status(200).json({ message: "success", data: response });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.put(
  "/update/:_id",
  requireLogin,
  uploadMultiple,
  async (req, res, next) => {
    const { rentPrice, salePrice } = req.body;

    console.log("videooooooooo", req.files.video);
    console.log(rentPrice, salePrice);
    let update;

    update = {
      $set: {
        rent: rentPrice,
        sale: salePrice,
        video: req.file ? req.file : "",
      },
    };

    try {
      // if (!rentPrice || !salePrice) {
      //   return res.status(422).json({ error: "Please add all the fields" });
      // }

      await Subscription.findByIdAndUpdate(
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
      return res.status(500).json({ error: err });
    }
  }
);

router.delete(
  "/remove/:_id",
  requireLogin,

  async (req, res, next) => {
    try {
      const data = await Subscription.findOneAndRemove({
        _id: req.params._id,
      });
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

router.get(
  "/show",
  requireLogin,

  async (req, res, next) => {
    try {
      const data = await Subscription.find();
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
router.get(
  "/show/:_id",
  requireLogin,

  async (req, res, next) => {
    try {
      const data = await Subscription.findById({ _id: req.params._id });
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
