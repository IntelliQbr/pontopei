import { CTASection } from "@/components/landing-page/CTASection";
import { Footer } from "@/components/landing-page/Footer";
import { Header } from "@/components/landing-page/Header";
import { IconWithBackground } from "@/components/shared/IconWithBackground";
import { whatsappLink } from "@/components/support/HelpButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { plans } from "@/data/plans.data";
import { cn } from "@/lib/utils";
import { SubscriptionPlanEnum } from "@/models/enums/subscription/subscription-plan.enum";
import {
	BarChart3,
	BookOpen,
	Brain,
	CheckCircle,
	Clock,
	GraduationCap,
	Heart,
	Rocket,
	Shield,
	Sparkles,
	Target,
	Users,
	Zap,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Plataforma",
};

export default function LandingPage() {
	return (
		<div className="min-h-screen bg-background">
			<Header />
			{/* Hero Section */}
			<section className="relative overflow-hidden py-16 md:py-24">
				{/* Background decorativo interativo */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
				<div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-primary/30" />
				<div className="absolute inset-0 bg-gradient-to-bl from-primary/15 via-transparent to-primary/20" />

				{/* SVGs geométricos sutis - corrigidos */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
					<div className="absolute left-20 top-20 h-32 w-32 text-primary/40">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<circle
								cx="50"
								cy="50"
								r="40"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</svg>
					</div>
					<div className="absolute right-32 top-40 h-24 w-24 text-primary/30">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<polygon
								points="50,10 90,90 10,90"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</svg>
					</div>
					<div className="absolute bottom-32 left-40 h-28 w-28 text-primary/35">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<rect
								x="20"
								y="20"
								width="60"
								height="60"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								rx="5"
							/>
						</svg>
					</div>
					<div className="absolute left-1/3 top-60 h-20 w-20 text-primary/25">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<path
								d="M50 10 L90 50 L50 90 L10 50 Z"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</svg>
					</div>
					<div className="absolute bottom-20 right-20 h-36 w-36 text-primary/20">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<ellipse
								cx="50"
								cy="50"
								r="40"
								ry="25"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</svg>
					</div>
				</div>

				<div className="absolute inset-0 overflow-hidden">
					<div className="animate-pulse absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
					<div className="animate-pulse absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl delay-1000" />
					<div className="animate-bounce absolute left-1/4 top-1/2 h-32 w-32 rounded-full bg-primary/20 blur-2xl delay-500" />
					<div className="animate-pulse absolute right-1/3 top-1/4 h-24 w-24 rounded-full bg-primary/15 blur-xl delay-700" />
					<div className="animate-pulse absolute left-1/2 top-3/4 h-40 w-40 rounded-full bg-primary/8 blur-2xl delay-300" />
					<div className="animate-bounce absolute bottom-1/4 left-1/4 h-28 w-28 rounded-full bg-primary/12 blur-xl delay-1200" />
				</div>

				<div className="container relative mx-auto px-4 xl:max-w-7xl">
					<div className="grid items-center gap-12 lg:grid-cols-2 xl:grid-cols-5">
						<div className="animate-fade-in space-y-8 xl:col-span-3">
							<div className="space-y-4">
								<Badge
									variant="secondary"
									className="w-fit cursor-pointer transition-transform hover:scale-105"
								>
									<Sparkles className="mr-2 h-4 w-4" />
									Inteligência Artificial para Educação
									Inclusiva
								</Badge>
								<h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
									Transforme a{" "}
									<span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-all duration-300 hover:from-primary/80 hover:to-primary">
										Educação Inclusiva
									</span>{" "}
									com IA
								</h1>
								<p className=" max-w-2xl rounded-xl bg-gradient-to-br from-background/90 via-transparent to-background/90 p-4 text-base leading-relaxed text-primary shadow-2xl shadow-primary/20 backdrop-blur-3xl sm:text-xl">
									<IconWithBackground
										icon={Rocket}
										className="mr-2"
									/>
									Crie PEIs personalizados em minutos, não em
									horas! Nossa IA revolucionária potencializa
									o trabalho pedagógico, garantindo que cada
									aluno receba exatamente o suporte que
									precisa para brilhar.
								</p>
							</div>

							<div className="flex items-center space-x-8 pt-4">
								<div className="text-center">
									<div className="text-2xl font-bold text-primary">
										10x
									</div>
									<div className="text-sm text-primary/70">
										Mais Rápido
									</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-primary">
										24/7
									</div>
									<div className="text-sm text-primary/70">
										Disponível
									</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold text-primary">
										BNCC
									</div>
									<div className="text-sm text-primary/70">
										Alinhado à BNCC
									</div>
								</div>
							</div>
						</div>

						<div className="relative animate-slide-in xl:col-span-2">
							<div className="relative">
								<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-primary/40 blur-3xl" />
								<div className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/20 p-4 backdrop-blur-sm md:p-6 xl:p-8">
									<Image
										width={500}
										height={400}
										src="/images/hero.jpg"
										alt="Plataforma Ponto PEI - Dashboard de IA para Educação Inclusiva"
										className="mx-auto h-auto w-full max-w-sm rounded-2xl shadow-2xl md:max-w-md lg:max-w-lg xl:max-w-xl"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Como Funciona */}
			<section id="como-funciona" className="bg-muted/30 py-16">
				<div className="container mx-auto px-4">
					<div className="mb-16 space-y-4 text-center">
						<Badge variant="secondary" className="mx-auto w-fit">
							<BarChart3 className="mr-2 h-4 w-4" />
							Análise Inteligente dos Dados
						</Badge>
						<h2 className="flex items-center justify-center text-3xl font-bold md:text-4xl">
							<IconWithBackground
								icon={Brain}
								className="mr-3 h-10 w-10"
								bgClassName="bg-primary/20"
							/>
							Nossa IA Processa Simultaneamente
						</h2>
						<p className="mx-auto max-w-3xl text-xl text-primary/70">
							Combinamos múltiplas fontes de dados para criar PEIs
							verdadeiramente personalizados e cientificamente
							embasados
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						<Card className="group cursor-pointer text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
							<CardHeader>
								<Users className="mx-auto mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
								<CardTitle className="text-lg">
									Perfil do Aluno
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-primary/70">
									Diagnóstico, idade, pontos fortes e desafios
									específicos
								</p>
							</CardContent>
						</Card>

						<Card className="group cursor-pointer text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
							<CardHeader>
								<Brain className="mx-auto mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
								<CardTitle className="text-lg">
									Base Científica
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-primary/70">
									Metodologias validadas: ABA, Vygotsky,
									Montessori, Neuroeducação
								</p>
							</CardContent>
						</Card>

						<Card className="group cursor-pointer text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
							<CardHeader>
								<GraduationCap className="mx-auto mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
								<CardTitle className="text-lg">
									Contexto Escolar
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-primary/70">
									Recursos disponíveis e realidade específica
									da escola
								</p>
							</CardContent>
						</Card>

						<Card className="group cursor-pointer text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
							<CardHeader>
								<BookOpen className="mx-auto mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
								<CardTitle className="text-lg">
									BNCC e Currículo
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-primary/70">
									Adequação às expectativas da série e
									diretrizes nacionais
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Por Que Funciona */}
			<section className="relative overflow-hidden py-16">
				{/* Background decorativo */}
				<div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/15" />
				<div className="absolute inset-0 bg-gradient-to-l from-primary/5 via-primary/10 to-transparent" />

				{/* SVGs geométricos sutis - corrigidos */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
					<div className="absolute right-10 top-10 h-40 w-40 text-primary/30">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<path
								d="M20 20 L80 20 L80 80 L20 80 Z"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<path
								d="M30 30 L70 30 L70 70 L30 70 Z"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
					</div>
					<div className="absolute bottom-10 left-10 h-32 w-32 text-primary/25">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<circle
								cx="50"
								cy="50"
								r="30"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<circle
								cx="50"
								cy="50"
								r="20"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
							<circle
								cx="50"
								cy="50"
								r="10"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
					</div>
					<div className="absolute right-1/4 top-1/2 h-28 w-28 text-primary/20">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<polygon
								points="50,15 85,75 15,75"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
					</div>
				</div>

				<div className="absolute inset-0">
					<div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
					<div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
					<div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-primary/5 blur-3xl" />
					<div className="absolute right-1/3 top-10 h-48 w-48 rounded-full bg-primary/8 blur-2xl" />
					<div className="absolute bottom-10 left-1/3 h-56 w-56 rounded-full bg-primary/6 blur-xl" />
				</div>

				<div className="container relative mx-auto px-4">
					<div className="mb-16 space-y-4 text-center">
						<h2 className="flex items-center justify-center text-3xl font-bold md:text-4xl">
							<IconWithBackground
								icon={Zap}
								className="mr-3 h-10 w-10"
								bgClassName="bg-primary/20"
							/>
							Por Que Funciona na Prática?
						</h2>
						<p className="mx-auto max-w-3xl text-xl text-primary/70">
							Nossa IA não substitui o humano, mas o potencializa
							com precisão científica e praticidade escolar
						</p>
					</div>

					<div className="grid gap-8 lg:grid-cols-3 xl:grid-cols-3 xl:gap-12">
						<Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<CardHeader>
								<Shield className="mb-4 h-12 w-12 text-primary transition-transform group-hover:rotate-12" />
								<CardTitle>Precisão Científica</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Nunca &quot;esquece&quot; de incluir
										elementos obrigatórios
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Mantém coerência entre todas as seções
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Aplica conhecimento atualizado em
										neuroeducação
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<CardHeader>
								<Zap className="mb-4 h-12 w-12 text-primary transition-transform group-hover:rotate-12" />
								<CardTitle>Praticidade Escolar</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Formulários rápidos e bem estruturados
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Planos de aula semanais individualizados
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Tudo armazenado em um só lugar
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
							<CardHeader>
								<Heart className="mb-4 h-12 w-12 text-primary transition-transform group-hover:rotate-12" />
								<CardTitle>Individualização Real</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Área individual para cada aluno
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Acesso para professor e direção
									</p>
								</div>
								<div className="flex items-start space-x-3">
									<CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
									<p className="text-primary/70">
										Compreensão holística de cada caso
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Benefícios */}
			<section
				id="beneficios"
				className="relative overflow-hidden bg-muted/30 py-16"
			>
				{/* Background decorativo */}
				<div className="absolute inset-0">
					<div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-primary/5 to-transparent" />
					<div className="animate-pulse absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-2xl" />
					<div className="animate-pulse absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-primary/15 blur-3xl delay-1000" />
					<div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-primary/8 blur-3xl" />
				</div>

				{/* SVGs geométricos sutis - corrigidos */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
					<div className="absolute left-16 top-16 h-24 w-24 text-primary/35">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<path
								d="M10 50 L50 10 L90 50 L50 90 Z"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
					</div>
					<div className="absolute right-20 top-20 h-36 w-36 text-primary/25">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<rect
								x="10"
								y="10"
								width="80"
								height="80"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
								rx="10"
							/>
							<rect
								x="20"
								y="20"
								width="60"
								height="60"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
								rx="5"
							/>
						</svg>
					</div>
					<div className="absolute bottom-16 left-1/3 h-28 w-28 text-primary/30">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<circle
								cx="50"
								cy="50"
								r="35"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
							/>
							<path
								d="M50 15 L85 50 L50 85 L15 50 Z"
								fill="none"
								stroke="currentColor"
								strokeWidth="1"
							/>
						</svg>
					</div>
				</div>

				<div className="container relative mx-auto px-4">
					<div className="mb-16 space-y-4 text-center">
						<h2 className="flex items-center justify-center text-3xl font-bold md:text-4xl">
							<IconWithBackground
								icon={Target}
								className="mr-3 h-10 w-10"
								bgClassName="bg-primary/20"
							/>
							Um Investimento no Futuro da Educação Inclusiva
						</h2>
						<p className="mx-auto max-w-3xl text-xl text-primary/70">
							A PONTO PEI não é apenas uma ferramenta tecnológica;
							é um investimento no futuro da educação inclusiva em
							sua escola
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-12">
						<div className="group cursor-pointer space-y-4 text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
								<Clock className="h-8 w-8 text-primary" />
							</div>
							<h3 className="text-xl font-semibold">
								Economia de Tempo
							</h3>
							<p className="text-primary/70">
								PEIs que levariam horas ou dias são criados em
								minutos, com maior abrangência de dados
							</p>
						</div>

						<div className="group cursor-pointer space-y-4 text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
								<Target className="h-8 w-8 text-primary" />
							</div>
							<h3 className="text-xl font-semibold">
								Personalização Máxima
							</h3>
							<p className="text-primary/70">
								Cada aluno recebe o suporte mais adequado e
								personalizado para seu desenvolvimento
							</p>
						</div>

						<div className="group cursor-pointer space-y-4 text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
								<Shield className="h-8 w-8 text-primary" />
							</div>
							<h3 className="text-xl font-semibold">
								Conformidade Legal
							</h3>
							<p className="text-primary/70">
								Elaborado em conformidade com a Lei 13.146/2015
								e Lei 9.394/1996
							</p>
						</div>

						<div className="group cursor-pointer space-y-4 text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
								<Brain className="h-8 w-8 text-primary" />
							</div>
							<h3 className="text-xl font-semibold">
								IA Avançada
							</h3>
							<p className="text-primary/70">
								Tecnologia de ponta que potencializa o trabalho
								pedagógico sem substituir o humano
							</p>
						</div>

						<div className="group cursor-pointer space-y-4 text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
								<Users className="h-8 w-8 text-primary" />
							</div>
							<h3 className="text-xl font-semibold">
								Colaboração
							</h3>
							<p className="text-primary/70">
								Facilita o trabalho em equipe entre professores,
								coordenadores e direção
							</p>
						</div>

						<div className="group cursor-pointer space-y-4 text-center">
							<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
								<BarChart3 className="h-8 w-8 text-primary" />
							</div>
							<h3 className="text-xl font-semibold">
								Acompanhamento
							</h3>
							<p className="text-primary/70">
								Monitore o progresso e atualize os planos
								conforme o desenvolvimento do aluno
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Planos e Preços */}
			<section id="precos" className="bg-muted/30 py-16">
				<div className="container mx-auto px-4">
					<div className="mb-16 space-y-4 text-center">
						<Badge variant="secondary" className="mx-auto w-fit">
							<Zap className="mr-2 h-4 w-4" />
							Planos e Preços
						</Badge>
						<h2 className="flex items-center justify-center text-3xl font-bold md:text-4xl">
							<IconWithBackground
								icon={Zap}
								className="mr-3 h-10 w-10"
								bgClassName="bg-primary/20"
							/>
							Escolha o plano ideal para sua escola
						</h2>
						<p className="mx-auto max-w-3xl text-xl text-primary/70">
							Assine e comece a criar PEIs com IA agora mesmo.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{plans.map((plan) => (
							<Card
								key={plan.name}
								className={`transition-all duration-300 hover:scale-105 hover:shadow-xl ${
									plan.className || ""
								}`}
							>
								<CardHeader>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											{plan.icon && (
												<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
													{plan.icon}
												</div>
											)}
											<CardTitle className="text-xl">
												{plan.name}
											</CardTitle>
										</div>
										{plan.badge?.text && (
											<Badge
												className={
													plan.badge.className || ""
												}
											>
												{plan.badge.text}
											</Badge>
										)}
									</div>
								</CardHeader>
								<CardContent className="space-y-4">
									<p className="text-primary/70">
										{plan.description}
									</p>
									<div className="flex items-baseline gap-2">
										<span className="text-3xl font-bold text-primary">
											{plan.priceLabel
												? plan.priceLabel
												: `R$ ${plan.price?.toFixed(
														2
												  )}`}
										</span>
										{!plan.priceLabel && (
											<span className="text-primary/60">
												/ mês
											</span>
										)}
									</div>

									<div className="space-y-2">
										{plan.features.map((feature, index) => (
											<div
												key={index}
												className="flex items-start gap-2"
											>
												<span className="mt-1 text-primary">
													{feature.icon}
												</span>
												<span className="text-primary/80">
													{feature.label}
												</span>
											</div>
										))}
									</div>

									<Button
										className={cn(
											plan.button?.className,
											"mt-4 w-full hover:text-background",
											plan.type ===
												SubscriptionPlanEnum.PREMIUM &&
												"text-background"
										)}
										asChild
									>
										<Link
											href={
												plan.type !==
												SubscriptionPlanEnum.PLUS
													? "/onboarding/plans"
													: whatsappLink
											}
										>
											{plan.button?.text || "Assinar"}
										</Link>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<CTASection
				title="Pronto para Revolucionar sua Escola?"
				description="Junte-se às escolas que já descobriram o poder da IA na educação inclusiva. Sua equipe pedagógica merece as melhores ferramentas!"
				buttonText="Começar Agora"
				buttonLink="/dashboard"
			/>
			<Footer />
		</div>
	);
}
