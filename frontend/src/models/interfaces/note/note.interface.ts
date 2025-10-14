import { Student } from "../student/student.intertface";

export interface Note {
	id: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	studentId: string;
	createdById: string;
	student: Student;
}
