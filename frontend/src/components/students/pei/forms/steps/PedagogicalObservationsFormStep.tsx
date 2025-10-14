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
import { AcademicSkillsFormSection } from "../sections/AcademicSkillsFormSection";
import { ComunicationFormSection } from "../sections/ComunicationFormSection";
import { InteractionBehaviorFormSection } from "../sections/InteractionBehaviorFormSection";
import { SchoolEnvironmentFormSection } from "../sections/SchoolEnvironmentFormSection";
import { TargetAdaptationsFormSection } from "../sections/TargetAdaptationsFormSection";

export function PedagogicalObservationsFormStep({ form }: FormSectionProps) {
	return (
		<Card className="h-full max-h-96 sm:max-h-[calc(100vh-20rem)] overflow-y-auto">
			<CardHeader className="flex items-center justify-between">
				<div>
					<CardTitle>Seção 2 - Observações Pedagógicas</CardTitle>
					<CardDescription>
						Avaliação do professor sobre o aluno
					</CardDescription>
				</div>
				<PrintButton
					documentTitle="Formulário de Observações Pedagógicas"
					PrintableElement={
						PedagogicalObservationsFormStepPrintableForm
					}
				/>
			</CardHeader>
			<CardContent className="space-y-8">
				<ComunicationFormSection form={form} />
				<InteractionBehaviorFormSection form={form} />
				<AcademicSkillsFormSection form={form} />
				<TargetAdaptationsFormSection form={form} />
				<SchoolEnvironmentFormSection form={form} />
			</CardContent>
		</Card>
	);
}

const PedagogicalObservationsFormStepPrintableForm = generatePrintableForm({
	title: "Seção 2 - Observações Pedagógicas",
	subtitle: "Avaliação do professor sobre o aluno",
	sections: [
		{
			title: "Compreensão e Comunicação",
			fields: [
				{
					id: "step2.compreendeComandosSimples",
					type: "radio",
					options: [
						{ value: "sim", label: "Sim" },
						{ value: "nao", label: "Não" },
						{ value: "parcialmente", label: "Parcialmente" },
					],
					label: "O aluno compreende comandos simples?",
				},
				{
					id: "step2.compreendeComandosComplexos",
					type: "radio",
					options: [
						{ value: "sim", label: "Sim" },
						{ value: "nao", label: "Não" },
						{ value: "parcialmente", label: "Parcialmente" },
					],
					label: "O aluno compreende comandos complexos?",
				},
				{
					id: "step2.comunicacaoSala",
					type: "textarea",
					label: "Como você descreveria a comunicação do aluno em sala?",
				},
				{
					id: "step2.nivelComunicacaoVerbal",
					type: "radio",
					options: [
						{ value: "nao-verbal", label: "Não verbal" },
						{
							value: "palavras-isoladas",
							label: "Palavras isoladas",
						},
						{
							value: "frases-2-3",
							label: "Frases de 2-3 palavras",
						},
						{
							value: "conversacao-simples",
							label: "Conversação simples",
						},
						{
							value: "conversacao-complexa",
							label: "Conversação complexa",
						},
					],
					label: "Qual o nível de comunicação verbal?",
				},
				{
					id: "step2.fazPedidos",
					type: "radio",
					options: [
						{ value: "nao-faz", label: "Não faz pedidos" },
						{
							value: "gestos-choro",
							label: "Apenas por gestos/choro",
						},
						{
							value: "palavras-ocasionais",
							label: "Palavras/símbolos ocasionais",
						},
						{
							value: "pedidos-consistentes",
							label: "Pedidos consistentes",
						},
						{
							value: "pedidos-elaborados",
							label: "Pedidos elaborados",
						},
					],
					label: "A criança consegue fazer pedidos?",
				},
			],
		},
		{
			title: "Interação e Comportamento",
			fields: [
				{
					id: "step2.interagecom",
					type: "checkbox",
					options: [
						{ value: "Colegas", label: "Colegas" },
						{ value: "Adultos", label: "Adultos" },
						{
							value: "Evita interações",
							label: "Evita interações",
						},
						{
							value: "Interage apenas quando solicitado",
							label: "Interage apenas quando solicitado",
						},
					],
					label: "O aluno interage com: (marcar mais de uma)",
				},
				{
					id: "step2.comportamentosFuga",
					type: "textarea",
					label: "Há comportamentos de fuga, autoestimulação ou agitação?",
				},
				{
					id: "step2.barreirasAprendizagem",
					type: "checkbox",
					options: [
						{
							value: "Autoestimulação excessiva",
							label: "Autoestimulação excessiva",
						},
						{
							value: "Resistência a mudanças",
							label: "Resistência a mudanças",
						},
						{
							value: "Dificuldade de atenção",
							label: "Dificuldade de atenção",
						},
						{
							value: "Comportamentos disruptivos",
							label: "Comportamentos disruptivos",
						},
						{
							value: "Dependência de rotinas rígidas",
							label: "Dependência de rotinas rígidas",
						},
						{
							value: "Seletividade de estímulos",
							label: "Seletividade de estímulos",
						},
						{
							value: "Nenhuma barreira significativa",
							label: "Nenhuma barreira significativa",
						},
					],
					label: "Quais barreiras de aprendizagem você identifica? (marcar mais de uma)",
				},
			],
		},
		{
			title: "Habilidades Acadêmicas",
			fields: [
				{
					id: "step2.conteudosFacilidade",
					type: "textarea",
					label: "Conteúdos que acompanha com mais facilidade:",
				},
				{
					id: "step2.areasDificuldade",
					type: "textarea",
					label: "Áreas com maior dificuldade:",
				},
				{
					id: "step2.avaliacaoHabilidades",
					type: "radio",
					options: [
						{
							value: "pre-academicas",
							label: "Pré-acadêmicas (cores, formas)",
						},
						{
							value: "reconhecimento-letras",
							label: "Reconhecimento de letras/números",
						},
						{
							value: "leitura-escrita",
							label: "Leitura/escrita inicial",
						},
						{
							value: "habilidades-serie",
							label: "Habilidades de série",
						},
						{
							value: "acima-expectativa",
							label: "Acima da expectativa",
						},
					],
					label: "Avaliação de habilidades acadêmicas emergentes:",
				},
				{
					id: "step2.habilidadeDestaque",
					type: "textarea",
					label: "Habilidade/interesse que se destaca:",
				},
			],
		},
		{
			title: "Adaptações e Metas",
			fields: [
				{
					id: "step2.principaisDesafios",
					type: "textarea",
					label: "Principais Desafios Observados (2-3 maiores desafios):",
				},
				{
					id: "step2.estrategiasFuncionam",
					type: "textarea",
					label: "Estratégias e Adaptações que JÁ Funcionam:",
				},
				{
					id: "step2.prioridade1",
					type: "text",
					label: "Prioridade 1:",
				},
				{
					id: "step2.prioridade1Expectativa",
					type: "textarea",
					label: "O que se espera alcançar:",
				},
				{
					id: "step2.prioridade2",
					type: "text",
					label: "Prioridade 2:",
				},
				{
					id: "step2.prioridade2Expectativa",
					type: "textarea",
					label: "O que se espera alcançar:",
				},
				{
					id: "step2.prioridade3",
					type: "text",
					label: "Prioridade 3:",
				},
				{
					id: "step2.prioridade3Expectativa",
					type: "textarea",
					label: "O que se espera alcançar:",
				},
				{
					id: "step2.nivelApoio",
					type: "radio",
					options: [
						{
							value: "minimo",
							label: "Apoio Mínimo: Aluno participa da maioria das atividades com pequenas adaptações",
						},
						{
							value: "moderado",
							label: "Apoio Moderado: Aluno precisa de apoio frequente com adaptações significativas",
						},
						{
							value: "extenso",
							label: "Apoio Extenso: Aluno necessita de apoio individualizado e contínuo",
						},
					],
					label: "Nível de Apoio Necessário:",
				},
			],
		},
		{
			title: "Ambiente Escolar",
			fields: [
				{
					id: "step2.movimentacaoSala",
					type: "radio",
					options: [
						{
							value: "sempre-sentado",
							label: "Permanece sempre sentado",
						},
						{
							value: "levanta-dificuldade",
							label: "Levanta-se com dificuldade",
						},
						{
							value: "caminha-normal",
							label: "Caminha normally",
						},
						{ value: "corre-sala", label: "Corre pela sala" },
						{
							value: "movimenta-cuidado",
							label: "Movimenta-se com cuidado",
						},
					],
					label: "Como é a movimentação do aluno na sala de aula?",
				},
				{
					id: "step2.educacaoFisica",
					type: "radio",
					options: [
						{ value: "nao-participa", label: "Não participa" },
						{
							value: "participa-ajuda",
							label: "Participa com ajuda",
						},
						{
							value: "algumas-atividades",
							label: "Participa de algumas atividades",
						},
						{
							value: "todas-atividades",
							label: "Participa de todas as atividades",
						},
						{
							value: "se-destaca",
							label: "Se destaca nas atividades",
						},
					],
					label: "Participação nas aulas de Educação Física:",
				},
				{
					id: "step2.participaAtividadesGrupo",
					type: "radio",
					options: [
						{ value: "sim", label: "Sim" },
						{ value: "nao", label: "Não" },
						{ value: "com-suporte", label: "Com suporte" },
					],
					label: "Participa de atividades em grupo?",
				},
				{
					id: "step2.possuiMateriaisAdaptados",
					type: "radio",
					options: [
						{ value: "sim", label: "Sim" },
						{ value: "nao", label: "Não" },
						{
							value: "poucos-recursos",
							label: "Poucos recursos",
						},
					],
					label: "Possui materiais pedagógicos adaptados?",
				},
				{
					id: "step2.recursosSala",
					type: "checkbox",
					options: [
						{ value: "Rotina visual", label: "Rotina visual" },
						{
							value: "Cantinho da calma",
							label: "Cantinho da calma",
						},
						{
							value: "Mobiliário adaptado",
							label: "Mobiliário adaptado",
						},
						{
							value: "Recursos de comunicação alternativa",
							label: "Recursos de comunicação alternativa",
						},
						{ value: "Outros", label: "Outros" },
					],
					label: "Recursos disponíveis na sala de aula:",
				},
				{
					id: "step2.estruturaEscola",
					type: "radio",
					options: [
						{
							value: "acessivel-adaptada",
							label: "Sim, totalmente acessível e adaptada",
						},
						{
							value: "parcialmente-adaptada",
							label: "Parcialmente adaptada",
						},
						{ value: "nao-adaptada", label: "Não adaptada" },
					],
					label: "A estrutura da escola é acessível?",
				},
			],
		},
	],
});
