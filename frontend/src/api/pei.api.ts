import { api } from "@/lib/axios";
import { PEI } from "@/models/interfaces/pei/pei.interface";

async function getActivePEIsCountToDirector(): Promise<number> {
	try {
		const response = await api.get<number>("/pei/director/active-count");

		return response.data;
	} catch (error) {
		console.error(error);
		return 0;
	}
}

async function getExpiringPEIsCountToDirector(): Promise<number> {
	try {
		const response = await api.get<number>("/pei/director/expiring-count");

		return response.data;
	} catch (error) {
		console.error(error);
		return 0;
	}
}

async function getLatestsPEIsToDirector(): Promise<PEI[]> {
	try {
		const response = await api.get<PEI[]>("/pei/director/latest-peis");

		return response.data;
	} catch (error) {
		console.error(error);
		return [];
	}
}

async function getActivePEIsCountToTeacher(): Promise<number> {
	try {
		const response = await api.get<number>("/pei/teacher/active-count");

		return response.data;
	} catch (error) {
		console.error(error);
		return 0;
	}
}

async function getExpiringPEIsCountToTeacher(): Promise<number> {
	try {
		const response = await api.get<number>("/pei/teacher/expiring-count");

		return response.data;
	} catch (error) {
		console.error(error);
		return 0;
	}
}

async function getLatestsPEIsToTeacher(): Promise<PEI[]> {
	try {
		const response = await api.get<PEI[]>("/pei/teacher/latest-peis");

		return response.data;
	} catch (error) {
		console.error(error);
		return [];
	}
}

async function getLatestPEIByStudentIdToTeacher(
	studentId: string
): Promise<PEI> {
	try {
		const response = await api.get<PEI>(
			`/pei/teacher/latest-pei/${studentId}`
		);

		return response.data;
	} catch (error) {
		console.error(error);
		return {} as PEI;
	}
}

export const PeiApi = {
	getActivePEIsCountToDirector,
	getExpiringPEIsCountToDirector,
	getLatestsPEIsToDirector,
	getActivePEIsCountToTeacher,
	getExpiringPEIsCountToTeacher,
	getLatestsPEIsToTeacher,
	getLatestPEIByStudentIdToTeacher,
};
