
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



  // Determine Fear/Greed based on Oracle's latest signal
  const marketMood = analysis?.oracle_signal === "SELL" ? "매우 공포 (Deep Fear)" : "매우 탐욕 (Extreme Greed)";
  const marketMoodColor = analysis?.oracle_signal === "SELL" ? "text-blue-500" : "text-red-500";
  const marketMoodEmoji = analysis?.oracle_signal === "SELL" ? "🥶" : "🔥";

  return (
    <div className="bg-[#F5F3FF] text-slate-800 transition-colors duration-300 font-sans min-h-screen flex flex-col antialiased selection:bg-[#8B5CF6] selection:text-white w-full">
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex-grow flex flex-col justify-center">
        <header className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-white text-[#8B5CF6] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-6 shadow-lg shadow-[#8B5CF6]/20">
            The Anti-Jeon Oracle
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
            전인구 <span className="text-[#8B5CF6] drop-shadow-sm">청개구리 매매법</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed font-medium">
            "인간 지표" 전인구 소장이 환호하면 팔고, 공포에 떨면 매수하세요.<br className="hidden md:inline" />
            빅데이터 AI가 그의 심리를 정밀 분석해 반대 매매 시그널을 드립니다.
          </p>
        </header>

        {/* Stats Grid - Simplified */}
        <div className="flex justify-center mb-16">
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(248,113,113,0.15)] hover:border-red-400/30 transition-all duration-300 group max-w-sm w-full text-center">
            <div className="text-xs md:text-sm text-slate-500 font-bold mb-3 tracking-wide uppercase">오늘의 시장 관상</div>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">{latestData ? marketMoodEmoji : "⏳"}</span>
              <span className={`text-2xl md:text-3xl font-black tracking-tight ${latestData ? marketMoodColor : "text-slate-400"}`}>
                {latestData ? marketMood : "분석 대기중"}
              </span>
            </div>
            {latestData && (
              <div className="mt-2 text-xs text-slate-400 font-medium">
                마지막 분석: {latestData.date}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Section */}
        <section className="w-full">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30 text-white font-bold text-lg">
              ⚡
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">최신 분석 리포트</h2>
          </div>

          {!latestData ? (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-slate-100 relative overflow-hidden group shadow-xl">
              <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 md:py-24 text-center">
                <div className="text-6xl md:text-7xl mb-6">🔭</div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  아직 분석된 영상이 없습니다
                </h3>
                <p className="text-slate-500 max-w-sm mx-auto text-sm md:text-base leading-relaxed">
                  전인구 소장의 신규 영상을 기다리고 있습니다.<br />
                  AI가 실시간으로 감시 중입니다.
                </p>
              </div>
            </div>
          ) : (
            /* Analysis Card */
            <div className="bg-white rounded-3xl border border-slate-100 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              {/* Header Image/Video Placeholder */}
              <div className="relative h-48 md:h-64 bg-slate-900 overflow-hidden group">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img
                  src={`https://img.youtube.com/vi/${latestData.id}/maxresdefault.jpg`}
                  alt="Thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${latestData.id}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/90 to-transparent">
                  <span className="inline-block px-2 py-1 rounded bg-red-600 text-white text-[10px] font-bold uppercase mb-2">TARGET VIDEO</span>
                  <h3 className="text-white text-lg md:text-xl font-bold leading-snug line-clamp-2">{latestData.title}</h3>
                </div>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                {/* Left: Jeon's Opinion */}
                <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🗣️</span>
                    <span className="text-sm font-bold text-slate-500 uppercase">전인구의 주장</span>
                  </div>
                  <p className="text-slate-800 text-lg font-medium leading-relaxed mb-4 min-h-[3rem]">
                    "{analysis?.jeon_logic}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-slate-400 text-xs font-bold uppercase">Original Signal</span>
                    <span className={`font-bold text-sm px-3 py-1 rounded-full ${analysis?.jeon_opinion && analysis.jeon_opinion > 0 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                      {analysis?.jeon_opinion && analysis.jeon_opinion > 0 ? "상승 예측 📈" : "하락 예측 📉"}
                    </span>
                  </div>
                </div>

                {/* Right: Oracle's Verdict */}
                <div className="relative p-6 bg-[#F5F3FF] rounded-2xl border border-[#8B5CF6]/20 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#8B5CF6]/10 rounded-full blur-2xl -mr-8 -mt-8"></div>

                  <div className="flex items-center gap-2 mb-4 relative z-10">
                    <span className="text-2xl">🐸</span>
                    <span className="text-sm font-bold text-[#8B5CF6] uppercase">청개구리 오라클</span>
                  </div>

                  <div className="mb-4 relative z-10">
                    <div className={`text-4xl font-black tracking-tighter ${analysis?.oracle_signal === 'BUY' ? 'text-red-500' : 'text-blue-600'}`}>
                      {analysis?.oracle_signal}
                    </div>
                    <p className="text-xs text-slate-400 font-bold uppercase mt-1">강력 추천</p>
                  </div>

                  <p className="text-slate-700 text-base font-medium leading-relaxed mb-4 relative z-10 min-h-[3rem]">
                    "{analysis?.oracle_logic}"
                  </p>

                  <div className="flex items-center gap-2 relative z-10 pt-4 border-t border-[#8B5CF6]/10">
                    <span className="text-xs text-slate-500 font-bold uppercase">확신도</span>
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#8B5CF6]" style={{ width: `${(analysis?.confidence || 0) * 100}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-[#8B5CF6]">{Math.round((analysis?.confidence || 0) * 100)}%</span>
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
