import { ClassroomsApi } from "@/api/classrooms.api";
import { PeiApi } from "@/api/pei.api";
import { SchoolsApi } from "@/api/schools.api";
import { NavItem } from "@/models/interfaces/nav/nav-tem.interface";
import { StatCard } from "@/models/interfaces/stats/stat-card.interface";
import {
	AlertTriangleIcon,
	BookOpenText,
	ChartBarIcon,
	HouseIcon,
	SchoolIcon,
	Settings2Icon,
	ShapesIcon,
	Users2Icon,
} from "lucide-react";

export const directorNavItems: NavItem[] = [
	{
		label: "Dashboard",
		icon: <HouseIcon className="w-5 h-5" />,
		href: "/dashboard/director",
	},
	{
		label: "Alunos",
		icon: <Users2Icon className="w-5 h-5" />,
		href: "/dashboard/director/students",
	},
	{
		label: "Gerenciamento",
		icon: <Settings2Icon className="w-5 h-5" />,
		href: "/dashboard/director/management",
	},
	{
		label: "Cursos",
		icon: <BookOpenText className="w-5 h-5" />,
		href: "#",
		soon: true,
	},
	{
		label: "Relatórios",
		icon: <ChartBarIcon className="w-5 h-5" />,
		href: "#",
		soon: true,
	},
];

export const directorStats = async (): Promise<StatCard[]> => {
	const [activePEIsCount, expiringPEIsCount, schoolsCount, classroomsCount] =
		await Promise.all([
			PeiApi.getActivePEIsCountToDirector(),
			PeiApi.getExpiringPEIsCountToDirector(),
			SchoolsApi.getSchoolsCountToDirector(),
			ClassroomsApi.getClassroomsCount(),
		]);

	return [
		{
			title: "Total de Alunos com PEI",
			value: activePEIsCount,
			icon: <Users2Icon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-primary from-10% to-background to-10%",
			iconClassName: "bg-primary",
		},
		{
			title: "PEIs Expirados",
			value: expiringPEIsCount,
			icon: <AlertTriangleIcon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-yellow-500 from-10% to-background to-10%",
			iconClassName: "bg-yellow-500",
		},
		{
			title: "Escolas",
			value: schoolsCount,
			icon: <SchoolIcon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-green-500 from-10% to-background to-10%",
			iconClassName: "bg-green-500",
		},
		{
			title: "Turmas Ativas",
			value: classroomsCount,
			icon: <ShapesIcon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-purple-500 from-10% to-background to-10%",
			iconClassName: "bg-purple-500",
		},
	];
};
