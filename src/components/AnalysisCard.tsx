import { cn } from '../lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { VideoData } from '../lib/data';

interface AnalysisCardProps {
    data: VideoData;
    className?: string;
}

export function AnalysisCard({ data, className }: AnalysisCardProps) {
    const { analysis } = data;
    const isBuy = analysis.oracle_signal === 'BUY';
    const isSell = analysis.oracle_signal === 'SELL';

    return (
        <div className={cn("rounded-3xl bg-white p-6 md:p-8 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-md", className)}>
            {/* Header Info */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">종목</span>
                    <h3 className="text-3xl font-bold text-slate-900 mt-1">{analysis.asset}</h3>
                </div>
            </div>

            {/* Grid Layout for Logic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Jeon's Logic */}
                {/* Jeon's Logic */}
                <div className="bg-slate-50 rounded-2xl p-5">
                    <div className="flex flex-col items-center justify-center gap-2 mb-4 border-b border-slate-200 pb-3">
                        <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">🗣️</span>
                            <h4 className="text-xs font-bold text-slate-500 uppercase">인구신의 말씀</h4>
                        </div>
                        <span className={cn(
                            "text-sm font-bold px-3 py-1 rounded-full",
                            analysis.jeon_opinion > 0 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                        )}>
                            {analysis.jeon_opinion > 0 ? "상승 전망 📈" : "하락 전망 📉"}
                        </span>
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed text-sm text-center">
                        "{analysis.jeon_logic}"
                    </p>
                </div>

                {/* Oracle's Logic */}
                <div className={cn("rounded-2xl p-5 relative overflow-hidden", isBuy ? "bg-red-50/50" : isSell ? "bg-blue-50/50" : "bg-slate-50")}>
                    <div className="flex flex-col items-center justify-center gap-2 mb-4 border-b border-black/5 pb-3 relative z-10">
                        <div className="flex items-center gap-2">
                            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px]", isBuy ? "bg-red-500" : "bg-blue-500")}>🐸</div>
                            <h4 className={cn("text-xs font-bold uppercase", isBuy ? "text-red-600" : "text-blue-600")}>청개구리 AI</h4>
                        </div>
                        <div className={cn(
                            "flex items-center gap-1 mt-1 px-3 py-1 rounded-full text-sm font-bold",
                            isBuy ? "bg-red-50 text-red-600" : isSell ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-600"
                        )}>
                            {isBuy ? <TrendingUp size={16} /> : isSell ? <TrendingDown size={16} /> : <Minus size={16} />}
                            {analysis.oracle_signal}
                        </div>
                    </div>
                    <p className="text-slate-900 font-medium leading-relaxed text-sm relative z-10 text-center">
                        "{analysis.oracle_logic}"
                    </p>
                    <p className="mt-2 text-[10px] text-slate-400 font-medium opacity-80 relative z-10">
                        ※ AI도 가끔은 헛발질을 합니다. 맹신은 금물! 재미로만 봐주세요 🐸
                    </p>

                    <div className="mt-4 pt-4 border-t border-black/5 relative z-10">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-semibold opacity-70">확신 레벨</span>
                            <span className="text-sm font-bold">{Math.round(analysis.confidence * 100)}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full rounded-full transition-all duration-1000", isBuy ? "bg-red-500" : "bg-blue-500")}
                                style={{ width: `${analysis.confidence * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Metadata */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                <span>출처: {data.title}</span>
                <span>{data.date}</span>
            </div>
        </div>
    );
}
