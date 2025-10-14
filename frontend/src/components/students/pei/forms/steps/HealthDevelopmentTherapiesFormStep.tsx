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
import { MotorSkillsFormSection } from "../sections/MotorSkillsFormSection";
import { SensoryIssuesFormSection } from "../sections/SensoryIssuesFormSection";
import { TherapeuticHistoryFormSection } from "../sections/TherapeuticHistoryFormSection";

export function HealthDevelopmentTherapiesFormStep({ form }: FormSectionProps) {
	return (
		<Card className="h-full max-h-96 sm:max-h-[calc(100vh-20rem)] overflow-y-auto">
			<CardHeader className="flex items-center justify-between">
				<div>
					<CardTitle>
						Seção 4 - Desenvolvimento, Saúde e Terapias
					</CardTitle>
					<CardDescription>
						Informações fornecidas pelos pais ou responsáveis sobre
						o desenvolvimento e saúde do aluno.
					</CardDescription>
				</div>
				<PrintButton
					documentTitle="Formulário de Desenvolvimento, Saúde e Terapias"
					PrintableElement={
						HealthDevelopmentTherapiesFormStepPrintableForm
					}
				/>
			</CardHeader>
			<CardContent className="space-y-8">
				<MotorSkillsFormSection form={form} />
				<SensoryIssuesFormSection form={form} />
				<TherapeuticHistoryFormSection form={form} />
			</CardContent>
		</Card>
	);
}

const HealthDevelopmentTherapiesFormStepPrintableForm = generatePrintableForm({
	title: "Seção 4 - Desenvolvimento, Saúde e Terapias",
	subtitle:
		"Informações fornecidas pelos pais ou responsáveis sobre o desenvolvimento e saúde do aluno.",
	sections: [
		{
			title: "Habilidades Motoras",
			fields: [
				{
					id: "step4.areasMaiorNecessidade",
					label: "Áreas de maior necessidade:",
					type: "checkbox",
					options: [
						{
							value: "Coordenação motora fina (mãos, dedos)",
							label: "Coordenação motora fina (mãos, dedos)",
						},
						{
							value: "Coordenação motora grossa (corpo todo)",
							label: "Coordenação motora grossa (corpo todo)",
						},
						{
							value: "Equilíbrio e postura",
							label: "Equilíbrio e postura",
						},
						{ value: "Força muscular", label: "Força muscular" },
					],
				},
				{
					id: "step4.seguraLapis",
					label: "Como segura o lápis?",
					type: "radio",
					options: [
						{
							value: "nao-consegue",
							label: "Não consegue segurar",
						},
						{
							value: "com-dificuldade",
							label: "Com dificuldade",
						},
						{
							value: "segura-nao-escreve",
							label: "Segura, mas não escreve",
						},
						{ value: "adequadamente", label: "Adequadamente" },
						{
							value: "escreve-facilidade",
							label: "Escreve com facilidade",
						},
					],
				},
				{
					id: "step4.recortaTesoura",
					label: "Como recorta com a tesoura?",
					type: "radio",
					options: [
						{ value: "nao-consegue", label: "Não consegue usar" },
						{ value: "ajuda-total", label: "Com ajuda total" },
						{ value: "ajuda-parcial", label: "Com ajuda parcial" },
						{
							value: "linha-reta",
							label: "Recorta em linha reta",
						},
						{
							value: "formas-complexas",
							label: "Recorta formas complexas",
						},
					],
				},
			],
		},
		{
			title: "Questões Sensoriais e Comportamentais",
			fields: [
				{
					id: "step4.reacaoRuidos",
					label: "Reação a ruídos altos:",
					type: "radio",
					options: [
						{ value: "nao-incomoda", label: "Não se incomoda" },
						{
							value: "pouco-desconfortavel",
							label: "Pouco desconfortável",
						},
						{
							value: "muito-incomodado",
							label: "Muito incomodado",
						},
						{ value: "tapa-ouvidos", label: "Tapa os ouvidos" },
						{
							value: "crise-choro",
							label: "Entra em crise/chora",
						},
					],
				},
				{
					id: "step4.reacaoTexturas",
					label: "Reação a texturas:",
					type: "radio",
					options: [
						{
							value: "explora-normal",
							label: "Explora normally",
						},
						{
							value: "pouca-hesitacao",
							label: "Com pouca hesitação",
						},
						{
							value: "evita-certas",
							label: "Evita certas texturas",
						},
						{ value: "recusa-maioria", label: "Recusa a maioria" },
						{
							value: "nao-toca",
							label: "Não toca em nada novo",
						},
					],
				},
				{
					id: "step4.reacaoLuz",
					label: "Reação à luz forte:",
					type: "radio",
					options: [
						{ value: "nao-incomoda", label: "Não se incomoda" },
						{ value: "pisca-olhos", label: "Pisca os olhos" },
						{ value: "evita-luz", label: "Evita" },
						{ value: "fecha-olhos", label: "Fecha os olhos" },
						{ value: "agitado-luz", label: "Fica agitado" },
					],
				},
				{
					id: "step4.gostaContato",
					label: "Gosta de contato físico?",
					type: "radio",
					options: [
						{ value: "gosta-muito", label: "Gosta muito" },
						{
							value: "gosta-as-vezes",
							label: "Gosta às vezes",
						},
						{ value: "indiferente", label: "Indiferente" },
						{ value: "evita-contato", label: "Evita" },
						{
							value: "rejeita-completamente",
							label: "Rejeita completamente",
						},
					],
				},
				{
					id: "step4.reacaoBarulhosCasa",
					label: "Reação a barulhos em casa:",
					type: "radio",
					options: [
						{ value: "nao-incomoda", label: "Não se incomoda" },
						{
							value: "pouco-desconfortavel",
							label: "Pouco desconfortável",
						},
						{
							value: "muito-incomodado",
							label: "Muito incomodado",
						},
						{
							value: "outro-comodo",
							label: "Vai para outro cômodo",
						},
						{
							value: "crise-choro",
							label: "Entra em crise/chora",
						},
					],
				},
				{
					id: "step4.gostaBanho",
					label: "Como reage ao banho?",
					type: "radio",
					options: [
						{ value: "adora", label: "Adora" },
						{ value: "gosta", label: "Gosta" },
						{ value: "indiferente", label: "Indiferente" },
						{ value: "nao-gosta", label: "Não gosta" },
						{ value: "odeia", label: "Odeia" },
					],
				},
				{
					id: "step4.prefereRoupas",
					label: "Preferência por roupas:",
					type: "radio",
					options: [
						{
							value: "nao-preferencia",
							label: "Sem preferência",
						},
						{
							value: "macias-confortaveis",
							label: "Macias e confortáveis",
						},
						{
							value: "largas-folgadas",
							label: "Largas e folgadas",
						},
						{
							value: "justas-apertadas",
							label: "Justas e apertadas",
						},
						{
							value: "sempre-mesmas",
							label: "Sempre as mesmas peças",
						},
					],
				},
			],
		},
		{
			title: "Comunicação e Linguagem",
			fields: [
				{
					id: "step4.nomeiaObjetos",
					label: "Nomeia objetos e ações:",
					type: "radio",
					options: [
						{ value: "nao-nomeia", label: "Não nomeia" },
						{
							value: "alguns-familiares",
							label: "Alguns objetos familiares",
						},
						{
							value: "objetos-acoes-basicas",
							label: "Objetos e ações básicas",
						},
						{
							value: "vocabulario-amplo",
							label: "Vocabulário amplo",
						},
						{
							value: "descreve-detalhadamente",
							label: "Descreve detalhadamente",
						},
					],
				},
				{
					id: "step4.repetePalavras",
					label: "Repete palavras ou frases:",
					type: "radio",
					options: [
						{ value: "nao-repete", label: "Não repete" },
						{ value: "sons-simples", label: "Sons simples" },
						{
							value: "repete-palavras",
							label: "Repete palavras",
						},
						{ value: "repete-frases", label: "Repete frases" },
						{
							value: "ecoico-funcional",
							label: "Ecoico funcional",
						},
					],
				},
			],
		},
		{
			title: "Comportamento e Adaptabilidade",
			fields: [
				{
					id: "step4.aceitacaoMudancas",
					label: "Aceitação de mudanças:",
					type: "radio",
					options: [
						{ value: "muito-dificil", label: "Muito difícil" },
						{ value: "dificil", label: "Difícil" },
						{
							value: "aceita-apoio",
							label: "Aceita com apoio",
						},
						{ value: "adapta-bem", label: "Adapta-se bem" },
						{ value: "flexivel", label: "Muito flexível" },
					],
				},
				{
					id: "step4.comportamentoCrise",
					label: "Apresenta comportamento de crise?",
					type: "radio",
					options: [
						{ value: "sim", label: "Sim" },
						{ value: "nao", label: "Não" },
						{ value: "as-vezes", label: "Às vezes" },
					],
				},
				{
					id: "step4.comportamentosRepetitivos",
					label: "Comportamentos repetitivos:",
					type: "radio",
					options: [
						{
							value: "frequentes-intensos",
							label: "Frequentes e intensos",
						},
						{ value: "moderados", label: "Moderados" },
						{
							value: "ocasionalmente",
							label: "Ocasionalmente",
						},
						{ value: "raramente", label: "Raramente" },
						{ value: "nao-apresenta", label: "Não apresenta" },
					],
				},
			],
		},
		{
			title: "Socialização e Brincadeiras",
			fields: [
				{
					id: "step4.interesseBrincadeiras",
					label: "Interesse em brincadeiras:",
					type: "radio",
					options: [
						{
							value: "brinca-sozinho",
							label: "Brinca sozinho",
						},
						{
							value: "brinca-irmaos",
							label: "Brinca com irmãos",
						},
						{
							value: "evita-brincadeiras",
							label: "Evita brincadeiras",
						},
					],
				},
				{
					id: "step4.habilidadesSociaisCasa",
					label: "Habilidades sociais em casa:",
					type: "radio",
					options: [
						{ value: "nao-interage", label: "Não interage" },
						{
							value: "interage-familiares",
							label: "Interage com familiares",
						},
						{
							value: "demonstra-afeto",
							label: "Demonstra afeto",
						},
						{ value: "brinca-junto", label: "Brinca junto" },
						{
							value: "inicia-interacoes",
							label: "Inicia interações",
						},
					],
				},
				{
					id: "step4.conceitosBasicos",
					label: "Conceitos básicos que domina:",
					type: "checkbox",
					options: [
						{ value: "Cores", label: "Cores" },
						{ value: "Formas", label: "Formas" },
						{ value: "Números", label: "Números" },
						{ value: "Letras", label: "Letras" },
						{ value: "Grande/pequeno", label: "Grande/pequeno" },
						{ value: "Dentro/fora", label: "Dentro/fora" },
					],
				},
			],
		},
		{
			title: "Histórico Terapêutico",
			fields: [
				{
					id: "step4.terapias",
					label: "Quais terapias faz ou já fez?",
					type: "checkbox",
					options: [
						{ value: "Fonoaudiologia", label: "Fonoaudiologia" },
						{
							value: "Terapia Ocupacional",
							label: "Terapia Ocupacional",
						},
						{
							value: "Psicologia (ABA, TCC, etc.)",
							label: "Psicologia (ABA, TCC, etc.)",
						},
						{ value: "Fisioterapia", label: "Fisioterapia" },
						{
							value: "Psicomotricidade",
							label: "Psicomotricidade",
						},
						{ value: "Nenhuma", label: "Nenhuma" },
					],
				},
			],
		},
	],
});
