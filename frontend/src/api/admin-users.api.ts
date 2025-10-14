import { CreateUserFormData } from "@/components/admin/users/forms/CreateUserForm";
import { EditUserFormData } from "@/components/admin/users/forms/EditUserForm";
import { SetAdminUserFormData } from "@/components/admin/users/forms/SetAdminUserForm";
import { api } from "@/lib/axios";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { User } from "@/models/interfaces/user/user.interface";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";

export const AdminUsersApi = {
	findAll: async (
		query: FindAllQuery & { role?: ProfileRoleEnum }
	): Promise<{ users: User[]; total: number }> => {
		try {
			const req = await api.get("/admin/users", {
				params: query,
			});
			return req.data;
		} catch (error) {
			console.error(error);
			return { users: [], total: 0 };
		}
	},
	create: async (dto: CreateUserFormData) => {
		const { data } = await api.post("/admin/users", dto);
		return data;
	},
	update: async (id: string, dto: EditUserFormData) => {
		const { data } = await api.put(`/admin/users/${id}`, dto);
		return data;
	},
	setAdmin: async (id: string, dto: SetAdminUserFormData) => {
		const { data } = await api.put(`/admin/users/${id}/set-admin`, dto);
		return data;
	},
	remove: async (id: string) => {
		const { data } = await api.delete(`/admin/users/${id}`);
		return data;
	},
};
