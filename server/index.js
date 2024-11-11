const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/user.routes");
const cors = require("cors");
const propertyRoute = require("./routes/property.route");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Define the allowed origins dynamically based on environment
const allowedOrigins = [
  "https://room-buddy-z6yx.vercel.app", 
  "https://room-buddy-z6yx-i9vdk4oyg-parthy018s-projects.vercel.app", 
  "http://localhost:5173"
];

// Configure CORS options to handle multiple origins and credentials
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};


// Apply CORS middleware with the options defined
app.use(cors(corsOptions));


app.options("*", cors(corsOptions));

// Add middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use("/api/auth", authRoutes); 
app.use("/api/properties", propertyRoute);

// Root route
app.get("/", (req, res) => {
  res.json("Welcome to roombuddy backend");
});

// Start server and connect to database
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Server is running on port", PORT);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
});
