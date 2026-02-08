"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        ),
        description: "Overview & metrics",
    },
    {
        name: "Citizen Portal",
        href: "/citizen",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
        description: "Submit requests",
    },
    {
        name: "Analytics",
        href: "/analytics",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        description: "Reports & insights",
    },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <nav className="flex flex-col h-full p-4">
                    {/* Section Label */}
                    <div className="px-4 mb-3">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Main Menu</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/5"
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    <span className={`transition-colors ${isActive ? "text-cyan-400" : "group-hover:text-cyan-400"}`}>
                                        {item.icon}
                                    </span>
                                    <div className="flex-1">
                                        <div>{item.name}</div>
                                        <div className={`text-[10px] ${isActive ? "text-cyan-400/60" : "text-slate-500 group-hover:text-slate-400"}`}>
                                            {item.description}
                                        </div>
                                    </div>
                                    {isActive && (
                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Quick Actions */}
                    <div className="pt-4 border-t border-white/10 space-y-3">
                        <Link
                            href="/citizen"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            New Request
                        </Link>

                        {/* AI Status Card */}
                        <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white">AI Engine</div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        <span className="text-xs text-green-400">Processing Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 mt-4 border-t border-white/10">
                        <div className="px-4 text-center">
                            <div className="text-[10px] text-slate-500">CivicFlow AI v1.0</div>
                            <div className="text-[10px] text-slate-600 mt-0.5">© 2026 Smart City Platform</div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}
