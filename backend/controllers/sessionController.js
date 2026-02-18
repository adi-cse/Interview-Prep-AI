const Session = require('../models/Session');
const Question = require('../models/Question');

const createSession = async (req, res) => {
    try {
        const { role, experienceLevel, topicsToFocusOn, description, questions = [] } = req.body;
        const userId = req.user._id;

        const session = await Session.create({
            user: userId,
            role,
            experienceLevel,
            topicsToFocusOn,
            description,
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();

        res.status(201).json({ success: true, session });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('questions');

        res.json({ success: true, sessions });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getSessionsById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate({
                path: 'questions',
                options: { sort: { isPinned: -1, createdAt: -1 } }
            });

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.json({ success: true, session });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        if (session.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Question.deleteMany({ session: session._id });
        await session.deleteOne();

        res.json({ success: true, message: 'Session deleted' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createSession,
    getMySessions,
    getSessionsById,
    deleteSession
};
