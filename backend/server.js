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

// ✅ Connect Database
connectDB();

// ✅ Body Parser
app.use(express.json());

// ✅ CORS (Works for both Local + Render)
app.use(
  cors({
    origin: true, // allow all origins dynamically
    credentials: true,
  })
);

// ✅ Handle Preflight Requests
app.options("*", cors());

// ================= ROUTES =================

// Auth Routes
app.use("/api/auth", authRoutes);

// Session Routes
app.use("/api/sessions", sessionRoutes);

// Question Routes
app.use("/api/questions", questionRoutes);

// AI Routes
app.post("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.post("/api/ai/generate-explanation", protect, generateConceptExplanation);

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health Check Route
app.get("/", (req, res) => {
  res.send("Interview Prep AI Backend Running 🚀");
});

// ================= START SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
