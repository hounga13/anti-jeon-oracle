
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
  const marketMoodColor = analysis?.oracle_signal === "SELL" ? "text-blue-600" : "text-red-500";

  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen flex flex-col antialiased w-full selection:bg-indigo-500 selection:text-white">
      <main className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 flex-grow flex flex-col">

        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
            전인구 <span className="text-indigo-600 inline-block relative">
              청개구리 매매법
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium">
            "인간 지표" 전인구 소장의 심리를 역이용하는 <span className="text-slate-900 font-bold">AI 역투자 전략</span>입니다.<br className="hidden md:inline" />
            감정에 휘둘리는 인간과 반대로 투자하여 시장을 이기세요.
          </p>
        </header>

        {/* Main Content Section */}
        <section className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-600 rounded-full inline-block"></span>
              최신 분석 리포트
            </h2>
            {latestData && (
              <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                Last Updated: {latestData.date}
              </span>
            )}
          </div>

          {!latestData ? (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                �
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                현재 분석 대기 중입니다
              </h3>
              <p className="text-slate-500">
                전인구 소장의 새로운 영상을 실시간으로 모니터링하고 있습니다.
              </p>
            </div>
          ) : (
            /* Analysis Card */
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50 hover:shadow-xl transition-shadow duration-300">
              {/* Video Header with Gradient Overlay */}
              <div className="relative h-56 md:h-72 bg-slate-900 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10 opacity-90"></div>
                <img
                  src={`https://img.youtube.com/vi/${latestData.id}/maxresdefault.jpg`}
                  alt="Thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${latestData.id}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider">Target Video</span>
                    <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur text-white text-[11px] font-bold uppercase tracking-wider border border-white/20">{latestData.date}</span>
                  </div>
                  <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight line-clamp-2 drop-shadow-lg">{latestData.title}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Jeon's Opinion */}
                <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50">
                  <div className="mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Subject Asset</span>
                    <span className="text-2xl font-black text-slate-800">{analysis?.asset}</span>
                  </div>

                  <div className="mb-8">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase mb-3">
                      <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">🗣️</span> 전인구의 주장
                    </h4>
                    <p className="text-slate-800 text-lg font-medium leading-relaxed bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                      "{analysis?.jeon_logic}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs font-bold uppercase">Signal Detected</span>
                    <span className={`font-bold text-sm px-4 py-1.5 rounded-full ${analysis?.jeon_opinion && analysis.jeon_opinion > 0 ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                      {analysis?.jeon_opinion && analysis.jeon_opinion > 0 ? "상승 예측 (Bullish)" : "하락 예측 (Bearish)"}
                    </span>
                  </div>
                </div>

                {/* Right: AI Verdict */}
                <div className="p-8 lg:p-10 bg-white relative overflow-hidden">
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm shadow-md shadow-indigo-200">AI</span>
                      <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">청개구리 전략</span>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className={`text-5xl lg:text-6xl font-black tracking-tighter ${analysis?.oracle_signal === 'BUY' ? 'text-red-500' : 'text-blue-600'}`}>
                          {analysis?.oracle_signal}
                        </span>
                        <span className="text-lg font-bold text-slate-400 uppercase">지금 당장.</span>
                      </div>
                      {analysis?.oracle_signal === 'BUY' && <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">🔥 강력 매수 추천</span>}
                      {analysis?.oracle_signal === 'SELL' && <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg border border-blue-100">🥶 전량 매도 추천</span>}
                    </div>

                    <div className="mb-auto">
                      <p className="text-slate-600 text-lg leading-relaxed font-medium">
                        "{analysis?.oracle_logic}"
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400 font-bold uppercase">AI Confidence</span>
                        <span className="text-sm font-bold text-indigo-600">{Math.round((analysis?.confidence || 0) * 100)}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_0_10px_rgba(99,102,241,0.4)]" style={{ width: `${(analysis?.confidence || 0) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="w-full py-8 border-t border-slate-200 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            © 2026 Anti-Jeon Strategy. Powered by Gemini 2.0 Flash.<br />
            모든 투자의 책임은 본인에게 있습니다. 이것은 단순한 AI 실험입니다.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
