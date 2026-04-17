'use client';

import { useState } from 'react';
import { mockContentItems, mockSignals, type ContentItem, type Platform, type ContentFormat } from '@/lib/mock-data';
import {
  CalendarDays,
  Plus,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Clock,
  CheckCircle2,
  Circle,
  Edit3,
  Trash2,
  Star,
  X,
  Check,
  Zap,
} from 'lucide-react';

const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok', youtube: 'YouTube', instagram: 'Instagram', x: 'X', threads: 'Threads',
};
const PLATFORM_COLORS: Record<Platform, string> = {
  tiktok: '#FF0050', youtube: '#FF0000', instagram: '#E1306C', x: '#1D9BF0', threads: '#888',
};
const FORMAT_LABELS: Record<ContentFormat, string> = {
  'short-video': 'Short', 'long-video': 'Long', carousel: 'Carousel', thread: 'Thread', podcast: 'Podcast', reel: 'Reel',
};

const STATUS_CONFIG = {
  idea: { label: 'Idea', color: '#64748B', bg: 'rgba(100,116,139,0.1)', icon: Circle },
  draft: { label: 'Draft', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', icon: Edit3 },
  scheduled: { label: 'Scheduled', color: '#00D9FF', bg: 'rgba(0,217,255,0.1)', icon: Clock },
  published: { label: 'Published', color: '#10B981', bg: 'rgba(16,185,129,0.1)', icon: CheckCircle2 },
};

type ContentStatus = 'idea' | 'draft' | 'scheduled' | 'published';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: Array<{ day: number | null; date: string | null }> = [];
  for (let i = 0; i < firstDay; i++) days.push({ day: null, date: null });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push({ day: d, date });
  }
  return days;
}

function ContentItemCard({ item, onStatusChange, onRemove }: {
  item: ContentItem;
  onStatusChange: (id: string, status: ContentStatus) => void;
  onRemove: (id: string) => void;
}) {
  const conf = STATUS_CONFIG[item.status];
  const StatusIcon = conf.icon;
  const signal = mockSignals.find((s) => s.id === item.signalId);

  return (
    <div
      className="rounded-2xl p-4 group transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.018)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold flex-shrink-0"
              style={{ background: `${PLATFORM_COLORS[item.platform]}15`, color: PLATFORM_COLORS[item.platform], border: `1px solid ${PLATFORM_COLORS[item.platform]}20` }}
            >
              {item.platform === 'instagram' ? 'IG' : item.platform === 'youtube' ? 'YT' : item.platform === 'tiktok' ? 'TK' : item.platform === 'threads' ? 'TH' : 'X'}
            </div>
            <span className="text-[10px] font-mono text-slate-600">{FORMAT_LABELS[item.format]}</span>
            {item.score && (
              <span className="text-[10px] font-mono flex items-center gap-0.5" style={{ color: item.score >= 85 ? '#10B981' : '#F59E0B' }}>
                <Star className="w-2.5 h-2.5" />
                {item.score}
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-white leading-snug line-clamp-2">{item.title}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onRemove(item.id)}
            className="p-1 rounded-lg hover:bg-red-500/10 group/btn"
          >
            <Trash2 className="w-3 h-3 text-slate-700 group-hover/btn:text-red-400 transition-colors" />
          </button>
        </div>
      </div>

      {item.scheduledDate && (
        <div className="flex items-center gap-1.5 mb-3">
          <Clock className="w-3 h-3 text-slate-600" />
          <span className="text-[11px] text-slate-500 font-mono">
            {new Date(item.scheduledDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      )}

      {signal && (
        <div className="flex items-center gap-1.5 mb-3">
          <Zap className="w-3 h-3 text-slate-600 flex-shrink-0" />
          <span className="text-[10px] text-slate-600 truncate">{signal.topic}</span>
        </div>
      )}

      {/* Status selector */}
      <div className="flex gap-1.5 flex-wrap">
        {(Object.keys(STATUS_CONFIG) as ContentStatus[]).map((s) => {
          const c = STATUS_CONFIG[s];
          const Icon = c.icon;
          return (
            <button
              key={s}
              onClick={() => onStatusChange(item.id, s)}
              className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono font-medium transition-all"
              style={item.status === s ? {
                background: c.bg,
                color: c.color,
                border: `1px solid ${c.color}25`,
              } : {
                background: 'rgba(255,255,255,0.03)',
                color: '#475569',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <Icon className="w-2.5 h-2.5" />
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function KanbanView({ items, onStatusChange, onRemove }: {
  items: ContentItem[];
  onStatusChange: (id: string, status: ContentStatus) => void;
  onRemove: (id: string) => void;
}) {
  const statuses: ContentStatus[] = ['idea', 'draft', 'scheduled', 'published'];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {statuses.map((status) => {
        const conf = STATUS_CONFIG[status];
        const StatusIcon = conf.icon;
        const col = items.filter((i) => i.status === status);
        return (
          <div key={status}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: conf.bg }}>
                <StatusIcon className="w-3 h-3" style={{ color: conf.color }} />
              </div>
              <span className="text-xs font-semibold text-white">{conf.label}</span>
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-full ml-auto"
                style={{ background: conf.bg, color: conf.color }}
              >
                {col.length}
              </span>
            </div>
            <div className="space-y-3">
              {col.map((item) => (
                <ContentItemCard key={item.id} item={item} onStatusChange={onStatusChange} onRemove={onRemove} />
              ))}
              {col.length === 0 && (
                <div
                  className="rounded-2xl p-6 text-center"
                  style={{ border: '1px dashed rgba(255,255,255,0.06)' }}
                >
                  <p className="text-xs text-slate-700">No {conf.label.toLowerCase()} items</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CalendarView({ items }: { items: ContentItem[] }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const days = getCalendarDays(year, month);
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const getItemsForDate = (dateStr: string) =>
    items.filter((i) => i.scheduledDate?.startsWith(dateStr));

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.015)' }}
    >
      {/* Calendar header */}
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-4 h-4 text-slate-400" />
        </button>
        <h3 className="text-sm font-semibold text-white">{MONTHS[month]} {year}</h3>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 px-4 pt-3">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="text-center text-[10px] font-mono text-slate-600 uppercase pb-2">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0.5 px-4 pb-4">
        {days.map((cell, i) => {
          const isToday = cell.date === todayStr;
          const cellItems = cell.date ? getItemsForDate(cell.date) : [];
          return (
            <div
              key={i}
              className="min-h-[72px] rounded-xl p-1.5 transition-colors"
              style={{
                background: isToday ? 'rgba(0,217,255,0.08)' : cell.day ? 'rgba(255,255,255,0.02)' : 'transparent',
                border: isToday ? '1px solid rgba(0,217,255,0.2)' : '1px solid transparent',
              }}
            >
              {cell.day && (
                <>
                  <div className="text-[11px] font-mono mb-1 text-center"
                    style={{ color: isToday ? '#00D9FF' : '#475569' }}>
                    {cell.day}
                  </div>
                  <div className="space-y-0.5">
                    {cellItems.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        className="rounded px-1 py-0.5 text-[9px] font-medium leading-tight truncate"
                        style={{
                          background: `${PLATFORM_COLORS[item.platform]}18`,
                          color: PLATFORM_COLORS[item.platform],
                        }}
                      >
                        {item.title.slice(0, 20)}...
                      </div>
                    ))}
                    {cellItems.length > 2 && (
                      <div className="text-[9px] text-slate-600 text-center">+{cellItems.length - 2}</div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ContentFlowPage() {
  const [items, setItems] = useState<ContentItem[]>(mockContentItems);
  const [view, setView] = useState<'kanban' | 'calendar'>('kanban');

  const handleStatusChange = (id: string, status: ContentStatus) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const counts = {
    idea: items.filter((i) => i.status === 'idea').length,
    draft: items.filter((i) => i.status === 'draft').length,
    scheduled: items.filter((i) => i.status === 'scheduled').length,
    published: items.filter((i) => i.status === 'published').length,
  };

  return (
    <div className="min-h-screen" style={{ background: '#080A1A' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 px-8 py-4"
        style={{ background: 'rgba(8,10,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.25)' }}>
              <CalendarDays className="w-4 h-4" style={{ color: '#F59E0B' }} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Content Flow</h1>
              <p className="text-xs text-slate-500 font-mono">Plan, schedule, and track content</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <button
                onClick={() => setView('kanban')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={view === 'kanban' ? { background: 'rgba(255,255,255,0.08)', color: 'white' } : { color: '#64748B' }}
              >
                <LayoutGrid className="w-3 h-3" />
                Kanban
              </button>
              <button
                onClick={() => setView('calendar')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={view === 'calendar' ? { background: 'rgba(255,255,255,0.08)', color: 'white' } : { color: '#64748B' }}
              >
                <CalendarDays className="w-3 h-3" />
                Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="flex items-center gap-6 px-8 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {(Object.entries(counts) as [ContentStatus, number][]).map(([status, count]) => {
          const conf = STATUS_CONFIG[status];
          const Icon = conf.icon;
          return (
            <div key={status} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: conf.bg }}>
                <Icon className="w-3 h-3" style={{ color: conf.color }} />
              </div>
              <span className="text-sm font-semibold text-white">{count}</span>
              <span className="text-xs text-slate-500">{conf.label}</span>
            </div>
          );
        })}
        <div className="ml-auto">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(255,107,53,0.1))',
              color: '#F59E0B',
              border: '1px solid rgba(245,158,11,0.25)',
            }}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Content
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-6">
        {view === 'kanban' ? (
          <KanbanView items={items} onStatusChange={handleStatusChange} onRemove={handleRemove} />
        ) : (
          <div className="space-y-5">
            <CalendarView items={items} />
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-600 mb-3">Scheduled Content</p>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {items
                  .filter((i) => i.status === 'scheduled' && i.scheduledDate)
                  .sort((a, b) => new Date(a.scheduledDate!).getTime() - new Date(b.scheduledDate!).getTime())
                  .map((item) => (
                    <ContentItemCard key={item.id} item={item} onStatusChange={handleStatusChange} onRemove={handleRemove} />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
