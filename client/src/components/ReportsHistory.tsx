import React, { useState } from 'react';
import { Clock, Trash2, Download, Search, ShieldAlert, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ReportsHistoryProps {
  history: AnalysisResult[];
  onSelectReport: (report: AnalysisResult) => void;
  onClearHistory: () => void;
}

export const ReportsHistory: React.FC<ReportsHistoryProps> = ({
  history,
  onSelectReport,
  onClearHistory
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('All');

  const filteredHistory = history.filter((item) => {
    const matchesSearch = (item.summary || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.scamType || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.originalMessage || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterLevel === 'All' || item.riskLevel.toLowerCase().includes(filterLevel.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  const exportHistoryAsJSON = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scamshield-reports-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5" />
              <span>Local Browser Storage</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Recent Analyses ({history.length})
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Your scan reports are stored strictly in your local browser for maximum privacy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {history.length > 0 && (
              <>
                <button
                  onClick={exportHistoryAsJSON}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={onClearHistory}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 hover:bg-red-900/60 text-xs font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear History</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Search & Filter Bar */}
        {history.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search through previous analyses..."
                className="w-full text-xs rounded-xl bg-slate-900/80 border border-slate-700 pl-9 pr-4 py-2.5 text-slate-200 outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full text-xs rounded-xl bg-slate-900/80 border border-slate-700 px-3 py-2.5 text-slate-200 outline-none focus:border-cyan-400"
              >
                <option value="All">All Risk Levels</option>
                <option value="Critical">Critical Risk</option>
                <option value="High">High Risk</option>
                <option value="Moderate">Moderate Risk</option>
                <option value="Low">Low / Safe</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Reports List */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-3">
          {filteredHistory.map((report, idx) => {
            const isHigh = report.riskScore >= 70;
            return (
              <div
                key={idx}
                onClick={() => onSelectReport(report)}
                className="rounded-xl glass-panel p-4 border border-slate-800 hover:border-cyan-500/50 hover:bg-[#0f172a] transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {report.scamType}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      isHigh ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {report.riskLevel} ({report.riskScore}/100)
                    </span>
                    {report.source && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        {report.source}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {report.summary}
                  </p>

                  <span className="text-[11px] text-slate-400 font-mono block">
                    {report.analyzedAt ? new Date(report.analyzedAt).toLocaleString() : 'Recent scan'}
                  </span>
                </div>

                <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                  <span className="text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>View Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl glass-panel p-12 text-center space-y-3 border border-slate-800">
          <Clock className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No Scan Reports Stored Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            When you analyze messages, job offers, or screenshots, your safety reports will automatically appear here.
          </p>
        </div>
      )}
    </div>
  );
};
