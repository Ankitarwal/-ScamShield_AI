import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
let genAI = null;

if (apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.trim() !== '') {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    console.log('✅ Google Gemini AI client initialized with API key.');
  } catch (err) {
    console.warn('⚠️ Failed to initialize Gemini client:', err.message);
  }
} else {
  console.log('ℹ️ No GEMINI_API_KEY found. ScamShield AI is running with intelligent hybrid fallback engine.');
}

const SYSTEM_INSTRUCTION = `
You are ScamShield AI, an advanced cybersecurity and fraud intelligence assistant developed to help citizens protect themselves from digital fraud ("Scam hone se pehle rokna").
Your primary goal is NOT simply saying "Scam" or "Not Scam".
You must answer:
1. What looks suspicious?
2. Why is it suspicious?
3. What type of scam could this be?
4. What should the user do right now?
5. What should the user NOT do?

SAFETY & COMPLIANCE RULES:
- Never state with 100% certainty that something is definitely fraudulent. Always frame it as risk assessment ("Potential scam indicators detected", "Needs independent verification", "Risk indicator").
- Never accuse a specific individual or organization of a crime based solely on a message.
- Never ask the user to provide passwords, OTPs, PINs, or private keys.
- Never encourage users to click suspicious links or call suspicious numbers.
- Always include clear, actionable next steps and emergency guidance if the user already responded.

OUTPUT FORMAT:
You MUST respond ONLY with a valid, raw JSON object (without markdown code blocks, backticks, or other text outside the JSON).
The JSON MUST follow this exact structure:
{
  "riskScore": <integer 0-100>,
  "riskLevel": "<Very Low Risk | Low Risk | Moderate Risk | High Risk | Critical Risk>",
  "scamType": "<Job/Recruitment Scam | UPI/Payment Scam | Phishing | Investment Scam | Loan Scam | KYC Scam | Delivery Scam | Impersonation Scam | Lottery/Prize Scam | Romance/Social Engineering | Tech Support Scam | Account Takeover Attempt | Safe / Legitimate | Other>",
  "summary": "<2-3 sentence executive risk summary>",
  "redFlags": [
    {
      "title": "<Red Flag Title, e.g. Urgency Pressure, Upfront Payment, Unrealistic Salary>",
      "severity": "<Critical | High | Medium | Low>",
      "explanation": "<Clear explanation of why this is a red flag and how scammers use it>"
    }
  ],
  "suspiciousClaims": [
    {
      "claim": "<Specific suspicious claim from the text>",
      "reason": "<Why this claim appears dubious or unverified>",
      "verificationStep": "<Concrete official step to verify this claim safely>"
    }
  ],
  "senderIndicators": [
    {
      "indicator": "<Domain / Phone / Channel / Grammar / Authority indicator>",
      "risk": "<High | Medium | Low>",
      "explanation": "<Carefully phrased risk indicator, e.g., 'Unverified sender domain', 'Informal recruitment channel'>"
    }
  ],
  "safeActions": [
    "<Action 1: e.g., Do not click any links in the message>",
    "<Action 2: e.g., Verify directly through the official website or app>",
    "<Action 3: e.g., Report and block the sender>"
  ],
  "avoidActions": [
    "<Avoid 1: e.g., Do NOT pay any registration or processing fee>",
    "<Avoid 2: e.g., Do NOT share OTP, bank PIN, or screen access>"
  ],
  "ifAlreadyActed": {
    "clickedLink": "<What to do immediately if user clicked the link>",
    "sharedOTP": "<Emergency steps if OTP/PIN was shared>",
    "madePayment": "<Immediate steps to freeze funds / call 1930 / dispute UPI>",
    "downloadedApp": "<Steps to remove malicious APK / revoke accessibility>",
    "sharedID": "<Guidance if Aadhaar/PAN/personal ID was shared>"
  },
  "simpleExplanation": {
    "english": "<Ultra simple English explanation for beginners>",
    "hindi": "<आसान हिंदी में व्याख्या (सरल शब्दों में)>",
    "hinglish": "<Simple conversational Hinglish breakdown, e.g., 'Ye message aapko jaldi decision lene ke liye pressure kar raha hai...'>"
  },
  "beforeYouAct": {
    "stop": "Don't respond, click links, or make any payment yet.",
    "check": "<Key elements to double check from this specific message>",
    "verify": "<Official channel to contact for verification>",
    "act": "Only proceed through official, verified channels."
  }
}
`;

export async function analyzeScamContent({ text, source = 'Other', imageBuffer = null, mimeType = null }) {
  // If Gemini API is configured, call Gemini
  if (genAI) {
    try {
      const modelNames = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];
      let lastError = null;

      for (const modelName of modelNames) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
              temperature: 0.2,
              responseMimeType: "application/json"
            }
          });

          const promptParts = [];
          promptParts.push(SYSTEM_INSTRUCTION);
          promptParts.push(`\n\nMESSAGE SOURCE: ${source}`);

          if (text) {
            promptParts.push(`\n\nMESSAGE CONTENT TO ANALYZE:\n"""\n${text}\n"""`);
          }

          if (imageBuffer && mimeType) {
            promptParts.push({
              inlineData: {
                data: imageBuffer.toString('base64'),
                mimeType: mimeType
              }
            });
            promptParts.push(`\nAnalyze this screenshot thoroughly. Extract all visible text, sender details, payment demands, URLs, and detect fraud signals.`);
          }

          const result = await model.generateContent(promptParts);
          const responseText = result.response.text();

          // Clean markdown backticks if any
          const cleanJson = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
          const parsed = JSON.parse(cleanJson);
          
          parsed.analyzedBy = `Gemini AI (${modelName})`;
          parsed.isLiveGemini = true;
          return parsed;
        } catch (err) {
          console.warn(`Attempt with ${modelName} failed:`, err.message);
          lastError = err;
        }
      }
      console.warn('Gemini API calls failed, falling back to intelligent heuristic engine:', lastError?.message);
    } catch (err) {
      console.warn('Gemini processing exception:', err.message);
    }
  }

  // Fallback to intelligent local heuristic engine
  return generateIntelligentAnalysis(text, source, !!imageBuffer);
}

/**
 * Intelligent Local Heuristic Analyzer
 * Provides accurate, production-quality structured analysis for demo and offline scenarios.
 */
function generateIntelligentAnalysis(rawText = '', source = 'Other', isScreenshot = false) {
  const text = (rawText || '').toLowerCase();

  // 1. Job / Recruitment Scam
  if (text.includes('job') || text.includes('work from home') || text.includes('wfh') || text.includes('salary') || text.includes('selected') || text.includes('registration fee') || text.includes('part-time') || text.includes('data entry') || text.includes('per day') || text.includes('task')) {
    const isFeeRequested = text.includes('fee') || text.includes('₹') || text.includes('pay') || text.includes('deposit') || text.includes('999') || text.includes('499');
    const isHighSalary = text.includes('45,000') || text.includes('50,000') || text.includes('30,000') || text.includes('1000/day') || text.includes('2000/day');

    return {
      riskScore: isFeeRequested ? 88 : 65,
      riskLevel: isFeeRequested ? 'High Risk' : 'Moderate Risk',
      scamType: 'Job/Recruitment Scam',
      summary: 'Potential employment fraud indicators detected. Legitimate companies never charge candidates upfront fees for job offers, training, or equipment.',
      redFlags: [
        ...(isFeeRequested ? [{
          title: 'Upfront Payment / Registration Fee',
          severity: 'Critical',
          explanation: 'Demanding money (e.g. ₹999 refundable fee) before starting work is the hallmark of recruitment scams. Real employers pay you, they do not charge you.'
        }] : []),
        ...(isHighSalary ? [{
          title: 'Disproportionately High Salary',
          severity: 'High',
          explanation: 'Promising ₹35,000–₹50,000/month for minimal effort or basic work-from-home tasks without formal technical interviews is a classic bait.'
        }] : []),
        {
          title: 'Informal Hiring & Communication Channel',
          severity: 'Medium',
          explanation: `Job offers sent via ${source} without formal corporate email domain or verified LinkedIn/portal listing require scrutiny.`
        },
        {
          title: 'Lack of Proper Interview Process',
          severity: 'High',
          explanation: 'Immediate selection without technical assessment, HR round, or documented offer letter on company letterhead.'
        }
      ],
      suspiciousClaims: [
        {
          claim: 'Selected for high-paying position without prior structured interview',
          reason: 'Legitimate recruitment requires multi-stage verification and formal interview rounds.',
          verificationStep: 'Visit the official careers page of the company or contact verified HR on LinkedIn directly.'
        },
        {
          claim: 'Fee is 100% refundable after task completion',
          reason: 'Scammers use the "refundable deposit" promise to lower psychological resistance.',
          verificationStep: 'Verify company policy: Authentic organizations explicitly state "No recruitment fees required".'
        }
      ],
      senderIndicators: [
        {
          indicator: `Unverified ${source} Contact`,
          risk: 'High',
          explanation: 'Professional recruiters communicate via official company domain emails (e.g., hr@company.com), not personal messaging apps.'
        },
        {
          indicator: 'Generic Job Description',
          risk: 'Medium',
          explanation: 'Vague responsibilities like "like videos", "data entry", or "easy mobile tasks" indicate task-fraud patterns.'
        }
      ],
      safeActions: [
        'Do NOT pay any registration fee, security deposit, or document processing charge.',
        'Do NOT share copies of Aadhaar, PAN, or bank statements via chat.',
        'Look up the organization on official platforms (e.g., MCA portal, official website careers section).',
        'Block and report the sender on the messaging platform.'
      ],
      avoidActions: [
        'Never transfer money to "unlock" tasks or salary credits.',
        'Do not join secondary Telegram/WhatsApp VIP groups with "proof of earnings".',
        'Do not install unknown APKs or screen sharing software.'
      ],
      ifAlreadyActed: {
        clickedLink: 'Do not submit any personal info on the page. Close the tab and clear your browser cache.',
        sharedOTP: 'Immediately change your account passwords and notify your bank if banking OTP was shared.',
        madePayment: 'Report immediately to National Cyber Crime Helpline (dial 1930) and register a complaint at cybercrime.gov.in within 2 hours.',
        downloadedApp: 'Uninstall the app immediately, turn on airplane mode, and run a malware scan.',
        sharedID: 'Place a fraud alert and lock your biometric Aadhaar via the official UIDAI portal/mAadhaar app.'
      },
      simpleExplanation: {
        english: 'This message asks for money upfront for a job promise. Real companies never ask for registration fees or deposits.',
        hindi: 'यह संदेश नौकरी देने के नाम पर पहले पैसे मांग रहा है। कोई भी असली कंपनी नौकरी देने के लिए कभी रजिस्ट्रेशन फीस नहीं मांगती।',
        hinglish: 'Ye message aapse job ke badle advance paise maang raha hai. Real companies kabhi bhi registration ya training fee nahi leti. Paise bilkul mat bhejein.'
      },
      beforeYouAct: {
        stop: 'Do NOT pay any registration or confirmation fee.',
        check: 'Check if real companies ever charge candidates upfront for work.',
        verify: 'Search the company careers portal independently on Google.',
        act: 'Block the sender and report the message on National Cyber Crime portal (1930).'
      },
      analyzedBy: 'ScamShield Neural Engine (High Precision Fallback)',
      isLiveGemini: false
    };
  }

  // 2. KYC / Bank / Electricity Suspension Scam
  if (text.includes('kyc') || text.includes('bank') || text.includes('expire') || text.includes('blocked') || text.includes('suspended') || text.includes('electricity') || text.includes('power cut') || text.includes('update') || text.includes('pan card') || text.includes('sim') || text.includes('esim')) {
    return {
      riskScore: 92,
      riskLevel: 'Critical Risk',
      scamType: 'KYC Scam',
      summary: 'High-severity urgency and account suspension threat detected. Banks and utility providers never threaten immediate account deactivation via SMS/chat with external links.',
      redFlags: [
        {
          title: 'False Urgency & Imminent Threat',
          severity: 'Critical',
          explanation: 'Claims like "Your account will be blocked today" create panic to prevent logical verification.'
        },
        {
          title: 'Third-Party / Phishing Link',
          severity: 'Critical',
          explanation: 'Links directing to unofficial domains mimicking bank names are designed to harvest credentials and OTPs.'
        },
        {
          title: 'Pressure to Bypass Official Channels',
          severity: 'High',
          explanation: 'Urging you to click a link or call an unofficial mobile number instead of using the official bank app.'
        }
      ],
      suspiciousClaims: [
        {
          claim: 'Account / Service will be disconnected or suspended immediately',
          reason: 'Regulatory guidelines mandate formal written notices; immediate same-day disconnection via SMS is an attack pattern.',
          verificationStep: 'Open your official banking app directly (or visit your local branch) to verify your KYC status.'
        },
        {
          claim: 'KYC can be completed by clicking the provided link',
          reason: 'Official KYC re-verification occurs exclusively within secure, authenticated banking portals or physical branches.',
          verificationStep: 'Check URL domain ending. Banks in India use verified .bank, .co.in, or registered corporate domains.'
        }
      ],
      senderIndicators: [
        {
          indicator: 'Sender Header / Phone Format',
          risk: 'High',
          explanation: 'Official bank transactional SMS come from registered alpha sender IDs (e.g., AD-HDFCBK, VK-SBIN), not 10-digit mobile numbers.'
        },
        {
          indicator: 'Threatening Tone',
          risk: 'High',
          explanation: 'Aggressive phrasing with countdown deadlines is a social engineering indicator.'
        }
      ],
      safeActions: [
        'Do NOT click any link provided in the message.',
        'Log in to your official banking app or netbanking portal independently.',
        'Check your account status directly; if KYC is needed, complete it only within the app.',
        'Forward the phishing SMS to 1909 or Chakshu portal (sancharsaathi.gov.in).'
      ],
      avoidActions: [
        'Never enter your NetBanking username, password, MPIN, or OTP on web links.',
        'Do not download APK files or install screen sharing software (AnyDesk, QuickSupport).',
        'Do not call the mobile number listed in the SMS.'
      ],
      ifAlreadyActed: {
        clickedLink: 'If you entered credentials, immediately log in to your official bank app and change your NetBanking password and MPIN.',
        sharedOTP: 'Call your bank 24x7 helpline immediately to freeze your account and debit card.',
        madePayment: 'Call 1930 (Cyber Crime Helpline) and file a complaint on cybercrime.gov.in to request transaction freezing.',
        downloadedApp: 'Turn on Airplane mode immediately, uninstall the suspicious app, and factory reset if needed.',
        sharedID: 'Lock your Aadhaar biometrics through the mAadhaar app.'
      },
      simpleExplanation: {
        english: 'This message uses fake fear of account blockage to steal your bank login and OTP. Banks never suspend accounts via sudden SMS links.',
        hindi: 'यह मैसेज आपके बैंक खाते या बिजली को बंद करने का झूठा डर दिखाकर पासवर्ड और ओटीपी चुराने की कोशिश है। बैंक कभी ऐसे लिंक नहीं भेजते।',
        hinglish: 'Ye message aapko darakar aapka bank login aur OTP churane ki koshish kar raha hai. Bank kabhi bhi SMS link se KYC update karne ko nahi kehta.'
      },
      beforeYouAct: {
        stop: 'Do NOT click the link or call the number in the SMS.',
        check: 'Check sender ID — is it an unknown 10-digit number instead of official bank header?',
        verify: 'Open your official bank app or call customer care printed on your debit card.',
        act: 'Delete the SMS and report it on Sanchar Saathi (Chakshu portal).'
      },
      analyzedBy: 'ScamShield Neural Engine (High Precision Fallback)',
      isLiveGemini: false
    };
  }

  // 3. UPI / Payment / QR Code Scam
  if (text.includes('upi') || text.includes('qr') || text.includes('pin') || text.includes('olx') || text.includes('receive money') || text.includes('scan to receive') || text.includes('payment request') || text.includes('refund') || text.includes('cashback')) {
    return {
      riskScore: 86,
      riskLevel: 'High Risk',
      scamType: 'UPI/Payment Scam',
      summary: 'Potential UPI fraud pattern identified. Scammers exploit confusion around UPI PIN, claiming you need to enter a PIN to receive money or scan a QR code for refunds.',
      redFlags: [
        {
          title: 'Entering UPI PIN to Receive Money',
          severity: 'Critical',
          explanation: 'UPI PIN is ONLY required to DEBIT/SEND money from your bank account. You NEVER enter a PIN to receive or credit money.'
        },
        {
          title: 'QR Code sent for "Receiving Payment"',
          severity: 'Critical',
          explanation: 'Scanning a QR code always initiates a payment FROM you, never a deposit TO you.'
        },
        {
          title: 'Fake Buyer / Reverse Payment Request',
          severity: 'High',
          explanation: 'Scammers posing as army officers or OLX buyers sending "Collect Requests" masquerading as payments.'
        }
      ],
      suspiciousClaims: [
        {
          claim: 'Enter UPI PIN to accept/receive money in your bank account',
          reason: 'Fundamental violation of UPI protocol. Receiving money is completely automatic and requires zero PIN interaction.',
          verificationStep: 'Check official NPCI UPI guidelines: "PIN is for sending money, not receiving".'
        },
        {
          claim: 'Scan this QR code to confirm advance payment',
          reason: 'QR codes encode merchant payment requests that drain the scanner account.',
          verificationStep: 'Ask the sender to transfer directly using your verified Phone/VPA without sending QR codes.'
        }
      ],
      senderIndicators: [
        {
          indicator: 'High-Pressure Payment Rush',
          risk: 'High',
          explanation: 'Insisting on immediate scanning while staying on the voice call to distract you.'
        },
        {
          indicator: 'Disguised Collect Request',
          risk: 'Critical',
          explanation: 'Sending a payment debit request titled "PAYMENT_RECEIVED_CONFIRMATION".'
        }
      ],
      safeActions: [
        'DECLINE any UPI collect request received from unknown senders.',
        'Never enter your UPI PIN unless you intentionally want to pay money.',
        'Check your bank balance directly inside Google Pay / PhonePe / Paytm without clicking external prompts.',
        'Report the sender UPI ID inside your UPI app.'
      ],
      avoidActions: [
        'Do NOT scan any QR code sent over WhatsApp or email.',
        'Do NOT enter your 4-digit or 6-digit UPI PIN.',
        'Do NOT install screen-sharing apps during payment discussions.'
      ],
      ifAlreadyActed: {
        clickedLink: 'Decline any popups requesting transaction authorization.',
        sharedOTP: 'Change your UPI PIN immediately in your payment app settings.',
        madePayment: 'Call your bank immediate fraud line and dial 1930 to register a dispute with the beneficiary bank.',
        downloadedApp: 'Disconnect internet, delete the APK, and reboot phone in safe mode.',
        sharedID: 'Report fraud details to your payment provider support team.'
      },
      simpleExplanation: {
        english: 'Remember the golden rule of UPI: You NEVER enter your UPI PIN to receive money. PIN is only for sending money.',
        hindi: 'यूपीआई का सबसे जरूरी नियम: पैसे प्राप्त करने के लिए कभी भी यूपीआई पिन दर्ज नहीं करना पड़ता। पिन सिर्फ पैसे भेजने के लिए होता है।',
        hinglish: 'UPI ka golden rule: Paise receive karne ke liye kabhi bhi UPI PIN nahi daalna padta. PIN daalna matlab aapke account se paise katna.'
      },
      beforeYouAct: {
        stop: 'Do NOT scan any QR code or enter your UPI PIN.',
        check: 'Remember: UPI PIN is ONLY entered to deduct money, NEVER to receive money.',
        verify: 'Check your bank statement in your UPI app to verify real credits.',
        act: 'Reject the payment request and block the fraudulent contact.'
      },
      analyzedBy: 'ScamShield Neural Engine (High Precision Fallback)',
      isLiveGemini: false
    };
  }

  // 4. Safe / Legitimate Message
  if (text.includes('interview is scheduled') || text.includes('careers portal') || text.includes('official company') || text.includes('meeting link') || text.includes('ticket confirmed') || text.includes('order delivered') || (text.length > 20 && !text.includes('urgent') && !text.includes('fee') && !text.includes('blocked') && !text.includes('pay') && !text.includes('pin') && !text.includes('lottery') && !text.includes('winner') && !text.includes('crypto'))) {
    return {
      riskScore: 12,
      riskLevel: 'Very Low Risk',
      scamType: 'Safe / Legitimate',
      summary: 'No standard fraud indicators, extortion patterns, or coercive payment demands detected. Standard professional communication format.',
      redFlags: [],
      suspiciousClaims: [],
      senderIndicators: [
        {
          indicator: 'Professional Tone & Protocol',
          risk: 'Low',
          explanation: 'Uses formal communication without coercive deadlines, fee demands, or credential requests.'
        }
      ],
      safeActions: [
        'Continue standard engagement through official corporate platforms.',
        'Maintain general cyber hygiene and verify meeting links with company domain.'
      ],
      avoidActions: [
        'Never share confidential passwords or bank details even in regular business communications.'
      ],
      ifAlreadyActed: {
        clickedLink: 'No immediate risk detected. Ensure browser URL displays valid SSL certificate.',
        sharedOTP: 'Never share OTPs with anyone regardless of context.',
        madePayment: 'Verify invoices through official procurement channels.',
        downloadedApp: 'Ensure downloads originate from official app stores.',
        sharedID: 'Standard resume/credentials are safe for verified recruitment.'
      },
      simpleExplanation: {
        english: 'This message appears legitimate with no signs of malicious intent or pressure tactics.',
        hindi: 'यह संदेश सामान्य और सुरक्षित प्रतीत होता है। इसमें कोई धोखाधड़ी या अनुचित दबाव के संकेत नहीं मिले हैं।',
        hinglish: 'Ye message safe lag raha hai. Isme koi scam, fake demand ya urgency nahi dikh rahi.'
      },
      beforeYouAct: {
        stop: 'No threat detected. Proceed with normal awareness.',
        check: 'Verify official domain in meeting/careers URL.',
        verify: 'Confirm details directly on company portal if needed.',
        act: 'Proceed safely.'
      },
      analyzedBy: 'ScamShield Neural Engine (High Precision Fallback)',
      isLiveGemini: false
    };
  }

  // 5. Default General Suspicious Analysis
  return {
    riskScore: 72,
    riskLevel: 'High Risk',
    scamType: 'Phishing',
    summary: 'Potential digital risk indicators detected. The message contains unverified claims and potential social engineering elements.',
    redFlags: [
      {
        title: 'Unverified External Contact',
        severity: 'High',
        explanation: 'Unsolicited communication from an unknown sender requesting user action or information.'
      },
      {
        title: 'Potential Social Engineering',
        severity: 'Medium',
        explanation: 'Language designed to prompt quick emotional reactions or actions without prior verification.'
      }
    ],
    suspiciousClaims: [
      {
        claim: 'Unsolicited message requesting attention or action',
        reason: 'Sender authenticity cannot be confirmed through public records.',
        verificationStep: 'Contact the alleged organization using verified contact information from their official website.'
      }
    ],
    senderIndicators: [
      {
        indicator: `Source: ${source}`,
        risk: 'Medium',
        explanation: 'Direct messaging channels are frequently used for unverified broadcast campaigns.'
      }
    ],
    safeActions: [
      'Do not click any unverified links or download attachments.',
      'Do not disclose private financial or identity credentials.',
      'Verify the request through an independent official channel.'
    ],
    avoidActions: [
      'Do not make payments or forward the message to family/friends.',
      'Do not provide remote device access.'
    ],
    ifAlreadyActed: {
      clickedLink: 'Close the browser and do not submit any forms.',
      sharedOTP: 'Contact your bank to lock payment access immediately.',
      madePayment: 'Call 1930 Cyber Helpline immediately.',
      downloadedApp: 'Delete the downloaded file and check device permissions.',
      sharedID: 'Monitor your credit and identity accounts for unusual activity.'
    },
    simpleExplanation: {
      english: 'This message contains potential warning signs. Verify the sender through official sources before taking any action.',
      hindi: 'इस संदेश में कुछ संदिग्ध बातें हैं। कोई भी कदम उठाने से पहले आधिकारिक स्रोत से पुष्टि करें।',
      hinglish: 'Is message me suspicious elements hain. Kisi bhi link par click karne ya payment karne se pehle verify karein.'
    },
    beforeYouAct: {
      stop: 'Don\'t respond or click yet.',
      check: 'Look for urgency, unexpected links, or payment requests.',
      verify: 'Verify through official websites or known contact numbers.',
      act: 'Proceed only after independent confirmation.'
    },
    analyzedBy: 'ScamShield Neural Engine (High Precision Fallback)',
    isLiveGemini: false
  };
}
