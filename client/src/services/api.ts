import { AnalysisResult, ScamRadarData, DemoItem, MessageSource } from '../types';

const API_BASE = '/api';

export async function analyzeMessageApi(message: string, source: MessageSource): Promise<AnalysisResult> {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, source })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Analysis failed' }));
    throw new Error(errorData.error || 'Failed to analyze message');
  }

  const data = await response.json();
  return {
    ...data.analysis,
    originalMessage: message,
    source,
    analyzedAt: data.timestamp || new Date().toISOString()
  };
}

export async function analyzeScreenshotApi(file: File, source: MessageSource, notes?: string): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('screenshot', file);
  formData.append('source', source);
  if (notes) formData.append('notes', notes);

  const response = await fetch(`${API_BASE}/analyze-image`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Screenshot analysis failed' }));
    throw new Error(errorData.error || 'Failed to analyze screenshot');
  }

  const data = await response.json();
  return {
    ...data.analysis,
    originalMessage: `[Screenshot: ${file.name}] ${notes ? '- ' + notes : ''}`,
    source,
    analyzedAt: data.timestamp || new Date().toISOString()
  };
}

export async function fetchRadarDataApi(): Promise<ScamRadarData> {
  const response = await fetch(`${API_BASE}/radar`);
  if (!response.ok) {
    throw new Error('Failed to load Scam Radar intelligence');
  }
  const data = await response.json();
  return data.radar;
}

export async function fetchDemosApi(): Promise<DemoItem[]> {
  const response = await fetch(`${API_BASE}/demos`);
  if (!response.ok) {
    throw new Error('Failed to load demo scenarios');
  }
  const data = await response.json();
  return data.demos;
}

export async function submitScamReportApi(report: {
  rawMessage: string;
  scamType: string;
  channel: string;
  riskLevel: string;
  riskScore: number;
  notes?: string;
}) {
  const response = await fetch(`${API_BASE}/report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(report)
  });

  if (!response.ok) {
    throw new Error('Failed to submit scam pattern');
  }

  return response.json();
}

/**
 * Client-side PII Scrubber for instant local preview
 */
export function sanitizeClientPII(text: string): string {
  if (!text) return '';
  return text
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/gi, '[EMAIL_REDACTED]')
    .replace(/(?:\+?91[\-\s]?)?[6-9]\d{4}[\-\s]?\d{5}|\b\+?[1-9]\d{1,2}[\-\s]?\(?\d{2,4}\)?[\-\s]?\d{3,4}[\-\s]?\d{3,4}\b/g, '[PHONE_REDACTED]')
    .replace(/\b[2-9]{1}\d{3}[\s\-]?\d{4}[\s\-]?\d{4}\b/g, '[AADHAAR_REDACTED]')
    .replace(/\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g, '[PAN_REDACTED]')
    .replace(/\b(?:\d{4}[-\s]?){3}\d{4}\b|\b\d{15,16}\b/g, '[CARD_REDACTED]')
    .replace(/(https?:\/\/[^\s]+)/gi, '[SUSPICIOUS_LINK]');
}
