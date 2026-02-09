"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const issueTypes = [
    { id: "water", label: "Water Supply", icon: "💧" },
    { id: "roads", label: "Roads & Potholes", icon: "🛣️" },
    { id: "electricity", label: "Electricity", icon: "⚡" },
    { id: "sanitation", label: "Garbage & Sanitation", icon: "🗑️" },
    { id: "streetlight", label: "Street Lights", icon: "💡" },
    { id: "drainage", label: "Drainage Issues", icon: "🌊" },
    { id: "noise", label: "Noise Complaint", icon: "🔊" },
    { id: "other", label: "Other", icon: "📋" },
];

export default function CitizenPage() {
    const router = useRouter();
    const [issueType, setIssueType] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Small delay for button animation, pass issue type for department mapping
        setTimeout(() => {
            router.push(`/submit-processing?type=${issueType}`);
        }, 300);
    };

    const selectedIssue = issueTypes.find((t) => t.id === issueType);

    return (
        <div className="max-w-md mx-auto pb-8">
            {/* Mobile Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-5 shadow-xl shadow-cyan-500/30">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Report an Issue</h1>
                <p className="text-slate-400 text-sm">Help us improve your community</p>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Issue Type Dropdown */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-xs">1</span>
                        Issue Type
                    </label>
                    <div className="relative">
                        <select
                            value={issueType}
                            onChange={(e) => setIssueType(e.target.value)}
                            className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                            required
                        >
                            <option value="" disabled className="bg-slate-900">Select issue type...</option>
                            {issueTypes.map((type) => (
                                <option key={type.id} value={type.id} className="bg-slate-900">
                                    {type.icon} {type.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
                            {selectedIssue && <span className="text-xl">{selectedIssue.icon}</span>}
                            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Description Textarea */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-xs">2</span>
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the issue in detail. Be specific about what you observed..."
                        rows={4}
                        required
                        className="w-full px-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none text-sm leading-relaxed"
                    />
                    <p className="text-xs text-slate-500 text-right">{description.length}/500</p>
                </div>

                {/* Location Input */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                        <span className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center text-xs">3</span>
                        Location
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter address, landmark, or area name"
                            required
                            className="w-full px-4 py-4 pl-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </div>
                    {/* GPS Button */}
                    <button
                        type="button"
                        className="flex items-center gap-2 px-3 py-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Use current location</span>
                    </button>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-2xl text-white font-semibold text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${isSubmitting
                            ? "bg-cyan-600 scale-95"
                            : "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            <>
                                Submit Report
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </>
                        )}
                    </button>
                </div>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 pt-2">
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-xs text-slate-400">Your report is secure and confidential</span>
                </div>
            </form>
        </div>
    );
}
