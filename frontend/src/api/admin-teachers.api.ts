import { api } from "@/lib/axios";
import { User } from "@/models/interfaces/user/user.interface";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";
import { getMessageFromAxiosError } from "@/utils/exceptions";

export const AdminTeachersApi = {
	findAllByDirectorId: async (
		directorId: string,
		params: FindAllQuery
	): Promise<{ teachers: User[]; total: number }> => {
		try {
			const req = await api.get(`/admin/teachers/${directorId}`, {
				params,
			});
			return req.data;
		} catch (error) {
			console.error(getMessageFromAxiosError(error));
			return {
				teachers: [],
				total: 0,
			};
		}
	},
};
