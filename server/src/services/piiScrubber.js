/**
 * Privacy-First PII Scrubber
 * Removes personally identifiable information (PII) before storage or community aggregation.
 */

export function scrubPII(text) {
  if (!text || typeof text !== 'string') return '';

  let sanitized = text;

  // 1. Email Addresses
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/gi;
  sanitized = sanitized.replace(emailRegex, '[EMAIL_REDACTED]');

  // 2. UPI IDs (e.g., username@okhdfcbank, 9876543210@paytm, name@upi, etc.)
  const upiRegex = /\b[a-zA-Z0-9.\-_]{2,256}@(okaxis|okhdfcbank|okicici|oksbi|paytm|ybl|ibl|axl|upi|apl|postbank|jupiteraxis|fbl|idfcbank|waaxis|wahdfc|waicici|wasbi)\b/gi;
  sanitized = sanitized.replace(upiRegex, '[UPI_ID_REDACTED]');

  // 3. Indian & International Phone Numbers
  // Matches +91-9876543210, +91 98765 43210, 09876543210, 9876543210, etc.
  const phoneRegex = /(?:\+?91[\-\s]?)?[6-9]\d{4}[\-\s]?\d{5}|\b\+?[1-9]\d{1,2}[\-\s]?\(?\d{2,4}\)?[\-\s]?\d{3,4}[\-\s]?\d{3,4}\b/g;
  sanitized = sanitized.replace(phoneRegex, '[PHONE_REDACTED]');

  // 4. Aadhaar Numbers (12 digits: XXXX XXXX XXXX or XXXXXXXXXXXX)
  const aadhaarRegex = /\b[2-9]{1}\d{3}[\s\-]?\d{4}[\s\-]?\d{4}\b/g;
  sanitized = sanitized.replace(aadhaarRegex, '[AADHAAR_REDACTED]');

  // 5. PAN Cards (5 letters + 4 digits + 1 letter, e.g. ABCDE1234F)
  const panRegex = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g;
  sanitized = sanitized.replace(panRegex, '[PAN_REDACTED]');

  // 6. Credit/Debit Card Numbers (13-19 digits, grouped with spaces/dashes)
  const creditCardRegex = /\b(?:\d{4}[-\s]?){3}\d{4}\b|\b\d{15,16}\b/g;
  sanitized = sanitized.replace(creditCardRegex, '[CARD_NUMBER_REDACTED]');

  // 7. Bank Account Numbers (9 to 18 digits with keyword context)
  const bankAccountRegex = /(?:a\/c|account|acct|acc|no\.?|number)[:\s]*([0-9]{9,18})/gi;
  sanitized = sanitized.replace(bankAccountRegex, 'account: [ACCOUNT_NO_REDACTED]');

  // 8. Specific URLs with tracking tokens (replaces with sanitized domain or generic link)
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  sanitized = sanitized.replace(urlRegex, (match) => {
    try {
      const url = new URL(match);
      return `[SUSPICIOUS_LINK: ${url.hostname}]`;
    } catch {
      return '[LINK_REDACTED]';
    }
  });

  // 9. Salutations with names (e.g., "Dear John Doe,", "Hello Priya Sharma,")
  const greetingRegex = /(?:Dear|Hi|Hello|Mr\.|Ms\.|Mrs\.|Dr\.)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/g;
  sanitized = sanitized.replace(greetingRegex, 'Dear [NAME_REDACTED]');

  // 10. Passwords / OTPs in plain text patterns
  const otpRegex = /\b(?:OTP|pin|code|password)[:\s]*([0-9a-zA-Z]{4,8})\b/gi;
  sanitized = sanitized.replace(otpRegex, 'OTP: [CODE_REDACTED]');

  return sanitized.trim();
}

/**
 * Extracts anonymous signals suitable for Scam Radar aggregation
 */
export function extractAnonymizedSignals(analysis, rawSource = 'Other') {
  return {
    scamType: analysis.scamType || 'Suspicious Activity',
    riskLevel: analysis.riskLevel || 'Moderate',
    riskScore: analysis.riskScore || 50,
    channel: rawSource || 'Other',
    redFlags: (analysis.redFlags || []).map(f => typeof f === 'string' ? f : f.title).slice(0, 5),
    requests: analysis.requests || extractCommonRequests(analysis),
    country: 'India',
    timestamp: new Date().toISOString()
  };
}

function extractCommonRequests(analysis) {
  const requests = [];
  const text = JSON.stringify(analysis).toLowerCase();
  if (text.includes('upfront') || text.includes('fee') || text.includes('registration')) requests.push('Registration Fee');
  if (text.includes('otp') || text.includes('pin') || text.includes('password')) requests.push('OTP / PIN');
  if (text.includes('upi') || text.includes('pay') || text.includes('transfer')) requests.push('UPI Payment');
  if (text.includes('kyc') || text.includes('document') || text.includes('aadhaar')) requests.push('KYC Documents');
  if (text.includes('anydesk') || text.includes('teamviewer') || text.includes('remote')) requests.push('Remote Access');
  if (text.includes('bank') || text.includes('account detail')) requests.push('Bank Credentials');
  return requests.length > 0 ? requests : ['Sensitive Information'];
}
