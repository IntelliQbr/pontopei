"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthContext } from "@/contexts/AuthContext";
import { planStatusColors, planStatusLabels } from "@/data/plans.data";
import { api } from "@/lib/axios";
import { ProfileRoleEnum } from "@/models/enums/profile/profile-role.enum";
import { SubscriptionStatusEnum } from "@/models/enums/subscription/subscription-status.enum";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { getProgressValue } from "@/utils/math";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CreditCardIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { PlanBadge } from "../dashboard/layout/header/PlanBadge";
import { LoaderWithIcon } from "../shared/LoaerWithIcon";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

interface SuscriptionCardProps {
	onCancelSubscription: () => void;
}

export function SuscriptionCard({
	onCancelSubscription,
}: SuscriptionCardProps) {
	const { user } = useAuthContext();
	const router = useRouter();

	const { status, startDate, endDate, limits } = user?.profile
		?.subscription ?? {
		status: SubscriptionStatusEnum.ACTIVE,
		startDate: new Date(),
		endDate: new Date(),
		limits: {
			maxStudents: 0,
			maxPeiPerTrimester: 0,
			maxWeeklyPlans: 0,
		},
	};

	const { data: currentSubscriptionLimits, isLoading } = useQuery<{
		maxStudents: number;
		maxPeiPerTrimester: number;
		maxWeeklyPlans: number;
	}>({
		queryKey: ["subscription-limits"],
		queryFn: () =>
			api.get("/subscription-limits/current").then((res) => res.data),
		enabled: !!user?.profile?.subscription,
	});

	const limitsData = useMemo(() => {
		if (!currentSubscriptionLimits || isLoading) return [];

		return [
			{
				label: "Alunos",
				current: currentSubscriptionLimits.maxStudents,
				max: limits.maxStudents,
				progress: getProgressValue(
					currentSubscriptionLimits.maxStudents,
					limits.maxStudents
				),
			},
			{
				label: "PEIs por trimestre",
				current: currentSubscriptionLimits.maxPeiPerTrimester,
				max: limits.maxPeiPerTrimester,
				progress: getProgressValue(
					currentSubscriptionLimits.maxPeiPerTrimester,
					limits.maxPeiPerTrimester
				),
			},
			{
				label: "Planos Semanais",
				current: currentSubscriptionLimits.maxWeeklyPlans,
				max: limits.maxWeeklyPlans,
				progress: getProgressValue(
					currentSubscriptionLimits.maxWeeklyPlans,
					limits.maxWeeklyPlans
				),
			},
		];
	}, [currentSubscriptionLimits, limits, isLoading]);

	if (!user?.profile?.subscription)
		return (
			<LoaderWithIcon
				icon={<CreditCardIcon />}
				className="m-auto mt-10"
			/>
		);

	async function handleCancelSubscription() {
		try {
			await api.post("/payments/cancel-subscription");
			toast.success(
				`Assinatura cancelada! Seus beneficios terminam em ${format(
					new Date(endDate!),
					"P",
					{
						locale: ptBR,
					}
				)}`
			);
			router.refresh();
			onCancelSubscription();
		} catch (error) {
			toast.error("Erro ao cancelar assinatura", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Assinatura</CardTitle>
				<CardDescription>
					<PlanBadge />
				</CardDescription>
			</CardHeader>
			<Separator />
			<CardContent className="space-y-4">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground">Status</span>
					<Badge className={planStatusColors[status]}>
						{planStatusLabels[status]}
					</Badge>
				</div>
				{startDate && (
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">
							Data de Início
						</span>
						<span className="font-medium">
							{format(new Date(startDate), "P", {
								locale: ptBR,
							})}
						</span>
					</div>
				)}
				{endDate && (
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground">
							Data de Fim
						</span>
						<span className="font-medium">
							{format(new Date(endDate), "P", {
								locale: ptBR,
							})}
						</span>
					</div>
				)}
			</CardContent>
			<Separator />
			<CardFooter className="flex-col items-start">
				<h2 className="font-semibold text-lg">Limites</h2>
				<div className="flex flex-col gap-5 w-full">
					{limitsData.map((limit) => (
						<div
							key={limit.label}
							className="flex flex-col gap-2 w-full"
						>
							<div className="flex flex-col items-center justify-between w-full">
								<span className="text-muted-foreground font-semibold text-sm">
									{limit.label} ({limit.current}/{limit.max})
								</span>
								<Progress
									value={limit.progress}
									className="w-full"
								/>
							</div>
						</div>
					))}
				</div>
				{user.profile.role === ProfileRoleEnum.DIRECTOR &&
					(status === SubscriptionStatusEnum.ACTIVE ? (
						<AlertDialog>
							<AlertDialogTrigger asChild className="mt-5">
								<Button variant={"destructive"}>
									Cancelar Assinatura
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>
										Cancelar Assinatura
									</AlertDialogTitle>
									<AlertDialogDescription>
										Você tem certeza que deseja cancelar sua
										assinatura?
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel className="cursor-pointer">
										Manter meus Beneficios
									</AlertDialogCancel>
									<AlertDialogAction
										onClick={handleCancelSubscription}
										className="cursor-pointer"
									>
										Cancelar Assinatura
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					) : (
						<Button asChild className="mt-5 w-full">
							<Link href="/onboarding/plans">Ver planos</Link>
						</Button>
					))}
			</CardFooter>
		</Card>
	);
}
