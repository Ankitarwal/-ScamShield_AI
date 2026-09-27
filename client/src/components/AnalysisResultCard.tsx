import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, Flag, CheckCircle2, XCircle, 
  HelpCircle, Globe, Share2, Printer, ExternalLink, ArrowRight,
  ChevronDown, ChevronUp, Lock, RefreshCw, Sparkles, Building, Phone, Mail, Link as LinkIcon
} from 'lucide-react';
import { AnalysisResult } from '../types';
import { BeforeYouActCard } from './BeforeYouActCard';

interface AnalysisResultCardProps {
  result: AnalysisResult;
  onReportToRadar: (result: AnalysisResult) => void;
  onClear: () => void;
}

export const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({
  result,
  onReportToRadar,
  onClear
}) => {
  const [selectedLang, setSelectedLang] = useState<'hinglish' | 'hindi' | 'english'>('hinglish');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('clickedLink');
  const [copiedLink, setCopiedLink] = useState(false);

  const getRiskColor = (score: number) => {
    if (score <= 20) return { text: 'text-emerald-400', bg: 'bg-emerald-500/15', border: 'border-emerald-500/40', glow: 'shadow-emerald-500/20', fill: '#10b981' };
    if (score <= 40) return { text: 'text-teal-400', bg: 'bg-teal-500/15', border: 'border-teal-500/40', glow: 'shadow-teal-500/20', fill: '#14b8a6' };
    if (score <= 60) return { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/40', glow: 'shadow-amber-500/20', fill: '#f59e0b' };
    if (score <= 80) return { text: 'text-orange-400', bg: 'bg-orange-500/15', border: 'border-orange-500/40', glow: 'shadow-orange-500/20', fill: '#f97316' };
    return { text: 'text-red-400', bg: 'bg-red-500/15', border: 'border-red-500/40', glow: 'shadow-red-500/20', fill: '#ef4444' };
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const riskColor = getRiskColor(result.riskScore);
  const circumference = 2 * Math.PI * 46;
  const strokeDashoffset = circumference - (result.riskScore / 100) * circumference;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `ScamShield AI Analysis: Detected ${result.scamType} with Risk Score ${result.riskScore}/100 (${result.riskLevel}). Stay safe: https://scamshield.ai`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Top Executive Risk Header Card */}
      <div className={`rounded-2xl p-6 sm:p-8 border ${riskColor.border} ${riskColor.bg} backdrop-blur-xl shadow-2xl relative overflow-hidden`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Summary & Scam Type */}
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold text-slate-200 uppercase tracking-wider">
                <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                <span>Detected Category:</span>
                <strong className="text-cyan-300 ml-1">{result.scamType}</strong>
              </span>

              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${riskColor.border} ${riskColor.text} bg-black/40`}>
                {result.riskLevel}
              </span>

              {result.source && (
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-900/60 border border-slate-800 text-slate-400">
                  Channel: {result.source}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {result.summary}
            </h2>

            {/* Mandatory Disclaimer */}
            <div className="flex items-center space-x-2 text-xs text-slate-300/90 pt-1">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <p className="font-medium italic">
                “AI risk assessment — verify independently before taking action.”
              </p>
            </div>
          </div>

          {/* Right: Circular Risk Score Meter */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/40 border border-slate-800/80 min-w-[200px] shrink-0">
            <div className="relative flex items-center justify-center w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  stroke={riskColor.fill}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={`text-3xl sm:text-4xl font-black ${riskColor.text} font-display`}>
                  {result.riskScore}
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Risk Score
                </span>
              </div>
            </div>

            <div className="mt-2 text-center">
              <span className={`text-xs font-bold ${riskColor.text}`}>
                {result.riskScore <= 20 ? 'Safe Profile' : result.riskScore <= 60 ? 'Caution Advised' : 'High Threat Probability'}
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                {result.analyzedBy || 'Gemini AI Engine'}
              </p>
            </div>
          </div>
        </div>

        {/* Action toolbar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3 text-slate-400">
            <span>Scan Time: {new Date(result.analyzedAt || Date.now()).toLocaleTimeString()}</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Multi-Signal Scan
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onReportToRadar(result)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-semibold transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Contribute to Scam Radar</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Standout Feature: "BEFORE YOU ACT" Signature Protocol */}
      <BeforeYouActCard
        data={result.beforeYouAct}
        scamType={result.scamType}
      />

      {/* 3. Explain Like I'm New (Simple Language Explainer) */}
      <div className="rounded-2xl glass-panel p-6 border border-cyan-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Explain Like I'm New
              </h3>
              <p className="text-xs text-slate-400">
                Simple everyday breakdown for parents, students, and first-time digital users.
              </p>
            </div>
          </div>

          {/* Language Switcher Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setSelectedLang('hinglish')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedLang === 'hinglish'
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hinglish
            </button>
            <button
              onClick={() => setSelectedLang('hindi')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedLang === 'hindi'
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setSelectedLang('english')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedLang === 'english'
                  ? 'bg-indigo-500 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-slate-200 text-sm leading-relaxed">
          {selectedLang === 'hinglish' && (
            <p className="text-indigo-200 font-medium">
              💡 {result.simpleExplanation?.hinglish || 'Ye message aapse jaldi me paise ya details share karwane ki koshish kar raha hai. Official source se check karein.'}
            </p>
          )}
          {selectedLang === 'hindi' && (
            <p className="text-indigo-200 font-medium">
              💡 {result.simpleExplanation?.hindi || 'यह संदेश आपको जल्दबाजी में निर्णय लेने के लिए दबाव बना रहा है। किसी भी भुगतान से पहले आधिकारिक स्रोत से पुष्टि करें।'}
            </p>
          )}
          {selectedLang === 'english' && (
            <p className="text-indigo-200 font-medium">
              💡 {result.simpleExplanation?.english || 'This message attempts to pressure you into taking immediate unverified action. Always verify with official authorities.'}
            </p>
          )}
        </div>
      </div>

      {/* 4. Red Flags Detected Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flag className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Red Flags Detected ({result.redFlags?.length || 0})
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Psychological & technical fraud patterns
          </span>
        </div>

        {result.redFlags && result.redFlags.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.redFlags.map((flag, idx) => (
              <div
                key={idx}
                className="rounded-xl glass-panel p-4 border border-red-500/20 hover:border-red-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-bold text-sm text-white flex items-center gap-1.5">
                      <span className="text-red-400">🚩</span>
                      <span>{flag.title}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getSeverityBadge(flag.severity)}`}>
                      {flag.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {flag.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No overt red flags detected. Continue standard cyber hygiene.</span>
          </div>
        )}
      </div>

      {/* 5. Suspicious Claims ("Claims that need verification") */}
      {result.suspiciousClaims && result.suspiciousClaims.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Claims That Need Independent Verification
            </h3>
          </div>

          <div className="space-y-3">
            {result.suspiciousClaims.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl glass-panel p-4 border border-amber-500/30 grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                    Unverified Claim:
                  </span>
                  <p className="text-xs font-semibold text-slate-100">
                    "{item.claim}"
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Why it's suspicious:
                  </span>
                  <p className="text-xs text-slate-300">
                    {item.reason}
                  </p>
                </div>

                <div className="space-y-1 bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    How to verify:
                  </span>
                  <p className="text-xs text-emerald-200">
                    {item.verificationStep}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Sender Risk Analysis */}
      {result.senderIndicators && result.senderIndicators.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-extrabold text-white tracking-tight">
                Sender Risk Indicators
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Evaluated based on communication patterns
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {result.senderIndicators.map((ind, idx) => (
              <div
                key={idx}
                className="rounded-xl glass-panel p-3.5 border border-cyan-500/20 flex items-start space-x-3"
              >
                <div className="p-2 rounded-lg bg-slate-900 text-cyan-400 shrink-0">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-200">{ind.indicator}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getSeverityBadge(ind.risk)}`}>
                      {ind.risk} Risk
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ind.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Safe Action Plan: What you should do now vs What to avoid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DO THIS NOW */}
        <div className="rounded-2xl glass-card-emerald p-5 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 pb-2 border-b border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5" />
            <h4 className="text-base font-extrabold text-white">
              What You Should Do Now
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-200">
            {result.safeActions?.map((action, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold shrink-0 text-[11px] mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DO NOT DO THIS */}
        <div className="rounded-2xl glass-card-crimson p-5 space-y-3">
          <div className="flex items-center space-x-2 text-red-400 pb-2 border-b border-red-500/30">
            <XCircle className="w-5 h-5" />
            <h4 className="text-base font-extrabold text-white">
              What You Should NOT Do
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-200">
            {result.avoidActions?.map((action, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 text-red-400 font-bold shrink-0 text-[11px] mt-0.5">
                  ✕
                </span>
                <span className="leading-relaxed">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 8. If You Already Responded (Emergency Incident Recovery) */}
      <div className="rounded-2xl glass-panel p-6 border border-red-500/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-extrabold text-white">
              If You Already Responded — Emergency Incident Response
            </h3>
          </div>
          <span className="text-xs text-amber-400 font-semibold">
            Act immediately to mitigate loss
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Action 1: Clicked Link */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-red-400 block">
              1. If you clicked the link:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.ifAlreadyActed?.clickedLink || 'Close browser tab immediately. Do NOT enter passwords or OTPs on that page. Clear browsing history & cookies.'}
            </p>
          </div>

          {/* Action 2: Shared OTP / PIN */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-red-400 block">
              2. If you shared OTP / PIN:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.ifAlreadyActed?.sharedOTP || 'Immediately call bank helpline to block your card/account. Change NetBanking passwords and UPI MPIN instantly.'}
            </p>
          </div>

          {/* Action 3: Made Payment */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-red-400 block">
              3. If you made a payment:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.ifAlreadyActed?.madePayment || 'Dial 1930 (Cyber Crime Helpline) within 2 hours to freeze beneficiary account. File dispute with your bank.'}
            </p>
          </div>

          {/* Action 4: Downloaded App */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-amber-400 block">
              4. If you installed an app / APK:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.ifAlreadyActed?.downloadedApp || 'Turn on Airplane mode immediately. Go to Settings > Apps and uninstall the application. Revoke Accessibility permissions.'}
            </p>
          </div>

          {/* Action 5: Shared ID / Documents */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-amber-400 block">
              5. If you shared Aadhaar / PAN:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {result.ifAlreadyActed?.sharedID || 'Lock your Aadhaar biometrics on the UIDAI website / mAadhaar app to prevent unauthorized SIM activations or biometric loans.'}
            </p>
          </div>

          {/* Action 6: 1930 Helpline Quick Action */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-red-950/60 to-slate-900 border border-red-500/40 flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span>Call Cyber Helpline</span>
              </span>
              <p className="text-xs text-slate-300 mt-1">
                National Cyber Crime 24x7 Assistance:
              </p>
            </div>
            <a
              href="tel:1930"
              className="mt-2 inline-flex items-center justify-center py-1.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow transition-colors"
            >
              Dial 1930 Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
