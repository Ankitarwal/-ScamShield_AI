import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { AnalyzerForm } from './components/AnalyzerForm';
import { AnalysisResultCard } from './components/AnalysisResultCard';
import { ScamRadarDashboard } from './components/ScamRadarDashboard';
import { LearnSection } from './components/LearnSection';
import { ReportsHistory } from './components/ReportsHistory';
import { AboutSection } from './components/AboutSection';
import { ReportScamModal } from './components/ReportScamModal';
import { PrivacyNotice } from './components/PrivacyNotice';
import { AnalysisResult, MessageSource } from './types';
import { analyzeMessageApi, analyzeScreenshotApi, submitScamReportApi } from './services/api';

const LOCAL_STORAGE_KEY = 'scamshield_analysis_history';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportPrefill, setReportPrefill] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (err) {
      console.error('Failed to load scan history:', err);
    }
  }, []);

  // Save scan result to history
  const saveToHistory = (result: AnalysisResult) => {
    try {
      const updated = [result, ...history.filter(h => h.originalMessage !== result.originalMessage)].slice(0, 30);
      setHistory(updated);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save to history:', err);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handle Text Analysis
  const handleAnalyzeText = async (text: string, source: MessageSource) => {
    try {
      setIsLoading(true);
      const result = await analyzeMessageApi(text, source);
      setCurrentResult(result);
      saveToHistory(result);

      if (result.riskScore <= 25) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      showToast('Analysis completed by Gemini AI');
    } catch (err: any) {
      console.error('Analysis error:', err);
      showToast(`Analysis error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Screenshot Analysis
  const handleAnalyzeScreenshot = async (file: File, source: MessageSource, notes?: string) => {
    try {
      setIsLoading(true);
      const result = await analyzeScreenshotApi(file, source, notes);
      setCurrentResult(result);
      saveToHistory(result);

      if (result.riskScore <= 25) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      showToast('Multimodal screenshot analysis completed');
    } catch (err: any) {
      console.error('Screenshot analysis error:', err);
      showToast(`Screenshot error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Select from History
  const handleSelectFromHistory = (report: AnalysisResult) => {
    setCurrentResult(report);
    setActiveTab('analyze');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear History
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your local analysis history?')) {
      setHistory([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      showToast('Analysis history cleared.');
    }
  };

  // Open report modal from result
  const handleOpenReportModalFromResult = (result: AnalysisResult) => {
    setReportPrefill({
      rawMessage: result.originalMessage,
      scamType: result.scamType,
      source: result.source,
      riskLevel: result.riskLevel,
      riskScore: result.riskScore
    });
    setReportModalOpen(true);
  };

  // Submit scam report to server
  const handleSubmitReport = async (reportData: any) => {
    await submitScamReportApi(reportData);
    showToast('Pattern sanitized & logged to Scam Radar.');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 cyber-bg flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-2xl shadow-cyan-950 flex items-center space-x-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onQuickAnalyze={() => setActiveTab('analyze')}
      />

      {/* Main Page Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-8">
        {/* TAB 1: HOME (Hero + Quick Analyzer) */}
        {activeTab === 'home' && (
          <div className="space-y-12">
            <HeroSection
              onStartAnalyze={() => {
                setActiveTab('analyze');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreRadar={() => {
                setActiveTab('radar');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectDemo={(demoId) => {
                setActiveTab('analyze');
              }}
            />

            {/* Quick Analyzer Section on Home */}
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Instant Message & Screenshot Scanner
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Analyze suspicious job offers, SMS, emails, WhatsApp messages, payment requests, and links.
                </p>
              </div>

              <AnalyzerForm
                onAnalyzeText={handleAnalyzeText}
                onAnalyzeScreenshot={handleAnalyzeScreenshot}
                isLoading={isLoading}
                onClear={() => setCurrentResult(null)}
                hasResult={!!currentResult}
              />

              {currentResult && (
                <AnalysisResultCard
                  result={currentResult}
                  onReportToRadar={handleOpenReportModalFromResult}
                  onClear={() => setCurrentResult(null)}
                />
              )}

              <PrivacyNotice
                hasActiveAnalysis={!!currentResult}
                onClearAnalysis={() => setCurrentResult(null)}
              />
            </div>
          </div>
        )}

        {/* TAB 2: ANALYZE */}
        {activeTab === 'analyze' && (
          <div className="space-y-8">
            <AnalyzerForm
              onAnalyzeText={handleAnalyzeText}
              onAnalyzeScreenshot={handleAnalyzeScreenshot}
              isLoading={isLoading}
              onClear={() => setCurrentResult(null)}
              hasResult={!!currentResult}
            />

            {currentResult ? (
              <AnalysisResultCard
                result={currentResult}
                onReportToRadar={handleOpenReportModalFromResult}
                onClear={() => setCurrentResult(null)}
              />
            ) : (
              <div className="rounded-2xl glass-panel p-8 sm:p-12 text-center space-y-4 border border-slate-800">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  Ready to Inspect Suspicious Messages
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Paste a message above or try one of the 1-Click Demo Scenarios (Job Scam, KYC Scam, Safe Message) to see Gemini AI analysis in action.
                </p>
              </div>
            )}

            <PrivacyNotice
              hasActiveAnalysis={!!currentResult}
              onClearAnalysis={() => setCurrentResult(null)}
            />
          </div>
        )}

        {/* TAB 3: SCAM RADAR */}
        {activeTab === 'radar' && (
          <ScamRadarDashboard
            onOpenReportModal={() => {
              setReportPrefill(null);
              setReportModalOpen(true);
            }}
          />
        )}

        {/* TAB 4: LEARN & GUIDES */}
        {activeTab === 'learn' && <LearnSection />}

        {/* TAB 5: HISTORY */}
        {activeTab === 'history' && (
          <ReportsHistory
            history={history}
            onSelectReport={handleSelectFromHistory}
            onClearHistory={handleClearHistory}
          />
        )}

        {/* TAB 6: ABOUT */}
        {activeTab === 'about' && <AboutSection />}
      </main>

      {/* Community Report Modal */}
      <ReportScamModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSubmitReport={handleSubmitReport}
        prefilledData={reportPrefill}
      />

      {/* Main Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
