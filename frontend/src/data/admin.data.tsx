import { AdminMetricsApi } from "@/api/admin-metrics.api";
import { ChartConfig } from "@/components/ui/chart";
import { NavItem } from "@/models/interfaces/nav/nav-tem.interface";
import { StatCard } from "@/models/interfaces/stats/stat-card.interface";
import {
	ArrowLeftIcon,
	BrainIcon,
	CalendarIcon,
	CreditCardIcon,
	FileTextIcon,
	SchoolIcon,
	Settings2Icon,
	ShapesIcon,
	ShieldCheckIcon,
	Users2Icon,
	UsersIcon,
} from "lucide-react";

export const adminNavItems: NavItem[] = [
	{
		label: "Dashboard",
		icon: <ShieldCheckIcon className="w-5 h-5" />,
		href: "/dashboard/admin",
	},
	{
		label: "Alunos",
		icon: <Users2Icon className="w-5 h-5" />,
		href: "/dashboard/admin/students",
	},
	{
		label: "Usuários",
		icon: <UsersIcon className="w-5 h-5" />,
		href: "/dashboard/admin/users",
	},
	{
		label: "Gerenciamento",
		icon: <Settings2Icon className="w-5 h-5" />,
		href: "/dashboard/admin/management",
	},
	{
		label: "Assinaturas",
		icon: <CreditCardIcon className="w-5 h-5" />,
		href: "/dashboard/admin/subscriptions",
	},
	{
		label: "Voltar",
		icon: <ArrowLeftIcon className="w-5 h-5" />,
		href: "/dashboard",
	},
];

export const adminStats = async (): Promise<StatCard[]> => {
	const metrics = await AdminMetricsApi.getAdminMetrics();

	return [
		{
			title: "Total de Alunos",
			value: metrics.totalStudents,
			icon: <Users2Icon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-primary from-10% to-background to-10%",
			iconClassName: "bg-primary",
		},
		{
			title: "Total de PEIs",
			value: metrics.totalPEIs,
			icon: <FileTextIcon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-yellow-500 from-10% to-background to-10%",
			iconClassName: "bg-yellow-500",
		},
		{
			title: "Total de Usuários",
			value: metrics.totalUsers,
			icon: <UsersIcon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-green-500 from-10% to-background to-10%",
			iconClassName: "bg-green-500",
		},
		{
			title: "Total de Escolas",
			value: metrics.totalSchools,
			icon: <SchoolIcon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-blue-500 from-10% to-background to-10%",
			iconClassName: "bg-blue-500",
		},
		{
			title: "Total de Turmas",
			value: metrics.totalClassrooms,
			icon: <ShapesIcon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-purple-500 from-10% to-background to-10%",
			iconClassName: "bg-purple-500",
		},
		{
			title: "Planos Semanais",
			value: metrics.totalWeeklyPlans,
			icon: <CalendarIcon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-red-500 from-10% to-background to-10%",
			iconClassName: "bg-red-500",
		},
		{
			title: "Requisições para AI",
			value: metrics.totalAIRequests,
			icon: <BrainIcon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-pink-500 from-10% to-background to-10%",
			iconClassName: "bg-pink-500",
		},
		{
			title: "Assinaturas",
			value: metrics.totalSubscriptions,
			icon: <CreditCardIcon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-cyan-500 from-10% to-background to-10%",
			iconClassName: "bg-cyan-500",
		},
	];
};

export const adminSubscriptionsChartConfig = {
	amount: {
		label: "Valor Total",
		color: "hsl(var(--chart-1))",
	},
	total: {
		label: "Assinaturas",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;
