import { ClassPeriodEnum } from "@/models/enums/classsroom/class-period.enum";
import { Profile } from "../profile/profile.interface";
import { School } from "../school/school.interface";
import { ClassroomAssignment } from "./classroom-assignment.interface";

export interface Classroom {
	id: string;
	name: string;
	capacity: number;
	grade: string;
	period: ClassPeriodEnum;
	schoolId: string;
	createdById: string;
	createdAt: Date;
	updatedAt: Date;
	createdBy: Profile;
	school: School;
	assignments: ClassroomAssignment[];
}
