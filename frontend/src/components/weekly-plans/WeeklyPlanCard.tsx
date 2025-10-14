"use client";

import { Student } from "@/models/interfaces/student/student.intertface";
import { WeeklyPlan } from "@/models/interfaces/weekly-plan/weekly-plan.interface";
import { generatePrintableDocument } from "@/utils/cards";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { BrainIcon, ChevronDownIcon, MailIcon } from "lucide-react";
import { CopyButton } from "../shared/CopyButton";
import { PrintButton } from "../shared/PrintButton";
import { AccordionContent, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ViewCreateWeeklyPlanFormDialog } from "./ViewWeeklyPlanFormDialog";

interface WeeklyPlanCardProps {
	weeklyPlan: WeeklyPlan;
	student: Student;
}

export function WeeklyPlanCard({ weeklyPlan, student }: WeeklyPlanCardProps) {
	const handleEmail = (content: string, title: string) => {
		const subject = encodeURIComponent(`${title} - ${student?.fullName}`);
		const body = encodeURIComponent(
			`${title}\n\nAluno: ${
				student?.fullName
			}\nData: ${new Date().toLocaleDateString()}\n\n${content}`
		);
		window.open(`mailto:?subject=${subject}&body=${body}`);
	};

	return (
		<Card className="shadow-md border border-primary/20">
			<CardHeader className="w-full">
				<div className="flex justify-between items-center flex-wrap gap-5">
					<Badge
						variant="outline"
						className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
					>
						<BrainIcon className="h-3 w-3 mr-1" />
						Gerado por IA
					</Badge>
					<div className="flex gap-2">
						<PrintButton
							PrintableElement={WeeklyPlanCardPrintable(
								weeklyPlan,
								student
							)}
							documentTitle="Plano Semanal"
						/>
						<Button
							size="sm"
							variant="outline"
							onClick={() =>
								handleEmail(weeklyPlan.content, `Plano Semanal`)
							}
							className="bg-transparent"
						>
							<MailIcon className="h-4 w-4" />
						</Button>
						<CopyButton textToCopy={weeklyPlan.content} />
						<ViewCreateWeeklyPlanFormDialog
							weeklyPlan={weeklyPlan}
						/>
					</div>
				</div>
				<div className="flex justify-between items-start">
					<AccordionTrigger className="cursor-pointer">
						<ChevronDownIcon className="h-full bg-primary text-background rounded p-1" />
						<div className="space-y-2">
							<Badge>
								{new Date(
									weeklyPlan.weekStart
								).toLocaleDateString()}{" "}
								-{" "}
								{new Date(
									weeklyPlan.weekEnd
								).toLocaleDateString()}
							</Badge>
							<CardTitle className="flex items-center gap-2">
								Plano Semanal
							</CardTitle>
							<p className="text-xs text-gray-400">
								Criado em:{" "}
								{new Date(
									weeklyPlan.createdAt
								).toLocaleDateString()}
							</p>
						</div>
					</AccordionTrigger>
				</div>
			</CardHeader>
			<AccordionContent>
				<CardContent>
					<div className="max-h-96 overflow-y-auto">
						<MarkdownPreview
							source={weeklyPlan.content}
							style={{
								fontSize: "12px",
								backgroundColor: "#f9fafb",
								color: "var(--foreground)",
								padding: "1.5rem",
								borderRadius: "0.5rem",
							}}
						/>
					</div>
				</CardContent>
			</AccordionContent>
		</Card>
	);
}

const WeeklyPlanCardPrintable = (weeklyPlan: WeeklyPlan, student: Student) =>
	generatePrintableDocument({
		header: {
			title: "Plano Semanal",
			leftInfo: [{ label: "Aluno", value: student.fullName }],
			rightInfo: [
				{
					label: "Período",
					value: `${new Date(
						weeklyPlan.weekStart
					).toLocaleDateString()} - ${new Date(
						weeklyPlan.weekEnd
					).toLocaleDateString()}`,
				},
			],
		},
		content: weeklyPlan.content,
		metadata: {
			createdAt: new Date(weeklyPlan.createdAt),
			generatedBy: "IA",
			documentType: "Plano Educacional",
		},
		footer: {
			leftText:
				"Este plano foi gerado automaticamente e deve ser revisado pelo professor responsável.",
			showPageNumber: true,
			disclaimer:
				"Documento gerado por sistema automatizado: www.pontopei.com.br",
		},
	});
