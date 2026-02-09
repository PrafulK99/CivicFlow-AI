"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const processingSteps = [
    { text: "Analyzing request...", icon: "🔍", description: "AI is reading your complaint" },
    { text: "Identifying department...", icon: "🏛️", description: "Matching to the right team" },
    { text: "Assigning priority...", icon: "⚡", description: "Determining urgency level" },
    { text: "Routing to officer...", icon: "📨", description: "Assigning to available staff" },
];

// Map issue types to departments
const departmentMap: Record<string, string> = {
    water: "Water Department",
    roads: "Roads & Infrastructure",
    electricity: "Power Corporation",
    sanitation: "Sanitation Department",
    streetlight: "Municipal Lighting",
    drainage: "Drainage Division",
    noise: "Environmental Services",
    other: "General Services",
};

// Inner component that uses useSearchParams
function ProcessingContent() {
    const searchParams = useSearchParams();
    const issueType = searchParams.get("type") || "other";

    // All state initialized with SSR-safe defaults
    const [mounted, setMounted] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [requestId, setRequestId] = useState("CIV-0000-0000");
    const [aiConfidence, setAiConfidence] = useState(90);

    const department = departmentMap[issueType] || "General Services";

    // Generate random values only after mount (client-side)
    useEffect(() => {
        setMounted(true);

        // Generate request ID on client only
        const year = new Date().getFullYear();
        const random = Math.floor(1000 + Math.random() * 9000);
        setRequestId(`CIV-${year}-${random}`);

        // Generate AI confidence on client only
        setAiConfidence(Math.floor(88 + Math.random() * 10));
    }, []);

    // Start animation only after mount
    useEffect(() => {
        if (!mounted) return;

        // Cycle through steps every 1000ms (1 second per step = 4 seconds total)
        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev < processingSteps.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 1000);

        // Mark complete after all steps (4 seconds) + small buffer
        const completeTimer = setTimeout(() => {
            setIsComplete(true);
        }, 4500);

        return () => {
            clearInterval(stepInterval);
            clearTimeout(completeTimer);
        };
    }, [mounted]);

    // Handle copy to clipboard safely
    const handleCopy = () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(requestId);
        }
    };

    // Success state - no redirect, show confirmation
    if (isComplete) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4">
                <div className="max-w-md w-full text-center">
                    {/* Success Animation */}
                    <div className="relative mb-8">
                        {/* Celebration particles */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-green-500/10 animate-ping" style={{ animationDuration: "2s" }} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-green-500/20 animate-ping" style={{ animationDuration: "1.5s" }} />
                        </div>

                        {/* Success checkmark */}
                        <div className="relative w-28 h-28 mx-auto">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl shadow-green-500/30 flex items-center justify-center">
                                <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        Issue Submitted Successfully!
                    </h1>
                    <p className="text-slate-400 mb-8">
                        Your complaint has been registered and routed to the appropriate department.
                    </p>

                    {/* Request Details Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 shadow-xl mb-6">
                        {/* Request ID */}
                        <div className="mb-6">
                            <div className="text-sm text-slate-400 mb-2">Request ID</div>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl font-mono font-bold text-cyan-400">{requestId}</span>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    title="Copy to clipboard"
                                >
                                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wide mb-2">
                                    <span>🏛️</span>
                                    Assigned To
                                </div>
                                <div className="text-white font-medium">{department}</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-wide mb-2">
                                    <span>🤖</span>
                                    AI Confidence
                                </div>
                                <div className="text-green-400 font-bold text-lg">{aiConfidence}%</div>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="mt-6 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                            <span className="text-sm text-yellow-400 font-medium">Pending Review</span>
                        </div>
                    </div>

                    {/* What's Next Info */}
                    <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mb-8">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="text-sm font-medium text-cyan-400 mb-1">What happens next?</div>
                                <div className="text-xs text-slate-400">
                                    An officer will review your complaint and take action. You can track progress using your Request ID.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Link
                        href="/citizen"
                        className="inline-flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Submit Another Issue
                    </Link>

                    {/* Trust Badge */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-xs text-slate-400">Save your Request ID for future reference</span>
                    </div>
                </div>
            </div>
        );
    }

    // Processing animation state
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4">
            <div className="max-w-md w-full text-center">
                {/* AI Brain Animation */}
                <div className="relative mb-10">
                    {/* Outer pulsing rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border border-cyan-500/10 animate-ping" style={{ animationDuration: "3s" }} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: "2s" }} />
                    </div>

                    {/* Spinning border */}
                    <div className="relative w-32 h-32 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20" />
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-500 animate-spin" style={{ animationDuration: "1.5s" }} />

                        {/* Center icon */}
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                <svg className="w-10 h-10 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 15.5m14.8-.2l-1.3 3.9c-.09.27-.336.45-.62.45H6.12a.646.646 0 01-.62-.45L5.2 15.5" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Step Display */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-3">
                        <span className="text-3xl">{processingSteps[currentStep]?.icon}</span>
                        AI Processing
                    </h2>
                    <p className="text-lg text-cyan-400 animate-pulse font-medium">
                        {processingSteps[currentStep]?.text}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                        {processingSteps[currentStep]?.description}
                    </p>
                </div>

                {/* Progress Steps - Vertical Timeline */}
                <div className="text-left max-w-xs mx-auto mb-8">
                    {processingSteps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-4 py-3 transition-all duration-500 ${index <= currentStep ? "opacity-100" : "opacity-40"
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${index < currentStep
                                ? "bg-green-500/20 border border-green-500/30"
                                : index === currentStep
                                    ? "bg-cyan-500/20 border border-cyan-500/30 scale-110"
                                    : "bg-white/5 border border-white/10"
                                }`}>
                                {index < currentStep ? (
                                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : index === currentStep ? (
                                    <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                                ) : (
                                    <span className="text-slate-500">{step.icon}</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className={`text-sm font-medium ${index <= currentStep ? "text-white" : "text-slate-500"
                                    }`}>
                                    {step.text.replace("...", "")}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loading dots */}
                <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>

                {/* Info text */}
                <p className="text-xs text-slate-500 mt-6">
                    CivicFlow AI is analyzing your request to ensure it reaches the right department
                </p>
            </div>
        </div>
    );
}

// Loading fallback for Suspense
function LoadingFallback() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4">
            <div className="max-w-md w-full text-center">
                <div className="relative mb-10">
                    <div className="w-32 h-32 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20" />
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-500 animate-spin" style={{ animationDuration: "1.5s" }} />
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                <svg className="w-10 h-10 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 15.5m14.8-.2l-1.3 3.9c-.09.27-.336.45-.62.45H6.12a.646.646 0 01-.62-.45L5.2 15.5" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Loading...</h2>
            </div>
        </div>
    );
}

// Main page component with Suspense wrapper for useSearchParams
export default function CitizenProcessingPage() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <ProcessingContent />
        </Suspense>
    );
}
