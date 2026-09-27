import React, { useState } from 'react';
import { 
  BookOpen, ShieldCheck, AlertTriangle, CheckCircle2, XCircle, 
  HelpCircle, ExternalLink, Phone, Lock, ChevronRight, Award, Sparkles, RefreshCw 
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  scenario: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  scamType: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario: "A buyer on OLX sends you a QR code on WhatsApp saying: 'Scan this code and enter your UPI PIN to receive ₹5,000 advance for your bicycle.' What should you do?",
    options: [
      "Scan the QR code immediately to receive the ₹5,000",
      "Enter a 4-digit PIN instead of a 6-digit PIN",
      "Decline immediately. You NEVER enter a UPI PIN to receive money",
      "Ask them to send a test payment of ₹1 first"
    ],
    correctAnswer: 2,
    explanation: "Golden Rule of UPI: UPI PIN is ONLY required to DEBIT/SEND money from your account. Receiving money is automatic and never requires a PIN or QR scan.",
    scamType: "UPI/Payment Scam"
  },
  {
    id: 2,
    scenario: "You receive an SMS: 'Dear Customer, your electricity will be disconnected tonight at 9:30 PM due to unpaid bill. Call 98765-XXXXX immediately to avoid power cut.' What is the safest step?",
    options: [
      "Call the number in the SMS to explain that you already paid",
      "Install the QuickSupport / AnyDesk app they ask for over the phone",
      "Ignore the number in SMS; check your status directly on the official DISCOM website or mobile app",
      "Forward the SMS to your neighbors to warn them"
    ],
    correctAnswer: 2,
    explanation: "Utility providers never threaten same-day disconnection via mobile SMS. Scammers use fear to make you call fake helpline numbers and install screen-sharing software.",
    scamType: "KYC / Utility Scam"
  },
  {
    id: 3,
    scenario: "A Telegram contact offers a part-time job: 'Earn ₹3,000/day by liking YouTube videos. First, pay ₹999 refundable registration fee to activate your account.' Is this legitimate?",
    options: [
      "Yes, because the registration fee is refundable",
      "No. Legitimate employers NEVER charge upfront fees or deposits for work",
      "Yes, if they show you screenshots of other people getting paid",
      "Yes, if they give you a task ID"
    ],
    correctAnswer: 1,
    explanation: "Recruitment scams always ask for upfront 'registration', 'training', or 'crypto task' deposits. Once you pay, they invent new charges or freeze your account.",
    scamType: "Job / Task Scam"
  },
  {
    id: 4,
    scenario: "Someone in a police uniform on a WhatsApp video call tells you: 'You are under Digital Arrest because a parcel with narcotics in your name was seized by Customs. Transfer your savings to RBI safe account for verification.' What is the reality?",
    options: [
      "There is no legal concept of 'Digital Arrest' in Indian Law. Police & CBI never conduct trials on Skype/WhatsApp",
      "Transfer money immediately to prove you are innocent",
      "Stay on the call for 24 hours until clearance is given",
      "Send your Aadhaar copy to the WhatsApp number"
    ],
    correctAnswer: 0,
    explanation: "The Supreme Court, MHA, and Police have repeatedly clarified: 'Digital Arrest' is a 100% fraud tactic. Law enforcement agencies never demand money transfers or conduct arrests over video calls.",
    scamType: "Impersonation Scam"
  },
  {
    id: 5,
    scenario: "You get a text with a link 'http://sbi-kyc-update-portal.online'. How can you verify if this domain is authentic?",
    options: [
      "If the website has the official bank logo, it is 100% genuine",
      "Official bank websites use verified corporate domains (like .co.in, .bank.sbi), not cheap TLDs like .online or .xyz",
      "If it asks for OTP, it is verified",
      "If the HTTPS padlock is green, the sender is trustworthy"
    ],
    correctAnswer: 1,
    explanation: "Scammers clone logos easily and can obtain free SSL padlocks. Always inspect the domain name itself — banks never host KYC portals on free generic domains.",
    scamType: "Phishing"
  }
];

const ENCYCLOPEDIA = [
  {
    title: 'Work-from-Home & Task Frauds',
    category: 'Job Scam',
    icon: '💼',
    dangerLevel: 'Critical',
    tactics: [
      'Offers ₹45,000/month or ₹3,000/day for minimal tasks like liking videos or data entry.',
      'Demands ₹499 - ₹2,500 upfront registration or equipment fee.',
      'Initial payout of ₹150 is given to build false confidence, followed by demands for ₹50,000 crypto VIP tasks.'
    ],
    defense: 'Never pay money to get a job. Verified companies conduct formal interviews and do not charge applicants.'
  },
  {
    title: 'UPI Reverse QR & Collect Traps',
    category: 'Payment Scam',
    icon: '💳',
    dangerLevel: 'Critical',
    tactics: [
      'OLX / Marketplace buyer sends QR code to "receive advance money".',
      'Sends a Collect Request titled "Received_Payment_Confirmation".',
      'Pressures you over continuous phone call so you do not read the debit prompt.'
    ],
    defense: 'Never enter your UPI PIN to receive money. Entering PIN ALWAYS deducts money from your account.'
  },
  {
    title: 'Electricity & Bank KYC Deactivations',
    category: 'KYC Scam',
    icon: '🏦',
    dangerLevel: 'High',
    tactics: [
      'Claims "Account / Power will be cut tonight at 9:30 PM".',
      'Provides an unknown mobile number or unverified link (e.g. sbi-kyc.online).',
      'Asks to install AnyDesk, QuickSupport, or suspicious APK file.'
    ],
    defense: 'Only update KYC inside your official authenticated banking app or branch. Ignore urgent SMS threats.'
  },
  {
    title: 'Digital Arrest & Video Call Extortion',
    category: 'Impersonation Scam',
    icon: '👮',
    dangerLevel: 'Critical',
    tactics: [
      'Fake police/CBI/Customs officers on WhatsApp video call in staged police room.',
      'Claims a parcel with illegal drugs or fake passport has your name.',
      'Threatens immediate imprisonment unless savings are moved to "RBI Safe Account".'
    ],
    defense: 'Indian law has NO concept of Digital Arrest. Police never interrogate or demand funds over video calls. Hang up and dial 1930.'
  },
  {
    title: 'Courier Parcel Address Redirection Fee',
    category: 'Delivery Scam',
    icon: '📦',
    dangerLevel: 'Medium',
    tactics: [
      'Fake India Post / DHL / FedEx SMS claiming "Package held due to missing house number".',
      'Asks to pay a nominal ₹5 or ₹10 re-delivery fee on a phishing page.',
      'Captures your debit/credit card number, CVV, and OTP to drain thousands.'
    ],
    defense: 'Check your order status directly on the merchant app where you shopped (Amazon, Flipkart, etc.).'
  }
];

export const LearnSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'quiz' | 'helplines'>('encyclopedia');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleOptionSelect = (idx: number) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Fraud Education & Safety Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Scam Knowledge & Simulator
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Master the anatomy of digital frauds, test your awareness with our interactive simulator, and access official emergency helplines.
            </p>
          </div>

          {/* Navigation Subtabs */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('encyclopedia')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'encyclopedia' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Scam Directory
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'quiz' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Spot the Scam Quiz
            </button>
            <button
              onClick={() => setActiveTab('helplines')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'helplines' ? 'bg-cyan-500 text-black shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Helpline Directory
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Scam Encyclopedia */}
      {activeTab === 'encyclopedia' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ENCYCLOPEDIA.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-panel p-6 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                      {item.icon}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    item.dangerLevel === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  }`}>
                    {item.dangerLevel}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                    Common Scammer Tactics:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {item.tactics.map((tac, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span className="leading-relaxed">{tac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200">
                <strong className="text-emerald-400 block mb-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Your Defense Strategy:
                </strong>
                {item.defense}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Spot the Scam Interactive Quiz */}
      {activeTab === 'quiz' && (
        <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-cyan-500/30 max-w-3xl mx-auto space-y-6">
          {!quizCompleted ? (
            <div>
              {/* Quiz Progress */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                <span className="font-bold text-cyan-400 uppercase tracking-wider">
                  Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-slate-400">
                  Current Score: <strong className="text-emerald-400">{score}</strong> / {currentQuestionIdx}
                </span>
              </div>

              {/* Question Scenario */}
              <div className="py-5 space-y-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-slate-900 text-amber-400 border border-amber-500/30">
                  Scenario: {currentQ.scamType}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                  {currentQ.scenario}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  let optionClass = 'border-slate-800 bg-slate-900/70 hover:border-cyan-500/40 text-slate-200';
                  
                  if (selectedOption === idx) {
                    optionClass = 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-md shadow-cyan-500/20';
                  }

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctAnswer) {
                      optionClass = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 font-bold';
                    } else if (selectedOption === idx) {
                      optionClass = 'border-red-500 bg-red-950/60 text-red-200';
                    } else {
                      optionClass = 'border-slate-800 bg-slate-950/40 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${optionClass}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Banner */}
              {isAnswerSubmitted && (
                <div className={`mt-5 p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                  selectedOption === currentQ.correctAnswer
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-red-950/40 border-red-500/40 text-red-200'
                }`}>
                  <strong className="block mb-1 text-sm font-bold">
                    {selectedOption === currentQ.correctAnswer ? '🎉 Correct!' : '⚠️ Incorrect!'}
                  </strong>
                  {currentQ.explanation}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-800 mt-6">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="px-6 py-2.5 rounded-xl bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-400 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-black font-bold text-xs shadow-lg transition-all"
                  >
                    <span>{currentQuestionIdx + 1 === QUIZ_QUESTIONS.length ? 'View Results' : 'Next Scenario'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center mx-auto text-black shadow-xl shadow-cyan-500/30">
                <Award className="w-9 h-9 text-white" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-white">
                  Quiz Completed!
                </h3>
                <p className="text-sm text-slate-300">
                  You scored <strong className="text-cyan-400 text-lg">{score}</strong> out of <strong className="text-white text-lg">{QUIZ_QUESTIONS.length}</strong>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                {score === 5 && '🏆 Exceptional Fraud Immunity! You spot subtle digital traps effortlessly.'}
                {score >= 3 && score < 5 && '🛡️ Strong Awareness! Keep checking links and remembering UPI PIN rules.'}
                {score < 3 && '⚠️ High Risk Profile. Always pause and use ScamShield AI before responding to unknown messages.'}
              </div>

              <button
                onClick={handleRestartQuiz}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-lg transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Official Helpline Directory */}
      {activeTab === 'helplines' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl glass-panel p-6 border border-red-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
                  <Phone className="w-6 h-6 animate-pulse" />
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40">
                  24x7 Toll Free
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                National Cyber Crime Helpline (1930)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Operated by the Ministry of Home Affairs (MHA). Dial immediately within the "Golden Hour" of a fraudulent bank/UPI debit to freeze beneficiary accounts.
              </p>
            </div>
            <a
              href="tel:1930"
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow transition-colors"
            >
              Call 1930 Helpline
            </a>
          </div>

          <div className="rounded-2xl glass-panel p-6 border border-cyan-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <ExternalLink className="w-6 h-6" />
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  Official Portal
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Cyber Crime Reporting Portal
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                File formal police complaints for online financial fraud, cyber stalking, identity theft, or impersonation scams.
              </p>
            </div>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow transition-colors"
            >
              Visit cybercrime.gov.in
            </a>
          </div>

          <div className="rounded-2xl glass-panel p-6 border border-indigo-500/30 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <ShieldCheck className="w-6 h-6" />
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/40">
                  DoT Initiative
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Chakshu (Sanchar Saathi)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Report suspected fraudulent communications received via calls, SMS, or WhatsApp (like fake KYC, electricity cuts, or courier traps).
              </p>
            </div>
            <a
              href="https://sancharsaathi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow transition-colors"
            >
              Report on Chakshu
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
