require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");

const { protect } = require("./middlewares/authMiddleware");
const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("./controllers/aiController");

const app = express();

// ✅ Connect DB
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ Proper CORS Setup (Development + Production)
const allowedOrigins = [
  "http://localhost:5173", // Local Vite
  "https://interview-prep-frontend.onrender.com", // Render Frontend (CHANGE if needed)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser requests

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

// ✅ AI Routes
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

// ✅ Static Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Health Check Route (Very Useful)
app.get("/", (req, res) => {
  res.send("Interview Prep AI Backend Running 🚀");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
