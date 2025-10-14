import { EditStudentFormData } from "@/components/students/forms/EditStudentForm";
import { api } from "@/lib/axios";
import { Student } from "@/models/interfaces/student/student.intertface";
import { DirectorStudentsSearchParams } from "@/models/types/params/director-sutudents-search-params.type";
import { TeacherStudentsSearchParams } from "@/models/types/params/teacher-sutudents-search-params.type copy";
import { FindAllQuery } from "@/models/types/queries/find-all-query.type";
import { redirect } from "next/navigation";

async function findAllDirectorStudents(
	params: FindAllQuery & DirectorStudentsSearchParams
): Promise<{
	students: Student[];
	total: number;
}> {
	try {
		const { data } = await api.get("/students/director", {
			params,
		});

		return data;
	} catch (error) {
		console.error(error);
		return { students: [], total: 0 };
	}
}

async function findAllTeacherStudents(
	params: FindAllQuery & TeacherStudentsSearchParams
): Promise<{
	students: Student[];
	total: number;
}> {
	try {
		const { data } = await api.get("/students/teacher", {
			params,
		});

		return data;
	} catch (error) {
		console.error(error);
		return { students: [], total: 0 };
	}
}

async function findOneStudent(id: string): Promise<Student> {
	try {
		const { data } = await api.get(`/students/${id}`);

		return data;
	} catch (error) {
		console.error(error);
		redirect("/dashboard");
	}
}

async function getStudentsCountToTeacher(): Promise<number> {
	try {
		const { data } = await api.get("/students/teacher/count");

		return data;
	} catch (error) {
		console.error(error);
		return 0;
	}
}

async function update(id: string, dto: EditStudentFormData) {
	try {
		const { data } = await api.put(`/students/${id}`, dto);

		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function remove(id: string) {
	try {
		await api.delete(`/students/${id}`);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export const StudentsApi = {
	findAllDirectorStudents,
	findAllTeacherStudents,
	findOneStudent,
	getStudentsCountToTeacher,
	update,
	remove,
};
