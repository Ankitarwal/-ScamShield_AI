import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, Lock, EyeOff, Trash2 } from 'lucide-react';

interface PrivacyNoticeProps {
  onClearAnalysis?: () => void;
  hasActiveAnalysis?: boolean;
}

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({
  onClearAnalysis,
  hasActiveAnalysis = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <span>Your Safety Comes First</span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold">
                Privacy Guaranteed
              </span>
            </h4>
            <p className="text-xs text-slate-300">
              Messages are processed in-memory for fraud analysis. Never submit passwords, PINs, or raw OTPs.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end sm:self-auto">
          {hasActiveAnalysis && onClearAnalysis && (
            <button
              onClick={onClearAnalysis}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-950/60 hover:text-red-300 text-slate-300 border border-slate-700 hover:border-red-500/40 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Analysis</span>
            </button>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-medium transition-colors"
          >
            <span>{isOpen ? 'Hide Privacy Details' : 'View Privacy Rules'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-cyan-500/15 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <Lock className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-100 block mb-0.5">In-Memory AI Processing</strong>
              Uploaded screenshots and message texts are analyzed directly and discarded. No raw images are retained.
            </div>
          </div>

          <div className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <EyeOff className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-100 block mb-0.5">Automated PII Sanitization</strong>
              Community statistics aggregate only high-level signals. Phone numbers, emails, and account details are stripped.
            </div>
          </div>

          <div className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-100 block mb-0.5">Local Storage Control</strong>
              Your scan history is stored exclusively in your browser's localStorage and can be wiped with one click.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
