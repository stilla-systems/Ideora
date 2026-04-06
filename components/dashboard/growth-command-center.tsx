'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertCircle, Zap, Target } from 'lucide-react';

// Main Command Center Panel Component
export function GrowthCommandCenter() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Left Panel: Main Intelligence */}
      <div className="lg:col-span-2 space-y-6">
        {/* Top Idea Card */}
        <Card className="border border-gray-800 bg-slate-900 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xs font-mono text-gray-400 tracking-widest mb-2">TODAY'S TOP IDEA</h3>
              <h2 className="text-xl font-bold text-white">AI Goes Wrong Compilation</h2>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-cyan-400">87</div>
              <p className="text-xs text-gray-500 font-mono">AI SCORE</p>
            </div>
          </div>
          <div className="space-y-3 border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">Hook Strength</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1 bg-gray-800 rounded">
                  <div className="w-20 h-1 bg-cyan-500 rounded"></div>
                </div>
                <span className="text-xs font-mono text-cyan-400">92%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">Trend Alignment</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1 bg-gray-800 rounded">
                  <div className="w-16 h-1 bg-cyan-500 rounded" style={{ width: '78%' }}></div>
                </div>
                <span className="text-xs font-mono text-cyan-400">78%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">Watch Retention</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1 bg-gray-800 rounded">
                  <div className="w-20 h-1 bg-cyan-500 rounded" style={{ width: '84%' }}></div>
                </div>
                <span className="text-xs font-mono text-cyan-400">84%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Engagement Prediction & Optimal Time */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="border border-gray-800 bg-slate-900 p-6">
            <h3 className="text-xs font-mono text-gray-400 tracking-widest mb-4">ENGAGEMENT PREDICTION</h3>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-white">+2.3K</p>
                <p className="text-xs text-gray-500 font-mono">Expected Engagement</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-cyan-500 text-cyan-400 bg-cyan-500/10 font-mono text-xs">
                  ↑ 34% vs average
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="border border-gray-800 bg-slate-900 p-6">
            <h3 className="text-xs font-mono text-gray-400 tracking-widest mb-4">OPTIMAL POST TIME</h3>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-white">7:45 PM</p>
                <p className="text-xs text-gray-500 font-mono">Monday, Tomorrow</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10 font-mono text-xs">
                  Peak Window
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Content Blueprint */}
        <Card className="border border-gray-800 bg-slate-900 p-6">
          <h3 className="text-xs font-mono text-gray-400 tracking-widest mb-4">CONTENT BLUEPRINT GENERATOR</h3>
          <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded border border-gray-700">
              <p className="text-xs font-mono text-gray-400 mb-2">HOOK (0-3 sec)</p>
              <p className="text-sm text-white">"I asked ChatGPT to write code and it created a virus"</p>
            </div>
            <div className="bg-slate-800 p-4 rounded border border-gray-700">
              <p className="text-xs font-mono text-gray-400 mb-2">BODY (3-25 sec)</p>
              <p className="text-sm text-white">Show the AI-generated code, reactions of developer friends testing it</p>
            </div>
            <div className="bg-slate-800 p-4 rounded border border-gray-700">
              <p className="text-xs font-mono text-gray-400 mb-2">CTA (25-30 sec)</p>
              <p className="text-sm text-white">"Drop a comment: worst AI fail you've seen"</p>
            </div>
          </div>
        </Card>

        {/* Growth Acceleration Panel */}
        <Card className="border border-gray-800 bg-slate-900 p-6">
          <h3 className="text-xs font-mono text-gray-400 tracking-widest mb-4">GROWTH ACCELERATION PANEL</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-800 p-4 rounded border border-gray-700">
              <p className="text-xs font-mono text-gray-500 mb-2">PROJECTED REACH</p>
              <p className="text-xl font-bold text-white">45.2K</p>
            </div>
            <div className="bg-slate-800 p-4 rounded border border-gray-700">
              <p className="text-xs font-mono text-gray-500 mb-2">FOLLOWER GROWTH</p>
              <p className="text-xl font-bold text-white">+340</p>
            </div>
            <div className="bg-slate-800 p-4 rounded border border-gray-700">
              <p className="text-xs font-mono text-gray-500 mb-2">GROWTH VELOCITY</p>
              <p className="text-xl font-bold text-cyan-400">3.2x</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Panel: Alerts & Recommendations */}
      <div className="space-y-6">
        {/* Live Alerts */}
        <Card className="border border-gray-800 bg-slate-900 p-6">
          <h3 className="text-xs font-mono text-gray-400 tracking-widest mb-4">LIVE ALERTS</h3>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="text-red-400 font-mono font-bold">URGENT</p>
                <p className="text-gray-300">TikTok algorithm shift detected</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
              <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="text-yellow-400 font-mono font-bold">OPPORTUNITY</p>
                <p className="text-gray-300">#AIFails trending on YouTube Shorts</p>
              </div>
            </div>
            <div className="flex gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
              <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="text-green-400 font-mono font-bold">SIGNAL</p>
                <p className="text-gray-300">Your audience peak: Friday 8PM</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Platform Signals */}
        <Card className="border border-gray-800 bg-slate-900 p-6">
          <h3 className="text-xs font-mono text-gray-400 tracking-widest mb-4">PLATFORM SIGNALS</h3>
          <div className="space-y-3">
            {['TikTok', 'YouTube', 'X', 'Threads', 'Instagram'].map((platform) => (
              <div key={platform} className="flex items-center justify-between p-2 bg-slate-800 rounded">
                <span className="text-sm font-mono text-gray-300">{platform}</span>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1 bg-gray-700 rounded">
                    <div
                      className="h-1 bg-cyan-500 rounded"
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 font-mono w-8 text-right">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card className="border border-gray-800 bg-slate-900 p-6">
          <h3 className="text-xs font-mono text-gray-400 tracking-widest mb-4">AI RECOMMENDATIONS</h3>
          <div className="space-y-2">
            <Button className="w-full justify-start text-xs bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30">
              <Target className="w-3 h-3 mr-2" />
              Post at 7:45 PM
            </Button>
            <Button className="w-full justify-start text-xs bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30">
              <Zap className="w-3 h-3 mr-2" />
              Use trending sound
            </Button>
            <Button className="w-full justify-start text-xs bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30">
              <TrendingUp className="w-3 h-3 mr-2" />
              Target 25-34 audience
            </Button>
          </div>
        </Card>

        {/* Weekly Momentum */}
        <Card className="border border-gray-800 bg-slate-900 p-6">
          <h3 className="text-xs font-mono text-gray-400 tracking-widest mb-4">WEEKLY MOMENTUM</h3>
          <div className="space-y-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="flex items-center justify-between text-xs">
                <span className="font-mono text-gray-500 w-8">{day}</span>
                <div className="flex-1 mx-2 h-1 bg-gray-800 rounded">
                  <div
                    className="h-1 bg-cyan-500 rounded"
                    style={{ width: `${[85, 72, 88, 65, 92, 78, 81][i]}%` }}
                  ></div>
                </div>
                <span className="text-gray-400 w-8 text-right">{[85, 72, 88, 65, 92, 78, 81][i]}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
