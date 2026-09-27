import express from 'express';
import cors from 'cors';
import apiRoutes from '../server/src/routes/api.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

app.use('/api', apiRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'ScamShield AI Core (Serverless)',
    version: '1.0.0'
  });
});

export default app;
