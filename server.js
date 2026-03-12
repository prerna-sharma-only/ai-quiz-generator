require("dotenv").config();
const express = require("express");
const { generateQuiz } = require("./ai");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// simple demo user
const USER = {
    email: "student@gmail.com",
    password: "1234"
};

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    if (email === USER.email && password === USER.password) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post("/generate", async (req, res) => {

    const { topic, num, time } = req.body;

    const quiz = await generateQuiz(topic, num);

    res.json({ quiz, time });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
   console.log("Server running on port " + PORT)
})