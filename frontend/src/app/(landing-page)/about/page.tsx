import { CTASection } from "@/components/landing-page/CTASection";
import { Footer } from "@/components/landing-page/Footer";
import { Header } from "@/components/landing-page/Header";
import { IconWithBackground } from "@/components/shared/IconWithBackground";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	AlertTriangle,
	Brain,
	Clock,
	Heart,
	Shield,
	Sparkles,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sobre",
};

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-background">
			<Header activeLink="about" />

			{/* Hero Section */}
			<section className="relative overflow-hidden py-16 md:py-24">
				<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
				<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-primary/30" />

				<div className="container relative mx-auto px-4">
					<div className="mx-auto max-w-4xl space-y-8 text-center">
						<Badge variant="secondary" className="mx-auto w-fit">
							<AlertTriangle className="mr-2 h-4 w-4" />O Problema
							que Toda Escola Enfrenta
						</Badge>
						<h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
							A Realidade da{" "}
							<span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
								Educação Inclusiva
							</span>{" "}
							no Brasil
						</h1>
						<p className="text-xl leading-relaxed text-primary/80">
							Descubra como a Ponto PEI está revolucionando a
							educação inclusiva brasileira com tecnologia de
							ponta
						</p>
					</div>
				</div>
			</section>

			{/* O Problema */}
			<section className="bg-muted/30 py-16">
				<div className="container mx-auto px-4">
					<div className="mb-16 space-y-4 text-center">
						<h2 className="flex items-center justify-center text-3xl font-bold text-destructive md:text-4xl">
							<IconWithBackground
								icon={AlertTriangle}
								className="mr-3"
								bgClassName="bg-destructive/10"
								iconClassName="text-destructive"
							/>
							O Problema que Toda Escola Enfrenta
						</h2>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<Card className="border-destructive/20 transition-all duration-300 hover:shadow-lg">
							<CardHeader>
								<Clock className="mx-auto mb-4 h-12 w-12 text-destructive" />
								<CardTitle className="text-center text-destructive">
									Professores Sobrecarregados
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-center text-primary/70">
									Professores gastam <strong>horas</strong>{" "}
									criando um único PEI. Coordenadores se
									perdem entre papelada e conformidade legal.
								</p>
							</CardContent>
						</Card>

						<Card className="border-destructive/20 transition-all duration-300 hover:shadow-lg">
							<CardHeader>
								<AlertTriangle className="mx-auto mb-4 h-12 w-12 text-destructive" />
								<CardTitle className="text-center text-destructive">
									Caos na Sala de Aula
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-center text-primary/70">
									A professora sobrecarregada tenta aplicar{" "}
									<strong>20 estratégias diferentes</strong>{" "}
									sem saber como encaixá-las no plano de aula
									da semana, esquecendo das metas individuais
									no meio do caos.
								</p>
							</CardContent>
						</Card>

						<Card className="border-destructive/20 transition-all duration-300 hover:shadow-lg">
							<CardHeader>
								<Heart className="mx-auto mb-4 h-12 w-12 text-destructive" />
								<CardTitle className="text-center text-destructive">
									Alunos Ficam para Trás
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-center text-primary/70">
									O aluno de inclusão{" "}
									<strong>fica para trás</strong>. Pais cobram
									diariamente querendo ver progresso real, mas
									recebem apenas relatórios genéricos
									desatualizados.
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="mt-12 text-center">
						<Card className="mx-auto max-w-2xl border-destructive/20 bg-destructive/5">
							<CardContent className="p-8">
								<h3 className="mb-4 text-2xl font-bold text-destructive">
									O Resultado?
								</h3>
								<p className="text-lg text-primary/80">
									<strong>O aluno espera semanas</strong> por
									um plano que deveria estar transformando sua
									vida hoje mesmo.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* A Solução */}
			<section className="relative overflow-hidden py-16">
				<div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/15" />

				<div className="container relative mx-auto px-4">
					<div className="mb-16 space-y-4 text-center">
						<Badge variant="default" className="mx-auto w-fit">
							<Sparkles className="mr-2 h-4 w-4" />A Solução
							Revolucionária
						</Badge>
						<h2 className="flex items-center justify-center text-3xl font-bold md:text-4xl">
							<IconWithBackground
								icon={Sparkles}
								className="mr-3"
								bgClassName="bg-primary/10"
							/>
							Apresentamos a Ponto PEI
						</h2>
					</div>

					<div className="mx-auto max-w-4xl space-y-8">
						<Card className="border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5">
							<CardContent className="p-8">
								<h3 className="mb-4 text-2xl font-bold text-primary">
									A Primeira Plataforma Brasileira de IA para
									PEIs
								</h3>
								<p className="text-lg leading-relaxed text-primary/80">
									A Ponto PEI é a{" "}
									<strong>
										primeira plataforma brasileira
									</strong>{" "}
									que usa Inteligência Artificial para criar
									Planos Educacionais Individualizados e
									Planos de Aulas Semanais em minutos.
								</p>
							</CardContent>
						</Card>

						<div className="grid gap-8 md:grid-cols-2">
							<Card className="transition-all duration-300 hover:shadow-lg">
								<CardHeader>
									<Shield className="mb-4 h-12 w-12 text-primary" />
									<CardTitle>
										Desenvolvida para o Brasil
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-primary/70">
										Desenvolvida especificamente para
										escolas brasileiras, nossa IA domina a{" "}
										<strong>Lei de Inclusão, BNCC</strong> e
										as metodologias mais avançadas.
									</p>
								</CardContent>
							</Card>

							<Card className="transition-all duration-300 hover:shadow-lg">
								<CardHeader>
									<Brain className="mb-4 h-12 w-12 text-primary" />
									<CardTitle>
										Metodologias Avançadas
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-primary/70">
										<strong>
											ABA (escolar), Vygotsky, Montessori,
											Neuroeducação
										</strong>{" "}
										entre outras metodologias integradas em
										uma única plataforma.
									</p>
								</CardContent>
							</Card>
						</div>

						<Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
							<CardContent className="p-8 text-center">
								<h3 className="mb-4 text-2xl font-bold">
									O Resultado
								</h3>
								<p className="text-xl leading-relaxed">
									Cada aluno recebe um PEI{" "}
									<strong>
										científico, personalizado e legalmente
										perfeito
									</strong>{" "}
									- enquanto seus professores recuperam{" "}
									<strong>95% do tempo</strong> para o que
									realmente importa: <strong>ensinar</strong>.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			<CTASection
				title="Pronto para Transformar sua Escola?"
				description="Descubra como nossa IA pode revolucionar a educação inclusiva na sua escola hoje mesmo!"
				buttonText="Começar Agora"
				buttonLink="/dashboard"
				secondaryButtonText="Ver Como Funciona"
				secondaryButtonLink="/how-it-works"
			/>

			<Footer />
		</div>
	);
}
