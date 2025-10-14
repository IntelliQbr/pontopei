import { PeiApi } from "@/api/pei.api";
import { StudentsApi } from "@/api/students.api";
import { WeeklyPlansApi } from "@/api/weekly-plans.api";
import { NavItem } from "@/models/interfaces/nav/nav-tem.interface";
import { StatCard } from "@/models/interfaces/stats/stat-card.interface";
import {
	AlertTriangleIcon,
	BookOpenTextIcon,
	CalendarIcon,
	ChartBarIcon,
	HouseIcon,
	Users2Icon,
} from "lucide-react";

export const teacherNavItems: NavItem[] = [
	{
		label: "Dashboard",
		icon: <HouseIcon className="w-5 h-5" />,
		href: "/dashboard/teacher",
	},
	{
		label: "Alunos",
		icon: <Users2Icon className="w-5 h-5" />,
		href: "/dashboard/teacher/students",
	},
	{
		label: "Cursos",
		icon: <BookOpenTextIcon className="w-5 h-5" />,
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

export const teacherStats = async (): Promise<StatCard[]> => {
	const [
		activePEIsCount,
		expiringPEIsCount,
		studentsCount,
		weeklyPlansCount,
	] = await Promise.all([
		PeiApi.getActivePEIsCountToTeacher(),
		PeiApi.getExpiringPEIsCountToTeacher(),
		StudentsApi.getStudentsCountToTeacher(),
		WeeklyPlansApi.getWeeklyPlansCountToTeacher(),
	]);

	return [
		{
			title: "PEIs Ativos",
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
			title: "Alunos",
			value: studentsCount,
			icon: <Users2Icon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-green-500 from-10% to-background to-10%",
			iconClassName: "bg-green-500",
		},
		{
			title: "Planejamento Semanal",
			value: weeklyPlansCount,
			icon: <CalendarIcon className="h-6 w-6 text-white" />,
			className:
				"bg-gradient-to-t from-purple-500 from-10% to-background to-10%",
			iconClassName: "bg-purple-500",
		},
	];
};
