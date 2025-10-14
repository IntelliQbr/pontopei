import { PrintButton } from "@/components/shared/PrintButton";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { generatePrintableForm } from "@/utils/forms";
import { CreateWeeklyPlanFormProps } from "../create-weekly-plan-form.schema";

export function DetailsFormStep({ form }: CreateWeeklyPlanFormProps) {
	return (
		<Card className="h-full max-h-96 sm:max-h-[calc(100vh-20rem)] overflow-y-auto">
			<CardHeader className="flex items-center justify-between">
				<div>
					<CardTitle>Seção 2 - Detalhamento</CardTitle>
					<CardDescription>
						Detalhamento das atividades.
					</CardDescription>
				</div>
				<PrintButton
					documentTitle="Formulário de Desenvolvimento, Saúde e Terapias"
					PrintableElement={DetailsFormStepPrintableForm}
				/>
			</CardHeader>
			<CardContent className="space-y-8">
				<FormField
					control={form.control}
					name="step2.recursosDisponiveis"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>
								Recursos Disponíveis para a Semana
							</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Digite os recursos disponíveis para a semana"
								/>
							</FormControl>
							<FormDescription>
								Liste os materiais, ferramentas ou ambientes que
								estarão disponíveis para o aluno e a professora
								durante a semana.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="step2.feedbackPassado"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>
								Feedback da Semana Passada
							</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Digite o feedback da semana passada"
								/>
							</FormControl>
							<FormDescription>
								Compartilhe o feedback da semana passada,
								incluindo sugestões de melhorias, elogios ou
								observações.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="step2.observacoes"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Observações (Opcional)</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Digite suas observações"
								/>
							</FormControl>
							<FormDescription>
								Compartilhe suas observações.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}

const DetailsFormStepPrintableForm = generatePrintableForm({
	title: "Seção 2 - Detalhamento",
	subtitle: "Detalhamento das atividades.",
	sections: [
		{
			title: "Detalhes da Semana",
			fields: [
				{
					id: "recursosDisponiveis",
					label: "Recursos Disponíveis para a Semana",
					type: "textarea",
					required: true,
					width: "full",
				},
				{
					id: "feedbackPassado",
					label: "Feedback da Semana Passada",
					type: "textarea",
					required: true,
					width: "full",
				},
				{
					id: "observacoes",
					label: "Observações (Opcional)",
					type: "textarea",
					required: false,
					width: "full",
				},
			],
		},
	],
});
