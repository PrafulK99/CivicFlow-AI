// Mock data for CivicFlow AI demo

export interface Request {
    id: string;
    title: string;
    category: string;
    department: string;
    status: "pending" | "in-progress" | "resolved" | "assigned";
    priority: "low" | "medium" | "high" | "critical";
    citizenName: string;
    citizenPhone: string;
    citizenEmail: string;
    location: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    assignedTo?: string;
    aiConfidence: number;
    timeline: TimelineEvent[];
}

export interface TimelineEvent {
    id: string;
    action: string;
    description: string;
    timestamp: string;
    actor: string;
    type: "system" | "ai" | "user" | "status";
}

export interface DepartmentStats {
    name: string;
    totalRequests: number;
    resolved: number;
    pending: number;
    avgResponseTime: string;
}

export interface AnalyticsData {
    totalRequests: number;
    resolvedToday: number;
    pendingRequests: number;
    avgResponseTime: string;
    resolutionRate: number;
    requestsByCategory: { category: string; count: number }[];
    requestsByDay: { day: string; count: number }[];
    departmentPerformance: DepartmentStats[];
}

export const categories = [
    { id: "water", name: "Water Supply", icon: "💧" },
    { id: "roads", name: "Roads & Infrastructure", icon: "🛣️" },
    { id: "electricity", name: "Electricity", icon: "⚡" },
    { id: "sanitation", name: "Sanitation", icon: "🗑️" },
    { id: "building", name: "Building & Permits", icon: "🏗️" },
    { id: "public-safety", name: "Public Safety", icon: "🛡️" },
    { id: "parks", name: "Parks & Recreation", icon: "🌳" },
    { id: "other", name: "Other", icon: "📋" },
];

export const mockRequests: Request[] = [
    {
        id: "REQ-001",
        title: "Water Supply Disruption in Ward 12",
        category: "Water Supply",
        department: "Water Department",
        status: "in-progress",
        priority: "high",
        citizenName: "Rajesh Kumar",
        citizenPhone: "+91 98765 43210",
        citizenEmail: "rajesh.k@email.com",
        location: "Block A, Sector 12, Ward 12",
        description: "No water supply for the past 3 days. Multiple families affected. Urgent attention required as water tankers are not sufficient.",
        createdAt: "2026-02-08T08:30:00",
        updatedAt: "2026-02-08T10:15:00",
        assignedTo: "Vikram Singh",
        aiConfidence: 94,
        timeline: [
            { id: "1", action: "Request Submitted", description: "Complaint registered via mobile app", timestamp: "2026-02-08T08:30:00", actor: "Rajesh Kumar", type: "user" },
            { id: "2", action: "AI Analysis Complete", description: "Categorized as Water Supply - High Priority", timestamp: "2026-02-08T08:30:15", actor: "CivicFlow AI", type: "ai" },
            { id: "3", action: "Auto-Routed", description: "Assigned to Water Department", timestamp: "2026-02-08T08:30:20", actor: "System", type: "system" },
            { id: "4", action: "Assigned to Officer", description: "Vikram Singh will handle this request", timestamp: "2026-02-08T09:00:00", actor: "Dept. Head", type: "user" },
            { id: "5", action: "Status Updated", description: "Investigation in progress", timestamp: "2026-02-08T10:15:00", actor: "Vikram Singh", type: "status" },
        ],
    },
    {
        id: "REQ-002",
        title: "Street Light Not Working",
        category: "Electricity",
        department: "Electrical Department",
        status: "assigned",
        priority: "medium",
        citizenName: "Priya Sharma",
        citizenPhone: "+91 87654 32109",
        citizenEmail: "priya.s@email.com",
        location: "Main Road, Near Temple, Sector 8",
        description: "Street light pole #847 has not been working for a week. The area becomes very dark at night causing safety concerns.",
        createdAt: "2026-02-07T14:20:00",
        updatedAt: "2026-02-07T16:45:00",
        assignedTo: "Arun Patel",
        aiConfidence: 98,
        timeline: [
            { id: "1", action: "Request Submitted", description: "Complaint registered online", timestamp: "2026-02-07T14:20:00", actor: "Priya Sharma", type: "user" },
            { id: "2", action: "AI Analysis Complete", description: "Categorized as Electricity - Medium Priority", timestamp: "2026-02-07T14:20:10", actor: "CivicFlow AI", type: "ai" },
            { id: "3", action: "Auto-Routed", description: "Assigned to Electrical Department", timestamp: "2026-02-07T14:20:15", actor: "System", type: "system" },
            { id: "4", action: "Assigned to Officer", description: "Arun Patel assigned for inspection", timestamp: "2026-02-07T16:45:00", actor: "Dept. Head", type: "user" },
        ],
    },
    {
        id: "REQ-003",
        title: "Pothole on Main Highway",
        category: "Roads & Infrastructure",
        department: "PWD",
        status: "resolved",
        priority: "high",
        citizenName: "Mohammed Ali",
        citizenPhone: "+91 76543 21098",
        citizenEmail: "m.ali@email.com",
        location: "NH-48, KM 23, Near Toll Plaza",
        description: "Large pothole causing accidents. Two motorcyclists injured last week. Needs immediate repair.",
        createdAt: "2026-02-05T09:00:00",
        updatedAt: "2026-02-07T17:30:00",
        assignedTo: "Suresh Reddy",
        aiConfidence: 96,
        timeline: [
            { id: "1", action: "Request Submitted", description: "Emergency complaint filed", timestamp: "2026-02-05T09:00:00", actor: "Mohammed Ali", type: "user" },
            { id: "2", action: "AI Analysis Complete", description: "Categorized as Roads - High Priority (Safety Risk)", timestamp: "2026-02-05T09:00:08", actor: "CivicFlow AI", type: "ai" },
            { id: "3", action: "Auto-Routed", description: "Assigned to PWD - Fast Track", timestamp: "2026-02-05T09:00:12", actor: "System", type: "system" },
            { id: "4", action: "Assigned to Officer", description: "Suresh Reddy assigned for immediate action", timestamp: "2026-02-05T09:30:00", actor: "Dept. Head", type: "user" },
            { id: "5", action: "Work Started", description: "Repair crew dispatched", timestamp: "2026-02-06T08:00:00", actor: "Suresh Reddy", type: "status" },
            { id: "6", action: "Work Completed", description: "Pothole filled and road repaired", timestamp: "2026-02-07T17:30:00", actor: "Suresh Reddy", type: "status" },
        ],
    },
    {
        id: "REQ-004",
        title: "Garbage Collection Missed",
        category: "Sanitation",
        department: "Municipal Sanitation",
        status: "pending",
        priority: "medium",
        citizenName: "Anita Desai",
        citizenPhone: "+91 65432 10987",
        citizenEmail: "anita.d@email.com",
        location: "Rose Garden Apartments, Block C",
        description: "Garbage has not been collected for 4 days. Bins are overflowing and causing foul smell.",
        createdAt: "2026-02-08T07:15:00",
        updatedAt: "2026-02-08T07:15:30",
        aiConfidence: 92,
        timeline: [
            { id: "1", action: "Request Submitted", description: "Complaint registered via mobile app", timestamp: "2026-02-08T07:15:00", actor: "Anita Desai", type: "user" },
            { id: "2", action: "AI Analysis Complete", description: "Categorized as Sanitation - Medium Priority", timestamp: "2026-02-08T07:15:20", actor: "CivicFlow AI", type: "ai" },
            { id: "3", action: "Auto-Routed", description: "Assigned to Municipal Sanitation", timestamp: "2026-02-08T07:15:30", actor: "System", type: "system" },
        ],
    },
    {
        id: "REQ-005",
        title: "Building Permit Application",
        category: "Building & Permits",
        department: "Urban Planning",
        status: "in-progress",
        priority: "low",
        citizenName: "Kavitha Nair",
        citizenPhone: "+91 54321 09876",
        citizenEmail: "kavitha.n@email.com",
        location: "Plot 45, Industrial Area Phase 2",
        description: "Application for construction permit for a 3-story commercial building. All documents attached.",
        createdAt: "2026-02-01T11:00:00",
        updatedAt: "2026-02-06T14:20:00",
        assignedTo: "Deepak Verma",
        aiConfidence: 89,
        timeline: [
            { id: "1", action: "Application Submitted", description: "Permit application with documents", timestamp: "2026-02-01T11:00:00", actor: "Kavitha Nair", type: "user" },
            { id: "2", action: "AI Analysis Complete", description: "Categorized as Building Permit - Standard Processing", timestamp: "2026-02-01T11:00:25", actor: "CivicFlow AI", type: "ai" },
            { id: "3", action: "Auto-Routed", description: "Assigned to Urban Planning Dept", timestamp: "2026-02-01T11:00:30", actor: "System", type: "system" },
            { id: "4", action: "Document Verification", description: "All documents verified successfully", timestamp: "2026-02-03T10:00:00", actor: "Deepak Verma", type: "status" },
            { id: "5", action: "Site Inspection Scheduled", description: "Inspection on Feb 10, 2026", timestamp: "2026-02-06T14:20:00", actor: "Deepak Verma", type: "status" },
        ],
    },
    {
        id: "REQ-006",
        title: "Park Maintenance Required",
        category: "Parks & Recreation",
        department: "Parks Department",
        status: "assigned",
        priority: "low",
        citizenName: "Sanjay Gupta",
        citizenPhone: "+91 43210 98765",
        citizenEmail: "sanjay.g@email.com",
        location: "Central Park, Near Fountain",
        description: "Broken benches and damaged playground equipment need repair. Children's safety at risk.",
        createdAt: "2026-02-04T16:30:00",
        updatedAt: "2026-02-05T09:00:00",
        assignedTo: "Rekha Joshi",
        aiConfidence: 91,
        timeline: [
            { id: "1", action: "Request Submitted", description: "Maintenance request filed", timestamp: "2026-02-04T16:30:00", actor: "Sanjay Gupta", type: "user" },
            { id: "2", action: "AI Analysis Complete", description: "Categorized as Parks - Lower Priority", timestamp: "2026-02-04T16:30:12", actor: "CivicFlow AI", type: "ai" },
            { id: "3", action: "Auto-Routed", description: "Assigned to Parks Department", timestamp: "2026-02-04T16:30:18", actor: "System", type: "system" },
            { id: "4", action: "Assigned to Officer", description: "Rekha Joshi will coordinate repairs", timestamp: "2026-02-05T09:00:00", actor: "Dept. Head", type: "user" },
        ],
    },
];

export const analyticsData: AnalyticsData = {
    totalRequests: 1247,
    resolvedToday: 89,
    pendingRequests: 156,
    avgResponseTime: "2.4 hrs",
    resolutionRate: 87,
    requestsByCategory: [
        { category: "Water Supply", count: 287 },
        { category: "Roads", count: 342 },
        { category: "Electricity", count: 198 },
        { category: "Sanitation", count: 224 },
        { category: "Building", count: 89 },
        { category: "Parks", count: 67 },
        { category: "Other", count: 40 },
    ],
    requestsByDay: [
        { day: "Mon", count: 145 },
        { day: "Tue", count: 189 },
        { day: "Wed", count: 167 },
        { day: "Thu", count: 198 },
        { day: "Fri", count: 223 },
        { day: "Sat", count: 178 },
        { day: "Sun", count: 147 },
    ],
    departmentPerformance: [
        { name: "Water Department", totalRequests: 287, resolved: 251, pending: 36, avgResponseTime: "1.8 hrs" },
        { name: "PWD", totalRequests: 342, resolved: 298, pending: 44, avgResponseTime: "3.2 hrs" },
        { name: "Electrical Dept", totalRequests: 198, resolved: 176, pending: 22, avgResponseTime: "2.1 hrs" },
        { name: "Sanitation", totalRequests: 224, resolved: 189, pending: 35, avgResponseTime: "2.8 hrs" },
        { name: "Urban Planning", totalRequests: 89, resolved: 62, pending: 27, avgResponseTime: "5.4 hrs" },
        { name: "Parks Dept", totalRequests: 67, resolved: 58, pending: 9, avgResponseTime: "4.1 hrs" },
    ],
};

export const getRequestById = (id: string): Request | undefined => {
    return mockRequests.find((req) => req.id === id);
};

export const getStatusColor = (status: Request["status"]) => {
    switch (status) {
        case "pending":
            return "text-red-400 bg-red-500/10 border-red-500/30";
        case "in-progress":
            return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
        case "assigned":
            return "text-blue-400 bg-blue-500/10 border-blue-500/30";
        case "resolved":
            return "text-green-400 bg-green-500/10 border-green-500/30";
        default:
            return "text-slate-400 bg-slate-500/10 border-slate-500/30";
    }
};

export const getPriorityColor = (priority: Request["priority"]) => {
    switch (priority) {
        case "critical":
            return "text-red-400 bg-red-500/10 border-red-500/30";
        case "high":
            return "text-orange-400 bg-orange-500/10 border-orange-500/30";
        case "medium":
            return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
        case "low":
            return "text-green-400 bg-green-500/10 border-green-500/30";
        default:
            return "text-slate-400 bg-slate-500/10 border-slate-500/30";
    }
};
