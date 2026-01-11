

export function Footer() {
    return (
        <footer className="w-full bg-[#f5f5f7] py-12 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500 font-medium">
                <div className="text-center md:text-left">
                    <p className="mb-2">Copyright © 2026 전인구 인간지표 탐지기 (Anti-Jeon Detector). All rights reserved.</p>
                    <p className="text-slate-400">본 서비스는 유머와 풍자를 목적으로 하며, 실제 투자 결과에 대해 책임을 지지 않습니다. 투자의 책임은 본인에게 있습니다.</p>
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:underline">개인정보처리방침</a>
                    <a href="#" className="hover:underline">이용약관</a>
                    <a href="#" className="hover:underline">책임의 한계와 법적고지</a>
                    <a href="#" className="hover:underline">사이트맵</a>
                </div>
            </div>
        </footer>
    );
}
