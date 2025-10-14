import { CTASection } from "@/components/landing-page/CTASection";
import { Footer } from "@/components/landing-page/Footer";
import { Header } from "@/components/landing-page/Header";
import { IconWithBackground } from "@/components/shared/IconWithBackground";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	BarChart3,
	BookOpen,
	CheckCircle,
	Clock,
	GraduationCap,
	Heart,
	Shield,
	Star,
	Target,
	TrendingUp,
	Trophy,
	Users,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Benefícios",
};

export default function BeneficiosPage() {
	return (
		<div className="min-h-screen bg-background">
			<Header activeLink="benefits" />
			{/* Hero Section */}
			<section className="relative overflow-hidden py-16 md:py-24">
				<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
				<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-primary/30" />

				<div className="container relative mx-auto px-4">
					<div className="mx-auto max-w-4xl space-y-8 text-center">
						<Badge variant="secondary" className="mx-auto w-fit">
							<Trophy className="mr-2 h-4 w-4" />
							Transforme Sua Escola em Referência de Inclusão
						</Badge>
						<h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
							Os{" "}
							<span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
								Benefícios
							</span>{" "}
							da Ponto PEI
						</h1>
						<p className="text-xl leading-relaxed text-primary/80">
							Descubra como nossa plataforma revoluciona a
							educação inclusiva e transforma sua escola em
							referência
						</p>
					</div>
				</div>
			</section>

			{/* Benefícios Principais */}
			<section className="bg-muted/30 py-16">
				<div className="container mx-auto px-4">
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{/* Eficiência Revolucionária */}
						<Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<CardHeader>
								<IconWithBackground
									icon={Clock}
									className="mb-4 h-12 w-12 transition-transform group-hover:rotate-12"
								/>
								<CardTitle className="text-xl">
									Eficiência Revolucionária
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										<strong>95% menos tempo</strong> criando
										PEIs
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										De <strong>horas para minutos</strong>
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Professores focam no que sabem fazer
										melhor: <strong>ensinar</strong>
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Personalização Científica */}
						<Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<CardHeader>
								<IconWithBackground
									icon={Target}
									className="mb-4 h-12 w-12 transition-transform group-hover:rotate-12"
								/>
								<CardTitle className="text-xl">
									Personalização Científica
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Cada PEI{" "}
										<strong>único como o aluno</strong>
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Baseado em{" "}
										<strong>milhões de dados</strong> e
										metodologias comprovadas
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										<strong>Observações diárias</strong>{" "}
										integradas ao plano
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Integração PEI + Planos de Aula */}
						<Card className="group cursor-pointer border-primary/20 bg-primary/5 transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<CardHeader>
								<IconWithBackground
									icon={BookOpen}
									className="mb-4 h-12 w-12 transition-transform group-hover:rotate-12"
								/>
								<CardTitle className="text-xl">
									Integração PEI + Planos de Aula (EXCLUSIVO)
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Planos de aula semanais{" "}
										<strong>automáticos</strong> que aplicam
										as metas do PEI
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										<strong>Zero trabalho extra</strong>{" "}
										para a professora adaptar atividades
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Fim dos PEIs esquecidos -{" "}
										<strong>
											cada aula é uma sessão de
											desenvolvimento
										</strong>
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Conformidade Legal */}
						<Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<CardHeader>
								<IconWithBackground
									icon={Shield}
									className="mb-4 h-12 w-12 transition-transform group-hover:rotate-12"
								/>
								<CardTitle className="text-xl">
									Conformidade Legal Garantida
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										<strong>100% alinhado</strong> com Lei
										de Inclusão e BNCC
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										<strong>Zero risco</strong> de auditoria
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Consistência técnica{" "}
										<strong>impecável</strong>
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Resultados Comprovados */}
						<Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<CardHeader>
								<IconWithBackground
									icon={BarChart3}
									className="mb-4 h-12 w-12 transition-transform group-hover:rotate-12"
								/>
								<CardTitle className="text-xl">
									Resultados Comprovados
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										<strong>100% de satisfação</strong> dos
										pais
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										<strong>Progresso acelerado</strong> dos
										alunos
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										<strong>Participação plena</strong> dos
										alunos de inclusão em todas as aulas
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Equipe Empoderada */}
						<Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<CardHeader>
								<IconWithBackground
									icon={Users}
									className="mb-4 h-12 w-12 transition-transform group-hover:rotate-12"
								/>
								<CardTitle className="text-xl">
									Equipe Empoderada
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Professores mais{" "}
										<strong>confiantes e eficazes</strong>
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										<strong>Sem sobrecarga</strong> para
										adaptar conteúdos
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										<strong>Resultados visíveis</strong> em
										cada aula
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* O Resultado Final */}
			<section className="relative overflow-hidden py-16">
				<div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/15" />

				<div className="container relative mx-auto px-4">
					<div className="mb-16 space-y-4 text-center">
						<Badge variant="default" className="mx-auto w-fit">
							<Trophy className="mr-2 h-4 w-4" />O Resultado Final
						</Badge>
						<h2 className="flex items-center justify-center text-3xl font-bold md:text-4xl">
							<IconWithBackground
								icon={Trophy}
								className="mr-3"
							/>
							Sua Escola se Torna Referência
						</h2>
					</div>

					<div className="mx-auto max-w-4xl">
						<Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
							<CardContent className="space-y-8 p-12 text-center">
								<h3 className="text-2xl font-bold md:text-3xl">
									Sua escola se torna referência em educação
									inclusiva aliada à tecnologia de última
									geração.
								</h3>

								<div className="grid gap-8 text-left md:grid-cols-2">
									<div className="space-y-4">
										<div className="flex items-start space-x-3">
											<Heart className="mt-1 h-6 w-6 flex-shrink-0" />
											<p className="text-lg">
												Pais{" "}
												<strong>
													confiam cegamente
												</strong>
											</p>
										</div>
										<div className="flex items-start space-x-3">
											<TrendingUp className="mt-1 h-6 w-6 flex-shrink-0" />
											<p className="text-lg">
												Alunos{" "}
												<strong>
													prosperam visivelmente
												</strong>
											</p>
										</div>
									</div>
									<div className="space-y-4">
										<div className="flex items-start space-x-3">
											<GraduationCap className="mt-1 h-6 w-6 flex-shrink-0" />
											<p className="text-lg">
												Professores se{" "}
												<strong>
													realizam profissionalmente
												</strong>
											</p>
										</div>
										<div className="flex items-start space-x-3">
											<Star className="mt-1 h-6 w-6 flex-shrink-0" />
											<p className="text-lg">
												Você lidera a{" "}
												<strong>
													transformação educacional
												</strong>{" "}
												que o Brasil precisa
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<CTASection
				title="Pronto para Revolucionar a Educação Inclusiva na sua Escola?"
				description="Transforme sua escola em referência e lidere a mudança que a educação brasileira precisa!"
				buttonText="Começar Transformação"
				buttonLink="/dashboard"
				secondaryButtonText="Conhecer Mais"
				secondaryButtonLink="/about"
			/>

			<Footer />
		</div>
	);
}
