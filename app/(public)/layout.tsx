"use client";

import { useState, useEffect } from "react";
import PublicHeader from "@/components/layout/PublicHeader";

interface PublicLayoutProps {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
                        backgroundSize: '64px 64px'
                    }}
                />

                {/* Top Edge Glow */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            </div>

            {/* Public Header - Logo only */}
            <PublicHeader />

            {/* Main Content - No sidebar offset */}
            <main className="relative z-10 pt-16 min-h-screen">
                <div className={`p-6 lg:p-8 transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                    {children}
                </div>
            </main>
        </div>
    );
}
