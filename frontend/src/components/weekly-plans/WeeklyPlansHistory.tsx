import { AdminWeeklyPlansApi } from "@/api/admin-weekly-plans.api";
import { WeeklyPlansApi } from "@/api/weekly-plans.api";
import { WeeklyPlan } from "@/models/interfaces/weekly-plan/weekly-plan.interface";
import { CalendarIcon } from "lucide-react";
import { DataPagination } from "../shared/DataPagination";
import { Accordion, AccordionItem } from "../ui/accordion";
import { Card, CardContent } from "../ui/card";
import { WeeklyPlanCard } from "./WeeklyPlanCard";

interface WeeklyPlansHistoryProps {
	studentId: string;
	pageParamName: string;
	currentPage: number;
	isAdmin?: boolean;
}

export async function WeeklyPlansHistory({
	studentId,
	isAdmin = false,
	pageParamName,
	currentPage,
}: WeeklyPlansHistoryProps) {
	const DEFAULT_TAKE = 5;
	const skip = currentPage === 1 ? 0 : (currentPage - 1) * DEFAULT_TAKE;

	let weeklyPlans: WeeklyPlan[] = [];
	let total = 0;

	if (isAdmin) {
		const { weeklyPlans: adminWeeklyPlans, total: adminTotal } =
			await AdminWeeklyPlansApi.findAllByStudentId(studentId, {
				skip,
				take: DEFAULT_TAKE,
			});

		weeklyPlans = adminWeeklyPlans;
		total = adminTotal;
	} else {
		const { weeklyPlans: teacherWeeklyPlans, total: teacherTotal } =
			await WeeklyPlansApi.findAllByStudentId(studentId, {
				skip,
				take: DEFAULT_TAKE,
			});

		weeklyPlans = teacherWeeklyPlans;
		total = teacherTotal;
	}

	const orderByDate = (a: WeeklyPlan, b: WeeklyPlan) => {
		return (
			new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
	};

	const totalPages = total !== 0 ? Math.ceil(total / DEFAULT_TAKE) : 0;
	const hasPagination = total > DEFAULT_TAKE;

	return (
		<div className="space-y-4 h-full flex flex-col">
			{weeklyPlans.length === 0 ? (
				<Card className="border-0 shadow-md">
					<CardContent className="p-8 text-center">
						<CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<p className="text-gray-500">
							Nenhum Plano Semanal encontrado para este aluno.
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="flex-1 h-full">
					<Accordion type="multiple" className="space-y-4">
						{weeklyPlans
							.sort(orderByDate)
							.map((weeklyPlan, index) => (
								<AccordionItem
									key={index}
									value={weeklyPlan.id}
								>
									<WeeklyPlanCard
										weeklyPlan={weeklyPlan}
										student={weeklyPlan.student}
									/>
								</AccordionItem>
							))}
					</Accordion>
				</div>
			)}
			{hasPagination && (
				<DataPagination
					totalPages={totalPages}
					pageParamName={pageParamName}
				/>
			)}
		</div>
	);
}
