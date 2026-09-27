import React, { useState, useEffect } from 'react';
import { 
  Radio, TrendingUp, AlertTriangle, ShieldCheck, Flame, Filter, 
  Share2, RefreshCw, BarChart3, PieChart as PieIcon, ArrowUpRight, Lock, 
  MessageSquare, Smartphone, Send, ShieldAlert, CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area, Legend 
} from 'recharts';
import { ScamRadarData, CommunityReport } from '../types';
import { fetchRadarDataApi } from '../services/api';

interface ScamRadarDashboardProps {
  onOpenReportModal: () => void;
}

const PIE_COLORS = ['#ef4444', '#f59e0b', '#06b6d4', '#8b5cf6', '#10b981', '#ec4899', '#6366f1', '#14b8a6'];

export const ScamRadarDashboard: React.FC<ScamRadarDashboardProps> = ({ onOpenReportModal }) => {
  const [radarData, setRadarData] = useState<ScamRadarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchRadarDataApi();
      setRadarData(data);
    } catch (err) {
      console.error('Failed to load radar data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading || !radarData) {
    return (
      <div className="py-24 text-center space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin text-cyan-400 mx-auto" />
        <p className="text-sm font-semibold text-slate-300">
          Syncing Community Scam Radar Intelligence...
        </p>
      </div>
    );
  }

  const filteredReports = selectedFilter === 'All' 
    ? radarData.recentReports 
    : radarData.recentReports.filter(r => r.scamType.toLowerCase().includes(selectedFilter.toLowerCase()) || r.channel.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Dashboard Header */}
      <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live Threat Radar</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Community Scam Radar
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Aggregated, anonymized fraud intelligence crowdsourced from citizens across India. No personal data, phone numbers, or credentials are ever stored.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadData}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Refresh radar stream"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Report a Scam Pattern</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Total Patterns Logged</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">
              {radarData.totalReports.toLocaleString()}+
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Top Threat Vector</span>
            <span className="text-lg sm:text-xl font-bold text-red-400 font-display">
              Job / WFH Scams (38%)
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Top Attack Channel</span>
            <span className="text-lg sm:text-xl font-bold text-emerald-400 font-display">
              WhatsApp (38%)
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Privacy Scrubbing</span>
            <span className="text-lg sm:text-xl font-bold text-cyan-300 font-display flex items-center gap-1">
              <Lock className="w-4 h-4 text-emerald-400" />
              100% Sanitized
            </span>
          </div>
        </div>
      </div>

      {/* 2. Highlighted Trending Pattern Banner */}
      {radarData.trendingPattern && (
        <div className="rounded-2xl p-6 bg-gradient-to-r from-red-950/70 via-[#131124] to-orange-950/50 border-2 border-red-500/40 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-red-500/20">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 block">
                  🔥 High Alert: Trending Threat Pattern
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {radarData.trendingPattern.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 border border-red-500/40 text-red-300">
                Detected in {radarData.trendingPattern.detectedCount} anonymized reports
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {radarData.trendingPattern.tactics.map((tactic, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-black/40 border border-red-500/20 text-xs text-slate-200 flex items-start space-x-2">
                <span className="font-bold text-red-400 shrink-0">{idx + 1}.</span>
                <span>{tactic}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Recharts Section (Visual Analytics Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Top Scam Types Distribution */}
        <div className="rounded-2xl glass-panel p-6 border border-cyan-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <PieIcon className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-extrabold text-white">
                Top Scam Types This Week
              </h3>
            </div>
            <span className="text-xs text-slate-400">Share of Reports</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={radarData.scamTypesData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={3}
                  label={(props: any) => `${props.name ? props.name.split('/')[0] : 'Scam'} (${props.percentage || 0}%)`}
                  labelLine={false}
                >
                  {radarData.scamTypesData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#070b14', borderColor: '#38bdf8', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: any, name: any) => [`${value} incidents`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800 text-[11px]">
            {radarData.scamTypesData.slice(0, 4).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}></span>
                  <span className="truncate">{item.name}</span>
                </span>
                <span className="font-bold text-white ml-2">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Scam Channels Breakdown */}
        <div className="rounded-2xl glass-panel p-6 border border-cyan-500/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-extrabold text-white">
                Scam Attack Channels
              </h3>
            </div>
            <span className="text-xs text-slate-400">Distribution by medium</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={radarData.channelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="channel" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#070b14', borderColor: '#10b981', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: any) => [`${value}% share`, 'Frequency']}
                />
                <Bar dataKey="percentage" fill="#10b981" radius={[6, 6, 0, 0]}>
                  {radarData.channelData.map((entry, index) => (
                    <Cell key={`channel-cell-${index}`} fill={entry.color || '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>WhatsApp and Telegram represent 64% of all reported digital scam channels.</span>
          </div>
        </div>
      </div>

      {/* 4. Weekly Trends Chart */}
      <div className="rounded-2xl glass-panel p-6 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-extrabold text-white">
              7-Day Scam Incident Velocity
            </h3>
          </div>
          <span className="text-xs text-slate-400">Daily incident volume</span>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={radarData.weeklyTrends}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorJob" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#070b14', borderColor: '#6366f1', borderRadius: '8px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="reports" name="Total Reports" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
              <Area type="monotone" dataKey="jobScams" name="Job / WFH Scams" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorJob)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Pattern Intelligence: "What Scammers are Currently Asking For" */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Pattern Intelligence: What Scammers Are Currently Demanding
            </h3>
          </div>
          <span className="text-xs text-slate-400">Aggregated demands</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {radarData.currentRequests.map((req, idx) => (
            <div
              key={idx}
              className="rounded-xl glass-panel p-4 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-2"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-white">{req.item}</h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    req.risk === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  }`}>
                    {req.frequency}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {req.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="text-amber-400 font-medium">{req.trend}</span>
                <span className="font-mono">Risk: {req.risk}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Live Anonymized Reports Feed */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Recent Anonymized Community Incidents</span>
            </h3>
            <p className="text-xs text-slate-400">
              Personal identifying details are strictly redacted before publication.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {['All', 'Job', 'KYC', 'UPI', 'Delivery', 'Investment'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedFilter === filter
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="rounded-xl glass-panel p-4 border border-slate-800 hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    {report.id}
                  </span>
                  <span className="text-xs font-bold text-white">{report.scamType}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    Via {report.channel}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    report.riskScore >= 80 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    Score: {report.riskScore}/100
                  </span>
                </div>

                <p className="text-xs text-slate-200">
                  {report.summary}
                </p>

                {/* Red Flag tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {report.redFlags.map((flag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-400 flex items-center gap-1"
                    >
                      <span className="text-red-400">🚩</span>
                      <span>{flag}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 text-right sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono block">
                  {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1 justify-end">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Sanitized
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
