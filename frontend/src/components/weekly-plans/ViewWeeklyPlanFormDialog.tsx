"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { WeeklyPlan } from "@/models/interfaces/weekly-plan/weekly-plan.interface";
import { format } from "date-fns";
import { CalendarIcon, ScanEyeIcon } from "lucide-react";
import { useState } from "react";
import ViewWeeklyPlanForm from "./forms/ViewWeeklyPlanForm";

interface ViewWeeklyPlanFormDialogProps {
	weeklyPlan: WeeklyPlan;
}

export function ViewCreateWeeklyPlanFormDialog({
	weeklyPlan,
}: ViewWeeklyPlanFormDialogProps) {
	const [isOpen, setIsOpen] = useState(false);

	const weekActivities = JSON.parse(
		weeklyPlan.weekActivities as unknown as string
	);
	const formQuestions = JSON.parse(
		weeklyPlan.formQuestions as unknown as string
	);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>
					<ScanEyeIcon className="w-4 h-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-5 sm:max-w-7xl sm:max-h-full lg:h-full 2xl:h-auto">
				<DialogHeader>
					<DialogTitle className="self-start text-2xl font-bold flex items-center gap-3">
						<div className="bg-gradient-to-r from-primary to-primary/80 rounded-full p-3 text-background flex items-center justify-center shadow-md">
							<CalendarIcon className="w-6 h-6" />
						</div>
						<span className="underline decoration-primary/50 decoration-2 underline-offset-4">
							Visualizar Plano Semanal
						</span>
					</DialogTitle>
					<DialogDescription className="hidden sm:block">
						Formulario utilizado para criar o plano semanal do
						aluno.
					</DialogDescription>
					<ViewWeeklyPlanForm
						onSuccess={() => setIsOpen(false)}
						defaultValues={{
							step1: {
								weekEnd: format(
									weeklyPlan.weekEnd,
									"yyyy-MM-dd"
								),
								weekStart: format(
									weeklyPlan.weekStart,
									"yyyy-MM-dd"
								),
								...weekActivities,
							},
							step2: formQuestions,
						}}
					/>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
