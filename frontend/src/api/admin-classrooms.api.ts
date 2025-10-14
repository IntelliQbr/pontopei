import { AdminCreateClassroomFormData } from "@/components/admin/classrooms/forms/AdminCreateClassroomForm";
import { AdminEditClassroomFormData } from "@/components/admin/classrooms/forms/AdminEditClassroomForm";
import { api } from "@/lib/axios";
import { Classroom } from "@/models/interfaces/classroom/classroom.interface";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";

export const AdminClassroomsApi = {
	findAll: async (
		query: FindAllQuery
	): Promise<{
		classrooms: Classroom[];
		total: number;
	}> => {
		try {
			const req = await api.get("/admin/classrooms", { params: query });
			return req.data;
		} catch (error) {
			console.error(error);
			return {
				classrooms: [],
				total: 0,
			};
		}
	},

	findAllByDirectorId: async (
		directorId: string,
		query: FindAllQuery
	): Promise<{
		classrooms: Classroom[];
		total: number;
	}> => {
		try {
			const req = await api.get(`/admin/classrooms/${directorId}`, {
				params: query,
			});
			return req.data;
		} catch (error) {
			console.error(error);
			return {
				classrooms: [],
				total: 0,
			};
		}
	},

	create: async (dto: AdminCreateClassroomFormData) => {
		const { data } = await api.post("/admin/classrooms", dto);
		return data;
	},

	update: async (id: string, dto: AdminEditClassroomFormData) => {
		const { data } = await api.put(`/admin/classrooms/${id}`, dto);
		return data;
	},

	remove: async (id: string) => {
		const { data } = await api.delete(`/admin/classrooms/${id}`);
		return data;
	},
};
