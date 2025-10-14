import { CTASection } from "@/components/landing-page/CTASection";
import { Footer } from "@/components/landing-page/Footer";
import { Header } from "@/components/landing-page/Header";
import { IconWithBackground } from "@/components/shared/IconWithBackground";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Brain,
	CheckCircle,
	Clock,
	Cog,
	GraduationCap,
	Heart,
	Search,
	TrendingUp,
	Users,
	Zap,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Como Funciona",
};

export default function ComoFuncionaPage() {
	return (
		<div className="min-h-screen bg-background">
			<Header activeLink="how-it-works" />

			{/* Hero Section */}
			<section className="relative overflow-hidden py-16 md:py-24">
				<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
				<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-primary/30" />

				<div className="container relative mx-auto px-4">
					<div className="mx-auto max-w-4xl space-y-8 text-center">
						<Badge variant="secondary" className="mx-auto w-fit">
							<Cog className="mr-2 h-4 w-4" />A Magia da IA em 3
							Passos Simples
						</Badge>
						<h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
							Como a{" "}
							<span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
								Ponto PEI
							</span>{" "}
							Funciona
						</h1>
						<p className="text-xl leading-relaxed text-primary/80">
							Descubra como nossa IA revolucionária transforma a
							criação de PEIs em um processo simples e eficiente
						</p>
					</div>
				</div>
			</section>

			{/* 3 Passos */}
			<section className="bg-muted/30 py-16">
				<div className="container mx-auto px-4">
					<div className="space-y-16">
						{/* Passo 1 */}
						<div className="grid items-center gap-12 lg:grid-cols-2">
							<div className="space-y-6">
								<Badge variant="default" className="w-fit">
									<Search className="mr-2 h-4 w-4" />
									Passo 1
								</Badge>
								<h2 className="flex items-center text-3xl font-bold md:text-4xl">
									<IconWithBackground
										icon={Search}
										className="mr-3"
									/>
									Análise Inteligente e Colaborativa
								</h2>
								<div className="space-y-4">
									<p className="text-lg text-primary/80">
										Nossa IA processa o{" "}
										<strong>
											perfil completo do aluno
										</strong>{" "}
										(diagnóstico, idade, forças e desafios)
										+ metodologias pedagógicas avançadas de
										acordo com o perfil do aluno + contexto
										da sua escola.
									</p>
									<Card className="border-primary/20 bg-primary/5">
										<CardContent className="p-6">
											<h3 className="mb-2 font-bold text-primary">
												PLUS:
											</h3>
											<p className="text-primary/80">
												A professora alimenta com{" "}
												<strong>
													observações diárias
												</strong>
												, criando um histórico vivo que
												a IA usa para refinar
												continuamente o PEI.
											</p>
										</CardContent>
									</Card>
								</div>
							</div>
							<div className="relative">
								<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-primary/40 blur-3xl" />
								<Card className="relative border-primary/20 bg-gradient-to-br from-primary/10 to-primary/20">
									<CardContent className="p-8">
										<div className="space-y-4">
											<div className="flex items-center space-x-3">
												<Users className="h-6 w-6 text-primary" />
												<span className="font-semibold">
													Perfil do Aluno
												</span>
											</div>
											<div className="flex items-center space-x-3">
												<Brain className="h-6 w-6 text-primary" />
												<span className="font-semibold">
													Metodologias Avançadas
												</span>
											</div>
											<div className="flex items-center space-x-3">
												<GraduationCap className="h-6 w-6 text-primary" />
												<span className="font-semibold">
													Contexto Escolar
												</span>
											</div>
											<div className="flex items-center space-x-3">
												<Heart className="h-6 w-6 text-primary" />
												<span className="font-semibold">
													Observações Diárias
												</span>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Passo 2 */}
						<div className="grid items-center gap-12 lg:grid-cols-2">
							<div className="space-y-6 lg:order-2">
								<Badge variant="default" className="w-fit">
									<Zap className="mr-2 h-4 w-4" />
									Passo 2
								</Badge>
								<h2 className="flex items-center text-3xl font-bold md:text-4xl">
									<IconWithBackground
										icon={Zap}
										className="mr-3"
									/>
									Geração Instantânea + Integração
									Revolucionária
								</h2>
								<div className="space-y-4">
									<p className="text-lg text-primary/80">
										Em menos de <strong>5 minutos</strong>,
										a IA cruza milhares de estudos de caso e
										gera:
									</p>
									<div className="space-y-3">
										<div className="flex items-start space-x-3">
											<CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
											<span>
												PEI completo e personalizado
											</span>
										</div>
										<div className="flex items-start space-x-3">
											<CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
											<span>
												Planos de aula semanais que
												conectam automaticamente as
												metas do PEI com o conteúdo da
												semana
											</span>
										</div>
										<div className="flex items-start space-x-3">
											<CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
											<span>
												Estratégias específicas por
												disciplina integradas ao
												currículo
											</span>
										</div>
									</div>
									<Card className="border-primary/20 bg-primary/5">
										<CardContent className="p-6">
											<h3 className="mb-2 font-bold text-primary">
												EXCLUSIVO:
											</h3>
											<p className="text-primary/80">
												A professora informa apenas o{" "}
												<strong>
													conteúdo programático da
													semana
												</strong>{" "}
												e nossa IA automaticamente
												adapta cada aula para incluir as
												metas individuais do PEI.{" "}
												<strong>
													Sem trabalho extra, sem
													esquecimentos, sem metas
													perdidas.
												</strong>
											</p>
										</CardContent>
									</Card>
								</div>
							</div>
							<div className="relative lg:order-1">
								<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-primary/40 blur-3xl" />
								<Card className="relative border-primary/20 bg-gradient-to-br from-primary/10 to-primary/20">
									<CardContent className="p-8 text-center">
										<Clock className="mx-auto mb-4 h-16 w-16 text-primary" />
										<h3 className="mb-2 text-2xl font-bold text-primary">
											Menos de 5 minutos
										</h3>
										<p className="text-primary/80">
											Para gerar PEI completo + Planos de
											aula integrados
										</p>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Passo 3 */}
						<div className="grid items-center gap-12 lg:grid-cols-2">
							<div className="space-y-6">
								<Badge variant="default" className="w-fit">
									<TrendingUp className="mr-2 h-4 w-4" />
									Passo 3
								</Badge>
								<h2 className="flex items-center text-3xl font-bold md:text-4xl">
									<IconWithBackground
										icon={TrendingUp}
										className="mr-3"
									/>
									Evolução Constante
								</h2>
								<div className="space-y-4">
									<p className="text-lg text-primary/80">
										Cada nova{" "}
										<strong>
											observação da professora
										</strong>{" "}
										aprimora o PEI E os planos de aula
										automaticamente.
									</p>
									<p className="text-lg text-primary/80">
										É um sistema que{" "}
										<strong>aprende e evolui</strong> junto
										com o aluno, garantindo que cada aula
										seja uma sessão de PEI em ação.
									</p>
									<Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
										<CardContent className="p-6">
											<h3 className="mb-2 font-bold">
												É como ter:
											</h3>
											<p>
												Um{" "}
												<strong>
													especialista em educação
													inclusiva
												</strong>{" "}
												trabalhando 24h para conectar
												teoria e prática para cada aluno
												da sua escola.
											</p>
										</CardContent>
									</Card>
								</div>
							</div>
							<div className="relative">
								<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-primary/40 blur-3xl" />
								<Card className="relative border-primary/20 bg-gradient-to-br from-primary/10 to-primary/20">
									<CardContent className="p-8 text-center">
										<TrendingUp className="mx-auto mb-4 h-16 w-16 text-primary" />
										<h3 className="mb-2 text-2xl font-bold text-primary">
											Evolução Contínua
										</h3>
										<p className="text-primary/80">
											Sistema que aprende e se adapta
											constantemente
										</p>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</section>

			<CTASection
				title="Pronto para Ver a Magia Acontecer?"
				description="Descubra como esses 3 passos simples podem transformar completamente a educação inclusiva na sua escola!"
				buttonText="Começar Agora"
				buttonLink="/dashboard"
				secondaryButtonText="Ver Benefícios"
				secondaryButtonLink="/benefits"
			/>

			<Footer />
		</div>
	);
}
