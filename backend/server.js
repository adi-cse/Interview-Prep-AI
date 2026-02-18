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

// ================= CONNECT DATABASE =================
connectDB();

// ================= MIDDLEWARE =================
app.use(express.json());

// ✅ Safe CORS (No Crash Version)
app.use(
  cors({
    origin: true, // dynamically allow frontend origin
    credentials: true,
  })
);

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

// Static Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health Check
app.get("/", (req, res) => {
  res.send("Interview Prep AI Backend Running 🚀");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
