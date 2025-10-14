import { Logo } from "@/components/shared/Logo";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t py-12">
			<div className="container mx-auto px-4">
				<div className="grid gap-8 md:grid-cols-4">
					<div className="space-y-4">
						<Logo />
						<p className="text-primary/70">
							Plataforma de Inteligência Artificial para apoio à
							Educação Inclusiva
						</p>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold">Navegação</h4>
						<div className="space-y-2 text-sm text-primary/70">
							<Link
								href="/about"
								className="block transition-colors hover:text-primary"
							>
								Sobre
							</Link>
							<Link
								href="/how-it-works"
								className="block transition-colors hover:text-primary"
							>
								Como Funciona
							</Link>
							<Link
								href="/benefits"
								className="block transition-colors hover:text-primary"
							>
								Benefícios
							</Link>
						</div>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold">Empresa</h4>
						<div className="space-y-2 text-sm text-primary/70">
							<div>Sobre Nós</div>
							<div>Blog</div>
							<div>Carreiras</div>
							<div>Contato</div>
						</div>
					</div>

					<div className="space-y-4">
						<h4 className="font-semibold">Legal</h4>
						<div className="space-y-2 text-sm text-primary/70">
							<div>Privacidade</div>
							<div>Termos de Uso</div>
							<div>LGPD</div>
							<div>Cookies</div>
						</div>
					</div>
				</div>

				<div className="mt-12 border-t pt-8 text-center text-primary/70">
					<p>
						&copy; {new Date().getFullYear()} Ponto PEI. Todos os
						direitos reservados.
					</p>
				</div>
			</div>
		</footer>
	);
}
