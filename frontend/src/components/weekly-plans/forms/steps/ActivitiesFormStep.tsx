import { PrintButton } from "@/components/shared/PrintButton";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { generatePrintableForm } from "@/utils/forms";
import { CreateWeeklyPlanFormProps } from "../create-weekly-plan-form.schema";
import { WeekActivitiesFormSection } from "../sections/WeekActivitiesFormSection";
import { WeekDateFormSection } from "../sections/WeekDateFormSection";

export function ActivitiesFormStep({ form }: CreateWeeklyPlanFormProps) {
	return (
		<Card className="h-full max-h-96 sm:max-h-[calc(100vh-20rem)] overflow-y-auto">
			<CardHeader className="flex items-center justify-between">
				<div>
					<CardTitle>Seção 1 - Atividades</CardTitle>
					<CardDescription>Atividades da semana</CardDescription>
				</div>
				<PrintButton
					documentTitle="Formulário de Desenvolvimento, Saúde e Terapias"
					PrintableElement={ActivitiesFormsStepPrintableForm}
				/>
			</CardHeader>
			<CardContent className="space-y-8">
				<WeekDateFormSection form={form} />
				<WeekActivitiesFormSection form={form} />
			</CardContent>
		</Card>
	);
}

const ActivitiesFormsStepPrintableForm = generatePrintableForm({
	title: "Seção 1 - Atividades",
	subtitle: "Atividades da semana",
	sections: [
		{
			title: "Datas da Semana",
			fields: [
				{
					id: "weekStart",
					label: "Início da Semana",
					type: "text",
					required: true,
					width: "half",
				},
				{
					id: "weekEnd",
					label: "Fim da Semana",
					type: "text",
					required: true,
					width: "half",
				},
			],
		},
		{
			title: "Atividades da Semana",
			fields: [
				{
					id: "mondayActivity",
					label: "Segunda-feira",
					type: "textarea",
					required: true,
					width: "full",
				},
				{
					id: "tuesdayActivity",
					label: "Terça-feira",
					type: "textarea",
					required: true,
					width: "full",
				},
				{
					id: "wednesdayActivity",
					label: "Quarta-feira",
					type: "textarea",
					required: true,
					width: "full",
				},
				{
					id: "thursdayActivity",
					label: "Quinta-feira",
					type: "textarea",
					required: true,
					width: "full",
				},
				{
					id: "fridayActivity",
					label: "Sexta-feira",
					type: "textarea",
					required: true,
					width: "full",
				},
			],
		},
	],
});
