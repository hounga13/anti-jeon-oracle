import { getNormalizedData } from "../lib/data";
import { AnalysisCard } from "../components/AnalysisCard";
import { motion } from "framer-motion";

export function HistoryPage() {
    const data = getNormalizedData();

    if (!data || data.length === 0) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#f5f5f7] px-6">
                <div className="text-6xl mb-6">📂</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">아직 기록된 역사가 없습니다</h2>
                <p className="text-slate-500">전인구 님의 영상이 분석되면 이곳에 기록됩니다.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#f5f5f7] min-h-screen py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">청개구리 히스토리</h1>
                    <p className="text-slate-500 text-lg">지금까지 포착된 인간지표 분석 내역입니다.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <AnalysisCard data={item} className="h-full hover:shadow-xl transition-shadow duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
