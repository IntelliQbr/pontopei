import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { peiStatusColors, peiStatusLabels } from "@/data/pei.data";
import { studentStatusColors, studentStatusLabels } from "@/data/student.data";
import { cn } from "@/lib/utils";
import { StudentGender } from "@/models/enums/student/student-gender.enum";
import { PEI } from "@/models/interfaces/pei/pei.interface";
import { Student } from "@/models/interfaces/student/student.intertface";
import { format } from "date-fns";
import {
	ArrowRight,
	FileText,
	GraduationCapIcon,
	HeartHandshake,
	SchoolIcon,
	ShapesIcon,
} from "lucide-react";
import Link from "next/link";
import { AdminStudentsActions } from "../admin/students/AdminStudentsActions";
import { Separator } from "../ui/separator";
import { StudentsActions } from "./StudentsActions";

interface StudentCardProps {
	student: Student;
	actionPath: string;
	isAdmin?: boolean;
	isDirector?: boolean;
}

function getMostRecentPEI(peis: PEI[]): PEI | null {
	if (!peis || peis.length === 0) {
		return null;
	}

	return peis.reduce((latest, current) => {
		return new Date(current.createdAt) > new Date(latest.createdAt)
			? current
			: latest;
	});
}

export function StudentCard({
	student,
	actionPath,
	isAdmin,
	isDirector,
}: StudentCardProps) {
	const mostRecentPei = getMostRecentPEI(student.peis);

	return (
		<Card className="gap-4 hover:shadow-lg transition-all duration-300">
			<CardHeader>
				<div className="flex flex-col gap-4">
					<div
						className={cn(
							"self-center flex flex-col items-center gap-2  w-full p-2 rounded",
							student.gender === StudentGender.MALE
								? "bg-blue-100"
								: "bg-pink-100"
						)}
					>
						<Avatar className="h-16 w-16">
							<AvatarImage src={student.photoUrl ?? undefined} />
							<AvatarFallback className="bg-background">
								{student.fullName[0]}
							</AvatarFallback>
						</Avatar>
						<CardTitle>{student.fullName}</CardTitle>
					</div>
					<div className="flex flex-col gap-1">
						<CardDescription className="flex items-center gap-2 flex-wrap">
							<SchoolIcon className="h-4 w-4 text-muted-foreground" />
							<span className="max-w-[200px] truncate">
								{student.school.name}
							</span>
						</CardDescription>
						<CardDescription className="flex items-center gap-2 flex-wrap">
							<ShapesIcon className="h-4 w-4 text-muted-foreground" />
							<span>
								{student.classroomAssignment.classroom.name}
							</span>
							-
							<span>
								{student.classroomAssignment.classroom.grade}
							</span>
						</CardDescription>
						<div className="flex items-center gap-2 flex-wrap">
							<Badge
								className={studentStatusColors[student.status]}
							>
								{studentStatusLabels[student.status]}
							</Badge>
							{student.specialNeeds && (
								<Badge variant="outline">
									<span
										title={student.specialNeeds}
										className="max-w-[170px] truncate"
									>
										{student.specialNeeds}
									</span>
								</Badge>
							)}
						</div>
					</div>
				</div>
			</CardHeader>
			<Separator />
			<CardContent className="grid gap-2">
				<div className="flex items-center gap-2">
					<GraduationCapIcon className="h-4 w-4 text-muted-foreground" />
					<span className="text-sm text-muted-foreground">
						Professor(a):{" "}
						{student.classroomAssignment.teacher.user.fullName}
					</span>
				</div>

				<div className="flex items-center gap-2">
					<HeartHandshake className="h-4 w-4 text-muted-foreground" />
					<span className="text-sm text-muted-foreground">
						Responsável: {student.parentGuardian}
					</span>
				</div>

				{mostRecentPei && (
					<div className="flex items-center gap-2">
						<FileText className="h-4 w-4 text-muted-foreground" />
						<span className="text-sm text-muted-foreground">
							Último PEI:{" "}
							{format(
								new Date(mostRecentPei.createdAt),
								"dd/MM/yyyy"
							)}
							<Badge
								className={
									peiStatusColors[mostRecentPei.status]
								}
							>
								{peiStatusLabels[mostRecentPei.status]}
							</Badge>
						</span>
					</div>
				)}
			</CardContent>
			<CardFooter className="flex justify-between items-center gap-2">
				<Button asChild className="grow">
					<Link href={actionPath}>
						Ver Aluno <ArrowRight className="ml-2 h-4 w-4" />
					</Link>
				</Button>
				{isAdmin && <AdminStudentsActions student={student} />}
				{isDirector && !isAdmin && (
					<StudentsActions student={student} />
				)}
			</CardFooter>
		</Card>
	);
}
