import { SubscriptionPlanEnum } from "@/models/enums/subscription/subscription-plan.enum";
import { SubscriptionStatusEnum } from "@/models/enums/subscription/subscription-status.enum";
import { PlanCard } from "@/models/interfaces/plan/plan-card.interface";
import {
	CheckIcon,
	CrownIcon,
	StarIcon,
	UsersIcon,
	ZapIcon,
} from "lucide-react";

export const plans: PlanCard[] = [
	{
		type: SubscriptionPlanEnum.FIT,
		name: "FIT",
		description: "Ideal para escolas pequenas.",
		price: 249.0,
		features: [
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Uso de IA para criar documentos",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Até 5 alunos",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "5 PEIs por Trimestre",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "20 Planos Semanais",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Suporte Básico",
			},
		],
		button: {
			text: "Começar Agora",
			link: "/onboarding/plans",
			className: "bg-background text-primary",
			icon: <ZapIcon />,
		},
		icon: <ZapIcon />,
	},
	{
		type: SubscriptionPlanEnum.BASIC,
		name: "BÁSICO",
		description: "Perfeito para a maioria dos educadores.",
		price: 399.0,
		isHighlighted: true,
		features: [
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Uso de IA para criar documentos",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Até 10 alunos",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "10 PEIs por Trimestre",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "40 Planos Semanais",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Suporte Básico",
			},
		],
		button: {
			text: "Assinar",
			link: "/onboarding/plans?plan=basico",
			className:
				"bg-gradient-to-r from-blue-300 to-blue-600 text-background hover:from-blue-400 hover:to-blue-700 hover:text-background transition-all duration-300",
			icon: <UsersIcon />,
		},
		icon: <UsersIcon />,
		badge: {
			text: "Mais Popular",
			className: "bg-gradient-to-r from-blue-300 to-blue-600",
		},
	},
	{
		type: SubscriptionPlanEnum.PREMIUM,
		name: "PREMIUM",
		description: "Para profissionais que precisam de mais recursos.",
		price: 697.0,
		features: [
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Uso de IA para criar documentos",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Até 20 alunos",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "20 PEIs por Trimestre",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "100 Planos Semanais",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Suporte Premium",
			},
		],
		button: {
			text: "Upgrade",
			link: "/onboarding/plans?plan=premium",
			className: "text-primary",
			icon: <CrownIcon />,
		},
		icon: <CrownIcon />,
	},
	{
		type: SubscriptionPlanEnum.PLUS,
		name: "PLUS",
		description: "Solução empresarial personalizada.",
		priceLabel: "Sob Consulta",
		features: [
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Uso de IA para criar documentos",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Mais de 20 alunos",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Mais de 20 PEIs por Trimestre",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Mais de 100 Planos Semanais",
			},
			{
				icon: <CheckIcon className="w-4 h-4" />,
				label: "Suporte Premium",
			},
		],
		button: {
			text: "Entrar em contato",
			link: "/onboarding/plans?plan=plus",
			className:
				"bg-gradient-to-r from-purple-500 to-primary text-background hover:from-purple-600 hover:to-primary hover:text-background transition-all duration-300",
			icon: <StarIcon />,
		},
		icon: <StarIcon />,
		isHighlighted: true,
		className: "bg-purple-500/5 border-2 border-purple-500",
		badge: {
			text: "Empresarial",
			className: "bg-gradient-to-r from-purple-500 to-primary",
		},
	},
];

export const planStatusLabels: Record<SubscriptionStatusEnum, string> = {
	[SubscriptionStatusEnum.ACTIVE]: "Ativo",
	[SubscriptionStatusEnum.INACTIVE]: "Inativo",
	[SubscriptionStatusEnum.EXPIRED]: "Expirado",
	[SubscriptionStatusEnum.CANCELLED]: "Cancelado",
	[SubscriptionStatusEnum.PENDING]: "Pendente",
};

export const planStatusColors: Record<SubscriptionStatusEnum, string> = {
	[SubscriptionStatusEnum.ACTIVE]: "bg-green-500/10 text-green-700",
	[SubscriptionStatusEnum.INACTIVE]: "bg-yellow-500/10 text-yellow-600",
	[SubscriptionStatusEnum.EXPIRED]: "bg-red-500/10 text-red-600",
	[SubscriptionStatusEnum.CANCELLED]: "bg-red-500/10 text-red-600",
	[SubscriptionStatusEnum.PENDING]: "bg-yellow-500/10 text-yellow-600",
};

export const planIcons: Record<SubscriptionPlanEnum, React.ReactNode> = {
	[SubscriptionPlanEnum.FIT]: <ZapIcon className="w-4 h-4" />,
	[SubscriptionPlanEnum.BASIC]: <UsersIcon className="w-4 h-4" />,
	[SubscriptionPlanEnum.PREMIUM]: <CrownIcon className="w-4 h-4" />,
	[SubscriptionPlanEnum.PLUS]: <StarIcon className="w-4 h-4" />,
};

export const planNames: Record<SubscriptionPlanEnum, string> = {
	[SubscriptionPlanEnum.FIT]: "Fit",
	[SubscriptionPlanEnum.BASIC]: "Basico",
	[SubscriptionPlanEnum.PREMIUM]: "Premium",
	[SubscriptionPlanEnum.PLUS]: "Plus",
};
