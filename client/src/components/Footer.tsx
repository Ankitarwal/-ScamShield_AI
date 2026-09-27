import React from 'react';
import { Shield, PhoneCall, ExternalLink, Lock, Heart, AlertOctagon } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#05080f] border-t border-cyan-500/20 text-slate-400 mt-20 no-print">
      {/* Emergency Cybercrime Helpline Banner */}
      <div className="bg-gradient-to-r from-red-950/40 via-amber-950/30 to-red-950/40 border-b border-red-500/20 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                Victim of a Financial Cyber Scam? Act Within the Golden Hour
              </p>
              <p className="text-xs text-slate-300">
                Dial National Cyber Crime Helpline <span className="font-extrabold text-amber-400 text-sm">1930</span> or report at <span className="text-cyan-400 font-medium">cybercrime.gov.in</span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <span>Official Cyber Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://sancharsaathi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <span>Chakshu Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500 text-black font-bold">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                ScamShield <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-md font-medium">
              “Stop scams before they happen.”
            </p>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              ScamShield AI is an intelligent cybersecurity companion that analyzes suspicious messages, job offers, payment requests, and links using Google Gemini AI to safeguard users from financial and digital fraud.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy-First: In-Memory Processing & Zero PII Storage</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('analyze')} className="hover:text-cyan-400 transition-colors">
                  AI Scam Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('radar')} className="hover:text-cyan-400 transition-colors">
                  Community Scam Radar
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('learn')} className="hover:text-cyan-400 transition-colors">
                  Scam Safety Guides & Quiz
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('history')} className="hover:text-cyan-400 transition-colors">
                  Local Analysis Reports
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-cyan-400 transition-colors">
                  How ScamShield AI Works
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Safety & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Safety & Ethics
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              AI assessments are risk indicators, not legal determinations. Always verify through official channels before transferring funds or sharing credentials.
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center space-x-1.5 text-amber-400 font-semibold mb-1">
                <AlertOctagon className="w-3.5 h-3.5" />
                <span>Golden Security Rule</span>
              </div>
              Never share UPI PIN or OTP to receive money. Banks never call asking for MPINs.
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} ScamShield AI. Built for Digital Safety & Fraud Prevention.</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">Engineered with Google Gemini AI</span>
            <span>•</span>
            <span className="text-slate-400">Privacy Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
