import { StudentGender } from "@/models/enums/student/student-gender.enum";
import { DefaultValues, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
	// Seção 1 - Identificação
	step1: z.object({
		fullName: z.string().min(1, "Nome completo é obrigatório"),
		photoUrl: z.string().optional(),
		gender: z.enum(StudentGender, "Gênero é obrigatório"),
		dateOfBirth: z.string().min(1, "Data de nascimento é obrigatória"),
		specialNeeds: z.string().min(1, "Necessidades especiais é obrigatório"),
		medicalConditions: z.array(
			z.object({
				condition: z.string().min(1, "Condição médica é obrigatória"),
				age: z.string().optional(),
			})
		),
		hasCamping: z.boolean(),
		classroomId: z.string().min(1, "Turma é obrigatória"),
		parentGuardian: z
			.string()
			.min(1, "Nome do responsável legal é obrigatório"),
		cid: z.string().optional(),
	}),
	// Seção 2 - Professor - Compreensão e Comunicação
	step2: z.object({
		compreendeComandosSimples: z.enum(
			["sim", "nao", "parcialmente"],
			"Compreende comandos simples é obrigatório"
		),
		compreendeComandosComplexos: z.enum(
			["sim", "nao", "parcialmente"],
			"Compreende comandos complexos é obrigatório"
		),
		comunicacaoSala: z
			.string()
			.min(1, "Comunicação na sala de aula é obrigatória"),
		nivelComunicacaoVerbal: z.enum(
			[
				"nao-verbal",
				"palavras-isoladas",
				"frases-2-3",
				"conversacao-simples",
				"conversacao-complexa",
			],
			"Nível de comunicação verbal é obrigatório"
		),
		fazPedidos: z.enum(
			[
				"nao-faz",
				"gestos-choro",
				"palavras-ocasionais",
				"pedidos-consistentes",
				"pedidos-elaborados",
			],
			"Faz pedidos é obrigatório"
		),

		// Interação e Comportamentos
		interagecom: z.array(
			z.string("Descreva a interação do aluno com os colegas"),
			"Interação e comportamento é obrigatório"
		),
		comportamentosFuga: z.string(
			"Descreva os comportamentos de fuga do aluno"
		),
		barreirasAprendizagem: z.array(
			z.string("Descreva as barreiras de aprendizagem do aluno"),
			"Interação e comportamento é obrigatório"
		),

		// Habilidades Acadêmicas
		conteudosFacilidade: z.string(
			"Descreva a facilidade do aluno em aprender os conteúdos"
		),
		areasDificuldade: z.string("Descreva as áreas de dificuldade do aluno"),
		avaliacaoHabilidades: z.enum(
			[
				"pre-academicas",
				"reconhecimento-letras",
				"leitura-escrita",
				"habilidades-serie",
				"acima-expectativa",
			],
			"Avaliação das habilidades acadêmicas é obrigatória"
		),
		habilidadeDestaque: z.string(
			"Descreva a habilidade de destaque do aluno"
		),

		// Adaptações e Metas
		principaisDesafios: z.string(
			"Descreva os principais desafios do aluno"
		),
		estrategiasFuncionam: z.string(
			"Descreva as estratégias que funcionam para o aluno"
		),
		prioridade1: z.string().min(1, "Prioridade 1 é obrigatória"),
		prioridade1Expectativa: z.string(
			"Descreva a expectativa da prioridade 1 do aluno"
		),
		prioridade2: z.string().min(1, "Prioridade 2 é obrigatória"),
		prioridade2Expectativa: z.string(
			"Descreva a expectativa da prioridade 2 do aluno"
		),
		prioridade3: z.string().min(1, "Prioridade 3 é obrigatória"),
		prioridade3Expectativa: z.string(
			"Descreva a expectativa da prioridade 3 do aluno"
		),
		nivelApoio: z.enum(
			["minimo", "moderado", "extenso"],
			"Nível de apoio é obrigatório"
		),

		// Habilidades Motoras (Escola) - Movido do step3
		movimentacaoSala: z.enum(
			[
				"sempre-sentado",
				"levanta-dificuldade",
				"caminha-normal",
				"corre-sala",
				"movimenta-cuidado",
			],
			"Movimentação na sala de aula é obrigatório"
		),
		educacaoFisica: z.enum(
			[
				"nao-participa",
				"participa-ajuda",
				"algumas-atividades",
				"todas-atividades",
				"se-destaca",
			],
			"Educação física é obrigatório"
		),

		// Recursos e Adaptações (Escola) - Movido do step3
		participaAtividadesGrupo: z.enum(
			["sim", "nao", "com-suporte"],
			"Participa em atividades de grupo é obrigatório"
		),
		possuiMateriaisAdaptados: z.enum(
			["sim", "nao", "poucos-recursos"],
			"Possui materiais adaptados é obrigatório"
		),
		recursosSala: z.array(
			z.string("Descreva os recursos disponíveis na sala de aula"),
			"Recursos disponíveis na sala de aula é obrigatório"
		),
		estruturaEscola: z.enum(
			["acessivel-adaptada", "parcialmente-adaptada", "nao-adaptada"],
			"Estrutura da escola é obrigatória"
		),
	}),
	// Seção 3 - Pais/Responsáveis - Rotina e Comportamento
	step3: z.object({
		// Rotina e Comportamento em Casa
		rotinaEstruturada: z.enum(
			["sim", "nao", "parcial"],
			"Rotina estruturada é obrigatória"
		),
		segueComandosCasa: z.enum(
			["sim", "nao", "apoio-visual"],
			"Segue comandos em casa é obrigatório"
		),
		nivelIndependencia: z.enum(
			[
				"totalmente-dependente",
				"muito-apoio",
				"parcialmente-independente",
				"independente-maioria",
				"totalmente-independente",
			],
			"Nível de independência é obrigatório"
		),
		comunicacaoCasa: z.string().min(1, "Comunicação em casa é obrigatória"),

		// Habilidades Práticas
		comerSozinho: z.enum(
			[
				"nao-consegue",
				"ajuda-total",
				"ajuda-parcial",
				"sozinho-bagunca",
				"sozinho-organizado",
			],
			"Comer sozinho é obrigatório"
		),
		vestirSozinho: z.enum(
			[
				"nao-consegue",
				"ajuda-total",
				"ajuda-parcial",
				"pecas-simples",
				"roupas-complexas",
			],
			"Vestir sozinho é obrigatório"
		),
		usaBanheiroSozinho: z.enum(
			[
				"usa-fraldas",
				"ajuda",
				"precisa-lembrar",
				"sozinho-sempre",
				"totalmente-independente",
			],
			"Usa banheiro sozinho é obrigatório"
		),
		dificuldadeAlimentar: z.enum(
			["sim", "nao", "avaliacao"],
			"Dificuldade alimentar é obrigatória"
		),

		// Contexto Familiar
		quantasPessoas: z
			.string()
			.min(1, "Quantidade de pessoas é obrigatório"),
		temIrmaos: z.enum(
			["nao-tem", "1-irmao", "2-irmaos", "3-ou-mais"],
			"Tem irmãos é obrigatório"
		),
		ajudaAtividades: z.array(
			z.string(
				"Descreva a ajuda que o aluno recebe em atividades especiais"
			),
			"Ajuda em atividades especiais é obrigatória"
		),
		tempoAtividadesEspeciais: z.enum(
			[
				"bastante-tempo",
				"pouco-tempo",
				"fins-semana",
				"quase-nao-tem",
				"nao-tem",
			],
			"Tempo em atividades especiais é obrigatório"
		),
		comprarMateriais: z.enum(
			[
				"sem-dificuldade",
				"pouco-esforco",
				"depende-valor",
				"so-baratos",
				"nao-consegue",
			],
			"Comprar materiais é obrigatório"
		),

		// Desenvolvimento e Expectativas
		maisGostaFazer: z
			.string()
			.min(1, "O que o aluno mais gosta de fazer é obrigatório"),
		acompanhamentoTerapeutico: z.enum(
			["sim", "nao", "avaliacao"],
			"Acompanhamento terapêutico é obrigatório"
		),
		expectativasAno: z.string().min(1, "Expectativas do ano é obrigatório"),
		habilidadesPriorizar: z.array(
			z.string("Descreva as habilidades que o aluno prioriza"),
			"Habilidades priorizadas é obrigatória"
		),
		progressoAnterior: z.enum(
			[
				"regrediu",
				"sem-mudancas",
				"progresso-lento",
				"progresso-significativo",
				"progresso-excepcional",
			],
			"Progresso anterior é obrigatório"
		),
		maiorDesejoEscolar: z
			.string()
			.min(1, "O maior desejo do aluno escolar é obrigatório"),

		// Metas Familiares
		metaFamilia: z.string().min(1, "Meta da família é obrigatória"),
		comoFamiliaAjudar: z
			.string()
			.min(1, "Como a família ajuda o aluno é obrigatório"),
		maiorDificuldadeFamilia: z
			.string()
			.min(1, "A maior dificuldade da família é obrigatória"),
		informacoesClinicas: z
			.string()
			.min(1, "Informações clínicas são obrigatórias"),
		autorizaUso: z.enum(["sim", "nao"], "Autorização de uso é obrigatória"),
	}),
	// Seção 4 - Pais/Responsáveis - Desenvolvimento, Saúde e Terapias
	step4: z.object({
		// Habilidades Motoras
		areasMaiorNecessidade: z.array(
			z.string("Descreva as áreas de maior necessidade do aluno"),
			"Áreas de maior necessidade é obrigatória"
		),
		seguraLapis: z.enum(
			[
				"nao-consegue",
				"com-dificuldade",
				"segura-nao-escreve",
				"adequadamente",
				"escreve-facilidade",
			],
			"Segura lápis é obrigatório"
		),
		recortaTesoura: z.enum(
			[
				"nao-consegue",
				"ajuda-total",
				"ajuda-parcial",
				"linha-reta",
				"formas-complexas",
			],
			"Recorta tesoura é obrigatório"
		),

		// Questões Sensoriais
		reacaoRuidos: z.enum(
			[
				"nao-incomoda",
				"pouco-desconfortavel",
				"muito-incomodado",
				"tapa-ouvidos",
				"crise-choro",
			],
			"Reação a ruídos é obrigatório"
		),
		reacaoTexturas: z.enum(
			[
				"explora-normal",
				"pouca-hesitacao",
				"evita-certas",
				"recusa-maioria",
				"nao-toca",
			],
			"Reação a texturas é obrigatório"
		),
		reacaoLuz: z.enum(
			[
				"nao-incomoda",
				"pisca-olhos",
				"evita-luz",
				"fecha-olhos",
				"agitado-luz",
			],
			"Reação a luz é obrigatório"
		),
		gostaContato: z.enum(
			[
				"gosta-muito",
				"gosta-as-vezes",
				"indiferente",
				"evita-contato",
				"rejeita-completamente",
			],
			"Gosta de contato é obrigatório"
		),
		nomeiaObjetos: z.enum(
			[
				"nao-nomeia",
				"alguns-familiares",
				"objetos-acoes-basicas",
				"vocabulario-amplo",
				"descreve-detalhadamente",
			],
			"Nomeia objetos é obrigatório"
		),
		repetePalavras: z.enum(
			[
				"nao-repete",
				"sons-simples",
				"repete-palavras",
				"repete-frases",
				"ecoico-funcional",
			],
			"Repete palavras é obrigatório"
		),
		aceitacaoMudancas: z.enum(
			[
				"muito-dificil",
				"dificil",
				"aceita-apoio",
				"adapta-bem",
				"flexivel",
			],
			"Aceitação de mudanças é obrigatória"
		),
		comportamentoCrise: z.enum(
			["sim", "nao", "as-vezes"],
			"Comportamento em crise é obrigatório"
		),
		comportamentosRepetitivos: z.enum(
			[
				"frequentes-intensos",
				"moderados",
				"ocasionalmente",
				"raramente",
				"nao-apresenta",
			],
			"Comportamentos repetitivos é obrigatório"
		),
		interesseBrincadeiras: z.enum(
			["brinca-sozinho", "brinca-irmaos", "evita-brincadeiras"],
			"Interesse em brincadeiras é obrigatório"
		),
		habilidadesSociaisCasa: z.enum(
			[
				"nao-interage",
				"interage-familiares",
				"demonstra-afeto",
				"brinca-junto",
				"inicia-interacoes",
			],
			"Habilidades sociais em casa é obrigatório"
		),
		conceitosBasicos: z.array(
			z.string("Descreva os conceitos básicos que o aluno aprende"),
			"Conceitos básicos é obrigatório"
		),
		reacaoBarulhosCasa: z.enum(
			[
				"nao-incomoda",
				"pouco-desconfortavel",
				"muito-incomodado",
				"outro-comodo",
				"crise-choro",
			],
			"Reação a barulhos em casa é obrigatória"
		),
		gostaBanho: z.enum(
			["adora", "gosta", "indiferente", "nao-gosta", "odeia"],
			"Gosta de banho é obrigatório"
		),
		prefereRoupas: z.enum(
			[
				"nao-preferencia",
				"macias-confortaveis",
				"largas-folgadas",
				"justas-apertadas",
				"sempre-mesmas",
			],
			"Prefere roupas é obrigatório"
		),

		// Histórico Terapêutico
		terapias: z.array(
			z.string("Descreva as terapias que o aluno recebe"),
			"Terapias é obrigatório"
		),
	}),
	// Seção 5 - Pais/Responsáveis - Preferências e Estratégias
	step5: z.object({
		// Tecnologia e Comunicação Alternativa
		usaTecnologia: z.enum(
			[
				"nao-usa",
				"muita-ajuda",
				"pouca-ajuda",
				"usa-sozinho",
				"melhor-colegas",
			],
			"Usa tecnologia é obrigatório"
		),
		usaSimbolos: z.enum(
			[
				"nao-usa",
				"poucos-simbolos",
				"varios-simbolos",
				"combina-simbolos",
				"cria-combinacoes",
			],
			"Usa símbolos é obrigatório"
		),
		aplicativosRecursos: z
			.string()
			.min(
				1,
				"Os aplicativos e recursos utilizados pelo aluno é obrigatório"
			),
		estrategiasAcalmar: z
			.string()
			.min(1, "As estratégias de acalmação do aluno é obrigatório"),

		// Tecnologia em Casa
		usaDispositivosCasa: z.array(
			z.string("Descreva os dispositivos que o aluno usa em casa"),
			"Dispositivos em casa é obrigatório"
		),
		tempoEletronicos: z.enum(
			["nao-usa", "menos-1h", "1-2h", "3-4h", "mais-4h"],
			"Tempo em eletrônicos é obrigatório"
		),
		aplicativosPreferidos: z
			.string()
			.min(1, "Os aplicativos preferidos do aluno é obrigatório"),

		// Preferências de Aprendizagem
		comoAprendeMelhor: z.array(
			z.string("Descreva como o aluno aprende melhor")
		),
		materiaisInteresse: z
			.string()
			.min(1, "Os materiais que o aluno gosta de usar é obrigatório"),

		// Gatilhos e Crises
		situacoesCrises: z.array(
			z.string("Descreva as situações de crise do aluno"),
			"Situações de crise é obrigatório"
		),
		sinaisAntecedem: z
			.string()
			.min(1, "Os sinais que antecedem as crises do aluno é obrigatório"),
		estrategiasAcalmarCasa: z
			.string()
			.min(
				1,
				"As estratégias de acalmação do aluno em casa é obrigatório"
			),
	}),
});

export type CreateStudentAndPEIFormData = z.infer<typeof formSchema>;

export interface FormSectionProps {
	form: UseFormReturn<CreateStudentAndPEIFormData>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testDefaultValues: DefaultValues<CreateStudentAndPEIFormData> = {
	step1: {
		fullName: "João Pedro da Silva",
		gender: StudentGender.MALE,
		dateOfBirth: "2017-07-15",
		specialNeeds: "Transtorno do Espectro Autista",
		medicalConditions: [{ condition: "Autismo", age: "5 anos" }],
		photoUrl: "https://via.placeholder.com/150",
		hasCamping: true,
		classroomId: "3A",
		parentGuardian: "Ana Cristina da Silva",
		cid: "F84.0",
	},
	step2: {
		compreendeComandosSimples: "sim",
		compreendeComandosComplexos: "parcialmente",
		comunicacaoSala:
			"Comunica-se por frases curtas e respostas a perguntas diretas, exige reforço visual.",
		nivelComunicacaoVerbal: "frases-2-3",
		fazPedidos: "palavras-ocasionais",
		interagecom: ["colegas", "adultos"],
		comportamentosFuga:
			"Balança as mãos quando entediado; ocasionalmente levanta-se sem permissão.",
		barreirasAprendizagem: [
			"Resistência a mudanças",
			"Dificuldade de atenção",
		],
		conteudosFacilidade:
			"Matemática básica (adição e subtração), reconhecimento de formas.",
		areasDificuldade: "Leitura fluente, escrita de frases completas.",
		avaliacaoHabilidades: "reconhecimento-letras",
		habilidadeDestaque: "Gosta de resolver quebra-cabeças lógicos.",
		principaisDesafios:
			"Manter foco por mais de 10 minutos; iniciar interações com colegas; reduzir estereotipias vocais.",
		estrategiasFuncionam:
			"Rotinas visuais com figuras; reforço positivo imediato; atividades curtas intercaladas.",
		prioridade1: "Leitura funcional",
		prioridade1Expectativa: "Reconhecer 10 palavras de alta frequência.",
		prioridade2: "Comunicação de necessidades",
		prioridade2Expectativa: "Usar prancha para 5 solicitações por dia.",
		prioridade3: "Redução de estereotipias vocais",
		prioridade3Expectativa: "Reduzir em 50% episódios de ecoísmo.",
		nivelApoio: "moderado",
		movimentacaoSala: "caminha-normal",
		educacaoFisica: "participa-ajuda",
		participaAtividadesGrupo: "com-suporte",
		possuiMateriaisAdaptados: "sim",
		recursosSala: [
			"rotina-visual",
			"cantinho-autorregulacao",
			"apoio-visual",
		],
		estruturaEscola: "acessivel-adaptada",
	},
	step3: {
		rotinaEstruturada: "sim",
		segueComandosCasa: "sim",
		nivelIndependencia: "parcialmente-independente",
		comunicacaoCasa: "Usa frases curtas; responde bem a reforço visual.",
		comerSozinho: "sozinho-organizado",
		vestirSozinho: "pecas-simples",
		usaBanheiroSozinho: "sozinho-sempre",
		dificuldadeAlimentar: "nao",
		quantasPessoas: "4",
		temIrmaos: "1-irmao",
		ajudaAtividades: ["Pai", "Mãe"],
		tempoAtividadesEspeciais: "fins-semana",
		comprarMateriais: "sem-dificuldade",
		maisGostaFazer: "Montar blocos de montar e desenhar.",
		acompanhamentoTerapeutico: "sim",
		expectativasAno: "Melhorar comunicação verbal e autonomia pessoal.",
		habilidadesPriorizar: ["Comunicação/fala", "Habilidades sociais"],
		progressoAnterior: "progresso-significativo",
		maiorDesejoEscolar: "Que peça ajuda quando precisar, sem restrições.",
		metaFamilia:
			"Aumentar autonomia no vestir e ir ao banheiro sem lembrete.",
		comoFamiliaAjudar: "Reforço positivo diário e uso de rotina visual.",
		maiorDificuldadeFamilia: "Manter consistência nos reforços diários.",
		autorizaUso: "sim",
	},
	step4: {
		areasMaiorNecessidade: [
			"Acadêmica: Leitura, Escrita",
			"Comunicação: Expressão verbal, Comunicação alternativa",
			"Comportamental: Manejo de frustração",
		],
		seguraLapis: "adequadamente",
		recortaTesoura: "ajuda-parcial",
		reacaoRuidos: "muito-incomodado",
		reacaoTexturas: "pouca-hesitacao",
		reacaoLuz: "pisca-olhos",
		gostaContato: "gosta-as-vezes",
		nomeiaObjetos: "objetos-acoes-basicas",
		repetePalavras: "repete-palavras",
		aceitacaoMudancas: "aceita-apoio",
		comportamentoCrise: "nao",
		comportamentosRepetitivos: "moderados",
		interesseBrincadeiras: "brinca-irmaos",
		habilidadesSociaisCasa: "demonstra-afeto",
		conceitosBasicos: ["Cores", "Formas", "Números"],
		reacaoBarulhosCasa: "pouco-desconfortavel",
		gostaBanho: "gosta",
		prefereRoupas: "macias-confortaveis",
		terapias: ["Fonoaudiologia", "Terapia Ocupacional"],
	},
	step5: {
		usaTecnologia: "usa-sozinho",
		usaSimbolos: "combina-simbolos",
		aplicativosRecursos: "ComunicaAAC, vídeos de histórias curtas.",
		estrategiasAcalmar:
			"Uso de fidget toys; música suave; cantinho de autorregulação.",
		usaDispositivosCasa: ["Tablet", "TV"],
		tempoEletronicos: "menos-1h",
		aplicativosPreferidos: "Jogos ABC e vídeos educativos.",
		comoAprendeMelhor: ["Vendo", "Fazendo"],
		materiaisInteresse: "Quebra-cabeças, livros com figuras coloridas.",
		situacoesCrises: ["Mudanças na rotina", "Ambientes muito barulhentos"],
		sinaisAntecedem: "Fica inquieto, balança mãos.",
		estrategiasAcalmarCasa: "Música suave, bola de apertar.",
	},
};

// Todos que são array, devem ser um array vazio
export const defaultValues: DefaultValues<CreateStudentAndPEIFormData> = {
	step1: {
		fullName: "",
		photoUrl: "",
		gender: StudentGender.MALE,
		dateOfBirth: "",
		specialNeeds: "",
		medicalConditions: [],
		hasCamping: false,
		classroomId: "",
		parentGuardian: "",
		cid: "",
	},
	step2: {
		interagecom: [],
		barreirasAprendizagem: [],
		recursosSala: [],
		prioridade1: "",
		prioridade2: "",
		prioridade3: "",
	},
	step3: {
		ajudaAtividades: [],
		habilidadesPriorizar: [],
		quantasPessoas: "",
	},
	step4: {
		areasMaiorNecessidade: [],
		conceitosBasicos: [],
		terapias: [],
	},
	step5: {
		usaDispositivosCasa: [],
		comoAprendeMelhor: [],
		situacoesCrises: [],
	},
};
