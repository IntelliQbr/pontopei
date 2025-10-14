import { CreatePlusSubscriptionFormFormData } from "@/components/admin/subscriptions/forms/CreatePlusSubscriptionForm";
import { UpdateSubscriptionFormData } from "@/components/admin/subscriptions/forms/UpdateSubscriptionForm";
import { api } from "@/lib/axios";
import { SubscriptionStatusEnum } from "@/models/enums/subscription/subscription-status.enum";
import { Subscription } from "@/models/interfaces/subscription/subscription.interface";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";
import { getMessageFromAxiosError } from "@/utils/exceptions";

export const AdminSubscriptionsApi = {
	findAll: async (
		query: FindAllQuery & {
			status?: SubscriptionStatusEnum;
			search?: string;
		}
	): Promise<{ subscriptions: Subscription[]; total: number }> => {
		try {
			const req = await api.get("/admin/subscriptions", {
				params: query,
			});
			return req.data;
		} catch (error) {
			console.error(error);
			return {
				subscriptions: [],
				total: 0,
			};
		}
	},
	findSubscriptionLimits: async (
		directorId: string
	): Promise<{
		maxStudents: number;
		maxWeeklyPlans: number;
		maxPeiPerTrimester: number;
	}> => {
		try {
			const req = await api.get(
				`/admin/subscriptions/current-limits/${directorId}`
			);
			return req.data;
		} catch (error) {
			console.error(error);
			return {
				maxStudents: 0,
				maxWeeklyPlans: 0,
				maxPeiPerTrimester: 0,
			};
		}
	},
	create: async (dto: CreatePlusSubscriptionFormFormData) => {
		try {
			const { data } = await api.post("/admin/subscriptions", dto);
			return data;
		} catch (error) {
			console.error(getMessageFromAxiosError(error));
			throw error;
		}
	},
	update: async (id: string, dto: UpdateSubscriptionFormData) => {
		try {
			const { data } = await api.put(`/admin/subscriptions/${id}`, dto);
			return data;
		} catch (error) {
			console.error(getMessageFromAxiosError(error));
			throw error;
		}
	},
	remove: async (id: string) => {
		try {
			const { data } = await api.delete(`/admin/subscriptions/${id}`);
			return data;
		} catch (error) {
			console.error(getMessageFromAxiosError(error));
			throw error;
		}
	},
};
