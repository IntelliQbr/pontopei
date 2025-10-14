import { api } from "@/lib/axios";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";

async function getWeeklyPlansCountToTeacher(): Promise<number> {
	try {
		const { data } = await api.get("/weekly-plans/teacher/count");

		return data;
	} catch (error) {
		console.error(error);
		return 0;
	}
}

async function findAllByStudentId(
	studentId: string,
	query: Exclude<FindAllQuery, "search">
) {
	try {
		const { data } = await api.get(`/weekly-plans/student/${studentId}`, {
			params: query,
		});

		return data;
	} catch (error) {
		console.error(error);
		return { weeklyPlans: [], total: 0 };
	}
}

export const WeeklyPlansApi = {
	getWeeklyPlansCountToTeacher,
	findAllByStudentId,
};
