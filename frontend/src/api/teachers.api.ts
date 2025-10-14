import { api } from "@/lib/axios";
import { User } from "@/models/interfaces/user/user.interface";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";

async function findAllTeachersToDirector(
	params: FindAllQuery
): Promise<{ teachers: User[]; total: number }> {
	try {
		const req = await api.get("/teachers", {
			params,
		});

		return req.data;
	} catch (error) {
		console.error(error);
		return { teachers: [], total: 0 };
	}
}

export const TeachersApi = {
	findAllTeachersToDirector,
};
