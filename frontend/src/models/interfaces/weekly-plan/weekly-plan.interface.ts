import { Student } from "../student/student.intertface";
import { WeekActivity } from "./week-activity.interface";

export interface WeeklyPlan {
	id: string;
	weekStart: string;
	weekEnd: string;
	weekActivities: Record<string, WeekActivity[]>;
	formQuestions: Record<string, string>;
	content: string;
	createdAt: string;
	updatedAt: string;
	studentId: string;
	createdById: string;
	student: Student;
}
