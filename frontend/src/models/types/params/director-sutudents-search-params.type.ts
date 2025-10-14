import { ClassPeriodEnum } from "@/models/enums/classsroom/class-period.enum";
import { StudentStatus } from "@/models/enums/student/student-status.enum";

export type DirectorStudentsSearchParams = {
    query_students?: string;
    page_students?: number;
    schoolId?: string;
    classroomId?: string;
    teacherId?: string;
    classPeriod?: ClassPeriodEnum;
    status?: StudentStatus;
};
