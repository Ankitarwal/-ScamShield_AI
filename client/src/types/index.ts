export type RiskLevel = 'Very Low Risk' | 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Critical Risk';

export type MessageSource = 'WhatsApp' | 'SMS' | 'Email' | 'Job Portal' | 'Telegram' | 'Instagram' | 'Other';

export interface RedFlag {
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  explanation: string;
}

export interface SuspiciousClaim {
  claim: string;
  reason: string;
  verificationStep: string;
}

export interface SenderIndicator {
  indicator: string;
  risk: 'High' | 'Medium' | 'Low';
  explanation: string;
}

export interface IfAlreadyActed {
  clickedLink: string;
  sharedOTP: string;
  madePayment: string;
  downloadedApp: string;
  sharedID: string;
}

export interface SimpleExplanation {
  english: string;
  hindi: string;
  hinglish: string;
}

export interface BeforeYouAct {
  stop: string;
  check: string;
  verify: string;
  act: string;
}

export interface AnalysisResult {
  riskScore: number;
  riskLevel: RiskLevel;
  scamType: string;
  summary: string;
  redFlags: RedFlag[];
  suspiciousClaims: SuspiciousClaim[];
  senderIndicators: SenderIndicator[];
  safeActions: string[];
  avoidActions: string[];
  ifAlreadyActed: IfAlreadyActed;
  simpleExplanation: SimpleExplanation;
  beforeYouAct: BeforeYouAct;
  analyzedBy?: string;
  isLiveGemini?: boolean;
  analyzedAt?: string;
  originalMessage?: string;
  source?: MessageSource;
}

export interface DemoItem {
  id: string;
  title: string;
  category: string;
  source: MessageSource;
  message: string;
  tag: string;
  badgeColor: string;
}

export interface CommunityReport {
  id: string;
  scamType: string;
  channel: string;
  riskLevel: string;
  riskScore: number;
  redFlags: string[];
  requests: string[];
  summary: string;
  country: string;
  timestamp: string;
}

export interface ScamRadarData {
  totalReports: number;
  scamTypesData: { name: string; count: number; percentage: number }[];
  channelData: { channel: string; percentage: number; count: number; color: string }[];
  redFlagsData: { flag: string; count: number; severity: string }[];
  weeklyTrends: { day: string; reports: number; jobScams: number; upiScams: number; kycScams: number }[];
  currentRequests: { item: string; frequency: string; trend: string; risk: string; description: string }[];
  trendingPattern: {
    title: string;
    detectedCount: number;
    channel: string;
    riskLevel: string;
    tactics: string[];
  };
  recentReports: CommunityReport[];
}
