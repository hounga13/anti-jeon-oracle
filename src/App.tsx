
import analysisData from "./data/analysis.json";

interface Analysis {
  asset: string;
  jeon_opinion: number;
  jeon_logic: string;
  oracle_signal: "BUY" | "SELL" | "HOLD";
  oracle_logic: string;
  confidence: number;
  physiognomy_score: number;
  timestamp: string;
}

interface VideoData {
  id: string;
  title: string;
  description: string;
  analysis: Analysis;
  date: string;
}

function App() {
  const latestData = analysisData.length > 0 ? (analysisData[0] as unknown as VideoData) : null;
  const analysis = latestData?.analysis;

  // Calculate dynamic stats (mock logic for now, or based on history)
  const winRate = "+18.5%";
  const trustScore = 95.2;

  // Determine Fear/Greed based on Oracle's latest signal
  const marketMood = analysis?.oracle_signal === "SELL" ? "매우 공포" : "매우 탐욕";
  const marketMoodColor = analysis?.oracle_signal === "SELL" ? "text-blue-500" : "text-red-500";
  const marketMoodIcon = analysis?.oracle_signal === "SELL" ? "south" : "north";

  return (
    <div className="bg-[#F5F3FF] text-slate-800 transition-colors duration-300 font-sans min-h-screen flex flex-col antialiased selection:bg-[#8B5CF6] selection:text-white">
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex-grow">
        <header className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-white text-[#8B5CF6] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-8 shadow-lg shadow-[#8B5CF6]/20">
            The Anti-Jeon Oracle
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight text-slate-900 leading-tight">
            진실의 신탁: <span className="text-[#8B5CF6] drop-shadow-md">전인구의 반대</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light">
            유튜브 '전인구 경제연구소'의 모든 예언을 실시간 분석합니다.<br className="hidden md:inline" />
            그가 두려워할 때 탐욕을 부리고, 그가 환호할 때 도망치십시오.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(139,92,246,0.15)] hover:border-[#8B5CF6]/30 transition-all duration-300 group">
            <div className="text-xs md:text-sm text-slate-500 font-medium mb-3 tracking-wide">최근 반대 수익률</div>
            <div className="flex items-center gap-2">
              <span className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight group-hover:text-[#8B5CF6] transition-colors">{winRate}</span>
              <span className="text-[#8B5CF6] flex items-center translate-y-1">
                <span className="material-icons-round text-lg">north</span>
              </span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(139,92,246,0.15)] hover:border-[#8B5CF6]/30 transition-all duration-300 group">
            <div className="text-xs md:text-sm text-slate-500 font-medium mb-3 tracking-wide">신뢰도 보정 지수</div>
            <div className="flex items-center gap-2">
              <span className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight group-hover:text-[#8B5CF6] transition-colors">{trustScore}</span>
              <span className="text-[#8B5CF6] flex items-center translate-y-1">
                <span className="material-icons-round text-lg">north</span>
              </span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(248,113,113,0.15)] hover:border-red-400/30 transition-all duration-300 group">
            <div className="text-xs md:text-sm text-slate-500 font-medium mb-3 tracking-wide">오늘의 시장 관상</div>
            <div className="flex items-center gap-2">
              <span className={`text-3xl md:text-4xl font-bold text-slate-900 tracking-tight group-hover:${marketMoodColor} transition-colors`}>
                {latestData ? marketMood : "분석 대기"}
              </span>
              <span className={`${marketMoodColor} flex items-center translate-y-1`}>
                <span className="material-icons-round text-lg">{latestData ? marketMoodIcon : "horizontal_rule"}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded bg-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
              <span className="material-icons-round text-white text-lg">bolt</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">최신 분석 리포트</h2>
          </div>

          {!latestData ? (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-slate-100 relative overflow-hidden group shadow-[0_20px_50px_rgb(0,0,0,0.05)]">
              <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 md:py-32 text-center">
                <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-7xl md:text-8xl drop-shadow-xl">🔮</div>
                  <div className="absolute -top-2 -right-2 text-[#8B5CF6] animate-pulse text-2xl">✨</div>
                  <div className="absolute top-1/2 -left-4 text-[#8B5CF6] animate-bounce text-xl" style={{ animationDuration: "2s" }}>✨</div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  아직 분석된 예언이 없습니다
                </h3>
                <p className="text-slate-500 max-w-md mx-auto text-base md:text-lg leading-relaxed">
                  전인구 소장의 신규 영상을 기다리고 있습니다.<br />
                  잠시 후 다시 방문해 주세요.
                </p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[100px] pointer-events-none"></div>
            </div>
          ) : (
            /* Analysis Card */
            <div className="bg-white rounded-3xl border border-slate-100 relative overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgb(139,92,246,0.1)] transition-all duration-300">
              {/* Header Image/Video Placeholder */}
              <div className="relative h-48 md:h-64 bg-slate-100 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <img
                  src={`https://img.youtube.com/vi/${latestData.id}/maxresdefault.jpg`}
                  alt="Thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${latestData.id}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute bottom-4 left-4 md:left-8 right-4 z-20">
                  <div className="text-white/80 text-xs md:text-sm font-medium mb-1">{latestData.date} 분석</div>
                  <h3 className="text-white text-xl md:text-2xl font-bold leading-tight line-clamp-2">{latestData.title}</h3>
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left: Jeon's Opinion */}
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold uppercase">Target Asset</span>
                    <span className="text-lg font-bold text-slate-800">{analysis?.asset}</span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="text-slate-500 text-sm font-bold uppercase mb-3 flex items-center gap-2">
                      <span className="material-icons-round text-base">person</span> 전인구의 주장
                    </h4>
                    <p className="text-slate-700 text-lg font-medium leading-relaxed mb-4">
                      "{analysis?.jeon_logic}"
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                      <span className="text-slate-400 text-sm font-medium">Original Signal</span>
                      <span className={`font-bold ${analysis?.jeon_opinion && analysis.jeon_opinion > 0 ? "text-red-500" : "text-blue-500"}`}>
                        {analysis?.jeon_opinion && analysis.jeon_opinion > 0 ? "상승 예측 📈" : "하락 예측 📉"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Oracle's Verdict */}
                <div className="relative">
                  <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden lg:flex w-12 h-12 bg-white rounded-full border border-slate-100 shadow-md items-center justify-center z-10">
                    <span className="material-icons-round text-slate-300">arrow_forward</span>
                  </div>

                  <div className="bg-[#F5F3FF] rounded-2xl p-6 border border-[#8B5CF6]/20 h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                    <h4 className="text-[#8B5CF6] text-sm font-bold uppercase mb-3 flex items-center gap-2 relative z-10">
                      <span className="material-icons-round text-base">auto_awesome</span> 오라클의 반대 해석
                    </h4>

                    <div className="flex items-end gap-2 mb-4 relative z-10">
                      <span className={`text-5xl font-black tracking-tighter ${analysis?.oracle_signal === 'BUY' ? 'text-red-500' : 'text-blue-600'}`}>
                        {analysis?.oracle_signal}
                      </span>
                      <span className="text-slate-500 font-medium mb-1.5 ml-1">지금 당장.</span>
                    </div>

                    <p className="text-slate-800 text-lg font-medium leading-relaxed mb-6 relative z-10">
                      "{analysis?.oracle_logic}"
                    </p>

                    <div className="flex items-center gap-3 relative z-10">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium uppercase">Confidence</span>
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#8B5CF6]" style={{ width: `${(analysis?.confidence || 0) * 100}%` }}></div>
                          </div>
                          <span className="text-sm font-bold text-[#8B5CF6]">{Math.round((analysis?.confidence || 0) * 100)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="w-full py-10 border-t border-slate-200 text-center text-xs md:text-sm text-slate-400 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="mb-2 font-medium text-slate-500">© 2026 The Anti-Jeon Oracle.</p>
          <p>본 서비스는 유머와 풍자를 목적으로 합니다.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
