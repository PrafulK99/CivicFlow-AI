"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";

const processingSteps = [
    { text: "Analyzing request...", icon: "🔍" },
    { text: "Identifying department...", icon: "🏛️" },
    { text: "Routing to department...", icon: "📨" },
];

export default function ProcessingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Cycle through steps every 600ms
        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev < processingSteps.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 600);

        // Mark complete after all steps
        const completeTimer = setTimeout(() => {
            setIsComplete(true);
        }, 1800);

        // Redirect after ~2 seconds total
        const redirectTimer = setTimeout(() => {
            router.push("/dashboard");
        }, 2500);

        return () => {
            clearInterval(stepInterval);
            clearTimeout(completeTimer);
            clearTimeout(redirectTimer);
        };
    }, [router]);

    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
                <div className="max-w-sm w-full text-center">
                    {/* AI Brain Animation */}
                    <div className="relative mb-10">
                        {/* Outer pulsing rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 rounded-full border border-cyan-500/10 animate-ping" style={{ animationDuration: "2s" }} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-40 h-40 rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: "1.5s" }} />
                        </div>

                        {/* Spinning border */}
                        <div className="relative w-32 h-32 mx-auto">
                            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20" />
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-500 animate-spin" style={{ animationDuration: "1s" }} />

                            {/* Center icon */}
                            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${isComplete
                                        ? "bg-gradient-to-br from-green-500 to-emerald-600 scale-110"
                                        : "bg-gradient-to-br from-cyan-500 to-blue-600"
                                    }`}>
                                    {isComplete ? (
                                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <svg className="w-10 h-10 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 15.5m14.8-.2l-1.3 3.9c-.09.27-.336.45-.62.45H6.12a.646.646 0 01-.62-.45L5.2 15.5" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Text */}
                    <div className="mb-8">
                        {isComplete ? (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-2">Request Submitted!</h2>
                                <p className="text-green-400">Redirecting to dashboard...</p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-3">
                                    <span className="text-3xl">{processingSteps[currentStep]?.icon}</span>
                                    AI Processing
                                </h2>
                                <p className="text-lg text-cyan-400 animate-pulse">
                                    {processingSteps[currentStep]?.text}
                                </p>
                            </>
                        )}
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        {processingSteps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${index < currentStep
                                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                        : index === currentStep
                                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 scale-105"
                                            : "bg-white/5 text-slate-500 border border-white/10"
                                    }`}
                            >
                                {index < currentStep ? (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : index === currentStep ? (
                                    <span className="w-4 h-4 flex items-center justify-center">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                    </span>
                                ) : (
                                    <span className="w-4 h-4 flex items-center justify-center text-xs">{index + 1}</span>
                                )}
                                <span className="hidden sm:inline">{step.text.replace("...", "")}</span>
                            </div>
                        ))}
                    </div>

                    {/* AI Info Card */}
                    {isComplete && (
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 animate-fade-in">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-slate-300">AI Confidence</span>
                                <span className="text-xl font-bold text-green-400">94%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-400">Assigned to:</span>
                                <span className="text-sm font-medium text-white">Water Department</span>
                            </div>
                        </div>
                    )}

                    {/* Loading dots */}
                    {!isComplete && (
                        <div className="flex items-center justify-center gap-1">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
