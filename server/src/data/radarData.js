/**
 * Scam Radar Community Intelligence Database & Aggregation Engine
 * All records are strictly sanitized and anonymized.
 */

let communityReports = [
  {
    id: 'REP-8491',
    scamType: 'Job/Recruitment Scam',
    channel: 'WhatsApp',
    riskLevel: 'High Risk',
    riskScore: 88,
    redFlags: ['Upfront Registration Fee', 'Unrealistic Salary (₹45,000/mo WFH)', 'Telegram Redirection'],
    requests: ['Registration Fee', 'UPI Payment'],
    summary: 'Fake work-from-home data entry & review job asking for ₹999 refundable deposit before assigning tasks.',
    country: 'India',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString()
  },
  {
    id: 'REP-8490',
    scamType: 'KYC Scam',
    channel: 'SMS',
    riskLevel: 'Critical Risk',
    riskScore: 94,
    redFlags: ['Urgency (Account blocked today)', 'Suspicious Link (sbi-kyc-update.online)', 'Threat of Suspension'],
    requests: ['KYC Documents', 'Bank Credentials', 'OTP / PIN'],
    summary: 'Fake bank SMS threatening immediate account deactivation unless KYC is updated via unverified third-party portal.',
    country: 'India',
    timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString()
  },
  {
    id: 'REP-8489',
    scamType: 'UPI/Payment Scam',
    channel: 'WhatsApp',
    riskLevel: 'High Risk',
    riskScore: 82,
    redFlags: ['QR Code to Receive Money', 'UPI PIN entered for credit', 'Buyer rushing transaction'],
    requests: ['UPI Payment', 'OTP / PIN'],
    summary: 'OLX buyer sending a "Reverse QR Code" claiming scanning and entering UPI PIN will receive advance payment.',
    country: 'India',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString()
  },
  {
    id: 'REP-8488',
    scamType: 'Investment Scam',
    channel: 'Telegram',
    riskLevel: 'Critical Risk',
    riskScore: 91,
    redFlags: ['Guaranteed 300% Returns', 'VIP Crypto Group', 'Fake Trading Dashboard'],
    requests: ['Crypto Transfer', 'UPI Payment'],
    summary: 'Crypto/Forex trading group claiming guaranteed ₹10,000 daily profits on ₹2,000 deposit.',
    country: 'India',
    timestamp: new Date(Date.now() - 1000 * 60 * 320).toISOString()
  },
  {
    id: 'REP-8487',
    scamType: 'Delivery Scam',
    channel: 'SMS',
    riskLevel: 'Moderate Risk',
    riskScore: 58,
    redFlags: ['Address Incomplete Fee', 'Suspicious URL', 'Small ₹5 verification fee'],
    requests: ['Credit Card / Debit Card', 'UPI Payment'],
    summary: 'India Post / Courier fake SMS asking for ₹5 re-delivery fee to capture complete card credentials.',
    country: 'India',
    timestamp: new Date(Date.now() - 1000 * 60 * 480).toISOString()
  },
  {
    id: 'REP-8486',
    scamType: 'Impersonation Scam',
    channel: 'WhatsApp',
    riskLevel: 'Critical Risk',
    riskScore: 96,
    redFlags: ['Fake Police Officer Video Call', 'Digital Arrest Threat', 'Demand to transfer funds to RBI safe account'],
    requests: ['Bank Credentials', 'UPI Payment'],
    summary: 'Scammers posing as Mumbai Cyber Crime / CBI officers claiming illegal parcel in victim name.',
    country: 'India',
    timestamp: new Date(Date.now() - 1000 * 60 * 620).toISOString()
  },
  {
    id: 'REP-8485',
    scamType: 'Loan Scam',
    channel: 'SMS',
    riskLevel: 'High Risk',
    riskScore: 78,
    redFlags: ['Instant 5 Lakh Pre-approved without CIBIL', 'APK File Download', 'Processing Fee upfront'],
    requests: ['Registration Fee', 'KYC Documents', 'Remote Access'],
    summary: 'Unsolicited loan app offering immediate loan disbursement but installing malware APK.',
    country: 'India',
    timestamp: new Date(Date.now() - 1000 * 60 * 840).toISOString()
  },
  {
    id: 'REP-8484',
    scamType: 'Lottery/Prize Scam',
    channel: 'WhatsApp',
    riskLevel: 'High Risk',
    riskScore: 85,
    redFlags: ['KBC ₹25 Lakh WhatsApp Lottery', 'Fake audio note from Rana Pratap Singh', 'Tax clearance fee required'],
    requests: ['Registration Fee', 'UPI Payment'],
    summary: 'Circulating fake KBC lottery banner asking for ₹12,500 tax clearance via UPI before prize release.',
    country: 'India',
    timestamp: new Date(Date.now() - 1000 * 60 * 1200).toISOString()
  },
  {
    id: 'REP-8483',
    scamType: 'Tech Support Scam',
    channel: 'Email',
    riskLevel: 'High Risk',
    riskScore: 74,
    redFlags: ['Fake Norton/GeekSquad Invoice', 'Auto-renewal of $499', 'Call toll-free number to cancel'],
    requests: ['Remote Access', 'Bank Credentials'],
    summary: 'Phishing email with fake subscription renewal invoice pushing victims to call fake helpline and install AnyDesk.',
    country: 'India',
    timestamp: new Date(Date.now() - 1000 * 60 * 1500).toISOString()
  },
  {
    id: 'REP-8482',
    scamType: 'Job/Recruitment Scam',
    channel: 'Telegram',
    riskLevel: 'Critical Risk',
    riskScore: 92,
    redFlags: ['YouTube Like/Subscribe Task', 'Prepaid task investment', 'Frozen wallet balance'],
    requests: ['UPI Payment', 'Registration Fee'],
    summary: 'Part-time task scam: pays ₹150 for 3 YouTube likes, then demands ₹5,000 for VIP task tier.',
    country: 'India',
    timestamp: new Date(Date.now() - 1000 * 60 * 1800).toISOString()
  },
  {
    id: 'REP-8481',
    scamType: 'KYC Scam',
    channel: 'SMS',
    riskLevel: 'High Risk',
    riskScore: 89,
    redFlags: ['Electricity Bill Unpaid Notice', 'Power will be disconnected tonight at 9:30 PM', 'Call electricity officer'],
    requests: ['Remote Access', 'UPI Payment'],
    summary: 'Fake state electricity board SMS claiming power cut unless quick bill verification app is installed.',
    country: 'India',
    timestamp: new Date(Date.now() - 1000 * 60 * 2400).toISOString()
  }
];

export function getScamRadarStats() {
  const totalReports = communityReports.length + 1420; // Blended realistic baseline count

  // 1. Scam Types Distribution
  const typeCounts = {
    'Job/Recruitment Scam': 420 + communityReports.filter(r => r.scamType.includes('Job')).length * 8,
    'UPI/Payment Scam': 345 + communityReports.filter(r => r.scamType.includes('UPI')).length * 7,
    'KYC Scam': 285 + communityReports.filter(r => r.scamType.includes('KYC')).length * 6,
    'Investment Scam': 195 + communityReports.filter(r => r.scamType.includes('Investment')).length * 5,
    'Impersonation Scam': 140 + communityReports.filter(r => r.scamType.includes('Impersonation')).length * 4,
    'Delivery Scam': 95 + communityReports.filter(r => r.scamType.includes('Delivery')).length * 3,
    'Loan Scam': 80 + communityReports.filter(r => r.scamType.includes('Loan')).length * 2,
    'Lottery/Prize Scam': 65 + communityReports.filter(r => r.scamType.includes('Lottery')).length * 2
  };

  const scamTypesData = Object.entries(typeCounts).map(([name, count]) => ({
    name,
    count,
    percentage: Math.round((count / (totalReports + 160)) * 100)
  })).sort((a, b) => b.count - a.count);

  // 2. Channels Breakdown
  const channelData = [
    { channel: 'WhatsApp', percentage: 38, count: 540, color: '#25D366' },
    { channel: 'Telegram', percentage: 26, count: 370, color: '#0088cc' },
    { channel: 'SMS', percentage: 19, count: 270, color: '#f59e0b' },
    { channel: 'Email', percentage: 9, count: 128, color: '#ef4444' },
    { channel: 'Instagram', percentage: 5, count: 71, color: '#E1306C' },
    { channel: 'Other / Web', percentage: 3, count: 43, color: '#8b5cf6' }
  ];

  // 3. Trending Red Flags
  const redFlagsData = [
    { flag: 'Upfront Registration / Processing Fee', count: 680, severity: 'High' },
    { flag: 'False Urgency (Account blocked / Offer expires)', count: 590, severity: 'Critical' },
    { flag: 'Entering UPI PIN to "Receive" money', count: 440, severity: 'Critical' },
    { flag: 'Redirection to Private Telegram Channels', count: 395, severity: 'High' },
    { flag: 'Unrealistic Salary / Guaranteed Return', count: 360, severity: 'High' },
    { flag: 'Suspicious Domain / APK Download link', count: 310, severity: 'Critical' },
    { flag: 'Fake Police / CBI / RBI Impersonation', count: 185, severity: 'Critical' }
  ];

  // 4. Weekly Trend Data (Past 7 Days)
  const weeklyTrends = [
    { day: 'Mon', reports: 184, jobScams: 68, upiScams: 45, kycScams: 38 },
    { day: 'Tue', reports: 210, jobScams: 82, upiScams: 52, kycScams: 41 },
    { day: 'Wed', reports: 195, jobScams: 74, upiScams: 48, kycScams: 39 },
    { day: 'Thu', reports: 245, jobScams: 95, upiScams: 60, kycScams: 51 },
    { day: 'Fri', reports: 280, jobScams: 110, upiScams: 68, kycScams: 58 },
    { day: 'Sat', reports: 220, jobScams: 86, upiScams: 54, kycScams: 44 },
    { day: 'Sun (Today)', reports: 175, jobScams: 65, upiScams: 42, kycScams: 36 }
  ];

  // 5. What Scammers are Currently Asking For
  const currentRequests = [
    { item: 'Registration / Verification Fee', frequency: 'Very High', trend: '+14% this week', risk: 'High', description: 'Small upfront payments (₹499 - ₹2,500) disguised as refundable security deposit.' },
    { item: 'UPI PIN Entry on Received QR', frequency: 'High', trend: '+8% this week', risk: 'Critical', description: 'Tricking victims into entering PIN under the guise of "accepting" customer payment.' },
    { item: 'OTP & 2FA Codes', frequency: 'High', trend: '+5% this week', risk: 'Critical', description: 'Direct attempts to compromise banking and WhatsApp accounts.' },
    { item: 'Aadhaar / PAN / Bank Proofs', frequency: 'Medium', trend: '+2% this week', risk: 'High', description: 'Used for identity theft and creating mule bank accounts.' },
    { item: 'Remote Screen Sharing APKs', frequency: 'Growing', trend: '+22% this week', risk: 'Critical', description: 'Asking to install AnyDesk, RustDesk or malicious APKs for "bill update".' },
    { item: 'Crypto / USDT Wallet Transfer', frequency: 'Medium', trend: '+9% this week', risk: 'High', description: 'Irreversible deposits for fake task-based affiliate commissions.' }
  ];

  // 6. Highlighted Trending Pattern
  const trendingPattern = {
    title: 'Fake Work-From-Home YouTube/Google Review Jobs',
    detectedCount: 148,
    channel: 'Telegram & WhatsApp',
    riskLevel: 'Critical Risk',
    tactics: [
      'Pays ₹150 for initial 3 simple screenshot tasks to build trust',
      'Adds victim to high-frequency VIP Telegram group with fake winner screenshots',
      'Demands ₹5,000 - ₹50,000 for "Prepaid Crypto Task" with locked withdrawal'
    ]
  };

  return {
    totalReports,
    scamTypesData,
    channelData,
    redFlagsData,
    weeklyTrends,
    currentRequests,
    trendingPattern,
    recentReports: communityReports.slice(0, 8)
  };
}

export function addCommunityReport(report) {
  const newReport = {
    id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
    scamType: report.scamType || 'Suspicious Activity',
    channel: report.channel || 'Other',
    riskLevel: report.riskLevel || 'High Risk',
    riskScore: report.riskScore || 75,
    redFlags: report.redFlags || ['Unverified Request'],
    requests: report.requests || ['Personal Information'],
    summary: report.summary || 'Community submitted suspicious pattern analyzed and anonymized.',
    country: 'India',
    timestamp: new Date().toISOString()
  };

  communityReports.unshift(newReport);
  if (communityReports.length > 50) {
    communityReports.pop();
  }

  return newReport;
}
