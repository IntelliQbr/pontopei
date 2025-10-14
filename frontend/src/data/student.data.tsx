import { StudentGender } from "@/models/enums/student/student-gender.enum";
import { StudentStatus } from "@/models/enums/student/student-status.enum";

export const studentStatusLabels = {
	[StudentStatus.ACTIVE]: "Ativo",
	[StudentStatus.INACTIVE]: "Inativo",
	[StudentStatus.TRANSFERRED]: "Transferido",
};

export const studentStatusColors: Record<StudentStatus, string> = {
	[StudentStatus.ACTIVE]: "bg-green-100 text-green-800",
	[StudentStatus.INACTIVE]: "bg-gray-100 text-gray-800",
	[StudentStatus.TRANSFERRED]: "bg-yellow-100 text-yellow-800",
};

export const studentGenderLabels: Record<StudentGender, string> = {
	[StudentGender.MALE]: "Masculino",
	[StudentGender.FEMALE]: "Feminino",
};
