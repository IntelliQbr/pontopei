import { StudentGender } from "@/models/enums/student/student-gender.enum";
import { StudentStatus } from "@/models/enums/student/student-status.enum";
import { ClassroomAssignment } from "../classroom/classroom-assignment.interface";
import { Note } from "../note/note.interface";
import { PEI } from "../pei/pei.interface";
import { School } from "../school/school.interface";
import { WeeklyPlan } from "../weekly-plan/weekly-plan.interface";
import { MedicalCondition } from "./medical-condition.interface";

export interface Student {
	id: string;
	fullName: string;
	photoUrl?: string | null;
	dateOfBirth: string;
	schoolId: string;
	specialNeeds: string;
	medicalConditions?: MedicalCondition[];
	hasCamping: boolean;
	parentGuardian: string;
	cid?: string;
	status: StudentStatus;
	createdById: string;
	createdAt: Date;
	updatedAt: Date;
	peis: PEI[];
	school: School;
	classroomAssignment: ClassroomAssignment;
	gender: StudentGender;
	notes: Note[];
	weeklyPlans: WeeklyPlan[];
}
