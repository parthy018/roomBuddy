const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/user.routes");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  // origin: process.env.NODE_ENV === "production" ? "https://your-production-domain.com" : "http://localhost:5173",
  origin: "http://localhost:5173",
  credentials: true, 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoutes);


app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Server is running on port", PORT);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
});
