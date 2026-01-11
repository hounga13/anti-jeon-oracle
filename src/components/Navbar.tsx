import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                    (isScrolled || isMobileMenuOpen) ? "bg-white/80 backdrop-blur-md border-gray-200 supports-[backdrop-filter]:bg-white/60" : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                    <a href="#" className="flex items-center gap-2 group">
                        {/* Apple-style minimalist logo/icon */}
                        <span className="text-lg font-semibold tracking-tighter text-slate-900 group-hover:opacity-80 transition-opacity">
                            Anti-Jeon
                        </span>
                    </a>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8 text-xs font-medium text-slate-700">
                        {['홈', '포착된 종목', '승률 보기', '시뮬레이션', '이게 뭔데?'].map((item) => (
                            <a key={item} href="#" className="hover:text-black transition-colors opacity-80 hover:opacity-100">{item}</a>
                        ))}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-800"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-14 bg-white z-40 md:hidden flex flex-col p-6 space-y-6"
                    >
                        {['홈', '포착된 종목', '승률 보기', '시뮬레이션', '이게 뭔데?'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-2xl font-semibold text-slate-900 border-b border-slate-100 pb-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
