"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";

const processingSteps = [
    { id: 1, label: "Analyzing Request", description: "Understanding your complaint details..." },
    { id: 2, label: "Categorizing", description: "Identifying the appropriate category..." },
    { id: 3, label: "Detecting Priority", description: "Assessing urgency level..." },
    { id: 4, label: "Finding Department", description: "Routing to the right team..." },
    { id: 5, label: "Complete", description: "Your request has been submitted!" },
];

export default function ProcessingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate through steps
        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev < processingSteps.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 800);

        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 2;
                }
                return prev;
            });
        }, 60);

        // Redirect after completion
        const redirectTimer = setTimeout(() => {
            router.push("/dashboard");
        }, 4500);

        return () => {
            clearInterval(stepInterval);
            clearInterval(progressInterval);
            clearTimeout(redirectTimer);
        };
    }, [router]);

    return (
        <AppLayout>
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
                <div className="max-w-md w-full text-center">
                    {/* AI Processing Animation */}
                    <div className="relative mb-8">
                        {/* Outer Ring */}
                        <div className="w-32 h-32 mx-auto rounded-full border-4 border-cyan-500/20 relative">
                            {/* Spinning Ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 animate-spin" />

                            {/* Inner Circle */}
                            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center backdrop-blur-sm">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                    {currentStep < processingSteps.length - 1 ? (
                                        <svg className="w-8 h-8 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Pulsing Dots */}
                        <div className="absolute -inset-4 flex items-center justify-center pointer-events-none">
                            <div className="w-40 h-40 rounded-full border border-cyan-500/20 animate-ping opacity-20" />
                        </div>
                    </div>

                    {/* Current Step Info */}
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {processingSteps[currentStep]?.label}
                    </h2>
                    <p className="text-slate-400 mb-8">
                        {processingSteps[currentStep]?.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-100 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Steps List */}
                    <div className="space-y-3 text-left">
                        {processingSteps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${index < currentStep
                                        ? "bg-green-500/10 border border-green-500/20"
                                        : index === currentStep
                                            ? "bg-cyan-500/10 border border-cyan-500/20"
                                            : "bg-white/5 border border-white/10 opacity-50"
                                    }`}
                            >
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${index < currentStep
                                            ? "bg-green-500 text-white"
                                            : index === currentStep
                                                ? "bg-cyan-500 text-white"
                                                : "bg-white/20 text-slate-400"
                                        }`}
                                >
                                    {index < currentStep ? (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        step.id
                                    )}
                                </div>
                                <span
                                    className={`text-sm font-medium ${index <= currentStep ? "text-white" : "text-slate-500"
                                        }`}
                                >
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* AI Confidence Preview */}
                    {currentStep >= processingSteps.length - 1 && (
                        <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-slate-300">AI Confidence</span>
                                <span className="text-lg font-bold text-cyan-400">94%</span>
                            </div>
                            <p className="text-xs text-slate-400">
                                Routed to <span className="text-white font-medium">Water Department</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
