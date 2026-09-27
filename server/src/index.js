import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Root healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'ScamShield AI Core',
    version: '1.0.0',
    tagline: 'Scam hone se pehle rokna',
    geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'),
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build if in production
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
      if (err) {
        res.status(200).send('ScamShield AI Backend is active. Start client dev server on port 5173.');
      }
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🛡️  ScamShield AI Backend Server`);
  console.log(`🌐  Listening on http://localhost:${PORT}`);
  console.log(`⚡  Tagline: "Scam hone se pehle rokna"`);
  console.log(`🤖  Gemini AI API Key: ${process.env.GEMINI_API_KEY ? 'Configured' : 'Running High-Precision Fallback Mode'}`);
  console.log(`======================================================\n`);
});
