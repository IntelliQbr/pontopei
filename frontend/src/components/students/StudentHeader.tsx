import { AdminStudentsApi } from "@/api/admin-students.api";
import { StudentsApi } from "@/api/students.api";
import {
	studentGenderLabels,
	studentStatusColors,
	studentStatusLabels,
} from "@/data/student.data";
import { cn } from "@/lib/utils";
import { StudentGender } from "@/models/enums/student/student-gender.enum";
import { Student } from "@/models/interfaces/student/student.intertface";
import { formatDate } from "date-fns";
import {
	BriefcaseMedicalIcon,
	CalendarIcon,
	CircleSmallIcon,
	GraduationCapIcon,
	HeartHandshakeIcon,
	IdCardIcon,
	SchoolIcon,
	UsersRoundIcon,
} from "lucide-react";
import React from "react";
import { H1 } from "../typography/H1";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface StudentHeaderProps {
	studentId: string;
	isAdmin?: boolean;
}

export async function StudentHeader({
	studentId,
	isAdmin = false,
}: StudentHeaderProps) {
	let student: Student;

	if (isAdmin) {
		student = await AdminStudentsApi.findOne(studentId);
	} else {
		student = await StudentsApi.findOneStudent(studentId);
	}

	const studentDetails = [
		{
			icon: SchoolIcon,
			label: "Escola:",
			value: student.school.name,
			valueClass: "underline",
		},
		{
			icon: UsersRoundIcon,
			label: "Serie/Turma:",
			value: `${student.classroomAssignment.classroom.name} - ${student.classroomAssignment.classroom.grade}`,
			valueClass: "text-sm text-muted-foreground underline",
		},
		{
			icon: GraduationCapIcon,
			label: "Professor(a):",
			value: student.classroomAssignment.teacher.user.fullName,
			valueClass: "text-sm text-muted-foreground underline",
		},
		{
			icon: IdCardIcon,
			label: "CID:",
			value: student.cid,
			valueClass: "text-sm text-muted-foreground underline",
		},
		{
			icon: CalendarIcon,
			label: "Nascimento:",
			value: formatDate(student.dateOfBirth, "dd/MM/yyyy"),
			valueClass: "text-sm text-muted-foreground underline",
		},
		{
			icon: CircleSmallIcon,
			label: "Gênero:",
			value: studentGenderLabels[student.gender],
			valueClass: "text-sm text-muted-foreground underline",
		},
		{
			icon: HeartHandshakeIcon,
			label: "Responsável:",
			value: student.parentGuardian,
			valueClass: "text-sm text-muted-foreground underline",
		},
		{
			icon: BriefcaseMedicalIcon,
			label: "Condições Médicas:",
			value: student.medicalConditions
				?.map((condition) => condition.condition)
				.join(", "),
			valueClass: "text-sm text-muted-foreground underline",
		},
		{
			icon: CalendarIcon,
			label: "Data de Cadastro:",
			value: formatDate(student.createdAt, "dd/MM/yyyy"),
			valueClass: "text-sm text-muted-foreground underline",
		},
	];

	const groups = [
		studentDetails.slice(0, 3),
		studentDetails.slice(3, 6),
		studentDetails.slice(6, 9),
	];

	return (
		<header
			className={cn(
				"flex flex-col gap-4 bg-primary/10 p-4 rounded-lg shadow-sm",
				student.gender === StudentGender.MALE
					? "bg-blue-100"
					: "bg-pink-100"
			)}
		>
			<div className="flex items-center gap-4">
				<Avatar className="w-16 h-16">
					<AvatarImage src={student.photoUrl ?? undefined} />
					<AvatarFallback>
						{student.fullName.charAt(0)}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col w-full gap-2">
					<H1 className="sm:text-2xl text-base font-bold flex items-center gap-2 justify-between w-full">
						<span>{student.fullName}</span>
						<Badge
							className={cn(
								"text-base px-5",
								studentStatusColors[student.status]
							)}
						>
							{studentStatusLabels[student.status]}
						</Badge>
					</H1>
					<div className="flex items-center gap-2">
						<Badge
							title={student.specialNeeds}
							variant={"default"}
							className="max-w-[100px] truncate md:max-w-full"
						>
							{student.specialNeeds}
						</Badge>
					</div>
				</div>
			</div>
			<div className="flex items-center md:flex-row flex-col justify-between gap-2 bg-background p-4 rounded-lg">
				{groups.map((group, groupIndex) => (
					<React.Fragment key={groupIndex}>
						<div className="flex flex-col gap-2 w-full">
							{group.map((item, index) => (
								<React.Fragment key={index}>
									<div className="flex items-center justify-between gap-2 text-muted-foreground">
										<div className="flex items-center gap-1">
											<item.icon className="text-primary w-5 h-5" />
											<span className="font-semibold">
												{item.label}
											</span>
										</div>
										<span className={item.valueClass}>
											{item.value}
										</span>
									</div>
									<Separator />
								</React.Fragment>
							))}
						</div>
						{groupIndex < groups.length - 1 && (
							<div className="md:flex hidden self-stretch min-h-full mx-2 w-px bg-primary" />
						)}
					</React.Fragment>
				))}
			</div>
		</header>
	);
}
