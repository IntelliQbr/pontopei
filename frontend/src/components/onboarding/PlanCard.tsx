"use client";

import { api } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { SubscriptionPlanEnum } from "@/models/enums/subscription/subscription-plan.enum";
import { PlanCard as PlanCardType } from "@/models/interfaces/plan/plan-card.interface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { SubmitButton } from "../shared/SubmitButton";
import { whatsappLink } from "../support/HelpButton";
import { H2 } from "../typography/H2";
import { Muted } from "../typography/Muted";

interface PlanCardProps {
	plan: PlanCardType;
}

export function PlanCard({ plan }: PlanCardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const backUrl = process.env.NEXT_PUBLIC_APP_URL + "/dashboard";

	async function handleSubscribe() {
		setIsLoading(true);
		try {
			const response = await api.post("/payments/subscribe", {
				planType: plan.type,
				backUrl,
			});

			const data = response.data;

			router.push(data.checkoutUrl);
		} catch (error) {
			toast.error("Erro ao assinar o plano", {
				description: getMessageFromAxiosError(error),
			});
			setIsLoading(false);
		}
	}

	return (
		<div
			className={cn(
				"relative bg-primary/5 shadow-xl flex flex-col gap-5 items-center border border-primary p-5 pb-20 rounded-lg sm:max-w-xs max-w-sm w-full hover:scale-105 transition-all duration-300",
				plan.isHighlighted && "bg-primary/15 border-2 shadow-2xl",
				plan.className
			)}
		>
			{plan.badge && (
				<div
					className={cn(
						"absolute -top-3 text-sm text-background px-2 py-1 rounded-full font-semibold",
						plan.badge.className
					)}
				>
					{plan.badge.text}
				</div>
			)}
			<div className="flex flex-col gap-2 items-center w-full">
				<div className="size-20 flex justify-center items-center bg-primary text-background rounded-xl">
					{plan.icon}
				</div>
				<H2 className="text-center self-stretch">{plan.name}</H2>
				<Muted className="text-center">{plan.description}</Muted>
			</div>
			{plan.price && (
				<div className="flex gap-1 items-end">
					<span className="text-5xl text-primary font-semibold">
						R${plan.price}
					</span>
					<span>/mês</span>
				</div>
			)}
			{plan.priceLabel && (
				<div className="flex gap-1 items-end">
					<span className="text-4xl text-primary font-semibold">
						{plan.priceLabel}
					</span>
				</div>
			)}
			<div className="flex flex-col gap-5 w-full border-y border-primary p-2">
				{plan.features.map((feature, index) => (
					<div key={index} className="flex gap-1 items-center">
						<div className="p-0.5 flex justify-center items-center bg-primary text-background rounded-full">
							{feature.icon}
						</div>
						<strong className="text-sm">{feature.label}</strong>
					</div>
				))}
			</div>
			{plan.type === SubscriptionPlanEnum.PLUS ? (
				<SubmitButton
					variant={"outline"}
					icon={plan.button.icon}
					className={cn("h-12", plan.button.className)}
					isLoading={isLoading}
				>
					<Link
						href={`${whatsappLink}?text=Olá, gostaria de contratar um plano personalizado para o Ponto PEI.`}
						target="_blank"
					>
						{plan.button.text}
					</Link>
				</SubmitButton>
			) : (
				<SubmitButton
					onClick={handleSubscribe}
					variant={"outline"}
					icon={plan.button.icon}
					className={cn("h-12", plan.button.className)}
					isLoading={isLoading}
				>
					{plan.button.text}
				</SubmitButton>
			)}
		</div>
	);
}
