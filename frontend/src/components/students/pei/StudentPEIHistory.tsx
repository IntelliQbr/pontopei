import { AdminStudentsApi } from "@/api/admin-students.api";
import { StudentsApi } from "@/api/students.api";
import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { PEI } from "@/models/interfaces/pei/pei.interface";
import { Student } from "@/models/interfaces/student/student.intertface";
import { FileTextIcon } from "lucide-react";
import { PEICard } from "../../pei/PEICard";
import { Card, CardContent } from "../../ui/card";

interface StudentPEIHistoryProps {
	studentId: string;
	isAdmin?: boolean;
}

export async function StudentPEIHistory({
	studentId,
	isAdmin = false,
}: StudentPEIHistoryProps) {
	let student: Student;

	if (isAdmin) {
		student = await AdminStudentsApi.findOne(studentId);
	} else {
		student = await StudentsApi.findOneStudent(studentId);
	}

	const peis = student.peis;

	const orderByDate = (a: PEI, b: PEI) => {
		return (
			new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
	};

	return (
		<div className="space-y-4 h-full flex flex-col">
			{peis.length === 0 ? (
				<Card className="border-0 shadow-md">
					<CardContent className="p-8 text-center">
						<FileTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<p className="text-gray-500">
							Nenhum PEI encontrado para este aluno.
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="flex-1 h-full">
					<Accordion type="multiple" className="space-y-4">
						{peis.sort(orderByDate).map((pei, index) => (
							<AccordionItem key={index} value={pei.id}>
								<PEICard pei={pei} student={student} />
							</AccordionItem>
						))}
					</Accordion>
				</div>
			)}
		</div>
	);
}
