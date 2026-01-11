import { AnalysisCard } from './AnalysisCard';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import type { VideoData } from '../lib/data';

interface BentoGridProps {
    items: VideoData[];
    className?: string;
}

export function BentoGrid({ items, className }: BentoGridProps) {
    if (!items || items.length === 0) {
        return (
            <div className="w-full h-64 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-sm text-center p-8">
                <div className="text-4xl mb-4">🔮</div>
                <h3 className="text-lg font-bold text-slate-900">새로운 인간지표 찾는 중...</h3>
                <p className="text-slate-500 text-sm mt-2">전인구 님의 영상이 올라오면 실시간으로 분석합니다.</p>
            </div>
        );
    }

    // Determine the highlight item (first one)
    const [highlight] = items;

    return (
        <div id="analysis-section" className={cn("w-full max-w-7xl mx-auto px-6 py-12", className)}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">실시간 인간지표 포착</h2>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Highlighted Main Card */}
                    <AnalysisCard data={highlight} className="w-full shadow-lg hover:shadow-xl ring-1 ring-black/5" />

                    {/* Future: Secondary Grid for older items could go here */}
                    {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map(item => <AnalysisCard key={item.id} data={item} />)} 
            </div> */}
                </div>
            </motion.div>
        </div>
    );
}
