"use client";

import { analyticsData } from "@/lib/mockData";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// Department data for bar chart
const departmentData = [
    { name: "Water", requests: 127, color: "#06b6d4" },
    { name: "Roads", requests: 98, color: "#3b82f6" },
    { name: "Electricity", requests: 84, color: "#f59e0b" },
    { name: "Sanitation", requests: 72, color: "#10b981" },
    { name: "Parks", requests: 45, color: "#8b5cf6" },
    { name: "Building", requests: 38, color: "#ec4899" },
];

// Time series data for line chart
const timeSeriesData = [
    { date: "Jan 1", requests: 45, resolved: 38 },
    { date: "Jan 5", requests: 52, resolved: 45 },
    { date: "Jan 10", requests: 38, resolved: 35 },
    { date: "Jan 15", requests: 65, resolved: 55 },
    { date: "Jan 20", requests: 72, resolved: 62 },
    { date: "Jan 25", requests: 58, resolved: 52 },
    { date: "Jan 30", requests: 85, resolved: 78 },
    { date: "Feb 1", requests: 92, resolved: 85 },
    { date: "Feb 5", requests: 78, resolved: 72 },
    { date: "Feb 8", requests: 105, resolved: 88 },
];

// Status distribution for pie chart
const statusData = [
    { name: "Pending", value: 23, color: "#ef4444" },
    { name: "In Progress", value: 34, color: "#f59e0b" },
    { name: "Resolved", value: 189, color: "#10b981" },
];

// Custom tooltip styling
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800 border border-white/10 rounded-lg p-3 shadow-xl">
                <p className="text-white font-medium mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function AnalyticsPage() {
    const totalThisWeek = 246;
    const avgResolutionTime = "4.2 hrs";
    const mostActiveDept = "Water Department";

    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Analytics Dashboard</h1>
                    <p className="text-slate-400 text-sm">Smart City Operations Overview</p>
                </div>
                <div className="flex items-center gap-3">
                    <select className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50">
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last 90 Days</option>
                    </select>
                    <button className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-500/30 transition-colors">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Requests This Week */}
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition-all shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">+18%</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-1">{totalThisWeek}</div>
                    <div className="text-sm text-slate-400">Total Requests This Week</div>
                </div>

                {/* Average Resolution Time */}
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 hover:border-green-500/30 transition-all shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">-22%</span>
                    </div>
                    <div className="text-4xl font-bold text-white mb-1">{avgResolutionTime}</div>
                    <div className="text-sm text-slate-400">Avg Resolution Time</div>
                </div>

                {/* Most Active Department */}
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 hover:border-purple-500/30 transition-all shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg className="w-7 h-7 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <span className="text-2xl">💧</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{mostActiveDept}</div>
                    <div className="text-sm text-slate-400">Most Active Department</div>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Bar Chart - Requests per Department */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 shadow-lg">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Requests by Department
                    </h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={departmentData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={{ stroke: "#334155" }} />
                                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={{ stroke: "#334155" }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="requests" radius={[4, 4, 0, 0]}>
                                    {departmentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart - Status Distribution */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 shadow-lg">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>
                        Status Distribution
                    </h2>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                                    labelLine={{ stroke: "#64748b" }}
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div className="flex justify-center gap-6 mt-4">
                        {statusData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm text-slate-400">{item.name}: {item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Line Chart - Requests Over Time */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 shadow-lg mb-6">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    Requests Over Time
                </h2>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeSeriesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="date" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={{ stroke: "#334155" }} />
                            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={{ stroke: "#334155" }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                wrapperStyle={{ paddingTop: "20px" }}
                                formatter={(value) => <span className="text-slate-300">{value}</span>}
                            />
                            <Line
                                type="monotone"
                                dataKey="requests"
                                stroke="#06b6d4"
                                strokeWidth={3}
                                dot={{ fill: "#06b6d4", strokeWidth: 2 }}
                                activeDot={{ r: 6, fill: "#06b6d4" }}
                                name="Submitted"
                            />
                            <Line
                                type="monotone"
                                dataKey="resolved"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ fill: "#10b981", strokeWidth: 2 }}
                                activeDot={{ r: 6, fill: "#10b981" }}
                                name="Resolved"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Department Performance Table */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 shadow-lg">
                <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Department Performance
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Department</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Resolved</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Pending</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Response</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Efficiency</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {analyticsData.departmentPerformance.map((dept) => {
                                const efficiency = Math.round((dept.resolved / dept.totalRequests) * 100);
                                return (
                                    <tr key={dept.name} className="hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-4">
                                            <span className="text-white font-medium">{dept.name}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-slate-300">{dept.totalRequests}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-green-400 font-medium">{dept.resolved}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-yellow-400">{dept.pending}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-slate-300">{dept.avgResponseTime}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all ${efficiency >= 85 ? "bg-green-500" : efficiency >= 70 ? "bg-yellow-500" : "bg-red-500"
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
        </>
    );
}
