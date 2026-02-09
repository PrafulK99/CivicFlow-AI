"use client";

import Link from "next/link";

export default function PublicHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10">
            <div className="flex items-center justify-center h-full px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            CivicFlow<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI</span>
                        </span>
                        <div className="text-[10px] text-slate-400 -mt-1 tracking-wider uppercase">Smart City Platform</div>
                    </div>
                </Link>
            </div>
        </header>
    );
}
