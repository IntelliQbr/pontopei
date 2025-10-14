"use client";

import { PrintButton } from "@/components/shared/PrintButton";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { generatePrintableForm } from "@/utils/forms";
import type { FormSectionProps } from "../create-student-and-pei-form.schema";
import { LearningPreferencesFormSection } from "../sections/LearningPreferencesFormSection";
import { TechnologyComunicationFormSection } from "../sections/TechnologyComunicationFormSection";
import { TriggersCrisesFormSection } from "../sections/TriggersCrisesFormSection";

export function PreferencesStrategiesFormStep({ form }: FormSectionProps) {
	return (
		<Card className="h-full max-h-96 sm:max-h-[calc(100vh-20rem)] overflow-y-auto">
			<CardHeader className="flex items-center justify-between">
				<div>
					<CardTitle>Seção 5 - Preferências e Estratégias</CardTitle>
					<CardDescription>
						Informações fornecidas pelos pais ou responsáveis sobre
						preferências de aprendizagem e estratégias para o aluno.
					</CardDescription>
				</div>
				<PrintButton
					documentTitle="Formulário de Preferências e Estratégias"
					PrintableElement={
						PreferencesStrategiesFormStepPrintableForm
					}
				/>
			</CardHeader>
			<CardContent className="space-y-8">
				<TechnologyComunicationFormSection form={form} />
				<LearningPreferencesFormSection form={form} />
				<TriggersCrisesFormSection form={form} />
			</CardContent>
		</Card>
	);
}

const PreferencesStrategiesFormStepPrintableForm = generatePrintableForm({
	title: "Seção 5 - Preferências e Estratégias",
	subtitle:
		"Informações fornecidas pelos pais ou responsáveis sobre preferências de aprendizagem e estratégias para o aluno.",
	sections: [
		{
			title: "Tecnologia e Comunicação Alternativa",
			fields: [
				{
					id: "step5.usaTecnologia",
					label: "Uso de tecnologia (tablet, etc.):",
					type: "radio",
					options: [
						{ value: "nao-usa", label: "Não utiliza" },
						{ value: "muita-ajuda", label: "Com muita ajuda" },
						{ value: "pouca-ajuda", label: "Com pouca ajuda" },
						{
							value: "usa-sozinho",
							label: "Usa sozinho para o básico",
						},
						{
							value: "melhor-colegas",
							label: "Usa melhor que os colegas",
						},
					],
				},
				{
					id: "step5.usaSimbolos",
					label: "Uso de símbolos/comunicação alternativa:",
					type: "radio",
					options: [
						{ value: "nao-usa", label: "Não utiliza" },
						{
							value: "poucos-simbolos",
							label: "Aponta/usa poucos símbolos",
						},
						{
							value: "varios-simbolos",
							label: "Usa vários símbolos",
						},
						{
							value: "combina-simbolos",
							label: "Combina 2-3 símbolos",
						},
						{
							value: "cria-combinacoes",
							label: "Cria novas combinações",
						},
					],
				},
				{
					id: "step5.aplicativosRecursos",
					label: "Aplicativos ou recursos que mais gosta:",
					type: "textarea",
				},
				{
					id: "step5.estrategiasAcalmar",
					label: "Estratégias que ajudam a acalmar:",
					type: "textarea",
				},
			],
		},
		{
			title: "Uso de Tecnologia em Casa",
			fields: [
				{
					id: "step5.usaDispositivosCasa",
					label: "Dispositivos que usa em casa:",
					type: "checkbox",
					options: [
						{ value: "Tablet", label: "Tablet" },
						{ value: "Smartphone", label: "Smartphone" },
						{ value: "Computador", label: "Computador" },
						{ value: "TV/Smart TV", label: "TV/Smart TV" },
						{
							value: "Console de jogos",
							label: "Console de jogos",
						},
						{
							value: "Assistente de voz",
							label: "Assistente de voz",
						},
					],
				},
				{
					id: "step5.tempoEletronicos",
					label: "Tempo diário usando dispositivos eletrônicos:",
					type: "radio",
					options: [
						{ value: "nao-usa", label: "Não usa" },
						{ value: "menos-1h", label: "Menos de 1 hora" },
						{ value: "1-2h", label: "1-2 horas" },
						{ value: "3-4h", label: "3-4 horas" },
						{ value: "mais-4h", label: "Mais de 4 horas" },
					],
				},
				{
					id: "step5.aplicativosPreferidos",
					label: "Aplicativos preferidos em casa:",
					type: "textarea",
				},
			],
		},
		{
			title: "Preferências de Aprendizagem",
			fields: [
				{
					id: "step5.comoAprendeMelhor",
					label: "Como aprende melhor?",
					type: "checkbox",
					options: [
						{
							value: "Visual (imagens, vídeos)",
							label: "Visual (imagens, vídeos)",
						},
						{
							value: "Auditivo (músicas, histórias)",
							label: "Auditivo (músicas, histórias)",
						},
						{
							value: "Tátil (pegando objetos)",
							label: "Tátil (pegando objetos)",
						},
						{
							value: "Movimento (atividades práticas)",
							label: "Movimento (atividades práticas)",
						},
					],
				},
				{
					id: "step5.materiaisInteresse",
					label: "Materiais/brinquedos de maior interesse:",
					type: "textarea",
				},
			],
		},
		{
			title: "Gatilhos e Crises",
			fields: [
				{
					id: "step5.situacoesCrises",
					label: "Situações que costumam gerar crises:",
					type: "checkbox",
					options: [
						{
							value: "Mudança de rotina",
							label: "Mudança de rotina",
						},
						{ value: "Barulhos altos", label: "Barulhos altos" },
						{ value: "Multidões", label: "Multidões" },
						{ value: "Frustração", label: "Frustração" },
						{
							value: "Não ser compreendido",
							label: "Não ser compreendido",
						},
					],
				},
				{
					id: "step5.sinaisAntecedem",
					label: "Sinais que antecedem as crises:",
					type: "textarea",
				},
				{
					id: "step5.estrategiasAcalmarCasa",
					label: "Estratégias que ajudam a acalmar em casa:",
					type: "textarea",
				},
			],
		},
	],
});
