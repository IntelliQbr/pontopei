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
import { DevelopmentExpectationsFormSection } from "../sections/DevelopmentExpectationsFormSection";
import { FamiliarContextFormSection } from "../sections/FamiliarContextFormSection";
import { FamiliarTargetFormSection } from "../sections/FamiliarTargetFormSection";
import { PraticalSkillsFormSection } from "../sections/PraticalSkillsFormSection";
import { RoutineBehaviorFormSection } from "../sections/RoutineBehaviorFormSection";

export function FamiliarInformationsFormStep({ form }: FormSectionProps) {
	return (
		<Card className="h-full max-h-96 sm:max-h-[calc(100vh-20rem)] overflow-y-auto">
			<CardHeader className="flex items-center justify-between">
				<div>
					<CardTitle>Seção 3 - Pais/Responsáveis</CardTitle>
					<CardDescription>
						Informações sobre rotina e comportamento em casa
					</CardDescription>
				</div>
				<PrintButton
					documentTitle="Formulário de Pais/Responsáveis"
					PrintableElement={FamiliarInformationsFormStepPrintableForm}
				/>
			</CardHeader>
			<CardContent className="space-y-8">
				<RoutineBehaviorFormSection form={form} />
				<PraticalSkillsFormSection form={form} />
				<FamiliarContextFormSection form={form} />
				<DevelopmentExpectationsFormSection form={form} />
				<FamiliarTargetFormSection form={form} />
			</CardContent>
		</Card>
	);
}

export const FamiliarInformationsFormStepPrintableForm = generatePrintableForm({
	title: "Seção 3 - Pais/Responsáveis",
	subtitle: "Informações sobre rotina e comportamento em casa",
	sections: [
		{
			title: "Rotina e Comportamento em Casa",
			fields: [
				{
					id: "step3.rotinaEstruturada",
					label: "Rotina estruturada?",
					type: "radio",
					options: [
						{ value: "sim", label: "Sim" },
						{ value: "nao", label: "Não" },
						{ value: "parcial", label: "Parcial" },
					],
				},
				{
					id: "step3.segueComandosCasa",
					label: "Segue comandos em casa?",
					type: "radio",
					options: [
						{ value: "sim", label: "Sim" },
						{ value: "nao", label: "Não" },
						{
							value: "apoio-visual",
							label: "Só com apoio visual/repetição",
						},
					],
				},
				{
					id: "step3.nivelIndependencia",
					label: "Nível de independência:",
					type: "radio",
					options: [
						{
							value: "totalmente-dependente",
							label: "Totalmente dependente",
						},
						{ value: "muito-apoio", label: "Muito apoio" },
						{
							value: "parcialmente-independente",
							label: "Parcialmente independente",
						},
						{
							value: "independente-maioria",
							label: "Independente maioria das tarefas",
						},
						{
							value: "totalmente-independente",
							label: "Totalmente independente",
						},
					],
				},
				{
					id: "step3.comunicacaoCasa",
					label: "Comunicação em casa:",
					type: "textarea",
				},
			],
		},
		{
			title: "Habilidades Práticas",
			fields: [
				{
					id: "step3.comerSozinho",
					label: "Consegue comer sozinho?",
					type: "radio",
					options: [
						{ value: "nao-consegue", label: "Não consegue" },
						{
							value: "ajuda-total",
							label: "Come com ajuda total",
						},
						{
							value: "ajuda-parcial",
							label: "Come com ajuda parcial",
						},
						{
							value: "sozinho-bagunca",
							label: "Come sozinho bagunçando",
						},
						{
							value: "sozinho-organizado",
							label: "Come sozinho organizadamente",
						},
					],
				},
				{
					id: "step3.vestirSozinho",
					label: "Consegue se vestir sozinho?",
					type: "radio",
					options: [
						{ value: "nao-consegue", label: "Não consegue" },
						{
							value: "ajuda-total",
							label: "Veste com ajuda total",
						},
						{
							value: "ajuda-parcial",
							label: "Veste com ajuda parcial",
						},
						{
							value: "pecas-simples",
							label: "Veste sozinho peças simples",
						},
						{
							value: "roupas-complexas",
							label: "Veste sozinho roupas complexas",
						},
					],
				},
				{
					id: "step3.usaBanheiroSozinho",
					label: "Usa o banheiro sozinho?",
					type: "radio",
					options: [
						{ value: "usa-fraldas", label: "Usa fraldas" },
						{ value: "ajuda", label: "Vai ao banheiro com ajuda" },
						{
							value: "precisa-lembrar",
							label: "Vai sozinho mas precisa lembrar",
						},
						{
							value: "sozinho-sempre",
							label: "Vai sozinho sempre",
						},
						{
							value: "totalmente-independente",
							label: "Totalmente independente",
						},
					],
				},
				{
					id: "step3.dificuldadeAlimentar",
					label: "Dificuldade alimentar?",
					type: "radio",
					options: [
						{ value: "sim", label: "Sim" },
						{ value: "nao", label: "Não" },
						{ value: "avaliacao", label: "Em avaliação" },
					],
				},
			],
		},
		{
			title: "Contexto Familiar",
			fields: [
				{
					id: "step3.quantasPessoas",
					label: "Quantas pessoas moram na casa?",
					type: "text",
				},
				{
					id: "step3.temIrmaos",
					label: "Tem irmãos?",
					type: "radio",
					options: [
						{ value: "nao-tem", label: "Não tem irmãos" },
						{ value: "1-irmao", label: "Tem 1 irmão" },
						{ value: "2-irmaos", label: "Tem 2 irmãos" },
						{ value: "3-ou-mais", label: "Tem 3 ou mais irmãos" },
					],
				},
				{
					id: "step3.ajudaAtividades",
					label: "Quem ajuda com as atividades escolares? (marcar mais de uma)",
					type: "checkbox",
					options: [
						{ value: "Pai", label: "Pai" },
						{ value: "Mãe", label: "Mãe" },
						{ value: "Avós", label: "Avós" },
						{ value: "Irmãos", label: "Irmãos" },
						{
							value: "Outros familiares",
							label: "Outros familiares",
						},
						{
							value: "Ninguém pode ajudar",
							label: "Ninguém pode ajudar",
						},
					],
				},
				{
					id: "step3.tempoAtividadesEspeciais",
					label: "Família tem tempo para fazer atividades especiais?",
					type: "radio",
					options: [
						{
							value: "bastante-tempo",
							label: "Sim, bastante tempo",
						},
						{ value: "pouco-tempo", label: "Sim, um pouco" },
						{
							value: "fins-semana",
							label: "Só nos fins de semana",
						},
						{
							value: "quase-nao-tem",
							label: "Quase não tem tempo",
						},
						{ value: "nao-tem-tempo", label: "Não tem tempo" },
					],
				},
				{
					id: "step3.comprarMateriais",
					label: "A familia consgue comprar materiais para o aluno?",
					type: "radio",
					options: [
						{
							value: "sem-dificuldade",
							label: "Sem dificuldade",
						},
						{ value: "pouco-esforco", label: "Pouco esforço" },
						{ value: "depende-valor", label: "Depende do valor" },
						{ value: "so-baratos", label: "Só baratos" },
						{ value: "nao-consegue", label: "Não consegue" },
					],
				},
			],
		},
		{
			title: "Desenvolvimento e Expectativas",
			fields: [
				{
					id: "step3.maisGostaFazer",
					label: "O que mais gosta de fazer?",
					type: "textarea",
				},
				{
					id: "step3.acompanhamentoTerapeutico",
					label: "Acompanhamento terapêutico?",
					type: "radio",
					options: [
						{ value: "sim", label: "Sim" },
						{ value: "nao", label: "Não" },
						{ value: "avaliacao", label: "Em avaliação" },
					],
				},
				{
					id: "step3.expectativasAno",
					label: "Expectativas para o ano:",
					type: "textarea",
				},
				{
					id: "step3.habilidadesPriorizar",
					label: "Habilidades para priorizar: (marcar mais de uma)",
					type: "checkbox",
					options: [
						{
							value: "Comunicação/fala",
							label: "Comunicação/fala",
						},
						{
							value: "Habilidades sociais",
							label: "Habilidades sociais",
						},
						{ value: "Independência", label: "Independência" },
						{
							value: "Habilidades acadêmicas",
							label: "Habilidades acadêmicas",
						},
						{
							value: "Regulação emocional",
							label: "Regulação emocional",
						},
						{
							value: "Habilidades motoras",
							label: "Habilidades motoras",
						},
					],
				},
				{
					id: "step3.progressoAnterior",
					label: "Progresso comparado ao ano anterior:",
					type: "radio",
					options: [
						{ value: "regrediu", label: "Regrediu" },
						{ value: "sem-mudancas", label: "Sem mudanças" },
						{
							value: "progresso-lento",
							label: "Progresso lento",
						},
						{
							value: "progresso-significativo",
							label: "Progresso significativo",
						},
						{
							value: "progresso-excepcional",
							label: "Progresso excepcional",
						},
					],
				},
				{
					id: "step3.maiorDesejoEscolar",
					label: "Maior desejo para o desenvolvimento escolar:",
					type: "textarea",
				},
			],
		},
		{
			title: "Metas Familiares",
			fields: [
				{
					id: "step3.metaFamilia",
					label: "Principal meta da família para os próximos 3 meses:",
					type: "textarea",
				},
				{
					id: "step3.comoFamiliaAjudar",
					label: "Como a família pode ajudar em casa?",
					type: "textarea",
				},
				{
					id: "step3.maiorDificuldadeFamilia",
					label: "Maior dificuldade da família:",
					type: "textarea",
				},
				{
					id: "step3.autorizaUso",
					label: "Autoriza uso para fins pedagógicos?",
					type: "radio",
					options: [
						{ value: "sim", label: "Sim" },
						{ value: "nao", label: "Não" },
					],
				},
			],
		},
	],
});
