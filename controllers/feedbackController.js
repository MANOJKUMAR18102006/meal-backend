const Feedback = require('../models/Feedback');

const createFeedback = async (req, res) => {
    try {
        const { mealSuggestion, rating, comments } = req.body;
        const feedback = new Feedback({
            user: req.userData.id,
            mealSuggestion,
            rating,
            comments
        });
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback', error: error.message });
    }
};

const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('user', 'name').sort({ createdAt: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
    }
};

module.exports = { createFeedback, getFeedbacks };