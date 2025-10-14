"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { AiLoadingCard } from "@/components/shared/AiLoadingCard";
import { FormStepNavigation } from "@/components/shared/FormStepNavigation";
import { Step, Stepper } from "@/components/shared/Stepper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useStepForm } from "@/hooks/useStepForm";
import { api } from "@/lib/axios";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
	CreateWeeklyPlanFormData,
	createWeeklyPlanFormSchema,
	defaultValues,
} from "./create-weekly-plan-form.schema";
import { ActivitiesFormStep } from "./steps/ActivitiesFormStep";
import { DetailsFormStep } from "./steps/DetailsFormStep";

const steps: Step[] = [
	{
		id: 1,
		title: "Atividades",
		description: "Atividades da semana",
	},
	{
		id: 2,
		title: "Detalhamento",
		description: "Detalhamento das atividades.",
	},
];

interface CreateWeeklyPlanFormProps {
	onSuccess: () => void;
	studentId: string;
}

export default function CreateWeeklyPlanForm({
	onSuccess,
	studentId,
}: CreateWeeklyPlanFormProps) {
	const storageKeyPrefix = `create-weekly-plan-${studentId}`;

	const form = useForm<CreateWeeklyPlanFormData>({
		resolver: zodResolver(createWeeklyPlanFormSchema),
		defaultValues: defaultValues,
		mode: "all",
	});

	const { currentStep, nextStep, prevStep, progress, clearForm } =
		useStepForm<CreateWeeklyPlanFormData>({
			steps,
			form,
			storageKeyPrefix,
			defaultValues: form.getValues(),
		});

	const router = useRouter();

	const onSubmit = async (data: CreateWeeklyPlanFormData) => {
		try {
			const { step1, step2 } = data;
			const { weekEnd, weekStart, ...weekActivities } = step1;

			await api.post("/weekly-plans", {
				weekStart,
				weekEnd,
				weekActivities,
				formQuestions: step2,
				studentId,
			});

			toast.success("Plano semanal criado com sucesso!");

			clearForm();
			onSuccess();
			router.refresh();
		} catch (error) {
			toast.error("Erro ao criar o plano semanal", {
				description: getMessageFromAxiosError(error),
			});
		}
	};

	const renderCurrentSection = () => {
		switch (currentStep) {
			case 1:
				return <ActivitiesFormStep form={form} />;
			case 2:
				return <DetailsFormStep form={form} />;
			default:
				return null;
		}
	};

	return (
		<div className="w-full space-y-2 sm:space-y-4 xl:space-y-8">
			<Stepper
				steps={steps}
				currentStep={currentStep}
				progress={progress}
			/>
			<div className="flex items-center justify-between absolute sm:top-15 top-8 sm:right-2 right-0 left-65 sm:left-auto">
				<Button variant="destructive" size="sm" onClick={clearForm}>
					<TrashIcon className="w-4 h-4" />
				</Button>
			</div>

			{form.formState.isSubmitting && (
				<AiLoadingCard>
					Plano semanal sendo gerado com IA. Por favor, aguarde...
				</AiLoadingCard>
			)}

			<form onSubmit={(e) => e.preventDefault()} className="space-y-4">
				<Form {...form}>
					{renderCurrentSection()}

					<FormStepNavigation
						isSubmitting={form.formState.isSubmitting}
						currentStep={currentStep}
						totalSteps={steps.length}
						onPrevious={prevStep}
						onNext={nextStep}
						onSubmit={() => form.handleSubmit(onSubmit)()}
						finalButtonText="Finalizar Plano"
					/>
				</Form>
			</form>
		</div>
	);
}
