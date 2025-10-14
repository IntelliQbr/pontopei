import { ClassPeriodEnum } from "@/models/enums/classsroom/class-period.enum";
import { StudentStatus } from "@/models/enums/student/student-status.enum";

export type AdminStudentsSearchParams = {
	query_students?: string;
	page_students?: number;
	classroomId?: string;
	classPeriod?: ClassPeriodEnum;
	status?: StudentStatus;
	directorId?: string;
	schoolId?: string;
	teacherId?: string;
};
