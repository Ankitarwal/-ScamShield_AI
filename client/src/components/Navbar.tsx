import React from 'react';
import { Shield, Radio, Sparkles, BookOpen, Clock, Info, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickAnalyze?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onQuickAnalyze }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#070b14]/90 backdrop-blur-md border-b border-cyan-500/20">
      {/* Live Threat Ticker Bar */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border-b border-cyan-500/10 px-4 py-1 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-semibold text-cyan-400 uppercase tracking-wider text-[10px]">Scam Radar Live:</span>
            <span className="truncate text-slate-300 text-[11px] sm:text-xs">
              ⚡ High alert: Work-from-home registration fee scams & Electricity KYC deactivation SMS trending this week
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-3 text-slate-400 text-[11px]">
            <span>Cyber Helpline: <strong className="text-amber-400">1930</strong></span>
            <span>•</span>
            <span className="text-emerald-400">Powered by Google Gemini AI</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  ScamShield <span className="text-cyan-400">AI</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Stop scams before they happen
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'home'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('analyze')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'analyze'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Analyzer</span>
            </button>
            <button
              onClick={() => setActiveTab('radar')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'radar'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>Scam Radar</span>
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'learn'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Safety Guides</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'history'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-400" />
              <span>My Reports</span>
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium flex items-center space-x-1.5 transition-all ${
                activeTab === 'about'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Info className="w-4 h-4 text-slate-400" />
              <span>About</span>
            </button>
          </nav>

          {/* Action CTA */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => {
                setActiveTab('analyze');
                if (onQuickAnalyze) onQuickAnalyze();
              }}
              className="relative inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 rounded-xl shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4 mr-1.5 text-black" />
              <span>Analyze Message</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-2 py-1 rounded ${activeTab === 'home' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('analyze')}
            className={`px-2 py-1 rounded flex items-center space-x-1 ${activeTab === 'analyze' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyze</span>
          </button>
          <button
            onClick={() => setActiveTab('radar')}
            className={`px-2 py-1 rounded flex items-center space-x-1 ${activeTab === 'radar' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Radar</span>
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-2 py-1 rounded flex items-center space-x-1 ${activeTab === 'learn' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guides</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-2 py-1 rounded flex items-center space-x-1 ${activeTab === 'history' ? 'text-amber-400 font-bold' : 'text-slate-400'}`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Reports</span>
          </button>
        </div>
      </div>
    </header>
  );
};
