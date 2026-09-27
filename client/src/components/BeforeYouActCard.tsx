import React, { useState } from 'react';
import { ShieldAlert, Octagon, CheckCircle2, Search, ArrowRight, Check } from 'lucide-react';
import { BeforeYouAct } from '../types';

interface BeforeYouActCardProps {
  data?: BeforeYouAct;
  scamType?: string;
  onVerifyCompleted?: () => void;
}

export const BeforeYouActCard: React.FC<BeforeYouActCardProps> = ({
  data = {
    stop: "Don't respond, click links, or pay yet.",
    check: "Look for urgency, payment requests, suspicious links, and unusual claims.",
    verify: "Contact the organization using its official website/app.",
    act: "Only proceed after independent verification."
  },
  scamType
}) => {
  const [checkedSteps, setCheckedSteps] = useState<{ [key: string]: boolean }>({});

  const toggleStep = (stepKey: string) => {
    setCheckedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const steps = [
    {
      key: 'stop',
      title: 'STOP',
      badge: 'Step 1',
      action: "Don't respond or pay yet",
      detail: data.stop,
      color: 'from-red-500/20 to-red-950/40 border-red-500/40 text-red-400',
      icon: Octagon,
      iconBg: 'bg-red-500/20 text-red-400'
    },
    {
      key: 'check',
      title: 'CHECK',
      badge: 'Step 2',
      action: 'Check the red flags',
      detail: data.check,
      color: 'from-amber-500/20 to-amber-950/40 border-amber-500/40 text-amber-400',
      icon: Search,
      iconBg: 'bg-amber-500/20 text-amber-400'
    },
    {
      key: 'verify',
      title: 'VERIFY',
      badge: 'Step 3',
      action: 'Official independent check',
      detail: data.verify,
      color: 'from-cyan-500/20 to-cyan-950/40 border-cyan-500/40 text-cyan-400',
      icon: CheckCircle2,
      iconBg: 'bg-cyan-500/20 text-cyan-400'
    },
    {
      key: 'act',
      title: 'ACT',
      badge: 'Step 4',
      action: 'Take safe action only',
      detail: data.act,
      color: 'from-emerald-500/20 to-emerald-950/40 border-emerald-500/40 text-emerald-400',
      icon: ShieldAlert,
      iconBg: 'bg-emerald-500/20 text-emerald-400'
    }
  ];

  const allCompleted = steps.every(s => checkedSteps[s.key]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0e172a] to-[#0a101f] border-2 border-cyan-500/40 p-6 shadow-2xl shadow-cyan-950/50">
      {/* Background cyber accent glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      
      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Signature Safety Protocol</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            BEFORE YOU ACT PROTOCOL
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Follow this 4-step golden rule before responding to {scamType ? `any ${scamType}` : 'suspicious requests'}.
          </p>
        </div>

        {allCompleted && (
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold animate-pulse">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Verification Complete! Safe to Proceed.</span>
          </div>
        )}
      </div>

      {/* 4 Interactive Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isChecked = checkedSteps[step.key];

          return (
            <div
              key={step.key}
              onClick={() => toggleStep(step.key)}
              className={`relative cursor-pointer transition-all duration-300 rounded-xl p-4 border bg-gradient-to-b ${step.color} ${
                isChecked
                  ? 'ring-2 ring-emerald-400 bg-emerald-950/40 border-emerald-500/60 scale-[1.02]'
                  : 'hover:scale-[1.01] hover:border-cyan-400/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg ${step.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {step.badge}
                    </span>
                    <h4 className="text-base font-extrabold tracking-wide text-white">
                      {step.title}
                    </h4>
                  </div>
                </div>

                {/* Interactive Checkbox */}
                <div
                  className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-emerald-500 border-emerald-400 text-black'
                      : 'border-slate-600 bg-slate-900/60 hover:border-slate-400'
                  }`}
                >
                  {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>

              <p className="text-xs font-semibold text-slate-200 mb-1.5">
                {step.action}
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {step.detail}
              </p>

              {idx < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-600 pointer-events-none">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
        <span>Click each step to track your safety verification checklist.</span>
        <span className="text-cyan-400 font-medium">Never let urgency force an unverified decision.</span>
      </div>
    </div>
  );
};
