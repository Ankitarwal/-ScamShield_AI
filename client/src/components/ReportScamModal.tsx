import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Eye, AlertCircle, Check, Send } from 'lucide-react';
import { sanitizeClientPII } from '../services/api';
import { MessageSource } from '../types';

interface ReportScamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (data: {
    rawMessage: string;
    scamType: string;
    channel: string;
    riskLevel: string;
    riskScore: number;
    notes?: string;
  }) => Promise<void>;
  prefilledData?: {
    rawMessage?: string;
    scamType?: string;
    source?: string;
    riskLevel?: string;
    riskScore?: number;
  };
}

export const ReportScamModal: React.FC<ReportScamModalProps> = ({
  isOpen,
  onClose,
  onSubmitReport,
  prefilledData
}) => {
  const [message, setMessage] = useState(prefilledData?.rawMessage || '');
  const [scamType, setScamType] = useState(prefilledData?.scamType || 'Job/Recruitment Scam');
  const [channel, setChannel] = useState<MessageSource>((prefilledData?.source as MessageSource) || 'WhatsApp');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const sanitizedPreview = sanitizeClientPII(message);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !notes.trim()) {
      setError('Please provide the message text or pattern details.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmitReport({
        rawMessage: message,
        scamType,
        channel,
        riskLevel: prefilledData?.riskLevel || 'High Risk',
        riskScore: prefilledData?.riskScore || 85,
        notes
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0b1222] border border-cyan-500/40 p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">
                Contribute Anonymized Scam Pattern
              </h3>
              <p className="text-xs text-slate-400">
                Help protect fellow citizens by reporting trending fraud tactics to Scam Radar.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Privacy Notice Banner */}
        <div className="my-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start space-x-2.5 text-xs text-slate-300">
          <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-cyan-300 block">Strict Privacy Guarantee:</strong>
            All phone numbers, emails, names, bank credentials, and tracking links are automatically stripped before storage. No personal data is ever displayed on the community radar.
          </div>
        </div>

        {success ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">
              Pattern Anonymously Submitted!
            </h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Thank you for strengthening community defense. The sanitized pattern has been added to Scam Radar intelligence.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Scam Category:
                </label>
                <select
                  value={scamType}
                  onChange={(e) => setScamType(e.target.value)}
                  className="w-full text-xs rounded-xl bg-slate-900 border border-slate-700 p-2.5 text-slate-200 outline-none focus:border-cyan-400"
                >
                  <option value="Job/Recruitment Scam">Job / Recruitment Scam</option>
                  <option value="UPI/Payment Scam">UPI / Payment Scam</option>
                  <option value="KYC Scam">KYC / Bank Suspension Scam</option>
                  <option value="Investment Scam">Investment / Crypto Scam</option>
                  <option value="Impersonation Scam">Impersonation / Police / Digital Arrest</option>
                  <option value="Delivery Scam">Delivery / Courier Parcel Scam</option>
                  <option value="Loan Scam">Loan / Instant Money App Scam</option>
                  <option value="Lottery/Prize Scam">Lottery / KBC Prize Scam</option>
                  <option value="Phishing">Phishing / Credential Harvesting</option>
                  <option value="Other">Other Suspicious Activity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Platform / Channel:
                </label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as MessageSource)}
                  className="w-full text-xs rounded-xl bg-slate-900 border border-slate-700 p-2.5 text-slate-200 outline-none focus:border-cyan-400"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="SMS">SMS</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Email">Email</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Job Portal">Job Portal</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Suspicious Message / Tactic Description:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Paste the message content or describe the scam tactic..."
                className="w-full text-xs rounded-xl bg-slate-900 border border-slate-700 p-3 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>

            {/* Real-time PII Sanitizer Preview */}
            {message && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Real-time Sanitized Preview (What will be stored):</span>
                </span>
                <p className="text-xs text-slate-400 font-mono italic break-words">
                  {sanitizedPreview}
                </p>
              </div>
            )}

            {error && (
              <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Sanitizing & Logging...' : 'Submit Anonymously'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
