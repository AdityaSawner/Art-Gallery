const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

connectToMongo();

const app = express();

app.use(express.json());
app.use(cors());

// serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
const artRoutes = require("./routes/artRoutes");
app.use("/api/art", artRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
