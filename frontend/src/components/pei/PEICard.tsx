"use client";

import { AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { peiStatusColors, peiStatusLabels } from "@/data/pei.data";
import { PEI } from "@/models/interfaces/pei/pei.interface";
import { Student } from "@/models/interfaces/student/student.intertface";
import { generatePrintableDocument } from "@/utils/cards";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { BrainIcon, ChevronDownIcon, MailIcon } from "lucide-react";
import { CopyButton } from "../shared/CopyButton";
import { PrintButton } from "../shared/PrintButton";
import { ViewStudentAndPEIDialog } from "../students/pei/ViewStudentAndPEIDialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function PEICard({ pei, student }: { pei: PEI; student: Student }) {
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
					<div className="flex gap-2 self-stretch">
						<PrintButton
							documentTitle={`PEI v${pei.version}`}
							PrintableElement={PEICardPrintable(pei, student)}
						/>
						<Button
							size="sm"
							variant="outline"
							onClick={() =>
								handleEmail(pei.content, `PEI v${pei.version}`)
							}
							className="bg-transparent"
						>
							<MailIcon className="h-4 w-4" />
						</Button>
						<CopyButton textToCopy={pei.content} />
						<ViewStudentAndPEIDialog pei={pei} />
					</div>
				</div>
				<div className="flex flex-col sm:flex-row justify-between items-start">
					<AccordionTrigger className="cursor-pointer">
						<ChevronDownIcon className="h-full bg-primary text-background rounded p-1" />
						<div className="flex flex-col gap-2">
							<CardTitle className="flex items-center gap-2">
								PEI v{pei.version}
								<Badge className={peiStatusColors[pei.status]}>
									{peiStatusLabels[pei.status]}
								</Badge>
								{pei.isRenewal && (
									<Badge
										variant="outline"
										className="bg-blue-50 text-blue-700 border-blue-200"
									>
										Renovação
									</Badge>
								)}
							</CardTitle>
							<p className="sm:text-sm text-xs text-gray-500">
								Período:{" "}
								{new Date(pei.startDate).toLocaleDateString()} -{" "}
								{new Date(pei.endDate).toLocaleDateString()}
							</p>
							<p className="text-xs text-gray-400">
								Criado em:{" "}
								{new Date(pei.createdAt).toLocaleDateString()}
							</p>
						</div>
					</AccordionTrigger>
				</div>
			</CardHeader>
			<AccordionContent>
				<CardContent>
					<div className="max-h-96 overflow-y-auto">
						<MarkdownPreview
							source={`${pei.content}\n\n${disclaimer}\n\n${footer}`}
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

const PEICardPrintable = (pei: PEI, student: Student) =>
	generatePrintableDocument({
		header: {
			title: `PEI v${pei.version}`,
			leftInfo: [{ label: "Aluno", value: student.fullName }],
			rightInfo: [
				{
					label: "Período",
					value: `${new Date(
						pei.startDate
					).toLocaleDateString()} - ${new Date(
						pei.endDate
					).toLocaleDateString()}`,
				},
			],
		},
		content: `${pei.content}\n\n${disclaimer}`,
		metadata: {
			createdAt: new Date(pei.createdAt),
			generatedBy: "IA",
			documentType: "PEI",
		},
	});

const disclaimer = `<small style="font-size: 10px; color: #666; text-align: center; font-style: italic;">CONFORMIDADE LEGAL<br>Este Plano de Ensino Individualizado (PEI) foi elaborado em conformidade com a Lei Brasileira de Inclusão (Lei 13.146/2015), Lei de Diretrizes e Bases da Educação Nacional (LDB - Lei 9.394/1996), Base Nacional Comum Curricular (BNCC), Decreto Federal 10.502/2020 da Política Nacional de Educação Especial, e demais legislações vigentes que asseguram o direito à educação inclusiva. O documento garante adaptações curriculares individualizadas, respeita as especificidades do estudante e promove seu desenvolvimento integral, sendo revisado periodicamente conforme determinação legal</small>`;
const footer = `<span style="font-size: 10px; color: #666; text-align: center; font-style: italic;">Criado e elaborado por:www.pontopei.com.br</span>`;
