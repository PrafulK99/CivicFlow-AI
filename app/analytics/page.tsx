"use client";

import AppLayout from "@/components/layout/AppLayout";
import { analyticsData } from "@/lib/mockData";

export default function AnalyticsPage() {
    const maxCategoryCount = Math.max(...analyticsData.requestsByCategory.map((c) => c.count));
    const maxDayCount = Math.max(...analyticsData.requestsByDay.map((d) => d.count));

    return (
        <AppLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h1>
                <p className="text-slate-400">Insights and performance metrics</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20">
                    <div className="text-3xl font-bold text-cyan-400 mb-1">{analyticsData.totalRequests}</div>
                    <div className="text-sm text-slate-400">Total Requests</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <span>+12% from last week</span>
                    </div>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-600/10 border border-green-500/20">
                    <div className="text-3xl font-bold text-green-400 mb-1">{analyticsData.resolvedToday}</div>
                    <div className="text-sm text-slate-400">Resolved Today</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <span>+8% from yesterday</span>
                    </div>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border border-yellow-500/20">
                    <div className="text-3xl font-bold text-yellow-400 mb-1">{analyticsData.pendingRequests}</div>
                    <div className="text-sm text-slate-400">Pending</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-red-400">
                        <svg className="w-3 h-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <span>-5% from last week</span>
                    </div>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/20">
                    <div className="text-3xl font-bold text-purple-400 mb-1">{analyticsData.resolutionRate}%</div>
                    <div className="text-sm text-slate-400">Resolution Rate</div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <span>+3% improvement</span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Requests by Category */}
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <h2 className="text-lg font-semibold text-white mb-6">Requests by Category</h2>
                    <div className="space-y-4">
                        {analyticsData.requestsByCategory.map((item) => (
                            <div key={item.category} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-300">{item.category}</span>
                                    <span className="text-white font-medium">{item.count}</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                                        style={{ width: `${(item.count / maxCategoryCount) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Weekly Trend */}
                <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <h2 className="text-lg font-semibold text-white mb-6">Weekly Request Volume</h2>
                    <div className="flex items-end justify-between h-48 gap-3">
                        {analyticsData.requestsByDay.map((item) => (
                            <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-lg transition-all duration-500 hover:from-cyan-400 hover:to-blue-500"
                                    style={{ height: `${(item.count / maxDayCount) * 100}%` }}
                                />
                                <span className="text-xs text-slate-400">{item.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Department Performance */}
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-6">Department Performance</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Department</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Total</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Resolved</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Pending</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Avg Response</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-slate-400">Efficiency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {analyticsData.departmentPerformance.map((dept) => {
                                const efficiency = Math.round((dept.resolved / dept.totalRequests) * 100);
                                return (
                                    <tr key={dept.name} className="border-b border-white/5">
                                        <td className="px-4 py-4">
                                            <span className="text-white font-medium">{dept.name}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-slate-300">{dept.totalRequests}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-green-400">{dept.resolved}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-yellow-400">{dept.pending}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-slate-300">{dept.avgResponseTime}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${efficiency >= 85 ? "bg-green-500" : efficiency >= 70 ? "bg-yellow-500" : "bg-red-500"
                                                            }`}
                                                        style={{ width: `${efficiency}%` }}
                                                    />
                                                </div>
                                                <span className={`text-sm font-medium ${efficiency >= 85 ? "text-green-400" : efficiency >= 70 ? "text-yellow-400" : "text-red-400"
                                                    }`}>
                                                    {efficiency}%
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Response Time Card */}
            <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Average Response Time</h3>
                        <p className="text-slate-400">Across all departments</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-cyan-400">{analyticsData.avgResponseTime}</div>
                            <div className="text-sm text-slate-400">Current</div>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-400">-18%</div>
                            <div className="text-sm text-slate-400">vs Last Month</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
