import { AdminCreateSchoolFormData } from "@/components/admin/schools/forms/AdminCreateSchoolForm";
import { AdminEditSchoolFormData } from "@/components/admin/schools/forms/AdminEditSchoolForm";
import { api } from "@/lib/axios";
import { School } from "@/models/interfaces/school/school.interface";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";

export const AdminSchoolsApi = {
	findAll: async (
		query: FindAllQuery
	): Promise<{
		schools: School[];
		total: number;
	}> => {
		try {
			const req = await api.get("/admin/schools", { params: query });
			return req.data;
		} catch (error) {
			console.error(error);
			return {
				schools: [],
				total: 0,
			};
		}
	},

	findAllByDirectorId: async (
		directorId: string,
		query: FindAllQuery
	): Promise<{
		schools: School[];
		total: number;
	}> => {
		try {
			const req = await api.get(`/admin/schools/${directorId}`, {
				params: query,
			});
			return req.data;
		} catch (error) {
			console.error(error);
			return {
				schools: [],
				total: 0,
			};
		}
	},

	create: async (dto: AdminCreateSchoolFormData) => {
		const { data } = await api.post("/admin/schools", dto);
		return data;
	},

	update: async (id: string, dto: AdminEditSchoolFormData) => {
		const { data } = await api.put(`/admin/schools/${id}`, dto);
		return data;
	},

	remove: async (id: string) => {
		const { data } = await api.delete(`/admin/schools/${id}`);
		return data;
	},
};
