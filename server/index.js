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
  'https://room-buddy-parthy018s-projects.vercel.app', // Vercel deployment URL
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps or Postman) or explicitly allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow credentials like cookies and headers
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed request headers
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
