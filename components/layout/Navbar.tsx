"use client";

import Link from "next/link";

interface NavbarProps {
    onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10">
            <div className="flex items-center justify-between h-full px-4 lg:px-6">
                {/* Left: Menu + Logo */}
                <div className="flex items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

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
                        <div className="hidden sm:block">
                            <span className="text-xl font-bold text-white tracking-tight">
                                CivicFlow<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">AI</span>
                            </span>
                            <div className="text-[10px] text-slate-400 -mt-1 tracking-wider uppercase">Smart City Platform</div>
                        </div>
                    </Link>
                </div>

                {/* Center: Quick Nav (Desktop) */}
                <div className="hidden lg:flex items-center gap-1">
                    <Link href="/dashboard" className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                        Dashboard
                    </Link>
                    <Link href="/citizen" className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                        Submit Request
                    </Link>
                    <Link href="/analytics" className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                        Analytics
                    </Link>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    {/* Search Button */}
                    <button className="p-2.5 rounded-xl hover:bg-white/10 transition-colors hidden md:flex">
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2.5 rounded-xl hover:bg-white/10 transition-colors">
                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {/* Notification Badge */}
                        <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full ring-2 ring-slate-900" />
                    </button>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-8 bg-white/10 mx-1" />

                    {/* User Avatar */}
                    <button className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center ring-2 ring-white/10">
                            <span className="text-sm font-bold text-white">AD</span>
                        </div>
                        <div className="hidden md:block text-left">
                            <div className="text-sm font-medium text-white">Admin</div>
                            <div className="text-xs text-slate-400">Dept. Lead</div>
                        </div>
                        <svg className="w-4 h-4 text-slate-500 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
