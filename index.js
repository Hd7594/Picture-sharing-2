const express = require("express");
require("dotenv").config();
const cors = require("cors");
app.use(cors());
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const pictureRoutes = require("./routes/picture");
app.use(pictureRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log("server");
});
