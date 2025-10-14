import { api } from "@/lib/axios";
import { Note } from "@/models/interfaces/note/note.interface";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";

async function findAllByStudentId(
	studentId: string,
	query: FindAllQuery
): Promise<{
	notes: Note[];
	total: number;
}> {
	try {
		const { data } = await api.get(`/admin/notes/student/${studentId}`, {
			params: query,
		});

		return data;
	} catch (error) {
		console.error(error);
		return {
			notes: [],
			total: 0,
		};
	}
}

export const AdminNotesApi = {
	findAllByStudentId,
};
