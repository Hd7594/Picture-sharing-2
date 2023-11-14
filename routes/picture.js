const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const fileUpload = require("express-fileupload");

const convertToBase64 = require("../utils/convertToBase64");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Sharing = require("../models/Sharing");

router.post("/sharing/add", fileUpload(), async (req, res) => {
  try {
    const picture = req.files.picture;
    const filePicture = await cloudinary.uploader.upload(
      convertToBase64(picture)
    );

    const { name, description, author } = req.body;

    const newSharing = new Sharing({
      name: name,
      description: description,
      author: author,
      picture: filePicture,
    });
    await newSharing.save();
    res.json(newSharing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/sharing/list", async (req, res) => {
  try {
    /*
    const sharingList = await Sharing.find();
    res.json(sharingList);
    */
    const sharingList = await Sharing.findById(req.query.id);
    if (req.query.id) {
      res.json(sharingList);
    } else {
      res.json({ message: "missing parameters" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/sharing/delete", async (req, res) => {
  try {
    await Sharing.findByIdAndDelete(req.body.id);
    if (req.body.id) {
      res.status(200).json({ message: "picture deleted" });
    } else {
      res.json({ message: "bad request" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
