import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Ponto PEI",
		short_name: "Ponto PEI",
		description:
			"A Plataforma Ponto PEI é um sistema inteligente de apoio ao Atendimento Educacional Especializado (AEE), voltado para escolas, professores e equipes pedagógicas que desejam elaborar, revisar e aplicar Planos Educacionais Individualizados (PEI) com o suporte de Inteligência Artificial.",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#297AF5",
		icons: [
			{
				src: "/icons/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/icons/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
			{
				src: "/icons/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
		lang: "pt-BR",
		categories: ["education", "school", "learning", "ai"],
	};
}
