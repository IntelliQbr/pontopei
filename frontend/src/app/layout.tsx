import { HelpButton } from "@/components/support/HelpButton";
import type { Metadata } from "next";
import "./globals.css";
import { RootProviders } from "./providers";

export const metadata: Metadata = {
	title: {
		template: "%s | Ponto PEI",
		default: "Ponto PEI",
	},
	description:
		"A Plataforma Ponto PEI é um sistema inteligente de apoio ao Atendimento Educacional Especializado (AEE), voltado para escolas, professores e equipes pedagógicas que desejam elaborar, revisar e aplicar Planos Educacionais Individualizados (PEI) com o suporte de Inteligência Artificial.",
};

export interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<>
			<html lang="pt-BR" suppressHydrationWarning>
				<head />
				<body className="h-screen antialiased">
					<RootProviders>
						{children}
						<HelpButton className="fixed sm:bottom-5 bottom-2 sm:right-5 right-2" />
					</RootProviders>
				</body>
			</html>
		</>
	);
}
