import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#f5f5f7]">
            <div className="w-full max-w-7xl mx-auto px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-4"
                >
                    <h2 className="text-xl md:text-3xl font-semibold text-indigo-600 mb-2">
                        전인구 인간지표 탐지기
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight leading-tight">
                        그가 살 때 팔고,<br />
                        팔 때 사라.
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mt-6 text-lg md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed"
                >
                    인간지표 '인구신'의 반대편을 탐구하는 유쾌한 실험.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-10 flex gap-4 justify-center"
                >
                    <button
                        onClick={() => {
                            document.getElementById('analysis-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium text-sm md:text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                    >
                        포착된 종목 보기
                    </button>
                </motion.div>
            </div>

            {/* Abstract Background Element (Gradient Blur) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-300/20 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
