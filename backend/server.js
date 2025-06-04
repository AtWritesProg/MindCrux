require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Environment validation
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

console.log('✅ GEMINI_API_KEY loaded successfully');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Summarization route
app.post('/api/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Valid text is required' });
    }
    
    if (text.trim().length < 10) {
      return res.status(400).json({ error: 'Text too short for summarization' });
    }
    
    if (text.length > 10000) {
      return res.status(400).json({ error: 'Text too long. Please limit to 10,000 characters.' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(`Summarize this text concisely:\n\n${text}`);
    
    const summary = result.response.text();

    res.json({ summary });
  } catch (error) {
    console.error('Gemini error:', error);
    
    if (error.message?.includes('API_KEY')) {
      res.status(401).json({ error: 'Invalid API key' });
    } else if (error.message?.includes('quota')) {
      res.status(429).json({ error: 'API quota exceeded' });
    } else {
      res.status(500).json({ error: 'Failed to generate summary' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`✅ Gemini backend running on http://localhost:${PORT}`);
});