"use client";

import { use } from "react";
import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";
import { getRequestById, getStatusColor, getPriorityColor } from "@/lib/mockData";

interface RequestDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function RequestDetailPage({ params }: RequestDetailPageProps) {
    const { id } = use(params);
    const request = getRequestById(id);

    if (!request) {
        return (
            <AppLayout>
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
                    <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-xl font-bold text-white mb-2">Request Not Found</h2>
                    <p className="text-slate-400 mb-6">The request you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/dashboard" className="px-6 py-3 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors">
                        Back to Dashboard
                    </Link>
                </div>
            </AppLayout>
        );
    }

    const getTimelineIcon = (type: string) => {
        switch (type) {
            case "ai":
                return (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                );
            case "system":
                return (
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                        </svg>
                    </div>
                );
            case "status":
                return (
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="w-8 h-8 rounded-lg bg-slate-500/20 flex items-center justify-center">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                );
        }
    };

    return (
        <AppLayout>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-white">{request.id}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Request Header */}
                    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                            <div>
                                <h1 className="text-xl font-bold text-white mb-2">{request.title}</h1>
                                <div className="flex items-center gap-3 text-sm text-slate-400">
                                    <span className="font-mono">{request.id}</span>
                                    <span>•</span>
                                    <span>{request.category}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getStatusColor(request.status)}`}>
                                    {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace("-", " ")}
                                </span>
                                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getPriorityColor(request.priority)}`}>
                                    {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{request.description}</p>
                    </div>

                    {/* Timeline */}
                    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <h2 className="text-lg font-semibold text-white mb-4">Activity Timeline</h2>
                        <div className="space-y-4">
                            {request.timeline.map((event, index) => (
                                <div key={event.id} className="flex gap-4">
                                    {getTimelineIcon(event.type)}
                                    <div className="flex-1 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-medium text-white">{event.action}</span>
                                            <span className="text-xs text-slate-500">
                                                {new Date(event.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400">{event.description}</p>
                                        <span className="text-xs text-slate-500">by {event.actor}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2.5 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Assign Officer
                        </button>
                        <button className="px-4 py-2.5 bg-yellow-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Update Status
                        </button>
                        <button className="px-4 py-2.5 bg-white/5 text-slate-300 rounded-lg border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            Add Note
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* AI Recommendation */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">AI Analysis</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm text-cyan-400">{request.aiConfidence}% Confidence</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="p-3 rounded-lg bg-white/5">
                                <span className="text-slate-400">Department:</span>
                                <span className="text-white ml-2">{request.department}</span>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5">
                                <span className="text-slate-400">Auto-Priority:</span>
                                <span className={`ml-2 ${request.priority === 'high' ? 'text-orange-400' : request.priority === 'critical' ? 'text-red-400' : 'text-yellow-400'}`}>
                                    {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Citizen Details */}
                    <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <h3 className="font-semibold text-white mb-4">Citizen Details</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wide">Name</span>
                                <p className="text-white">{request.citizenName}</p>
                            </div>
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wide">Phone</span>
                                <p className="text-white">{request.citizenPhone}</p>
                            </div>
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wide">Email</span>
                                <p className="text-white text-sm break-all">{request.citizenEmail}</p>
                            </div>
                            <div>
                                <span className="text-xs text-slate-500 uppercase tracking-wide">Location</span>
                                <p className="text-white text-sm">{request.location}</p>
                            </div>
                        </div>
                    </div>

                    {/* Assigned Officer */}
                    {request.assignedTo && (
                        <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                            <h3 className="font-semibold text-white mb-4">Assigned Officer</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                                    <span className="text-lg font-semibold text-white">
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
        </AppLayout>
    );
}
