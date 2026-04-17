'use client';

import { useState } from 'react';
import { mockWatchList, mockSignals, type WatchedTopic, type Platform } from '@/lib/mock-data';
import {
  Eye,
  Plus,
  Bell,
  BellOff,
  Trash2,
  TrendingUp,
  TrendingDown,
  Minus,
  Activity,
  Settings2,
  X,
  Check,
  AlertCircle,
} from 'lucide-react';

const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok', youtube: 'YouTube', instagram: 'Instagram', x: 'X', threads: 'Threads',
};
const PLATFORM_COLORS: Record<Platform, string> = {
  tiktok: '#FF0050', youtube: '#FF0000', instagram: '#E1306C', x: '#1D9BF0', threads: '#888',
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <circle
        cx={parseFloat(pts.split(' ').pop()!.split(',')[0])}
        cy={parseFloat(pts.split(' ').pop()!.split(',')[1])}
        r="3"
        fill={color}
      />
    </svg>
  );
}

function TrendArrow({ data }: { data: number[] }) {
  const last = data[data.length - 1];
  const prev = data[data.length - 2];
  const delta = last - prev;
  if (delta > 2) return <TrendingUp className="w-3.5 h-3.5" style={{ color: '#10B981' }} />;
  if (delta < -2) return <TrendingDown className="w-3.5 h-3.5" style={{ color: '#EF4444' }} />;
  return <Minus className="w-3.5 h-3.5" style={{ color: '#64748B' }} />;
}

function VelocityGauge({ value, threshold }: { value: number; threshold: number }) {
  const isAbove = value >= threshold;
  const color = isAbove ? '#EF4444' : value >= threshold * 0.9 ? '#F59E0B' : '#00D9FF';
  const pct = (value / 100) * 100;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
          <circle
            cx="24" cy="24" r="18" fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 113.1} 113.1`}
            style={{ transition: 'stroke-dasharray 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[11px] font-bold" style={{ color }}>{value}</span>
        </div>
      </div>
      {isAbove && (
        <div className="flex items-center gap-1">
          <AlertCircle className="w-2.5 h-2.5" style={{ color: '#EF4444' }} />
          <span className="text-[9px] font-mono" style={{ color: '#EF4444' }}>Alert!</span>
        </div>
      )}
    </div>
  );
}

function WatchCard({
  topic,
  onRemove,
  onToggleAlert,
}: {
  topic: WatchedTopic;
  onRemove: (id: string) => void;
  onToggleAlert: (id: string) => void;
}) {
  const isAlerted = topic.currentVelocity >= topic.alertThreshold;
  const trend7d = topic.trend[topic.trend.length - 1] - topic.trend[0];

  return (
    <div
      className="rounded-2xl p-5 relative transition-all duration-200"
      style={{
        background: isAlerted ? 'rgba(239,68,68,0.04)' : 'rgba(255,255,255,0.018)',
        border: `1px solid ${isAlerted ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.07)'}`,
      }}
    >
      {isAlerted && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-mono font-semibold"
          style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <AlertCircle className="w-2.5 h-2.5" />
          Alert Triggered
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Gauge */}
        <VelocityGauge value={topic.currentVelocity} threshold={topic.alertThreshold} />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-semibold text-white">{topic.topic}</h3>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}>
              {topic.category}
            </span>
            <span className="text-[10px] text-slate-600 font-mono">{topic.region}</span>
          </div>

          {/* Platform tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {topic.platform.map((p) => (
              <span
                key={p}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: `${PLATFORM_COLORS[p]}12`, color: PLATFORM_COLORS[p], border: `1px solid ${PLATFORM_COLORS[p]}20` }}
              >
                {PLATFORM_LABELS[p]}
              </span>
            ))}
          </div>

          {/* Sparkline */}
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <TrendArrow data={topic.trend} />
                <span className="text-[10px] text-slate-500 font-mono">
                  {trend7d > 0 ? `+${trend7d}` : trend7d} this week
                </span>
              </div>
              <MiniSparkline data={topic.trend} color={isAlerted ? '#EF4444' : '#00D9FF'} />
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-600 mb-0.5">Alert at</div>
              <div className="text-sm font-semibold text-slate-400">{topic.alertThreshold}</div>
            </div>
          </div>
        </div>
      </div>

      {topic.lastAlert && (
        <div
          className="mt-3 pt-3 flex items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <Bell className="w-3 h-3 text-slate-600 flex-shrink-0" />
          <span className="text-[10px] text-slate-600">Last alert: {topic.lastAlert}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <button
          onClick={() => onToggleAlert(topic.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
          style={topic.alertsEnabled ? {
            background: 'rgba(0,217,255,0.08)',
            color: '#00D9FF',
            border: '1px solid rgba(0,217,255,0.15)',
          } : {
            background: 'rgba(255,255,255,0.04)',
            color: '#64748B',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {topic.alertsEnabled ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
          {topic.alertsEnabled ? 'Alerts On' : 'Alerts Off'}
        </button>
        <button
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs transition-all hover:opacity-70"
          style={{ background: 'rgba(255,255,255,0.04)', color: '#64748B', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Settings2 className="w-3 h-3" />
        </button>
        <div className="flex-1" />
        <button
          onClick={() => onRemove(topic.id)}
          className="p-1.5 rounded-xl transition-all hover:bg-red-500/10 group"
        >
          <Trash2 className="w-3 h-3 text-slate-700 group-hover:text-red-400 transition-colors" />
        </button>
      </div>
    </div>
  );
}

function AddTopicModal({ onClose, onAdd }: { onClose: () => void; onAdd: (topic: string) => void }) {
  const [value, setValue] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}>
      <div
        className="w-full max-w-md mx-4 rounded-2xl p-6"
        style={{ background: '#0D0F1F', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white">Watch a new topic</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. Remote work tools, Web3 for creators..."
          className="w-full bg-transparent rounded-xl px-4 py-3 text-sm text-white placeholder-slate-700 outline-none mb-4"
          style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
          onKeyDown={(e) => e.key === 'Enter' && value.trim() && onAdd(value)}
        />
        <p className="text-xs text-slate-600 mb-4">We'll track velocity, saturation, and alert you when it crosses your threshold.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm text-slate-400 transition-all hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            Cancel
          </button>
          <button
            onClick={() => value.trim() && onAdd(value)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-80 flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #00D9FF, #B026FF)' }}
          >
            <Eye className="w-3.5 h-3.5" />
            Start Watching
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SignalWatchPage() {
  const [watchList, setWatchList] = useState<WatchedTopic[]>(mockWatchList);
  const [showAdd, setShowAdd] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState('');

  const handleRemove = (id: string) => {
    setWatchList((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleAlert = (id: string) => {
    setWatchList((prev) => prev.map((t) => t.id === id ? { ...t, alertsEnabled: !t.alertsEnabled } : t));
  };

  const handleAdd = (topic: string) => {
    const newTopic: WatchedTopic = {
      id: `watch-${Date.now()}`,
      topic,
      category: 'General',
      platform: ['tiktok', 'youtube'],
      currentVelocity: 35,
      alertThreshold: 70,
      alertsEnabled: true,
      trend: [28, 30, 32, 33, 34, 35, 35],
      lastAlert: null,
      addedAt: new Date().toISOString().split('T')[0],
      region: 'Global',
    };
    setWatchList((prev) => [newTopic, ...prev]);
    setShowAdd(false);
    setAddedSuccess(topic);
    setTimeout(() => setAddedSuccess(''), 3000);
  };

  const alertedTopics = watchList.filter((t) => t.currentVelocity >= t.alertThreshold);
  const activeAlerts = watchList.filter((t) => t.alertsEnabled).length;

  return (
    <div className="min-h-screen" style={{ background: '#080A1A' }}>
      {showAdd && <AddTopicModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}

      {/* Top bar */}
      <div
        className="sticky top-0 z-10 px-8 py-4"
        style={{ background: 'rgba(8,10,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.25)' }}>
              <Eye className="w-4 h-4" style={{ color: '#10B981' }} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Signal Watch</h1>
              <p className="text-xs text-slate-500 font-mono">Track topics · Get alerted at velocity thresholds</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {alertedTopics.length > 0 && (
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#EF4444' }} />
                <span className="text-xs font-mono" style={{ color: '#EF4444' }}>{alertedTopics.length} triggered</span>
              </div>
            )}
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(0,217,255,0.1))', color: '#10B981', border: '1px solid rgba(16,185,129,0.25)' }}
            >
              <Plus className="w-4 h-4" />
              Watch Topic
            </button>
          </div>
        </div>
      </div>

      {/* Success toast */}
      {addedSuccess && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl"
          style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', backdropFilter: 'blur(12px)' }}
        >
          <Check className="w-4 h-4" style={{ color: '#10B981' }} />
          <span className="text-sm text-white">Now watching: <span className="font-semibold">{addedSuccess}</span></span>
        </div>
      )}

      {/* Stats strip */}
      <div className="flex items-center gap-8 px-8 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div>
          <span className="text-2xl font-bold text-white">{watchList.length}</span>
          <span className="text-xs text-slate-500 ml-2">Topics Watched</span>
        </div>
        <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div>
          <span className="text-2xl font-bold" style={{ color: '#00D9FF' }}>{activeAlerts}</span>
          <span className="text-xs text-slate-500 ml-2">Active Alerts</span>
        </div>
        <div className="w-px h-5" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div>
          <span className="text-2xl font-bold" style={{ color: alertedTopics.length > 0 ? '#EF4444' : '#64748B' }}>
            {alertedTopics.length}
          </span>
          <span className="text-xs text-slate-500 ml-2">Triggered Now</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" style={{ color: '#10B981' }} />
          <span className="text-xs text-slate-500 font-mono">Live monitoring</span>
        </div>
      </div>

      {/* Triggered alert banner */}
      {alertedTopics.length > 0 && (
        <div
          className="mx-8 mt-4 rounded-2xl px-5 py-4 flex items-start gap-4"
          style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)' }}
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: '#EF4444' }}>
              {alertedTopics.length} {alertedTopics.length === 1 ? 'topic has' : 'topics have'} crossed the alert threshold
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {alertedTopics.map((t) => t.topic).join(', ')} — Post now for maximum reach
            </p>
          </div>
        </div>
      )}

      {/* Watch grid */}
      <div className="px-8 py-6">
        {watchList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Eye className="w-10 h-10 text-slate-700 mb-3" />
            <p className="text-slate-400 font-medium">No topics being watched</p>
            <p className="text-slate-600 text-sm mt-1">Add topics to get velocity alerts and trend tracking</p>
            <button
              onClick={() => setShowAdd(true)}
              className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <Plus className="w-3.5 h-3.5" />
              Add your first topic
            </button>
          </div>
        ) : (
          <>
            {/* Suggested from signals */}
            <div className="mb-6">
              <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-slate-600 mb-3">Suggested from rising signals</p>
              <div className="flex flex-wrap gap-2">
                {mockSignals
                  .filter((s) => !watchList.find((w) => w.topic.toLowerCase() === s.topic.toLowerCase()))
                  .slice(0, 5)
                  .map((sig) => (
                    <button
                      key={sig.id}
                      onClick={() => handleAdd(sig.topic)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all hover:opacity-80"
                      style={{ background: 'rgba(255,255,255,0.03)', color: '#64748B', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <Plus className="w-3 h-3" />
                      {sig.topic}
                      <span className="font-mono" style={{ color: sig.velocity >= 80 ? '#10B981' : '#F59E0B' }}>
                        {sig.velocity}
                      </span>
                    </button>
                  ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {watchList.map((topic) => (
                <WatchCard
                  key={topic.id}
                  topic={topic}
                  onRemove={handleRemove}
                  onToggleAlert={handleToggleAlert}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
