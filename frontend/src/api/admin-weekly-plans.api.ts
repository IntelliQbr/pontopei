import { api } from "@/lib/axios";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";

async function findAllByStudentId(
	studentId: string,
	query: Exclude<FindAllQuery, "search">
) {
	try {
		const { data } = await api.get(
			`/admin/weekly-plans/student/${studentId}`,
			{
				params: query,
			}
		);

		return data;
	} catch (error) {
		console.error(error);
		return { weeklyPlans: [], total: 0 };
	}
}

export const AdminWeeklyPlansApi = {
	findAllByStudentId,
};
