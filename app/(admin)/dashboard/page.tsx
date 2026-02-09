"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockRequests, getStatusColor, getPriorityColor } from "@/lib/mockData";

export default function DashboardPage() {
    const router = useRouter();
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRequests = mockRequests.filter((req) => {
        const matchesStatus = statusFilter === "all" || req.status === statusFilter;
        const matchesSearch =
            req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.department.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const stats = {
        total: mockRequests.length,
        pending: mockRequests.filter((r) => r.status === "pending").length,
        inProgress: mockRequests.filter((r) => r.status === "in-progress" || r.status === "assigned").length,
        resolved: mockRequests.filter((r) => r.status === "resolved").length,
    };

    const handleRowClick = (id: string) => {
        router.push(`/request/${id}`);
    };

    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Operations Dashboard</h1>
                    <p className="text-slate-400 text-sm">Government Service Request Management</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm text-green-400 font-medium">System Online</span>
                    </div>
                    <div className="text-sm text-slate-400">
                        Last updated: <span className="text-white font-medium">Just now</span>
                    </div>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Total Requests */}
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-cyan-400">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            +12%
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stats.total}</div>
                    <div className="text-sm text-slate-400">Total Requests</div>
                </div>

                {/* Pending */}
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 hover:border-red-500/30 transition-all duration-300 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="px-2 py-0.5 rounded-full bg-red-500/20 text-xs text-red-400 font-medium">
                            Urgent
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stats.pending}</div>
                    <div className="text-sm text-slate-400">Pending</div>
                </div>

                {/* In Progress */}
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 hover:border-yellow-500/30 transition-all duration-300 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-yellow-400">
                            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
                            Active
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stats.inProgress}</div>
                    <div className="text-sm text-slate-400">In Progress</div>
                </div>

                {/* Resolved */}
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 hover:border-green-500/30 transition-all duration-300 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-400">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            +8%
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{stats.resolved}</div>
                    <div className="text-sm text-slate-400">Resolved</div>
                </div>
            </div>

            {/* Table Card */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 shadow-xl overflow-hidden">
                {/* Table Header */}
                <div className="p-6 border-b border-white/10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-white">Service Requests</h2>
                            <p className="text-sm text-slate-400">Click any row to view details</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Search */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search requests..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full sm:w-64 px-4 py-2.5 pl-10 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                                />
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Filter Pills */}
                            <div className="flex gap-2 flex-wrap">
                                {[
                                    { key: "all", label: "All" },
                                    { key: "pending", label: "Pending" },
                                    { key: "in-progress", label: "In Progress" },
                                    { key: "resolved", label: "Resolved" },
                                ].map((filter) => (
                                    <button
                                        key={filter.key}
                                        onClick={() => setStatusFilter(filter.key)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${statusFilter === filter.key
                                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                            : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                                            }`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white/5">
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Issue</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Department</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredRequests.map((request) => (
                                <tr
                                    key={request.id}
                                    onClick={() => handleRowClick(request.id)}
                                    className="hover:bg-cyan-500/5 transition-colors cursor-pointer group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center flex-shrink-0">
                                                <span className="text-lg">
                                                    {request.category === "Water Supply" ? "💧" :
                                                        request.category === "Electricity" ? "⚡" :
                                                            request.category === "Roads & Infrastructure" ? "🛣️" :
                                                                request.category === "Sanitation" ? "🗑️" :
                                                                    request.category === "Building & Permits" ? "🏗️" :
                                                                        request.category === "Parks & Recreation" ? "🌳" : "📋"}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-white group-hover:text-cyan-400 transition-colors">{request.title}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-2">
                                                    <span className="font-mono">{request.id}</span>
                                                    <span>•</span>
                                                    <span>{request.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-sm truncate max-w-[180px]">{request.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                            <span className="text-sm text-slate-300">{request.department}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(request.priority)}`}>
                                            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${request.status === "resolved" ? "bg-green-400" :
                                                request.status === "in-progress" ? "bg-yellow-400 animate-pulse" :
                                                    request.status === "assigned" ? "bg-blue-400" : "bg-red-400 animate-pulse"
                                                }`} />
                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace("-", " ")}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {filteredRequests.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
                            <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-slate-400 font-medium">No requests found</p>
                        <p className="text-slate-500 text-sm mt-1">Try adjusting your search or filter</p>
                    </div>
                )}

                {/* Table Footer */}
                <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                    <p className="text-sm text-slate-400">
                        Showing <span className="text-white font-medium">{filteredRequests.length}</span> of <span className="text-white font-medium">{mockRequests.length}</span> requests
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-sm border border-white/10 hover:bg-white/10 transition-colors">
                            Previous
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm border border-cyan-500/30">
                            1
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-sm border border-white/10 hover:bg-white/10 transition-colors">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
