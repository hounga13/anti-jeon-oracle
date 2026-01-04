import { useState, useEffect } from 'react'
import analysisData from './data/analysis.json'

interface Analysis {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  asset: string;
  jeon_opinion: number;
  jeon_logic: string;
  oracle_signal: 'BUY' | 'SELL';
  oracle_logic: string;
  confidence: number;
  physiognomy_score: number;
  timestamp: string;
}

function App() {
  const [data, setData] = useState<Analysis[]>([]);

  useEffect(() => {
    setData(analysisData as Analysis[]);
  }, []);

  return (
    <div className="min-h-screen w-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Hero Section */}
      <header className="py-12 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium tracking-wide uppercase">
          The Anti-Jeon Oracle
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
          진실의 신탁: <span className="text-emerald-400">전인구의 반대</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          유튜브 '전인구 경제연구소'의 모든 예언을 실시간 분석합니다.<br />
          그가 두려워할 때 탐욕을 부리고, 그가 환호할 때 도망치십시오.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard title="최근 반대 수익률" value="+18.5%" trend="up" />
          <StatCard title="신뢰도 보정 지수" value="95.2" trend="up" />
          <StatCard title="오늘의 시장 관상" value="매우 공포" trend="down" />
        </div>

        {/* Oracle Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">⚡</span>
            최신 분석 리포트
          </h2>

          <div className="space-y-12">
            {data.map((item) => (
              <div key={item.id} className="glass rounded-3xl overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Video Side */}
                  <div className="lg:col-span-5 p-8 border-r border-white/5 bg-white/5">
                    <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video">
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-xs text-emerald-400 font-bold mb-1 uppercase tracking-tighter">Current Prophet Video</div>
                        <h3 className="line-clamp-2 text-white font-bold text-lg leading-tight">{item.title}</h3>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                        <div className="text-xs text-red-400 font-bold mb-1 uppercase">전인구의 예언</div>
                        <p className="text-sm text-slate-300 italic">"{item.jeon_logic}"</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold uppercase">Opinion Score</span>
                          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500"
                              style={{ width: `${Math.abs(item.jeon_opinion) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Oracle Side */}
                  <div className="lg:col-span-7 p-8 relative flex flex-col justify-center">
                    <div className="absolute top-8 right-8 text-4xl font-black italic opacity-10 select-none">ANTI-JEON</div>

                    <div className="flex items-center gap-4 mb-8">
                      <div className={`px-6 py-2 rounded-2xl font-black text-2xl tracking-tighter ${item.oracle_signal === 'BUY' ? 'bg-emerald-500 text-emerald-950 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-red-500 text-red-950'}`}>
                        {item.oracle_signal}
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-bold uppercase">Oracle Decision</div>
                        <div className="text-slate-200 font-bold">{item.asset}</div>
                      </div>
                    </div>

                    <div className="space-y-6 flex-1">
                      <div>
                        <h4 className="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wide">진실의 신탁 (Oracle Insight)</h4>
                        <p className="text-xl md:text-2xl font-bold text-white leading-snug">
                          {item.oracle_logic}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <div className="text-xs text-slate-500 font-bold mb-1 uppercase">분석 확신도</div>
                          <div className="text-2xl font-black text-emerald-400">{(item.confidence * 100).toFixed(0)}%</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <div className="text-xs text-slate-500 font-bold mb-1 uppercase">오늘의 관상</div>
                          <div className="text-2xl font-black text-emerald-400">{item.physiognomy_score}점</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-slate-500">Analysis complete at {item.timestamp} marker</span>
                      </div>
                      <a href={`https://youtu.be/${item.id}?t=${convertToSeconds(item.timestamp)}`} target="_blank" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest">
                        View Evidence →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-sm text-slate-600">
        <p>© 2026 The Anti-Jeon Oracle. 본 서비스는 유머와 풍자를 목적으로 합니다.</p>
      </footer>
    </div>
  )
}

function StatCard({ title, value, trend }: { title: string, value: string, trend: 'up' | 'down' }) {
  return (
    <div className="glass p-6 rounded-3xl border border-white/5">
      <div className="text-sm text-slate-500 font-bold mb-1 uppercase tracking-wider">{title}</div>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-black text-white">{value}</div>
        <div className={`text-xs font-bold ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
          {trend === 'up' ? '↑' : '↓'}
        </div>
      </div>
    </div>
  )
}

function convertToSeconds(timestamp: string) {
  const parts = timestamp.split(':').map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

export default App
