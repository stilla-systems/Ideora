export type Platform = 'tiktok' | 'youtube' | 'instagram' | 'x' | 'threads';
export type ContentFormat = 'short-video' | 'long-video' | 'carousel' | 'thread' | 'podcast' | 'reel';
export type TrendStatus = 'emerging' | 'rising' | 'peak' | 'declining';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type AlertType = 'urgent' | 'opportunity' | 'signal' | 'info';
export type AgentStatus = 'active' | 'processing' | 'idle' | 'error';

export interface TrendSignal {
  id: string;
  topic: string;
  category: string;
  description: string;
  platforms: Platform[];
  velocity: number;       // 0-100: how fast it's growing
  saturation: number;     // 0-100: how saturated the space is
  opportunityScore: number; // 0-100: combined opportunity
  totalViews: string;
  weeklyGrowth: string;
  status: TrendStatus;
  region: string;
  tags: string[];
  timeToSaturation: string;
  topAngle: string;
  competitionLevel: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface ContentOpportunity {
  id: string;
  title: string;
  hook: string;
  angle: string;
  bodyOutline: string;
  cta: string;
  score: number;
  signalId: string;
  signalTopic: string;
  formats: ContentFormat[];
  difficulty: Difficulty;
  estimatedReach: string;
  estimatedEngagement: string;
  timeToCreate: string;
  platformFit: Partial<Record<Platform, number>>;
  category: string;
  tags: string[];
  savedAt?: string;
}

export interface AgentNode {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  lastRun: string;
  processed: number;
  throughput: string;
  color: string;
}

export interface WatchedTopic {
  id: string;
  topic: string;
  category: string;
  platform: Platform[];
  currentVelocity: number;
  alertThreshold: number;
  alertsEnabled: boolean;
  trend: number[]; // last 7 days velocity
  lastAlert: string | null;
  addedAt: string;
  region: string;
}

export interface ContentItem {
  id: string;
  title: string;
  platform: Platform;
  format: ContentFormat;
  status: 'idea' | 'draft' | 'scheduled' | 'published';
  scheduledDate: string | null;
  signalId?: string;
  score?: number;
  notes?: string;
}

export interface PulseAlert {
  id: string;
  type: AlertType;
  title: string;
  body: string;
  platform?: Platform;
  signalId?: string;
  read: boolean;
  createdAt: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

export interface DailyBrief {
  date: string;
  topOpportunityCount: number;
  risingSignalCount: number;
  newAlertCount: number;
  headline: string;
  summary: string;
}

// ─── MOCK SIGNALS ─────────────────────────────────────────────────────────

export const mockSignals: TrendSignal[] = [
  {
    id: 'sig-001',
    topic: 'AI Fails & Hallucinations',
    category: 'Technology',
    description: 'Content showcasing AI-generated errors, hallucinations, and bizarre outputs',
    platforms: ['tiktok', 'youtube', 'x'],
    velocity: 94,
    saturation: 38,
    opportunityScore: 91,
    totalViews: '2.4B',
    weeklyGrowth: '+312%',
    status: 'rising',
    region: 'Global',
    tags: ['AI', 'ChatGPT', 'fails', 'comedy'],
    timeToSaturation: '8-12 days',
    topAngle: 'Show the funniest AI fail of the week with reactions',
    competitionLevel: 'low',
    createdAt: '2026-04-17T06:00:00Z',
  },
  {
    id: 'sig-002',
    topic: 'Silent Walking Challenge',
    category: 'Lifestyle',
    description: 'Walking without phone or music — mindfulness trend going viral',
    platforms: ['tiktok', 'instagram', 'threads'],
    velocity: 78,
    saturation: 52,
    opportunityScore: 74,
    totalViews: '890M',
    weeklyGrowth: '+187%',
    status: 'rising',
    region: 'North America / Europe',
    tags: ['mindfulness', 'wellness', 'challenge', 'lifestyle'],
    timeToSaturation: '5-8 days',
    topAngle: 'Before vs After: silent walking changed my anxiety',
    competitionLevel: 'medium',
    createdAt: '2026-04-16T10:00:00Z',
  },
  {
    id: 'sig-003',
    topic: 'Micro SaaS Success Stories',
    category: 'Business',
    description: 'Solo founders building profitable SaaS products earning $10K-$50K/mo',
    platforms: ['x', 'youtube', 'threads'],
    velocity: 86,
    saturation: 29,
    opportunityScore: 88,
    totalViews: '1.1B',
    weeklyGrowth: '+245%',
    status: 'emerging',
    region: 'Global',
    tags: ['SaaS', 'founder', 'entrepreneurship', 'income'],
    timeToSaturation: '14-21 days',
    topAngle: 'I built a $30K/mo SaaS in 90 days — full breakdown',
    competitionLevel: 'low',
    createdAt: '2026-04-15T08:00:00Z',
  },
  {
    id: 'sig-004',
    topic: 'Aesthetic Study With Me',
    category: 'Education',
    description: 'Aesthetic, calming study session livestreams and videos',
    platforms: ['youtube', 'tiktok', 'instagram'],
    velocity: 62,
    saturation: 71,
    opportunityScore: 55,
    totalViews: '3.8B',
    weeklyGrowth: '+42%',
    status: 'peak',
    region: 'Global',
    tags: ['study', 'lofi', 'productivity', 'aesthetic'],
    timeToSaturation: '2-4 days',
    topAngle: 'Differentiate with a unique location or extreme focus technique',
    competitionLevel: 'high',
    createdAt: '2026-04-10T12:00:00Z',
  },
  {
    id: 'sig-005',
    topic: 'Budget Travel Hacks 2026',
    category: 'Travel',
    description: 'Extreme budget travel tips post-recession: $20/day travel',
    platforms: ['tiktok', 'youtube', 'instagram'],
    velocity: 81,
    saturation: 44,
    opportunityScore: 82,
    totalViews: '1.6B',
    weeklyGrowth: '+198%',
    status: 'rising',
    region: 'Global',
    tags: ['travel', 'budget', 'hacks', 'frugal'],
    timeToSaturation: '10-14 days',
    topAngle: 'I traveled Europe for 30 days on $600 — how',
    competitionLevel: 'medium',
    createdAt: '2026-04-14T09:00:00Z',
  },
  {
    id: 'sig-006',
    topic: 'Neuro-Aesthetics Design',
    category: 'Design',
    description: 'How brain science is changing UI/UX and visual design choices',
    platforms: ['x', 'youtube', 'threads'],
    velocity: 71,
    saturation: 18,
    opportunityScore: 85,
    totalViews: '420M',
    weeklyGrowth: '+156%',
    status: 'emerging',
    region: 'Global',
    tags: ['design', 'psychology', 'UX', 'neuroscience'],
    timeToSaturation: '18-25 days',
    topAngle: 'Why your brain loves dark mode — science explained',
    competitionLevel: 'low',
    createdAt: '2026-04-13T14:00:00Z',
  },
  {
    id: 'sig-007',
    topic: 'Quiet Luxury Fitness',
    category: 'Fitness',
    description: 'Minimalist, elegant approach to workouts — anti-gym bro culture',
    platforms: ['instagram', 'tiktok', 'youtube'],
    velocity: 69,
    saturation: 47,
    opportunityScore: 72,
    totalViews: '780M',
    weeklyGrowth: '+134%',
    status: 'rising',
    region: 'Europe / North America',
    tags: ['fitness', 'minimalist', 'luxury', 'wellness'],
    timeToSaturation: '7-10 days',
    topAngle: 'My quiet luxury workout routine: no ego, just results',
    competitionLevel: 'medium',
    createdAt: '2026-04-12T11:00:00Z',
  },
  {
    id: 'sig-008',
    topic: 'Personal Finance Transparency',
    category: 'Finance',
    description: 'Creators sharing real income, expenses, and net worth publicly',
    platforms: ['youtube', 'tiktok', 'x'],
    velocity: 88,
    saturation: 35,
    opportunityScore: 87,
    totalViews: '2.1B',
    weeklyGrowth: '+267%',
    status: 'rising',
    region: 'Global',
    tags: ['finance', 'transparency', 'income', 'money'],
    timeToSaturation: '12-16 days',
    topAngle: 'My full salary + expenses breakdown at age 28',
    competitionLevel: 'low',
    createdAt: '2026-04-11T07:00:00Z',
  },
  {
    id: 'sig-009',
    topic: 'AI-Augmented Cooking',
    category: 'Food',
    description: 'Using AI tools to create novel recipes and optimize meal plans',
    platforms: ['tiktok', 'instagram', 'youtube'],
    velocity: 75,
    saturation: 22,
    opportunityScore: 83,
    totalViews: '540M',
    weeklyGrowth: '+210%',
    status: 'emerging',
    region: 'Global',
    tags: ['food', 'AI', 'cooking', 'recipes'],
    timeToSaturation: '15-20 days',
    topAngle: 'I let AI design every meal for 7 days — results shocked me',
    competitionLevel: 'low',
    createdAt: '2026-04-16T13:00:00Z',
  },
  {
    id: 'sig-010',
    topic: 'Side Hustle to $10K Month',
    category: 'Business',
    description: 'Documenting the journey from $0 to $10K/month side income',
    platforms: ['youtube', 'tiktok', 'x', 'threads'],
    velocity: 92,
    saturation: 58,
    opportunityScore: 80,
    totalViews: '4.2B',
    weeklyGrowth: '+143%',
    status: 'peak',
    region: 'Global',
    tags: ['sidehustle', 'income', 'entrepreneur', 'money'],
    timeToSaturation: '3-5 days',
    topAngle: 'Unique angle: show the FAILURES on the way to $10K',
    competitionLevel: 'high',
    createdAt: '2026-04-09T10:00:00Z',
  },
];

// ─── MOCK OPPORTUNITIES ───────────────────────────────────────────────────

export const mockOpportunities: ContentOpportunity[] = [
  {
    id: 'opp-001',
    title: 'The Funniest AI Fails This Week',
    hook: '"ChatGPT told me to boil pasta for 45 minutes — this is what happened"',
    angle: 'Comedy reaction to AI hallucinations with relatable software commentary',
    bodyOutline: 'Open with the worst fail → show 3 progressively funnier fails → react authentically → explain WHY it happened (educational layer)',
    cta: '"Comment your worst AI fail below 👇"',
    score: 91,
    signalId: 'sig-001',
    signalTopic: 'AI Fails & Hallucinations',
    formats: ['short-video', 'reel'],
    difficulty: 'easy',
    estimatedReach: '120K – 450K',
    estimatedEngagement: '8.4%',
    timeToCreate: '2-3 hours',
    platformFit: { tiktok: 96, youtube: 78, instagram: 82, x: 65 },
    category: 'Technology',
    tags: ['AI', 'comedy', 'ChatGPT', 'viral'],
  },
  {
    id: 'opp-002',
    title: 'I Built a $30K/mo SaaS in 90 Days',
    hook: '"I quit my job and built a SaaS. Here\'s the brutal honest breakdown."',
    angle: 'Documentary-style journey: raw, unfiltered, real numbers',
    bodyOutline: 'Day 1 context → the idea → building in public → first paying customer → month 1-3 revenue screenshots',
    cta: '"Follow for the full 90-day journey"',
    score: 88,
    signalId: 'sig-003',
    signalTopic: 'Micro SaaS Success Stories',
    formats: ['long-video', 'thread'],
    difficulty: 'medium',
    estimatedReach: '80K – 320K',
    estimatedEngagement: '6.2%',
    timeToCreate: '8-12 hours',
    platformFit: { youtube: 95, x: 88, threads: 82, tiktok: 62 },
    category: 'Business',
    tags: ['SaaS', 'founder', 'entrepreneurship', 'income'],
  },
  {
    id: 'opp-003',
    title: 'My Real Salary + Expenses at 28',
    hook: '"Nobody talks about this. Here\'s every dollar I made and spent last month."',
    angle: 'Radical transparency format: actual numbers, no filtering',
    bodyOutline: 'Monthly income sources → fixed costs → variable spending → savings/investments → net savings %',
    cta: '"Share your savings rate in the comments"',
    score: 87,
    signalId: 'sig-008',
    signalTopic: 'Personal Finance Transparency',
    formats: ['short-video', 'carousel', 'reel'],
    difficulty: 'easy',
    estimatedReach: '200K – 800K',
    estimatedEngagement: '9.1%',
    timeToCreate: '3-4 hours',
    platformFit: { tiktok: 91, youtube: 85, instagram: 88, x: 79 },
    category: 'Finance',
    tags: ['finance', 'money', 'transparency', 'salary'],
  },
  {
    id: 'opp-004',
    title: 'Why Your Brain Loves Dark Mode',
    hook: '"The neuroscience behind why dark mode feels better — it\'s not what you think"',
    angle: 'Science meets design: accessible explanation of neuro-aesthetics',
    bodyOutline: 'Hook with the misconception → contrast sensitivity science → pupil dilation study → design implications → practical tips',
    cta: '"Do you use dark mode? Why?"',
    score: 85,
    signalId: 'sig-006',
    signalTopic: 'Neuro-Aesthetics Design',
    formats: ['short-video', 'thread', 'carousel'],
    difficulty: 'medium',
    estimatedReach: '60K – 240K',
    estimatedEngagement: '7.3%',
    timeToCreate: '4-6 hours',
    platformFit: { x: 91, youtube: 84, threads: 87, instagram: 72 },
    category: 'Design',
    tags: ['design', 'psychology', 'science', 'UI'],
  },
  {
    id: 'opp-005',
    title: 'I Let AI Plan All My Meals for 7 Days',
    hook: '"I gave ChatGPT $150 and my dietary restrictions. 7 days of AI meal planning."',
    angle: 'Experiment format: genuine surprise and honest assessment',
    bodyOutline: 'Setup the challenge → AI-generated plan reveal → Day 1-3 highlights → Day 4-7 → final verdict + what I\'d change',
    cta: '"Would you do this? Drop your dietary restriction"',
    score: 83,
    signalId: 'sig-009',
    signalTopic: 'AI-Augmented Cooking',
    formats: ['short-video', 'long-video'],
    difficulty: 'medium',
    estimatedReach: '90K – 380K',
    estimatedEngagement: '7.8%',
    timeToCreate: '6-10 hours',
    platformFit: { tiktok: 89, youtube: 86, instagram: 84, x: 61 },
    category: 'Food',
    tags: ['food', 'AI', 'challenge', 'experiment'],
  },
  {
    id: 'opp-006',
    title: 'Europe in 30 Days on $600: Full Breakdown',
    hook: '"$600. 30 days. 8 countries. Here\'s exactly how I did it."',
    angle: 'Proof + system: not vague tips, actual receipts and systems',
    bodyOutline: 'Total cost reveal → the 3 rules I followed → biggest wins (accommodation/food/transport) → biggest mistakes → cost per day by country',
    cta: '"Save this. Your 2026 Europe trip just got cheaper."',
    score: 82,
    signalId: 'sig-005',
    signalTopic: 'Budget Travel Hacks 2026',
    formats: ['short-video', 'long-video', 'carousel'],
    difficulty: 'hard',
    estimatedReach: '150K – 600K',
    estimatedEngagement: '8.8%',
    timeToCreate: '10-16 hours',
    platformFit: { youtube: 90, tiktok: 88, instagram: 85, x: 70 },
    category: 'Travel',
    tags: ['travel', 'budget', 'europe', 'tips'],
  },
];

// ─── AGENT NODES ──────────────────────────────────────────────────────────

export const mockAgents: AgentNode[] = [
  {
    id: 'agent-001',
    name: 'Signal Scout',
    role: 'Collects raw trend signals from all platforms',
    status: 'active',
    lastRun: '2 min ago',
    processed: 12847,
    throughput: '2.1K signals/hr',
    color: '#00D9FF',
  },
  {
    id: 'agent-002',
    name: 'Trend Classifier',
    role: 'Groups and categorizes signals by topic',
    status: 'active',
    lastRun: '4 min ago',
    processed: 8932,
    throughput: '1.4K/hr',
    color: '#B026FF',
  },
  {
    id: 'agent-003',
    name: 'Momentum Analyst',
    role: 'Scores growth velocity and saturation',
    status: 'processing',
    lastRun: '1 min ago',
    processed: 6201,
    throughput: '980/hr',
    color: '#F72585',
  },
  {
    id: 'agent-004',
    name: 'Opportunity Strategist',
    role: 'Converts trends into content opportunities',
    status: 'active',
    lastRun: '8 min ago',
    processed: 3847,
    throughput: '620/hr',
    color: '#FF6B35',
  },
  {
    id: 'agent-005',
    name: 'Angle Generator',
    role: 'Creates hooks, angles, and scripts',
    status: 'active',
    lastRun: '12 min ago',
    processed: 2104,
    throughput: '340/hr',
    color: '#10B981',
  },
  {
    id: 'agent-006',
    name: 'Platform Formatter',
    role: 'Adapts content for TikTok, IG, YouTube, X',
    status: 'idle',
    lastRun: '18 min ago',
    processed: 1893,
    throughput: '0/hr',
    color: '#F59E0B',
  },
  {
    id: 'agent-007',
    name: 'Daily Brief Agent',
    role: 'Compiles the daily intelligence report',
    status: 'idle',
    lastRun: '6 hrs ago',
    processed: 247,
    throughput: '0/hr',
    color: '#6366F1',
  },
  {
    id: 'agent-008',
    name: 'Alert Agent',
    role: 'Triggers real-time notifications on spike events',
    status: 'active',
    lastRun: '30 sec ago',
    processed: 15602,
    throughput: '3.1K/hr',
    color: '#EF4444',
  },
];

// ─── WATCH LIST ───────────────────────────────────────────────────────────

export const mockWatchList: WatchedTopic[] = [
  {
    id: 'watch-001',
    topic: 'AI Tools for Creators',
    category: 'Technology',
    platform: ['tiktok', 'youtube', 'x'],
    currentVelocity: 84,
    alertThreshold: 80,
    alertsEnabled: true,
    trend: [42, 51, 58, 67, 72, 79, 84],
    lastAlert: '3 hours ago',
    addedAt: '2026-04-10',
    region: 'Global',
  },
  {
    id: 'watch-002',
    topic: 'Remote Work Hacks',
    category: 'Productivity',
    platform: ['x', 'youtube', 'threads'],
    currentVelocity: 61,
    alertThreshold: 70,
    alertsEnabled: true,
    trend: [55, 58, 60, 59, 63, 61, 61],
    lastAlert: null,
    addedAt: '2026-04-08',
    region: 'North America',
  },
  {
    id: 'watch-003',
    topic: 'Digital Minimalism',
    category: 'Lifestyle',
    platform: ['instagram', 'tiktok', 'threads'],
    currentVelocity: 73,
    alertThreshold: 75,
    alertsEnabled: false,
    trend: [60, 62, 65, 69, 70, 72, 73],
    lastAlert: null,
    addedAt: '2026-04-05',
    region: 'Europe',
  },
  {
    id: 'watch-004',
    topic: 'Vibe Coding / AI Dev',
    category: 'Technology',
    platform: ['x', 'youtube'],
    currentVelocity: 91,
    alertThreshold: 85,
    alertsEnabled: true,
    trend: [68, 72, 77, 82, 86, 89, 91],
    lastAlert: '45 min ago',
    addedAt: '2026-04-12',
    region: 'Global',
  },
  {
    id: 'watch-005',
    topic: 'Frugal Living',
    category: 'Finance',
    platform: ['tiktok', 'youtube'],
    currentVelocity: 68,
    alertThreshold: 80,
    alertsEnabled: true,
    trend: [58, 61, 63, 65, 66, 68, 68],
    lastAlert: null,
    addedAt: '2026-04-07',
    region: 'Global',
  },
];

// ─── CONTENT CALENDAR ─────────────────────────────────────────────────────

export const mockContentItems: ContentItem[] = [
  {
    id: 'cal-001',
    title: 'The Funniest AI Fails This Week',
    platform: 'tiktok',
    format: 'short-video',
    status: 'scheduled',
    scheduledDate: '2026-04-18T19:45:00Z',
    signalId: 'sig-001',
    score: 91,
    notes: 'Use trending audio. Post during peak window.',
  },
  {
    id: 'cal-002',
    title: 'My Full Salary Breakdown at 28',
    platform: 'youtube',
    format: 'long-video',
    status: 'draft',
    scheduledDate: null,
    signalId: 'sig-008',
    score: 87,
    notes: 'Need to gather all receipts and screenshots.',
  },
  {
    id: 'cal-003',
    title: 'Why Your Brain Loves Dark Mode',
    platform: 'x',
    format: 'thread',
    status: 'idea',
    scheduledDate: null,
    signalId: 'sig-006',
    score: 85,
  },
  {
    id: 'cal-004',
    title: 'Budget Europe Trip Full Breakdown',
    platform: 'youtube',
    format: 'long-video',
    status: 'scheduled',
    scheduledDate: '2026-04-21T14:00:00Z',
    signalId: 'sig-005',
    score: 82,
  },
  {
    id: 'cal-005',
    title: 'I Built a SaaS in 90 Days',
    platform: 'youtube',
    format: 'long-video',
    status: 'published',
    scheduledDate: '2026-04-15T16:00:00Z',
    signalId: 'sig-003',
    score: 88,
    notes: 'Published. 42K views so far.',
  },
  {
    id: 'cal-006',
    title: 'AI Meal Planning: 7-Day Results',
    platform: 'tiktok',
    format: 'short-video',
    status: 'idea',
    scheduledDate: null,
    signalId: 'sig-009',
    score: 83,
  },
  {
    id: 'cal-007',
    title: 'Silent Walking Changed My Life',
    platform: 'instagram',
    format: 'reel',
    status: 'draft',
    scheduledDate: null,
    signalId: 'sig-002',
    score: 74,
  },
  {
    id: 'cal-008',
    title: 'Neuro-Aesthetics Design Thread',
    platform: 'x',
    format: 'thread',
    status: 'scheduled',
    scheduledDate: '2026-04-19T11:00:00Z',
    signalId: 'sig-006',
    score: 85,
  },
];

// ─── PULSE ALERTS ─────────────────────────────────────────────────────────

export const mockAlerts: PulseAlert[] = [
  {
    id: 'alert-001',
    type: 'urgent',
    title: 'Spike Detected: AI Fails +312% in 48h',
    body: 'Signal Scout flagged a 312% velocity spike in "AI Fails & Hallucinations". Saturation still low at 38%. Post in the next 12 hours for maximum traction.',
    platform: 'tiktok',
    signalId: 'sig-001',
    read: false,
    createdAt: '2026-04-17T08:32:00Z',
    urgency: 'critical',
  },
  {
    id: 'alert-002',
    type: 'opportunity',
    title: 'New Opportunity: Micro SaaS Stories',
    body: 'Opportunity Strategist generated 4 new content angles for the Micro SaaS trend. Saturation remains very low (29%). Estimated reach: 80K-320K.',
    platform: 'youtube',
    signalId: 'sig-003',
    read: false,
    createdAt: '2026-04-17T07:15:00Z',
    urgency: 'high',
  },
  {
    id: 'alert-003',
    type: 'signal',
    title: 'Watch Alert: Vibe Coding crossed 85 velocity',
    body: 'Your watched topic "Vibe Coding / AI Dev" crossed your alert threshold of 85. Current velocity: 91. Consider creating content now.',
    platform: 'x',
    signalId: undefined,
    read: false,
    createdAt: '2026-04-17T06:58:00Z',
    urgency: 'high',
  },
  {
    id: 'alert-004',
    type: 'signal',
    title: 'Emerging Signal: Neuro-Aesthetics Design',
    body: 'A new emerging signal with only 18% saturation and growing velocity of 71. Early mover advantage window is open for the next 18-25 days.',
    platform: 'x',
    signalId: 'sig-006',
    read: true,
    createdAt: '2026-04-16T22:10:00Z',
    urgency: 'medium',
  },
  {
    id: 'alert-005',
    type: 'opportunity',
    title: 'Peak Warning: Study With Me Saturating',
    body: '"Aesthetic Study With Me" has reached peak saturation (71%). The window for organic reach is closing. Consider a unique angle or pivot to a different format.',
    platform: 'youtube',
    signalId: 'sig-004',
    read: true,
    createdAt: '2026-04-16T18:45:00Z',
    urgency: 'medium',
  },
  {
    id: 'alert-006',
    type: 'info',
    title: 'Daily Brief Ready',
    body: 'Your daily intelligence brief is ready. 10 new signals, 6 new opportunities, 2 urgent alerts. Best post time today: 7:45 PM.',
    platform: undefined,
    signalId: undefined,
    read: true,
    createdAt: '2026-04-17T06:00:00Z',
    urgency: 'low',
  },
  {
    id: 'alert-007',
    type: 'signal',
    title: 'Platform Shift: TikTok Algorithm Update',
    body: 'Signal Scout detected a TikTok algorithm update affecting content distribution. Short educational videos are receiving 2.4x more reach than last week.',
    platform: 'tiktok',
    read: true,
    createdAt: '2026-04-16T14:20:00Z',
    urgency: 'high',
  },
  {
    id: 'alert-008',
    type: 'opportunity',
    title: 'Budget Travel Angle Still Open',
    body: 'The "Europe $600" angle remains uncrowded with only 3 similar videos in the past 7 days. Estimated reach if posted now: 150K-600K.',
    platform: 'youtube',
    signalId: 'sig-005',
    read: true,
    createdAt: '2026-04-16T11:00:00Z',
    urgency: 'medium',
  },
];

// ─── DAILY BRIEF ──────────────────────────────────────────────────────────

export const dailyBrief: DailyBrief = {
  date: '2026-04-17',
  topOpportunityCount: 6,
  risingSignalCount: 10,
  newAlertCount: 3,
  headline: 'AI Fails is your window. 312% velocity spike, 38% saturation. Post today.',
  summary: '10 signals processed. 6 fresh opportunities scored above 80. Best window: 7:45 PM tonight across TikTok and YouTube.',
};

// ─── PLATFORM STATS ───────────────────────────────────────────────────────

export const platformStats: Record<Platform, { label: string; activity: number; trending: number; color: string }> = {
  tiktok: { label: 'TikTok', activity: 94, trending: 12, color: '#FF0050' },
  youtube: { label: 'YouTube', activity: 87, trending: 8, color: '#FF0000' },
  instagram: { label: 'Instagram', activity: 78, trending: 6, color: '#E1306C' },
  x: { label: 'X / Twitter', activity: 82, trending: 9, color: '#1D9BF0' },
  threads: { label: 'Threads', activity: 71, trending: 5, color: '#000000' },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────

export function getSignalById(id: string): TrendSignal | undefined {
  return mockSignals.find((s) => s.id === id);
}

export function getOpportunityById(id: string): ContentOpportunity | undefined {
  return mockOpportunities.find((o) => o.id === id);
}

export function getSignalsByStatus(status: TrendStatus): TrendSignal[] {
  return mockSignals.filter((s) => s.status === status);
}

export function getTopOpportunities(n = 3): ContentOpportunity[] {
  return [...mockOpportunities].sort((a, b) => b.score - a.score).slice(0, n);
}

export function getUnreadAlerts(): PulseAlert[] {
  return mockAlerts.filter((a) => !a.read);
}

export function scoreColor(score: number): string {
  if (score >= 85) return '#10B981';
  if (score >= 70) return '#F59E0B';
  return '#EF4444';
}

export function velocityLabel(velocity: number): string {
  if (velocity >= 85) return 'Explosive';
  if (velocity >= 70) return 'Fast';
  if (velocity >= 50) return 'Steady';
  return 'Slow';
}

export function statusColor(status: TrendStatus): string {
  const map: Record<TrendStatus, string> = {
    emerging: '#00D9FF',
    rising: '#10B981',
    peak: '#F59E0B',
    declining: '#EF4444',
  };
  return map[status];
}
