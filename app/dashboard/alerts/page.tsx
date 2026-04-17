'use client';

import { useState, useMemo } from 'react';
import { mockAlerts, type PulseAlert, type AlertType } from '@/lib/mock-data';
import {
  BellDot,
  AlertTriangle,
  Zap,
  Activity,
  Info,
  CheckCheck,
  Trash2,
  Settings2,
  Circle,
  Bell,
  BellOff,
  Clock,
  ChevronDown,
  Filter,
  TrendingUp,
} from 'lucide-react';

const TYPE_CONFIG: Record<AlertType, {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}> = {
  urgent: {
    label: 'Urgent',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.06)',
    border: 'rgba(239,68,68,0.18)',
    icon: AlertTriangle,
  },
  opportunity: {
    label: 'Opportunity',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.18)',
    icon: TrendingUp,
  },
  signal: {
    label: 'Signal',
    color: '#00D9FF',
    bg: 'rgba(0,217,255,0.06)',
    border: 'rgba(0,217,255,0.18)',
    icon: Activity,
  },
  info: {
    label: 'Info',
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.06)',
    border: 'rgba(99,102,241,0.18)',
    icon: Info,
  },
};

const URGENCY_CONFIG = {
  critical: { label: 'Critical', color: '#EF4444' },
  high: { label: 'High', color: '#F97316' },
  medium: { label: 'Medium', color: '#F59E0B' },
  low: { label: 'Low', color: '#64748B' },
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function AlertCard({
  alert,
  onRead,
  onDelete,
}: {
  alert: PulseAlert;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const conf = TYPE_CONFIG[alert.type];
  const urgConf = URGENCY_CONFIG[alert.urgency];
  const Icon = conf.icon;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200 group"
      style={{
        background: alert.read ? 'rgba(255,255,255,0.015)' : conf.bg,
        border: `1px solid ${alert.read ? 'rgba(255,255,255,0.06)' : conf.border}`,
      }}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: `${conf.color}15`, border: `1px solid ${conf.color}22` }}
          >
            <Icon className="w-4 h-4" style={{ color: conf.color }} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {!alert.read && (
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: conf.color }} />
                  )}
                  <span
                    className="text-[10px] font-mono font-semibold uppercase tracking-wide"
                    style={{ color: conf.color }}
                  >
                    {conf.label}
                  </span>
                  <span
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded-full"
                    style={{ background: `${urgConf.color}12`, color: urgConf.color }}
                  >
                    {urgConf.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white leading-snug">{alert.title}</p>
              </div>

              {/* Time + actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {formatTime(alert.createdAt)}
                </span>
              </div>
            </div>

            <p
              className={`text-xs text-slate-400 mt-1.5 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}
            >
              {alert.body}
            </p>

            {alert.body.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-[10px] font-mono mt-1 flex items-center gap-1 transition-colors hover:opacity-70"
                style={{ color: conf.color }}
              >
                {expanded ? 'Show less' : 'Read more'}
                <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
              </button>
            )}

            {/* Action strip */}
            <div className="flex items-center gap-2 mt-3">
              {alert.platform && (
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}
                >
                  {alert.platform.charAt(0).toUpperCase() + alert.platform.slice(1)}
                </span>
              )}
              <div className="flex-1" />
              {!alert.read && (
                <button
                  onClick={() => onRead(alert.id)}
                  className="flex items-center gap-1 text-[10px] font-mono px-2.5 py-1 rounded-lg transition-all hover:opacity-70"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}
                >
                  <CheckCheck className="w-3 h-3" />
                  Mark read
                </button>
              )}
              <button
                onClick={() => onDelete(alert.id)}
                className="p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 hover:bg-red-500/10 group/btn"
              >
                <Trash2 className="w-3 h-3 text-slate-700 group-hover/btn:text-red-400 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertSettings() {
  const [notifs, setNotifs] = useState({
    urgent: true,
    opportunity: true,
    signal: true,
    info: false,
  });

  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Settings2 className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-semibold text-white">Alert Settings</span>
      </div>
      <div className="space-y-3">
        {(Object.entries(TYPE_CONFIG) as [AlertType, typeof TYPE_CONFIG[AlertType]][]).map(([type, conf]) => {
          const Icon = conf.icon;
          return (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: conf.bg, border: `1px solid ${conf.border}` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: conf.color }} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-300">{conf.label} Alerts</p>
                  <p className="text-[10px] text-slate-600 font-mono">
                    {type === 'urgent' ? 'Spike events & critical windows' : type === 'opportunity' ? 'New scored opportunities' : type === 'signal' ? 'Watch threshold crossings' : 'Platform & system info'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNotifs((n) => ({ ...n, [type]: !n[type as keyof typeof n] }))}
                className="relative w-9 h-5 rounded-full transition-all duration-200 flex-shrink-0"
                style={{ background: notifs[type] ? conf.color : 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200"
                  style={{ left: notifs[type] ? '18px' : '2px' }}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div
        className="mt-4 pt-4 space-y-2"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
      >
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wide">Delivery</p>
        {['In-app', 'Email', 'Mobile push'].map((method, i) => (
          <div key={method} className="flex items-center justify-between">
            <span className="text-xs text-slate-400">{method}</span>
            <button
              className="relative w-9 h-5 rounded-full transition-all duration-200"
              style={{ background: i === 0 ? '#00D9FF' : 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-200"
                style={{ left: i === 0 ? '18px' : '2px' }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PulseAlertsPage() {
  const [alerts, setAlerts] = useState<PulseAlert[]>(mockAlerts);
  const [filter, setFilter] = useState<AlertType | 'all'>('all');
  const [showUnread, setShowUnread] = useState(false);

  const handleRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, read: true } : a));
  };

  const handleDelete = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleMarkAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const filtered = useMemo(() => {
    let list = [...alerts];
    if (filter !== 'all') list = list.filter((a) => a.type === filter);
    if (showUnread) list = list.filter((a) => !a.read);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [alerts, filter, showUnread]);

  const unreadCount = alerts.filter((a) => !a.read).length;
  const urgentCount = alerts.filter((a) => a.type === 'urgent' && !a.read).length;

  return (
    <div className="min-h-screen" style={{ background: '#080A1A' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 px-8 py-4"
        style={{ background: 'rgba(8,10,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center relative" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <BellDot className="w-4 h-4" style={{ color: '#EF4444' }} />
              {unreadCount > 0 && (
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                  style={{ background: '#EF4444' }}
                >
                  {unreadCount}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Pulse Alerts</h1>
              <p className="text-xs text-slate-500 font-mono">Real-time signal notifications</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all hover:opacity-80"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
            style={filter === 'all' ? {
              background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)',
            } : {
              background: 'rgba(255,255,255,0.04)', color: '#64748B', border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            All ({alerts.length})
          </button>
          {(Object.entries(TYPE_CONFIG) as [AlertType, typeof TYPE_CONFIG[AlertType]][]).map(([type, conf]) => {
            const count = alerts.filter((a) => a.type === type).length;
            const Icon = conf.icon;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                style={filter === type ? {
                  background: conf.bg,
                  color: conf.color,
                  border: `1px solid ${conf.border}`,
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  color: '#64748B',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <Icon className="w-3 h-3" style={{ color: filter === type ? conf.color : '#64748B' }} />
                {conf.label} ({count})
              </button>
            );
          })}
          <button
            onClick={() => setShowUnread(!showUnread)}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
            style={showUnread ? {
              background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)',
            } : {
              background: 'rgba(255,255,255,0.04)', color: '#64748B', border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {showUnread ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
            Unread only
          </button>
        </div>
      </div>

      {/* Urgent banner */}
      {urgentCount > 0 && filter === 'all' && !showUnread && (
        <div
          className="mx-8 mt-4 rounded-2xl px-5 py-4 flex items-center gap-3"
          style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: '#EF4444' }} />
          <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#EF4444' }} />
          <p className="text-sm font-semibold" style={{ color: '#EF4444' }}>
            {urgentCount} urgent {urgentCount === 1 ? 'alert' : 'alerts'} require your attention
          </p>
          <button
            onClick={() => setFilter('urgent')}
            className="ml-auto text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
            style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' }}
          >
            View urgent
          </button>
        </div>
      )}

      {/* Main layout */}
      <div className="px-8 py-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Alert feed */}
        <div className="xl:col-span-2 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-mono text-slate-600 uppercase tracking-wide">
              {filtered.length} {filter !== 'all' ? TYPE_CONFIG[filter].label.toLowerCase() + ' ' : ''}{showUnread ? 'unread ' : ''}alerts
            </p>
          </div>

          {filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center rounded-2xl"
              style={{ border: '1px dashed rgba(255,255,255,0.06)' }}
            >
              <BellOff className="w-10 h-10 text-slate-700 mb-3" />
              <p className="text-slate-400 font-medium">No alerts to show</p>
              <p className="text-slate-600 text-sm mt-1">
                {showUnread ? "All caught up! No unread alerts." : "Try adjusting your filters."}
              </p>
            </div>
          ) : (
            filtered.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onRead={handleRead}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        {/* Sidebar: stats + settings */}
        <div className="space-y-5">
          {/* Summary */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.018)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-xs font-semibold text-white mb-4">Alert Summary</p>
            <div className="space-y-3">
              {(Object.entries(TYPE_CONFIG) as [AlertType, typeof TYPE_CONFIG[AlertType]][]).map(([type, conf]) => {
                const total = alerts.filter((a) => a.type === type).length;
                const unread = alerts.filter((a) => a.type === type && !a.read).length;
                const Icon = conf.icon;
                return (
                  <div key={type} className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: conf.bg, border: `1px solid ${conf.border}` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: conf.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-300">{conf.label}</span>
                        <div className="flex items-center gap-1.5">
                          {unread > 0 && (
                            <span
                              className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full"
                              style={{ background: conf.bg, color: conf.color }}
                            >
                              {unread} new
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-slate-600">{total} total</span>
                        </div>
                      </div>
                      <div className="mt-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(total / alerts.length) * 100}%`, background: conf.color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <AlertSettings />
        </div>
      </div>
    </div>
  );
}
