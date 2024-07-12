const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyDrXyARqgyWfpSMnVA8DbPDtRghSmOWmRA';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

app.post('/getMedicalInfo', async (req, res) => {
  const userInput = req.body.query;

  const parts = [
    { text: `input: ${userInput}` },
    { text: 'output: Hi there! 👋 I\'m Vidhi, your friendly medical assistant. How are you feeling today? 😊' },
  ];

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig,
    });
    
    const output = result.response.text();
    res.json({ response: output });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
