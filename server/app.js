import express from "express"
import cookieParser from "cookie-parser";
const mongoose = require("mongoose");
const cors = require("cors");
const chatRoutes = require("./routes/chatroutes.js");
const userRoutes = require("./routes/userroutes.js");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",  // or wherever your frontend runs
  credentials: true                // very important for cookies
}));
app.use(cookieParser())
app.use(express.json());

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api/messages", chatRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));