import { AssignmentStatusEnum } from "@/models/enums/classsroom/assignment-status.enum";
import { Profile } from "../profile/profile.interface";
import { Student } from "../student/student.intertface";
import { Classroom } from "./classroom.interface";

export interface ClassroomAssignment {
	id: string;
	studentId: string;
	teacherId: string;
	classroomId: string;
	classroom: Classroom;
	teacher: Profile;
	student: Student;
	status: AssignmentStatusEnum;
	assignedDate: Date;
	createdAt: Date;
	updatedAt: Date;
}
