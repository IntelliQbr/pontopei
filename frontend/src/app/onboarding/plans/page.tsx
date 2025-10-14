import { PlanCard } from "@/components/onboarding/PlanCard";
import { H1 } from "@/components/typography/H1";
import { Muted } from "@/components/typography/Muted";
import { plans } from "@/data/plans.data";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Escolha o Plano Ideal",
};

export default function Page() {
	return (
		<div className="mt-10">
			<div className="flex flex-col items-center gap-2">
				<H1>
					Escolha o Plano <span className="text-primary">Ideal</span>
				</H1>
				<Muted className="text-center">
					Selecione o plano perfeito para você e seus alunos. Todos os
					planos incluem nossa tecnologia de IA avançada para otimizar
					o aprendizado.
				</Muted>
			</div>

			<div className="flex lg:flex-row flex-col justify-center items-center sm:gap-5 gap-10 mt-10">
				{plans.map((plan) => {
					return <PlanCard key={plan.name} plan={plan} />;
				})}
			</div>
			<div className="flex flex-col items-center gap-2 mt-10">
				<Muted className="text-center">
					Se você está procurando um plano empresarial, entre em
					contato conosco para receber uma proposta personalizada.
				</Muted>
			</div>
		</div>
	);
}
