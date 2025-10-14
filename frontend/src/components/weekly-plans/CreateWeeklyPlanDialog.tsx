"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { WeeklyPlan } from "@/models/interfaces/weekly-plan/weekly-plan.interface";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import CreateWeeklyPlanForm from "./forms/CreateWeeklyPlanForm";

interface CreateWeeklyPlanDialogProps {
	weeklyPlans: WeeklyPlan[];
	studentId: string;
}

export function CreateWeeklyPlanDialog({
	weeklyPlans,
	studentId,
}: CreateWeeklyPlanDialogProps) {
	const [isOpen, setIsOpen] = useState(false);

	const latestWeeklyPlan = weeklyPlans.sort(
		(a, b) =>
			new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	)[0];

	const isDisabled =
		!!latestWeeklyPlan?.weekEnd &&
		new Date(latestWeeklyPlan.weekEnd).getTime() > new Date().getTime();

	const handleOpenDialog = () => {
		if (!isDisabled) {
			setIsOpen(true);
		}
	};

	return (
		<>
			<Tooltip>
				<TooltipTrigger asChild>
					<div>
						<Button
							size={"lg"}
							className="bg-primary sm:w-auto w-full"
							disabled={isDisabled}
							onClick={handleOpenDialog}
						>
							<CalendarIcon className="w-4 h-4 " />
							<span>Criar Plano Semanal</span>
						</Button>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					{isDisabled ? (
						<p>
							Você só pode criar um novo plano semanal em{" "}
							{formatDistance(
								latestWeeklyPlan.weekEnd,
								new Date(),
								{ locale: ptBR }
							)}
						</p>
					) : (
						<p>Criar Plano Semanal</p>
					)}
				</TooltipContent>
			</Tooltip>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="flex flex-col gap-5 sm:max-w-7xl sm:max-h-full lg:h-full 2xl:h-auto">
					<DialogHeader>
						<DialogTitle className="self-start text-2xl font-bold flex items-center gap-3">
							<div className="bg-gradient-to-r from-primary to-primary/80 rounded-full p-3 text-background flex items-center justify-center shadow-md">
								<CalendarIcon className="w-6 h-6" />
							</div>
							<span className="underline decoration-primary/50 decoration-2 underline-offset-4">
								Plano Semanal
							</span>
						</DialogTitle>
						<DialogDescription className="hidden sm:block">
							Crie um novo plano semanal para o aluno.
						</DialogDescription>
						<CreateWeeklyPlanForm
							onSuccess={() => setIsOpen(false)}
							studentId={studentId}
						/>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
}
