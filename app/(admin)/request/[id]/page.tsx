"use client";

import { use, useState } from "react";
import Link from "next/link";
import { getRequestById, getPriorityColor } from "@/lib/mockData";

interface RequestDetailPageProps {
    params: Promise<{ id: string }>;
}

type RequestStatus = "pending" | "in-progress" | "assigned" | "resolved";

const workflowSteps = [
    { key: "submitted", label: "Request Submitted", icon: "📝", description: "Citizen submitted the complaint" },
    { key: "ai-routed", label: "AI Routed to Department", icon: "🤖", description: "CivicFlow AI analyzed and routed" },
    { key: "assigned", label: "Assigned to Officer", icon: "👤", description: "Officer assigned to handle" },
    { key: "in-progress", label: "In Progress", icon: "⚙️", description: "Work is being done" },
    { key: "resolved", label: "Resolved", icon: "✅", description: "Issue has been resolved" },
];

const getWorkflowProgress = (status: RequestStatus): number => {
    switch (status) {
        case "pending": return 1;
        case "assigned": return 2;
        case "in-progress": return 3;
        case "resolved": return 4;
        default: return 0;
    }
};

export default function RequestDetailPage({ params }: RequestDetailPageProps) {
    const { id } = use(params);
    const request = getRequestById(id);
    const [currentStatus, setCurrentStatus] = useState<RequestStatus>(request?.status || "pending");
    const [showSuccess, setShowSuccess] = useState(false);

    if (!request) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
                <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Request Not Found</h2>
                <p className="text-slate-400 mb-6">The request you&apos;re looking for doesn&apos;t exist.</p>
                <Link href="/dashboard" className="px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition-colors">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    const handleStatusChange = (newStatus: RequestStatus) => {
        setCurrentStatus(newStatus);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const workflowProgress = getWorkflowProgress(currentStatus);

    const getLocalStatusColor = (status: RequestStatus) => {
        switch (status) {
            case "pending": return "text-red-400 bg-red-500/10 border-red-500/30";
            case "in-progress": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
            case "assigned": return "text-blue-400 bg-blue-500/10 border-blue-500/30";
            case "resolved": return "text-green-400 bg-green-500/10 border-green-500/30";
            default: return "text-slate-400 bg-slate-500/10 border-slate-500/30";
        }
    };

    return (
        <>
            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed top-20 right-6 z-50 animate-slide-in">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-green-500/20 border border-green-500/30 shadow-lg">
                        <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-green-400 font-medium">Status updated successfully!</span>
                    </div>
                </div>
            )}

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Dashboard
                </Link>
                <span>/</span>
                <span className="text-white font-medium">{request.id}</span>
            </div>

            {/* Header Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 shadow-xl mb-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                <span className="text-2xl">
                                    {request.category === "Water Supply" ? "💧" :
                                        request.category === "Electricity" ? "⚡" :
                                            request.category === "Roads & Infrastructure" ? "🛣️" :
                                                request.category === "Sanitation" ? "🗑️" :
                                                    request.category === "Building & Permits" ? "🏗️" :
                                                        request.category === "Parks & Recreation" ? "🌳" : "📋"}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">{request.title}</h1>
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <span className="font-mono">{request.id}</span>
                                    <span>•</span>
                                    <span>{request.category}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-4">{request.description}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{request.location}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${getLocalStatusColor(currentStatus)}`}>
                            <span className={`w-2 h-2 rounded-full ${currentStatus === "resolved" ? "bg-green-400" :
                                currentStatus === "in-progress" ? "bg-yellow-400 animate-pulse" :
                                    currentStatus === "assigned" ? "bg-blue-400" : "bg-red-400 animate-pulse"
                                }`} />
                            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1).replace("-", " ")}
                        </span>
                        <span className={`px-4 py-2 rounded-xl text-sm font-semibold border ${getPriorityColor(request.priority)}`}>
                            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Workflow Timeline */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 shadow-lg">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            Workflow Progress
                        </h2>

                        <div className="relative">
                            {/* Progress Line */}
                            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-white/10" />
                            <div
                                className="absolute left-6 top-8 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500 transition-all duration-500"
                                style={{ height: `${Math.min(workflowProgress * 25, 100)}%` }}
                            />

                            <div className="space-y-6">
                                {workflowSteps.map((step, index) => {
                                    const isComplete = index < workflowProgress;
                                    const isCurrent = index === workflowProgress;

                                    return (
                                        <div key={step.key} className="flex items-start gap-4 relative">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center z-10 transition-all duration-300 ${isComplete
                                                ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20"
                                                : isCurrent
                                                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20 animate-pulse"
                                                    : "bg-white/5 border border-white/10"
                                                }`}>
                                                {isComplete ? (
                                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <span className="text-xl">{step.icon}</span>
                                                )}
                                            </div>
                                            <div className="flex-1 pt-2">
                                                <h3 className={`font-medium ${isComplete || isCurrent ? "text-white" : "text-slate-500"}`}>
                                                    {step.label}
                                                </h3>
                                                <p className={`text-sm ${isComplete || isCurrent ? "text-slate-400" : "text-slate-600"}`}>
                                                    {step.description}
                                                </p>
                                                {isComplete && (
                                                    <span className="text-xs text-green-400 mt-1 inline-block">Completed</span>
                                                )}
                                                {isCurrent && (
                                                    <span className="text-xs text-cyan-400 mt-1 inline-block flex items-center gap-1">
                                                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                                                        Current Step
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 shadow-lg">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => handleStatusChange("in-progress")}
                                disabled={currentStatus === "in-progress" || currentStatus === "resolved"}
                                className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${currentStatus === "in-progress" || currentStatus === "resolved"
                                    ? "bg-white/5 text-slate-500 border border-white/10 cursor-not-allowed"
                                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30 hover:scale-105"
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Mark In Progress
                            </button>

                            <button
                                onClick={() => handleStatusChange("resolved")}
                                disabled={currentStatus === "resolved"}
                                className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${currentStatus === "resolved"
                                    ? "bg-white/5 text-slate-500 border border-white/10 cursor-not-allowed"
                                    : "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 hover:scale-105"
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Mark Resolved
                            </button>

                            <button className="px-5 py-3 bg-white/5 text-slate-300 rounded-xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                Add Note
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* AI Analysis Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">AI Analysis</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${request.aiConfidence}%` }} />
                                    </div>
                                    <span className="text-sm text-cyan-400 font-bold">{request.aiConfidence}%</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="p-3 rounded-xl bg-white/5">
                                <span className="text-xs text-slate-500 uppercase tracking-wide">Department</span>
                                <p className="text-white font-medium">{request.department}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5">
                                <span className="text-xs text-slate-500 uppercase tracking-wide">Auto-Priority</span>
                                <p className={`font-medium ${request.priority === 'high' ? 'text-orange-400' :
                                    request.priority === 'critical' ? 'text-red-400' :
                                        request.priority === 'medium' ? 'text-yellow-400' : 'text-green-400'
                                    }`}>
                                    {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Location Card */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 shadow-lg">
                        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Location
                        </h3>
                        <p className="text-slate-300 text-sm mb-3">{request.location}</p>
                        <div className="h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <span className="text-slate-500 text-sm">Map Preview</span>
                        </div>
                    </div>

                    {/* Citizen Details */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 shadow-lg">
                        <h3 className="font-semibold text-white mb-4">Citizen Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0">
                                    <span className="text-sm font-bold text-white">
                                        {request.citizenName.split(" ").map((n) => n[0]).join("")}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-white font-medium">{request.citizenName}</p>
                                    <p className="text-xs text-slate-400">{request.citizenEmail}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-300">
                                <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {request.citizenPhone}
                            </div>
                        </div>
                    </div>

                    {/* Assigned Officer */}
                    {request.assignedTo && (
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 shadow-lg">
                            <h3 className="font-semibold text-white mb-4">Assigned Officer</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                    <span className="text-lg font-bold text-cyan-400">
                                        {request.assignedTo.split(" ").map((n) => n[0]).join("")}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-white">{request.assignedTo}</p>
                                    <p className="text-sm text-slate-400">{request.department}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
