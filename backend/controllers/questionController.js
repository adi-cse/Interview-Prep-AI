const Question = require('../models/Question');
const Session = require('../models/Session');

const addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: 'Session ID and questions array are required' });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
            }))
        );

        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        res.status(201).json({ success: true, questions: createdQuestions });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }

        question.isPinned = !question.isPinned;
        await question.save();

        res.status(200).json({ success: true, question });

    } catch (error) {
        res.status(500).json({ message: 'Server error'});
    }
};

const updateQuestionNote = async (req, res) => {
    try {
        const { note } = req.body;

        const question = await Question.findById( 
            req.params.id,
            
        );

        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }


        question.note = note || "";
        await question.save();
        res.status(200).json({ success: true, question });


    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addQuestionsToSession,
    togglePinQuestion,
    updateQuestionNote
};
