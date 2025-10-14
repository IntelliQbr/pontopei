import { PEIStatusEnum } from "@/models/enums/pei/pei-status.enum";
import { Student } from "../student/student.intertface";

export interface PEI {
	id: string;
	studentId: string;
	version: number;
	content: string;
	formQuestions: Record<string, string>;
	startDate: Date;
	endDate: Date;
	isRenewal: boolean;
	status: PEIStatusEnum;
	previousPEIId?: string;
	createdById: string;
	createdAt: Date;
	updatedAt: Date;
	student: Student;
}
