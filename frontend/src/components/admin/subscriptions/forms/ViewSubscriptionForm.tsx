"use client";

import { AdminSubscriptionsApi } from "@/api/admin-subscriptions.api";
import { LoaderWithIcon } from "@/components/shared/LoaerWithIcon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { planNames, planStatusLabels } from "@/data/plans.data";
import { cn } from "@/lib/utils";
import { Subscription } from "@/models/interfaces/subscription/subscription.interface";
import { getProgressValue } from "@/utils/math";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
	CalendarIcon,
	CheckCircleIcon,
	CreditCardIcon,
	DollarSignIcon,
	HashIcon,
	XCircleIcon,
} from "lucide-react";
import { useMemo } from "react";

interface ViewSubscriptionFormProps {
	subscription: Subscription;
	directorId: string;
	onClose: () => void;
}

export function ViewSubscriptionForm({
	subscription,
	directorId,
	onClose,
}: ViewSubscriptionFormProps) {
	const { data: currentLimits, isLoading } = useQuery({
		queryKey: ["subscription-limits", directorId],
		queryFn: () => AdminSubscriptionsApi.findSubscriptionLimits(directorId),
		enabled: !!directorId,
	});

	const limits = useMemo(
		() => [
			{
				name: "Alunos",
				value: currentLimits?.maxStudents,
				max: subscription?.limits.maxStudents,
				progress: getProgressValue(
					currentLimits?.maxStudents || 0,
					subscription?.limits.maxStudents || 0
				),
			},
			{
				name: "PEIs por Trimestre",
				value: currentLimits?.maxPeiPerTrimester,
				max: subscription?.limits.maxPeiPerTrimester,
				progress: getProgressValue(
					currentLimits?.maxPeiPerTrimester || 0,
					subscription?.limits.maxPeiPerTrimester || 0
				),
			},
			{
				name: "Planos Semanais",
				value: currentLimits?.maxWeeklyPlans,
				max: subscription?.limits.maxWeeklyPlans,
				progress: getProgressValue(
					currentLimits?.maxWeeklyPlans || 0,
					subscription?.limits.maxWeeklyPlans || 0
				),
			},
		],
		[currentLimits, subscription]
	);

	return (
		<div className="space-y-8">
			{/* Seção 1: Informações Básicas */}
			<div className="space-y-6 border-2 border-primary/30 rounded-lg p-4">
				<div>
					<h2 className="text-xl font-semibold">
						Informações Básicas
					</h2>
					<Separator className="mt-2" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div>
						<div className="flex items-center gap-2 mb-2">
							<div className="bg-primary/20 rounded-full p-1">
								<DollarSignIcon className="size-4" />
							</div>
							<span className="font-semibold">Preço</span>
						</div>
						<p className="text-sm">
							R$ {subscription.price.toFixed(2)}
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 mb-2">
							<div className="bg-primary/20 rounded-full p-1">
								<CreditCardIcon className="size-4" />
							</div>
							<span className="font-semibold">Tipo de Plano</span>
						</div>
						<p className="text-sm">
							{planNames[subscription.planType]}
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 mb-2">
							<div className="bg-primary/20 rounded-full p-1">
								<CheckCircleIcon className="size-4" />
							</div>
							<span className="font-semibold">Status</span>
						</div>
						<p className="text-sm">
							{planStatusLabels[subscription.status]}
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 mb-2">
							<div className="bg-primary/20 rounded-full p-1">
								<CalendarIcon className="size-4" />
							</div>
							<span className="font-semibold">
								Data de Início
							</span>
						</div>
						<p className="text-sm">
							{subscription.startDate
								? format(
										new Date(subscription.startDate),
										"dd/MM/yyyy",
										{ locale: ptBR }
								  )
								: "N/A"}
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 mb-2">
							<div className="bg-primary/20 rounded-full p-1">
								<CalendarIcon className="size-4" />
							</div>
							<span className="font-semibold">
								Data de Término
							</span>
						</div>
						<p className="text-sm">
							{subscription.endDate
								? format(
										new Date(subscription.endDate),
										"dd/MM/yyyy",
										{ locale: ptBR }
								  )
								: "N/A"}
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 mb-2">
							<div className="bg-primary/20 rounded-full p-1">
								<HashIcon className="size-4" />
							</div>
							<span className="font-semibold">ID Externo</span>
						</div>
						<p className="text-xs">
							{subscription.externalId || "N/A"}
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 mb-2">
							<div className="bg-primary/20 rounded-full p-1">
								<CalendarIcon className="size-4" />
							</div>
							<span className="font-semibold">Criado em</span>
						</div>
						<p className="text-sm">
							{format(
								new Date(subscription.createdAt),
								"dd/MM/yyyy HH:mm",
								{ locale: ptBR }
							)}
						</p>
					</div>
					<div>
						<div className="flex items-center gap-2 mb-2">
							<div className="bg-primary/20 rounded-full p-1">
								<CalendarIcon className="size-4" />
							</div>
							<span className="font-semibold">Atualizado em</span>
						</div>
						<p className="text-sm">
							{format(
								new Date(subscription.updatedAt),
								"dd/MM/yyyy HH:mm",
								{ locale: ptBR }
							)}
						</p>
					</div>
				</div>
			</div>

			{/* Seção 2: Limites */}
			<div className="space-y-6 border-2 border-primary/30 rounded-lg p-4">
				<div>
					<h2 className="text-xl font-semibold">Limites</h2>
					<Separator className="mt-2" />
					<p className="text-sm text-muted-foreground mt-2">
						Uso atual vs limite máximo.
					</p>
				</div>

				{isLoading ? (
					<LoaderWithIcon icon={<CreditCardIcon />} />
				) : (
					<div className="space-y-6">
						{limits.map((limit) => (
							<div key={limit.name}>
								<div className="flex justify-between mb-1">
									<span>{limit.name}</span>
									<span>
										{limit.value} / {limit.max}
									</span>
								</div>
								<Progress value={limit.progress} />
							</div>
						))}
					</div>
				)}
			</div>

			{/* Seção 3: Recursos */}
			<div className="space-y-6 border-2 border-primary/30 rounded-lg p-4">
				<div>
					<h2 className="text-xl font-semibold">Recursos</h2>
					<Separator className="mt-2" />
				</div>

				<div
					className={cn(
						"flex items-center gap-2 rounded-lg p-2 border justify-between",
						subscription.features.premiumSupport
							? "bg-green-500/10 border-green-500/20"
							: "bg-red-500/10 border-red-500/20"
					)}
				>
					<span
						className={cn(
							"font-semibold",
							subscription.features.premiumSupport
								? "text-green-600"
								: "text-red-500"
						)}
					>
						Suporte Premium
					</span>
					{subscription.features.premiumSupport ? (
						<CheckCircleIcon className="size-4 text-green-600" />
					) : (
						<XCircleIcon className="size-4 text-red-500" />
					)}
				</div>
			</div>

			{/* Botão Fechar */}
			<div className="flex justify-end">
				<Button onClick={onClose}>Fechar</Button>
			</div>
		</div>
	);
}
