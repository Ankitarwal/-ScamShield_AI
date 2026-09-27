import React, { useState, useRef } from 'react';
import { Sparkles, Upload, FileText, Image as ImageIcon, X, AlertCircle, RefreshCw, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { MessageSource, DemoItem } from '../types';

interface AnalyzerFormProps {
  onAnalyzeText: (text: string, source: MessageSource) => void;
  onAnalyzeScreenshot: (file: File, source: MessageSource, notes?: string) => void;
  isLoading: boolean;
  onClear: () => void;
  hasResult: boolean;
}

const DEMOS: DemoItem[] = [
  {
    id: 'job-scam',
    title: 'Demo 1: Job Scam',
    category: 'Job/Recruitment Scam',
    source: 'WhatsApp',
    message: 'Congratulations! You have been selected for a ₹45,000/month work-from-home job as Online Data Reviewer. No experience required. Pay ₹999 refundable registration fee to confirm your position today: https://wfh-jobs-portal-india.online/pay-999',
    tag: '₹45k WFH + ₹999 Fee',
    badgeColor: 'border-red-500/40 text-red-400 bg-red-950/30'
  },
  {
    id: 'kyc-scam',
    title: 'Demo 2: KYC Scam',
    category: 'KYC Scam',
    source: 'SMS',
    message: 'URGENT: Dear Customer, Your Bank Account and Debit Card will be BLOCKED TODAY at 9:30 PM due to pending KYC verification. Click immediately to update your PAN & Aadhaar: http://sbi-kyc-update-portal.online/verify to prevent suspension.',
    tag: 'Bank Blocked Today',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-950/30'
  },
  {
    id: 'safe-message',
    title: 'Demo 3: Safe Message',
    category: 'Safe / Legitimate',
    source: 'Email',
    message: 'Dear Candidate, Your second round interview for the Senior Frontend Engineer role is scheduled for tomorrow at 10:00 AM IST via Google Meet. Please join through your verified applicant dashboard on the official company careers portal: https://careers.techcorp.com/interviews/dashboard',
    tag: 'Official Interview Invite',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30'
  }
];

const SOURCES: { name: MessageSource; icon: string }[] = [
  { name: 'WhatsApp', icon: '💬' },
  { name: 'SMS', icon: '📱' },
  { name: 'Email', icon: '✉️' },
  { name: 'Job Portal', icon: '💼' },
  { name: 'Telegram', icon: '✈️' },
  { name: 'Instagram', icon: '📸' },
  { name: 'Other', icon: '🌐' }
];

export const AnalyzerForm: React.FC<AnalyzerFormProps> = ({
  onAnalyzeText,
  onAnalyzeScreenshot,
  isLoading,
  onClear,
  hasResult
}) => {
  const [activeMode, setActiveMode] = useState<'text' | 'screenshot'>('text');
  const [textInput, setTextInput] = useState('');
  const [selectedSource, setSelectedSource] = useState<MessageSource>('WhatsApp');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotNotes, setScreenshotNotes] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectDemo = (demo: DemoItem) => {
    setActiveMode('text');
    setTextInput(demo.message);
    setSelectedSource(demo.source);
    setValidationError(null);
  };

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setValidationError('Please upload a valid image file (PNG, JPG, WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setValidationError('File size exceeds 10MB limit.');
      return;
    }

    setScreenshotFile(file);
    setValidationError(null);

    const reader = new FileReader();
    reader.onload = () => {
      setScreenshotPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (activeMode === 'text') {
      if (!textInput.trim()) {
        setValidationError('Please paste or type a suspicious message to analyze.');
        return;
      }
      onAnalyzeText(textInput.trim(), selectedSource);
    } else {
      if (!screenshotFile) {
        setValidationError('Please upload a screenshot of the suspicious message or offer.');
        return;
      }
      onAnalyzeScreenshot(screenshotFile, selectedSource, screenshotNotes.trim());
    }
  };

  const handleClearAll = () => {
    setTextInput('');
    setScreenshotFile(null);
    setScreenshotPreview(null);
    setScreenshotNotes('');
    setValidationError(null);
    onClear();
  };

  return (
    <div className="rounded-2xl glass-panel p-5 sm:p-7 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
      {/* Subtle top indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-emerald-500 to-indigo-500"></div>

      {/* Title & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span>AI Scam Analyzer</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Submit any message, job offer, payment link, or screenshot for deep Gemini AI fraud analysis.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          <button
            type="button"
            onClick={() => { setActiveMode('text'); setValidationError(null); }}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'text'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Paste Text</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveMode('screenshot'); setValidationError(null); }}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeMode === 'screenshot'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Upload Screenshot</span>
          </button>
        </div>
      </div>

      {/* 1-Click Realistic Demos Bar */}
      <div className="py-4 border-b border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <span>⚡ Try 1-Click Demo Scenarios:</span>
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">Click any demo to test instant AI analysis</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {DEMOS.map((demo) => (
            <button
              key={demo.id}
              type="button"
              onClick={() => handleSelectDemo(demo)}
              className={`text-left p-2.5 rounded-xl border transition-all text-xs flex flex-col justify-between hover:scale-[1.02] active:scale-[0.98] ${demo.badgeColor}`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-bold text-slate-100">{demo.title}</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-300">
                  {demo.source}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-1">
                {demo.tag}
              </p>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        {/* Source Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Select Message Source / Channel:
          </label>
          <div className="flex flex-wrap gap-2">
            {SOURCES.map((s) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setSelectedSource(s.name)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedSource === s.name
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Input Mode */}
        {activeMode === 'text' && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="messageInput" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Suspicious Message / Content:
              </label>
              <span className="text-[11px] text-slate-400">
                {textInput.length} characters
              </span>
            </div>
            <div className="relative">
              <textarea
                id="messageInput"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste the suspicious message, job offer, email, payment request, or SMS here..."
                rows={5}
                className="w-full rounded-xl bg-[#090e1c] border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 text-sm p-4 placeholder-slate-500 transition-all resize-y outline-none"
              />
              {textInput && (
                <button
                  type="button"
                  onClick={() => setTextInput('')}
                  className="absolute top-3 right-3 p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  title="Clear text"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Screenshot Upload Mode */}
        {activeMode === 'screenshot' && (
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Upload Screenshot (WhatsApp, SMS, Email, QR Code):
            </label>

            {!screenshotPreview ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                  dragOver
                    ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]'
                    : 'border-slate-700 bg-[#090e1c] hover:border-cyan-500/50 hover:bg-[#0d1527]'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 shadow-lg shadow-cyan-500/10">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-200 mb-1">
                  Click to browse or drag & drop screenshot here
                </p>
                <p className="text-xs text-slate-400">
                  Supports PNG, JPG, JPEG, WEBP (Max 10MB)
                </p>
                <div className="mt-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-400">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Processed in-memory. Never permanently saved to disk.</span>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl border border-cyan-500/40 bg-[#090e1c] p-4 flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={screenshotPreview}
                  alt="Screenshot preview"
                  className="max-h-48 max-w-full sm:max-w-xs object-contain rounded-xl border border-slate-700"
                />
                <div className="flex-1 space-y-2 text-left w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Screenshot Loaded
                    </span>
                    <button
                      type="button"
                      onClick={removeScreenshot}
                      className="p-1 rounded-md text-red-400 hover:bg-red-950/40 text-xs font-semibold flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 font-mono truncate">
                    {screenshotFile?.name} ({Math.round((screenshotFile?.size || 0) / 1024)} KB)
                  </p>
                  <div>
                    <input
                      type="text"
                      value={screenshotNotes}
                      onChange={(e) => setScreenshotNotes(e.target.value)}
                      placeholder="Optional notes: e.g. 'Received from an unknown +91 number'"
                      className="w-full text-xs rounded-lg bg-slate-900 border border-slate-700 p-2.5 text-slate-200 outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files && e.target.files[0] && handleFileChange(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />
          </div>
        )}

        {/* Validation Error Banner */}
        {validationError && (
          <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {hasResult && (
              <button
                type="button"
                onClick={handleClearAll}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
              >
                Clear Analysis
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full sm:w-auto min-w-[240px] inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xl ${
              isLoading
                ? 'bg-cyan-900 text-cyan-300 cursor-not-allowed opacity-80'
                : 'bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-black shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-cyan-300" />
                <span>Analyzing with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-black" />
                <span>Analyze with Gemini AI</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
