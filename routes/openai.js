const express = require('express');
const OpenAI = require('openai');

const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure your .env file is configured properly
});

router.post('/', async (req, res) => {
    const { weight, height, fitnessLevel } = req.body;

    const prompt = `I am ${weight} kg and ${height} cm tall. My fitness level is ${fitnessLevel}. Give me a daily calorie intake and workout plan.`;

    try {
        // Use gpt-3.5-turbo model
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        console.log('OpenAI API Response:', response.data);
        res.status(200).json({ message: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong with OpenAI API" });
    }
});

module.exports = router;
