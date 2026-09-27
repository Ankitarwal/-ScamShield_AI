# 🛡️ ScamShield AI – “Scam hone se pehle rokna”
> **AI-Powered Digital Fraud Detection & Community Defense Platform**  
> *Built with Google Gemini AI, React, TypeScript, Tailwind CSS, and Node.js.*

---

## 🌟 Overview

**ScamShield AI** is a production-grade cybersecurity web application engineered to protect citizens from emerging digital frauds (job scams, UPI traps, fake KYC deactivations, digital arrests, phishing emails, courier frauds, and lottery scams) **before they take action**.

The platform answers five fundamental questions for any suspicious message:
1. **What looks suspicious?**
2. **Why is it suspicious?**
3. **What type of scam could this be?**
4. **What should the user do right now?**
5. **What should the user NOT do?**

---

## 🚀 Key Features

### 1. 🤖 Multimodal AI Scam Analyzer
- **Text & Screenshot Scanner**: Analyzes text messages, WhatsApp forwards, email bodies, or screenshot images.
- **Powered by Google Gemini AI**: Structured JSON schema extraction with intelligent fallback engine.
- **Risk Score Gauge (0–100)**:
  - `0–20`: Very Low Risk (Safe Profile)
  - `21–40`: Low Risk
  - `41–60`: Moderate Risk
  - `61–80`: High Risk
  - `81–100`: Critical Risk
- **1-Click Demo Presets**:
  - 💼 **Demo 1: Job Scam** (₹45,000 WFH + ₹999 registration fee)
  - 🏦 **Demo 2: KYC Scam** (Bank account blocked today urgency threat)
  - 🟢 **Demo 3: Safe Message** (Official interview invite on careers portal)

### 2. 🛡️ Standout Feature: "BEFORE YOU ACT" Protocol
An interactive 4-step golden verification checklist:
- **STOP 🛑**: Don't respond, pay, or click yet.
- **CHECK 🔍**: Look for urgency, fees, suspicious links, and unverified promises.
- **VERIFY 🏛️**: Contact the organization via official authenticated websites/apps.
- **ACT ⚡**: Only proceed after independent confirmation.

### 3. 🌐 "Explain Like I'm New" (Multi-Language Explainer)
- Converts complex cyber reasoning into plain conversational language.
- Instant switch between **Hinglish**, **Hindi (हिंदी)**, and **English**.

### 4. 🚩 Deep Fraud Diagnostics
- **Red Flags Detection**: Severity tags (Critical, High, Medium) and psychological manipulation breakdowns.
- **Suspicious Claims Verification**: Extracts unverified claims with concrete official verification steps.
- **Sender Risk Indicators**: Evaluates domains, channels, and anonymity indicators with non-accusatory compliance language.
- **Emergency Incident Response ("If You Already Responded")**: Actionable steps if the user already clicked a link, entered OTP, transferred money, installed an APK, or shared ID documents.

### 5. 📡 Community Scam Radar
- Crowdsourced, anonymized live fraud intelligence dashboard.
- Interactive **Recharts** visualizations:
  - Top Scam Types breakdown (Pie / Donut chart)
  - Attack Channels distribution (WhatsApp, Telegram, SMS, Email, Instagram)
  - 7-Day Scam Incident Velocity (Area chart)
  - "What Scammers Are Currently Demanding" pattern cards
- **Report a Scam Pattern Modal** with **Real-Time Client-Side PII Scrubbing Preview**.

### 6. 📚 Knowledge & Simulator Hub
- **Scam Encyclopedia**: Real attack breakdowns of WFH task frauds, reverse QR traps, and digital arrests.
- **Spot the Scam Interactive Quiz**: 5-question micro-simulator with instant scoring and explanations.
- **Helpline Directory**: Direct access to National Cyber Crime Helpline (`1930`), `cybercrime.gov.in`, and DoT Chakshu portal (`sancharsaathi.gov.in`).

### 7. 🔒 Privacy-First Design
- Screenshots processed in-memory (RAM) and never saved permanently to disk.
- PII Scrubber automatically strips phone numbers, emails, URLs, Aadhaar, PAN, card numbers, and names before any community logging.
- Scan history stored locally in browser `localStorage`.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS, Lucide React, Recharts, Canvas Confetti |
| **Backend** | Node.js (ESM), Express.js, Multer (In-memory buffer) |
| **AI Engine** | Google Gemini API (`@google/generative-ai`), Gemini 1.5/2.0 Flash |
| **Tooling** | Vite, PostCSS, Autoprefixer |

---

## 🏃 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Install Dependencies
```bash
# In the root directory:
npm install

# In server directory:
cd server && npm install

# In client directory:
cd ../client && npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` in `server/`:
```bash
cd server
cp .env.example .env
```
Add your free Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/):
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```
*(Note: If no API key is set, ScamShield AI automatically runs in high-precision hybrid fallback mode for seamless demos.)*

### 3. Start Development Servers
```bash
# From root directory:
npm run dev
```
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## ⚖️ Ethical AI Guardrails & Compliance
- **No 100% Certainty Claims**: AI outputs are framed as risk indicators and probabilities.
- **Non-Accusatory Tone**: Uses objective wording (*"Potential scam indicators detected"*, *"Needs verification"*).
- **Zero Credential Harvesting**: The application never asks users for passwords, PINs, or raw OTPs.

---

*Made with ❤️ for digital safety & fraud awareness.*
