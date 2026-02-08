"use client";

import { useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";
import { mockRequests, getStatusColor, getPriorityColor } from "@/lib/mockData";

export default function DashboardPage() {
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredRequests = mockRequests.filter((req) => {
        const matchesStatus = statusFilter === "all" || req.status === statusFilter;
        const matchesSearch =
            req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const stats = {
        total: mockRequests.length,
        pending: mockRequests.filter((r) => r.status === "pending").length,
        inProgress: mockRequests.filter((r) => r.status === "in-progress" || r.status === "assigned").length,
        resolved: mockRequests.filter((r) => r.status === "resolved").length,
    };

    return (
        <AppLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">Department Dashboard</h1>
                <p className="text-slate-400">Manage and track all citizen requests</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.total}</div>
                    <div className="text-sm text-slate-400">Total Requests</div>
                </div>

                <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.pending}</div>
                    <div className="text-sm text-slate-400">Pending</div>
                </div>

                <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.inProgress}</div>
                    <div className="text-sm text-slate-400">In Progress</div>
                </div>

                <div className="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white">{stats.resolved}</div>
                    <div className="text-sm text-slate-400">Resolved</div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search requests..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-11 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div className="flex gap-2">
                    {["all", "pending", "in-progress", "assigned", "resolved"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === status
                                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                    : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                                }`}
                        >
                            {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                        </button>
                    ))}
                </div>
            </div>

            {/* Requests Table */}
            <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">ID</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Title</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400 hidden md:table-cell">Category</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Status</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400 hidden lg:table-cell">Priority</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400 hidden lg:table-cell">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map((request) => (
                                <tr
                                    key={request.id}
                                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <Link href={`/request/${request.id}`} className="text-cyan-400 font-mono text-sm hover:underline">
                                            {request.id}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/request/${request.id}`} className="text-white hover:text-cyan-400 transition-colors">
                                            <div className="font-medium">{request.title}</div>
                                            <div className="text-xs text-slate-500 md:hidden">{request.category}</div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className="text-slate-300">{request.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${getStatusColor(request.status)}`}>
                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace("-", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                                            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell">
                                        <span className="text-slate-400 text-sm">
                                            {new Date(request.createdAt).toLocaleDateString()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredRequests.length === 0 && (
                    <div className="p-12 text-center">
                        <svg className="w-12 h-12 mx-auto text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-slate-400">No requests found</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
