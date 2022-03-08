const router = require("express").Router();
const Blog = require("../models/blog");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { JWT_SECRET } = require("../config/keys");

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

var uploadMultiple = upload.fields([{ name: "images", maxCount: 1 }]);

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

router.post("/create", requireLogin, uploadMultiple, async (req, res, next) => {
  const { title, description } = req.body;
  const { images } = req.files;
  console.log(title, description, images);
  try {
    if (!title || !description || !images) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const response = await new Blog({
      images,
      title,
      description,
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
    const filter = { _id: req.params._id };

    const { title, description } = req.body;
    const images = req.files.images;

    console.log(title, description, images);
    let update;
    if (req.files.images) {
      update = {
        $set: {
          images,
          title,
          description,
        },
      };
    } else {
      update = {
        $set: {
          title,
          description,
        },
      };
    }

    try {
      if (!title || !description) {
        return res.status(422).json({ error: "Please add all the fields" });
      }

      await Blog.findByIdAndUpdate(
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
      const data = await Blog.findOneAndRemove({
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
      const data = await Blog.find();
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
      const data = await Blog.findById({ _id: req.params._id });
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
