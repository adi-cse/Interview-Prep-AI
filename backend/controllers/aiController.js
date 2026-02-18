const axios = require("axios");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

// ==========================================
// 🔥 Common Error Handler
// ==========================================

const handleAIError = (error, res) => {
  try {
    const statusCode = error?.response?.status || 500;

    if (statusCode === 429) {
      return res.status(429).json({
        success: false,
        message: "API quota exceeded ⚠",
        error: error.response?.data || error.message,
      });
    }

    if (statusCode === 401) {
      return res.status(401).json({
        success: false,
        message: "Invalid OpenRouter API Key",
      });
    }

    return res.status(statusCode).json({
      success: false,
      message: "OpenRouter API Error",
      error: error.response?.data || error.message,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unknown Server Error",
      error: err.message,
    });
  }
};

// ==========================================
// 🔥 OpenRouter API Call (Strict JSON Mode)
// ==========================================

const callOpenRouter = async (prompt) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "meta-llama/llama-3-8b-instruct",
      messages: [
        {
          role: "system",
          content: `
You are a JSON API.
Return ONLY valid JSON.
Do NOT use markdown.
Do NOT use backticks.
Do NOT escape new lines.
Do NOT add explanations outside JSON.

Return this exact structure:

{
  "title": "string",
  "explanation": "string"
}
`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      timeout: 15000
    }
  );

  return response.data.choices?.[0]?.message?.content || "";
};

// ==========================================
// 🎯 Generate Interview Questions
// ==========================================

const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const rawText = await callOpenRouter(prompt);

    let parsedData;

    try {
      parsedData = JSON.parse(rawText);
    } catch {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        raw: rawText,
      });
    }

    res.status(200).json({
      success: true,
      data: parsedData,
    });

  } catch (error) {
    handleAIError(error, res);
  }
};

// ==========================================
// 🎯 Generate Concept Explanation
// ==========================================

const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const prompt = conceptExplainPrompt(question);
    const rawText = await callOpenRouter(prompt);

    let parsedData;

    try {
      parsedData = JSON.parse(rawText);
    } catch {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
        raw: rawText,
      });
    }

    res.status(200).json({
      success: true,
      title: parsedData.title,
      explanation: parsedData.explanation,
    });

  } catch (error) {
    handleAIError(error, res);
  }
};


module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
