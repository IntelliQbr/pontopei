import { api } from "@/lib/axios";
import { AIRequest } from "@/models/interfaces/ai-request/ai-request.interface";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";

export const AdminAiRequestsApi = {
	findAll: async (
		query: FindAllQuery
	): Promise<{
		aiRequests: AIRequest[];
		total: number;
	}> => {
		try {
			const req = await api.get("/admin/ai-requests", { params: query });
			return req.data;
		} catch (error) {
			console.error(error);
			return {
				aiRequests: [],
				total: 0,
			};
		}
	},
};
