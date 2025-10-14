import { api } from "@/lib/axios";
import { School } from "@/models/interfaces/school/school.interface";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";

async function findAllSchoolsToDirector(
	params: FindAllQuery
): Promise<{ schools: School[]; total: number }> {
	try {
		const req = await api.get("/schools", {
			params,
		});

		return req.data;
	} catch (error) {
		console.error(error);
		return { schools: [], total: 0 };
	}
}

async function getSchoolsCountToDirector(): Promise<number> {
	try {
		const req = await api.get("/schools/count");

		return req.data;
	} catch (error) {
		console.error(error);
		return 0;
	}
}

export const SchoolsApi = {
	findAllSchoolsToDirector,
	getSchoolsCountToDirector,
};
