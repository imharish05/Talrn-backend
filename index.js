const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/connectDb.js");

const envPath = path.resolve(process.cwd(), "config", ".env");

dotenv.config({ path: envPath });
const app = express();
const cors = require("cors");

const developerRoutes = require("./Routes/developerRoutes.js");
const authRoutes = require("./Routes/authRoutes.js");
const { METHODS } = require("http");

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173/Talrn--frontend/",
  "https://imharish05.github.io/Talrn--frontend/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      else {
        return callback(new Error("CORS Blocked : Origin not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
    exposedHeaders: ["Content-Length"],
  })
);
app.get("/", (req, res) => {
  res.send("Test Server");
});

// Routes
app.use("/", developerRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Server running on PORT", PORT);
});
