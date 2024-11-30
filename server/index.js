const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/user.routes");
const cors = require("cors");
const propertyRoute = require("./routes/property.route");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://room-buddy-five.vercel.app', // Production domain
  'https://room-buddy-1581ua0ax-parthy018s-projects.vercel.app', // Deployment URL for testing
];
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman) or explicitly defined origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods you want to allow
  credentials: true, // Allow cookies and credentials
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers allowed in requests
};
app.use(cors(corsOptions));



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
