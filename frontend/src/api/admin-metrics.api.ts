import { api } from "@/lib/axios";
import { Profile } from "@/models/interfaces/profile/profile.interface";

export interface AdminMetricsResponse {
	totalUsers: number;
	totalPEIs: number;
	totalStudents: number;
	totalWeeklyPlans: number;
	totalSchools: number;
	totalClassrooms: number;
	totalAIRequests: number;
	totalSubscriptions: number;
}

export interface SubscriptionsChartResponse {
	month: string;
	total: number;
	amount: number;
}

export const AdminMetricsApi = {
	getAdminMetrics: async (): Promise<AdminMetricsResponse> => {
		const response = await api.get("/admin/metrics");

		return response.data;
	},
	getSubscriptionsChart: async (): Promise<SubscriptionsChartResponse[]> => {
		const response = await api.get("/admin/metrics/subscriptions-chart");

		return response.data;
	},
	getLastProfiles: async (): Promise<Profile[]> => {
		const response = await api.get("/admin/metrics/last-profiles");

		return response.data;
	},
};
