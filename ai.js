const axios = require("axios");

exports.generateQuiz = async (topic, num) => {

    const prompt = `
Generate ${num} MCQ quiz on ${topic}.

Format strictly JSON:

[
{
question:"",
options:["","","",""],
answer:""
}
]
`;

    const res = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }]
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.GROQ_KEY}`,
                "Content-Type": "application/json"
            }
        }
    );

    return res.data.choices[0].message.content;
};