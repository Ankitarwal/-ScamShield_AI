import React from 'react';
import { Shield, Sparkles, Radio, ArrowRight, CheckCircle2, Lock, Search, Zap, AlertTriangle } from 'lucide-react';

interface HeroSectionProps {
  onStartAnalyze: () => void;
  onExploreRadar: () => void;
  onSelectDemo: (demoId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAnalyze,
  onExploreRadar,
  onSelectDemo
}) => {
  return (
    <div className="relative overflow-hidden py-12 lg:py-20">
      {/* Background radial cyber glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>Next-Gen AI Fraud Prevention Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Scam hone se <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
                pehle rokna.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Paste a suspicious message, job offer, email, or payment request. <strong className="text-white font-semibold">ScamShield AI</strong> analyzes the risk with Google Gemini, exposes the hidden red flags, and tells you exactly what to do next.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartAnalyze}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Sparkles className="w-5 h-5 text-black" />
                <span>Analyze a Message</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={onExploreRadar}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-sm sm:text-base border border-slate-700 hover:border-cyan-500/40 transition-all"
              >
                <Radio className="w-5 h-5 text-emerald-400" />
                <span>Explore Scam Trends</span>
              </button>
            </div>

            {/* 3 Simple Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 flex items-center space-x-2.5 text-left">
                <span className="text-xl">🔍</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Detect Claims</h4>
                  <p className="text-[11px] text-slate-400">Expose hidden traps</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 flex items-center space-x-2.5 text-left">
                <span className="text-xl">🛡️</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Understand Risk</h4>
                  <p className="text-[11px] text-slate-400">0–100 AI score & flags</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 flex items-center space-x-2.5 text-left">
                <span className="text-xl">⚡</span>
                <div>
                  <h4 className="text-xs font-bold text-white">Take Safe Action</h4>
                  <p className="text-[11px] text-slate-400">Step-by-step guidance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Cyber Shield & AI Scanner Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Cyber Glow Card */}
              <div className="rounded-3xl glass-panel p-6 border-2 border-cyan-500/30 shadow-2xl relative overflow-hidden">
                {/* Radar Grid Animation overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>

                {/* Animated Scanner Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                    </span>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest font-mono">
                      GEMINI NEURAL SHIELD
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                    REALTIME OCR
                  </span>
                </div>

                {/* Central Shield Hologram */}
                <div className="py-8 flex flex-col items-center justify-center relative">
                  {/* Outer Pulsing Rings */}
                  <div className="absolute w-44 h-44 rounded-full border border-cyan-500/20 animate-ping opacity-25 pointer-events-none"></div>
                  <div className="absolute w-56 h-56 rounded-full border border-indigo-500/20 animate-pulse pointer-events-none"></div>

                  {/* Shield Centerpiece */}
                  <div className="relative w-28 h-28 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-indigo-600 p-0.5 shadow-2xl shadow-cyan-500/40 flex items-center justify-center group animate-float">
                    <div className="w-full h-full bg-[#090e1c] rounded-2xl flex flex-col items-center justify-center space-y-1">
                      <Shield className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black tracking-widest text-cyan-300 uppercase">
                        PROTECTED
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 text-center space-y-1">
                    <h3 className="text-base font-bold text-white">
                      Instant Multimodal Fraud Scanner
                    </h3>
                    <p className="text-xs text-slate-400 max-w-xs">
                      Analyzes text messages, WhatsApp forwards, payment QR codes, and job offers.
                    </p>
                  </div>
                </div>

                {/* Floating Threat Detector Badges */}
                <div className="space-y-2.5 relative z-10 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-slate-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-400">🚩</span>
                      <span className="font-semibold text-slate-100">Upfront Fee Demand</span>
                    </div>
                    <span className="text-[10px] font-bold text-red-400 uppercase bg-red-500/20 px-2 py-0.5 rounded">
                      High Risk
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-slate-200">
                    <div className="flex items-center space-x-2">
                      <span className="text-amber-400">⏱️</span>
                      <span className="font-semibold text-slate-100">False Urgency Pressure</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/20 px-2 py-0.5 rounded">
                      Warning
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
