import express from 'express';
import multer from 'multer';
import { analyzeScamContent } from '../services/geminiService.js';
import { scrubPII, extractAnonymizedSignals } from '../services/piiScrubber.js';
import { getScamRadarStats, addCommunityReport } from '../data/radarData.js';

const router = express.Router();

// Memory storage for screenshot analysis (Privacy-first: image is held in RAM during AI processing and never written to disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

/**
 * 1. Analyze text message
 * POST /api/analyze
 */
router.post('/analyze', async (req, res) => {
  try {
    const { message, source = 'WhatsApp' } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message content is required for analysis.' });
    }

    const analysis = await analyzeScamContent({
      text: message.trim(),
      source
    });

    // Provide scrubbed preview for transparency
    const sanitizedPreview = scrubPII(message);

    res.json({
      success: true,
      analysis,
      sanitizedInput: sanitizedPreview,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    res.status(500).json({
      error: 'Failed to complete scam analysis.',
      details: error.message
    });
  }
});

/**
 * 2. Analyze screenshot image (Multimodal Gemini Vision)
 * POST /api/analyze-image
 */
router.post('/analyze-image', upload.single('screenshot'), async (req, res) => {
  try {
    const file = req.file;
    const source = req.body.source || 'Screenshot';
    const notes = req.body.notes || '';

    if (!file) {
      return res.status(400).json({ error: 'Screenshot image file is required.' });
    }

    const analysis = await analyzeScamContent({
      text: notes,
      source,
      imageBuffer: file.buffer,
      mimeType: file.mimetype
    });

    res.json({
      success: true,
      analysis,
      isImageAnalysis: true,
      fileInfo: {
        originalName: file.originalname,
        sizeBytes: file.size,
        mimeType: file.mimetype,
        storageNote: 'Screenshot processed in-memory and discarded. Not saved to disk.'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in /api/analyze-image:', error);
    res.status(500).json({
      error: 'Failed to analyze screenshot image.',
      details: error.message
    });
  }
});

/**
 * 3. Get Community Scam Radar Intelligence
 * GET /api/radar
 */
router.get('/radar', (req, res) => {
  try {
    const stats = getScamRadarStats();
    res.json({
      success: true,
      radar: stats,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in /api/radar:', error);
    res.status(500).json({ error: 'Failed to fetch Scam Radar data.' });
  }
});

/**
 * 4. Submit Anonymized Scam Report
 * POST /api/report
 */
router.post('/report', (req, res) => {
  try {
    const { rawMessage, scamType, channel = 'WhatsApp', riskLevel = 'High Risk', riskScore = 80, notes } = req.body;

    // Strict PII Scrubbing
    const sanitizedText = scrubPII(rawMessage || notes || '');

    const reportRecord = addCommunityReport({
      scamType: scamType || 'Job/Recruitment Scam',
      channel,
      riskLevel,
      riskScore: Number(riskScore) || 80,
      summary: sanitizedText.slice(0, 200) || 'Anonymized scam pattern submitted by community.',
      requests: ['Registration Fee', 'UPI Payment']
    });

    res.json({
      success: true,
      message: 'Scam pattern anonymously logged to community radar. Personal details were scrubbed.',
      report: reportRecord
    });
  } catch (error) {
    console.error('Error in /api/report:', error);
    res.status(500).json({ error: 'Failed to submit report.' });
  }
});

/**
 * 5. Pre-configured Realistic Demos
 * GET /api/demos
 */
router.get('/demos', (req, res) => {
  res.json({
    demos: [
      {
        id: 'job-scam',
        title: 'Demo 1 – Job Scam (High Risk)',
        category: 'Job/Recruitment Scam',
        source: 'WhatsApp',
        message: 'Congratulations! You have been selected for a ₹45,000/month work-from-home job as Online Data Reviewer. No experience required. Pay ₹999 refundable registration & equipment verification fee to confirm your position today: https://wfh-jobs-portal-india.online/pay-999',
        tag: 'WFH Fee Scam',
        badgeColor: 'crimson'
      },
      {
        id: 'kyc-scam',
        title: 'Demo 2 – KYC Scam (Critical Risk)',
        category: 'KYC Scam',
        source: 'SMS',
        message: 'URGENT: Dear Customer, Your Bank Account and Debit Card will be BLOCKED TODAY at 9:30 PM due to pending KYC verification. Click immediately to update your PAN & Aadhaar: http://sbi-kyc-update-portal.online/verify to prevent suspension.',
        tag: 'Urgent Bank Threat',
        badgeColor: 'crimson'
      },
      {
        id: 'safe-message',
        title: 'Demo 3 – Safe Message (Low Risk)',
        category: 'Safe / Legitimate',
        source: 'Email',
        message: 'Dear Candidate, Your second round interview for the Senior Frontend Engineer role is scheduled for tomorrow at 10:00 AM IST via Google Meet. Please join through your verified applicant dashboard on the official company careers portal: https://careers.techcorp.com/interviews/dashboard',
        tag: 'Verified Corporate Invite',
        badgeColor: 'emerald'
      }
    ]
  });
});

export default router;
