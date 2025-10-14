import { AdminEditStudentFormData } from "@/components/admin/students/forms/AdminEditStudentForm";
import { api } from "@/lib/axios";
import { Student } from "@/models/interfaces/student/student.intertface";
import { AdminStudentsSearchParams } from "@/models/types/params/admin-sutudents-search-params.type";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";

export const AdminStudentsApi = {
	findAll: async (
		params: FindAllQuery & AdminStudentsSearchParams
	): Promise<{
		students: Student[];
		total: number;
	}> => {
		try {
			const req = await api.get("/admin/students", {
				params,
			});
			return req.data;
		} catch (error) {
			console.error(error);
			return {
				students: [],
				total: 0,
			};
		}
	},
	findOne: async (id: string): Promise<Student> => {
		const { data } = await api.get(`/admin/students/${id}`);
		return data;
	},
	update: async (id: string, dto: AdminEditStudentFormData) => {
		const { data } = await api.put(`/admin/students/${id}`, dto);
		return data;
	},
	remove: async (id: string) => {
		const { data } = await api.delete(`/admin/students/${id}`);
		return data;
	},
};
