

export function Footer() {
    return (
        <footer className="w-full bg-[#f5f5f7] py-12 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="text-center md:text-left">
                    <p className="mb-2">Copyright © 2026 Anti-Jeon Oracle. All rights reserved.</p>
                    <p className="text-slate-400">Not financial advice. For entertainment purposes only.</p>
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:underline">Terms of Use</a>
                    <a href="#" className="hover:underline">Sales and Refunds</a>
                    <a href="#" className="hover:underline">Legal</a>
                    <a href="#" className="hover:underline">Site Map</a>
                </div>
            </div>
        </footer>
    );
}
