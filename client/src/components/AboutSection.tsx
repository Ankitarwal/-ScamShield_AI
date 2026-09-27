import React from 'react';
import { Shield, Sparkles, Lock, Cpu, CheckCircle2, AlertOctagon, Heart, Terminal, ShieldAlert } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Product Mission & Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About ScamShield AI
          </h1>
          <p className="text-sm sm:text-base text-cyan-300 font-semibold font-display">
            “Stop scams before they happen – Proactive digital fraud prevention before harm occurs.”
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            In modern digital fraud, victims lose their life savings within minutes of receiving a deceptive WhatsApp message, fake job offer, or malicious APK. Most existing anti-fraud tools only react after the scam has completed. ScamShield AI empowers citizens with immediate, pre-action AI intelligence to detect red flags, understand risks, and verify through official channels before clicking links or sending payments.
          </p>
        </div>
      </div>

      {/* 4 Pillars of Product Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl glass-panel p-6 border border-cyan-500/20 space-y-3">
          <div className="flex items-center space-x-2.5 text-cyan-400">
            <Cpu className="w-6 h-6" />
            <h3 className="text-base font-extrabold text-white">
              Google Gemini AI Engine
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            ScamShield AI leverages Google Gemini's advanced multimodal reasoning to analyze complex social engineering language, disguised payment QR codes, fake job contracts, and urgency traps with precision.
          </p>
        </div>

        <div className="rounded-2xl glass-panel p-6 border border-emerald-500/20 space-y-3">
          <div className="flex items-center space-x-2.5 text-emerald-400">
            <Lock className="w-6 h-6" />
            <h3 className="text-base font-extrabold text-white">
              Privacy-First Architecture
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            User security and privacy are paramount. Screenshots are processed in RAM memory and never permanently written to disk. All community submissions undergo rigorous PII scrubbing.
          </p>
        </div>

        <div className="rounded-2xl glass-panel p-6 border border-amber-500/20 space-y-3">
          <div className="flex items-center space-x-2.5 text-amber-400">
            <ShieldAlert className="w-6 h-6" />
            <h3 className="text-base font-extrabold text-white">
              Before You Act Protocol
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Beyond binary scoring, ScamShield enforces a structured STOP → CHECK → VERIFY → ACT verification workflow to build psychological resistance against coercive urgency.
          </p>
        </div>

        <div className="rounded-2xl glass-panel p-6 border border-indigo-500/20 space-y-3">
          <div className="flex items-center space-x-2.5 text-indigo-400">
            <Terminal className="w-6 h-6" />
            <h3 className="text-base font-extrabold text-white">
              Community Scam Radar
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Real-time collective defense that maps evolving fraud vectors across India, alerting users to new work-from-home task frauds, fake electricity bills, and digital arrest tactics.
          </p>
        </div>
      </div>

      {/* Ethical AI Safety Guardrails */}
      <div className="rounded-2xl glass-panel p-6 border border-red-500/30 space-y-4">
        <div className="flex items-center space-x-2 text-red-400 pb-2 border-b border-slate-800">
          <AlertOctagon className="w-5 h-5" />
          <h3 className="text-base font-extrabold text-white">
            Ethical AI & Compliance Guardrails
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>No 100% Certainty Claims:</strong> AI output is presented as risk indicators, not definitive legal determinations.</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Non-Accusatory Language:</strong> Uses phrases like "Potential scam indicators detected" and "Needs independent verification".</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Zero Credential Harvesting:</strong> System never prompts users to provide actual passwords, OTPs, or bank PINs.</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Automatic PII Scrubber:</strong> Strips Indian phone numbers, emails, URLs, Aadhaar, PAN, and card numbers.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
