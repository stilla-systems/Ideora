'use client';

import { useState } from 'react';
import { mockSignals, mockOpportunities, type Platform, type ContentFormat } from '@/lib/mock-data';
import {
  FlaskConical,
  Wand2,
  Copy,
  RefreshCw,
  ChevronDown,
  Sparkles,
  Target,
  MessageSquare,
  Video,
  FileText,
  Layers,
  Check,
  Zap,
  Star,
} from 'lucide-react';

const PLATFORMS: Platform[] = ['tiktok', 'youtube', 'instagram', 'x', 'threads'];
const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok', youtube: 'YouTube', instagram: 'Instagram', x: 'X / Twitter', threads: 'Threads',
};
const PLATFORM_COLORS: Record<Platform, string> = {
  tiktok: '#FF0050', youtube: '#FF0000', instagram: '#E1306C', x: '#1D9BF0', threads: '#888',
};

const FORMAT_OPTIONS: Array<{ value: ContentFormat; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { value: 'short-video', label: 'Short Video', icon: Video },
  { value: 'long-video', label: 'Long Video', icon: Video },
  { value: 'carousel', label: 'Carousel', icon: Layers },
  { value: 'thread', label: 'Thread', icon: MessageSquare },
  { value: 'reel', label: 'Reel', icon: Video },
  { value: 'podcast', label: 'Podcast', icon: FileText },
];

const TONES = ['Educational', 'Entertaining', 'Inspiring', 'Controversial', 'Documentary', 'Personal Story'];

// Deterministic generated content based on topic + platform + format
function generateContent(topic: string, platform: Platform, format: ContentFormat, tone: string) {
  const topicLower = topic.toLowerCase();

  const hooks = [
    `"This changed everything I thought I knew about ${topic}"`,
    `"Nobody is talking about this ${topic} secret"`,
    `"I tested ${topic} for 30 days. Here's what actually happened."`,
    `"The ${topic} truth they don't want you to know"`,
    `"How I went from zero to expert in ${topic} in 90 days"`,
    `"${topic} is broken. Here's how to fix it."`,
  ];

  const angles = [
    `Myth-busting: Expose the top 3 misconceptions about ${topic}`,
    `Behind the scenes: Show the real process of ${topic} that others hide`,
    `The "anti-advice" angle: What NOT to do with ${topic}`,
    `Documentary style: Day-in-the-life with ${topic} as the thread`,
    `Before/After: Transformation journey using ${topic}`,
    `Expert interview: Get a niche expert's take on ${topic}`,
  ];

  const bodyPoints = [
    `Open with a counterintuitive fact about ${topic}`,
    `Show real data or proof (screenshots, receipts, results)`,
    `Walk through your exact process step by step`,
    `Address the #1 objection your audience has`,
    `End with a surprising twist or reveal`,
  ];

  const ctas = [
    `"Drop your biggest ${topic} question below"`,
    `"Save this — you'll need it when you start ${topic}"`,
    `"Tag someone who needs to see this about ${topic}"`,
    `"Follow for more ${topic} breakdowns like this"`,
    `"Comment your take — do you agree?"`,
  ];

  const platformAdaptations: Record<Platform, string> = {
    tiktok: `Keep under 60s. Use trending audio. Jump-cut style. Hook in first 2 frames.`,
    youtube: `Full breakdown, 8-15 mins. Strong thumbnail with contrast. Chapter markers. End screen CTA.`,
    instagram: `Aesthetic grid preview. First slide stops the scroll. Save-worthy content. 3-7 carousel slides.`,
    x: `Lead with the most controversial or surprising point. Thread of 8-12 tweets. Data-backed.`,
    threads: `Conversational and honest. Longer personal takes. Community discussion starter.`,
  };

  return {
    hook: hooks[Math.floor(Math.abs(topic.charCodeAt(0) + platform.charCodeAt(0)) % hooks.length)],
    angle: angles[Math.floor(Math.abs(topic.charCodeAt(1) + platform.charCodeAt(1)) % angles.length)],
    bodyPoints,
    cta: ctas[Math.floor(Math.abs(topic.charCodeAt(2) + format.charCodeAt(0)) % ctas.length)],
    platformTip: platformAdaptations[platform],
    hashtags: [`#${topic.replace(/\s+/g, '')}`, `#${tone.toLowerCase()}`, `#creator`, `#viral`].join(' '),
    script: `[HOOK] ${hooks[0]}\n\n[BODY]\n• ${bodyPoints[0]}\n• ${bodyPoints[1]}\n• ${bodyPoints[2]}\n\n[CTA] ${ctas[0]}`,
    estimatedViews: `${Math.floor(50 + Math.abs(topic.length * 12))}K – ${Math.floor(200 + Math.abs(topic.length * 45))}K`,
    engagementRate: `${(5 + Math.abs(topic.charCodeAt(0) % 8)).toFixed(1)}%`,
  };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg transition-all"
      style={{ background: copied ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', color: copied ? '#10B981' : '#64748B' }}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

function OutputPanel({ content }: { content: ReturnType<typeof generateContent> }) {
  return (
    <div className="space-y-4">
      {/* Hook */}
      <div
        className="rounded-2xl p-4"
        style={{ background: 'rgba(0,217,255,0.05)', border: '1px solid rgba(0,217,255,0.15)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest" style={{ color: '#00D9FF' }}>Hook (0–3 seconds)</span>
          <CopyButton text={content.hook} />
        </div>
        <p className="text-sm text-white leading-relaxed font-medium">{content.hook}</p>
      </div>

      {/* Angle */}
      <div
        className="rounded-2xl p-4"
        style={{ background: 'rgba(176,38,255,0.05)', border: '1px solid rgba(176,38,255,0.15)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest" style={{ color: '#B026FF' }}>Content Angle</span>
          <CopyButton text={content.angle} />
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">{content.angle}</p>
      </div>

      {/* Body structure */}
      <div
        className="rounded-2xl p-4"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500">Body Structure</span>
          <CopyButton text={content.bodyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')} />
        </div>
        <div className="space-y-2">
          {content.bodyPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(0,217,255,0.1)', color: '#00D9FF' }}
              >
                {i + 1}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="rounded-2xl p-4"
        style={{ background: 'rgba(247,37,133,0.05)', border: '1px solid rgba(247,37,133,0.15)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest" style={{ color: '#F72585' }}>Call to Action</span>
          <CopyButton text={content.cta} />
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">{content.cta}</p>
      </div>

      {/* Platform tip */}
      <div
        className="rounded-2xl p-4"
        style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest" style={{ color: '#F59E0B' }}>Platform Optimization</span>
          <CopyButton text={content.platformTip} />
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{content.platformTip}</p>
      </div>

      {/* Hashtags */}
      <div
        className="rounded-2xl p-4"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500">Hashtags</span>
          <CopyButton text={content.hashtags} />
        </div>
        <p className="text-xs font-mono" style={{ color: '#00D9FF' }}>{content.hashtags}</p>
      </div>

      {/* Estimated performance */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-2xl p-4 text-center"
          style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
        >
          <p className="text-[10px] font-mono text-slate-500 uppercase mb-1">Est. Views</p>
          <p className="text-lg font-bold" style={{ color: '#10B981' }}>{content.estimatedViews}</p>
        </div>
        <div
          className="rounded-2xl p-4 text-center"
          style={{ background: 'rgba(0,217,255,0.06)', border: '1px solid rgba(0,217,255,0.15)' }}
        >
          <p className="text-[10px] font-mono text-slate-500 uppercase mb-1">Est. Engagement</p>
          <p className="text-lg font-bold" style={{ color: '#00D9FF' }}>{content.engagementRate}</p>
        </div>
      </div>
    </div>
  );
}

export default function CreatorLabPage() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<Platform>('tiktok');
  const [format, setFormat] = useState<ContentFormat>('short-video');
  const [tone, setTone] = useState('Educational');
  const [generated, setGenerated] = useState<ReturnType<typeof generateContent> | null>(null);
  const [loading, setLoading] = useState(false);
  const [quickTopic, setQuickTopic] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setGenerated(generateContent(topic, platform, format, tone));
      setLoading(false);
    }, 900);
  };

  const handleQuickFill = (sig: typeof mockSignals[number]) => {
    setTopic(sig.topic);
    setQuickTopic(sig.id);
    setGenerated(null);
  };

  return (
    <div className="min-h-screen" style={{ background: '#080A1A' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 px-8 py-4 flex items-center gap-3"
        style={{ background: 'rgba(8,10,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,107,53,0.15)', border: '1px solid rgba(255,107,53,0.25)' }}>
          <FlaskConical className="w-4 h-4" style={{ color: '#FF6B35' }} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">Creator Lab</h1>
          <p className="text-xs text-slate-500 font-mono">Generate hooks, angles & content blueprints</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)' }}>
          <Sparkles className="w-3 h-3" style={{ color: '#FF6B35' }} />
          <span className="text-xs font-mono" style={{ color: '#FF6B35' }}>AI-Powered</span>
        </div>
      </div>

      <div className="px-8 py-6 grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Left: Controls */}
        <div className="xl:col-span-2 space-y-5">
          {/* Topic input */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <label className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 block mb-2">
              Topic / Niche
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. AI tools for creators, budget travel, personal finance..."
              rows={3}
              className="w-full bg-transparent text-sm text-white placeholder-slate-700 outline-none resize-none leading-relaxed"
            />
            {topic && (
              <div className="flex items-center gap-1.5 mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Wand2 className="w-3 h-3 text-slate-600" />
                <span className="text-[10px] text-slate-600">{topic.length} characters</span>
              </div>
            )}
          </div>

          {/* Platform selector */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <label className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 block mb-3">
              Target Platform
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className="py-2 rounded-xl text-[10px] font-mono font-semibold transition-all"
                  style={platform === p ? {
                    background: `${PLATFORM_COLORS[p]}18`,
                    color: PLATFORM_COLORS[p],
                    border: `1px solid ${PLATFORM_COLORS[p]}30`,
                  } : {
                    background: 'rgba(255,255,255,0.03)',
                    color: '#475569',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {p === 'instagram' ? 'IG' : p === 'youtube' ? 'YT' : p === 'tiktok' ? 'TK' : p === 'threads' ? 'TH' : 'X'}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-2 font-mono">{PLATFORM_LABELS[platform]}</p>
          </div>

          {/* Format */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <label className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 block mb-3">
              Content Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              {FORMAT_OPTIONS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setFormat(value)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium transition-all"
                  style={format === value ? {
                    background: 'rgba(0,217,255,0.1)',
                    color: '#00D9FF',
                    border: '1px solid rgba(0,217,255,0.2)',
                  } : {
                    background: 'rgba(255,255,255,0.03)',
                    color: '#475569',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <label className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-500 block mb-3">
              Content Tone
            </label>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className="text-xs px-3 py-1.5 rounded-full transition-all"
                  style={tone === t ? {
                    background: 'rgba(176,38,255,0.12)',
                    color: '#B026FF',
                    border: '1px solid rgba(176,38,255,0.25)',
                  } : {
                    background: 'rgba(255,255,255,0.03)',
                    color: '#475569',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!topic.trim() || loading}
            className="w-full py-4 rounded-2xl text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #FF6B35, #F72585)',
              color: 'white',
              boxShadow: '0 4px 24px rgba(255,107,53,0.3)',
            }}
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Content Blueprint
              </>
            )}
          </button>

          {/* Quick fill from signals */}
          <div
            className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-600 mb-3">Quick Fill from Trending</p>
            <div className="space-y-1.5">
              {mockSignals.slice(0, 5).map((sig) => (
                <button
                  key={sig.id}
                  onClick={() => handleQuickFill(sig)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all hover:bg-white/[0.03]"
                  style={{
                    background: quickTopic === sig.id ? 'rgba(0,217,255,0.06)' : 'transparent',
                    border: `1px solid ${quickTopic === sig.id ? 'rgba(0,217,255,0.15)' : 'transparent'}`,
                  }}
                >
                  <Zap className="w-3 h-3 flex-shrink-0" style={{ color: '#FF6B35' }} />
                  <span className="text-xs text-slate-400 truncate flex-1">{sig.topic}</span>
                  <span className="text-[10px] font-mono flex-shrink-0"
                    style={{ color: sig.opportunityScore >= 85 ? '#10B981' : '#F59E0B' }}>
                    {sig.opportunityScore}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Output */}
        <div className="xl:col-span-3">
          {!generated && !loading && (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center rounded-2xl"
              style={{ border: '1px dashed rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.01)' }}>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)' }}
              >
                <FlaskConical className="w-8 h-8" style={{ color: '#FF6B35' }} />
              </div>
              <p className="text-slate-300 font-semibold">Ready to generate</p>
              <p className="text-slate-600 text-sm mt-1.5 max-w-sm">
                Enter a topic, choose your platform and format, then click Generate to get your content blueprint.
              </p>
              <div className="flex items-center gap-6 mt-6">
                {['Hook', 'Angle', 'Blueprint', 'CTA'].map((item) => (
                  <div key={item} className="text-center">
                    <div className="w-8 h-8 rounded-xl mx-auto mb-1 flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <Star className="w-3.5 h-3.5 text-slate-700" />
                    </div>
                    <p className="text-[10px] text-slate-700 font-mono">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin"
                  style={{ borderTopColor: '#FF6B35', borderRightColor: '#F72585' }} />
                <div className="absolute inset-2 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,107,53,0.1)' }}>
                  <Sparkles className="w-5 h-5" style={{ color: '#FF6B35' }} />
                </div>
              </div>
              <p className="text-slate-300 font-medium">Crafting your blueprint...</p>
              <p className="text-slate-600 text-sm mt-1">Analyzing signals + generating angles</p>
            </div>
          )}

          {generated && !loading && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-mono text-slate-500 uppercase tracking-wide">Generated for</p>
                  <p className="text-base font-semibold text-white">{topic}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full font-mono"
                    style={{ background: 'rgba(255,107,53,0.1)', color: '#FF6B35', border: '1px solid rgba(255,107,53,0.2)' }}>
                    {PLATFORM_LABELS[platform]}
                  </span>
                  <button
                    onClick={handleGenerate}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all hover:opacity-80"
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <RefreshCw className="w-3 h-3" />
                    Regenerate
                  </button>
                </div>
              </div>
              <OutputPanel content={generated} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
