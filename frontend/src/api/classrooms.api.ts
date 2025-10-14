import { api } from "@/lib/axios";
import { Classroom } from "@/models/interfaces/classroom/classroom.interface";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";

async function findAllClassroomsToDirector(
	params: FindAllQuery
): Promise<{ classrooms: Classroom[]; total: number }> {
	try {
		const req = await api.get("/classrooms", {
			params,
		});

		return req.data;
	} catch (error) {
		console.error(error);
		return { classrooms: [], total: 0 };
	}
}

async function getClassroomsCount(): Promise<number> {
	try {
		const req = await api.get("/classrooms/count");

		return req.data;
	} catch (error) {
		console.error(error);
		return 0;
	}
}

export const ClassroomsApi = {
	findAllClassroomsToDirector,
	getClassroomsCount,
};
