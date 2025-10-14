"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormStepNavigation } from "@/components/shared/FormStepNavigation";
import { Step, Stepper } from "@/components/shared/Stepper";
import { Form } from "@/components/ui/form";
import { useStepForm } from "@/hooks/useStepForm";
import {
	CreateWeeklyPlanFormData,
	createWeeklyPlanFormSchema,
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

interface ViewWeeklyPlanFormProps {
	onSuccess: () => void;
	defaultValues: CreateWeeklyPlanFormData;
}

export default function ViewWeeklyPlanForm({
	onSuccess,
	defaultValues,
}: ViewWeeklyPlanFormProps) {
	const storageKeyPrefix = `view-weekly-plan`;

	const form = useForm<CreateWeeklyPlanFormData>({
		resolver: zodResolver(createWeeklyPlanFormSchema),
		disabled: true,
		defaultValues: defaultValues,
		mode: "all",
	});

	const { currentStep, nextStep, prevStep, progress } =
		useStepForm<CreateWeeklyPlanFormData>({
			steps,
			form,
			storageKeyPrefix,
			defaultValues: form.getValues(),
			isReadOnly: true,
		});

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

			<form onSubmit={(e) => e.preventDefault()} className="space-y-4">
				<Form {...form}>
					{renderCurrentSection()}

					<FormStepNavigation
						isSubmitting={form.formState.isSubmitting}
						currentStep={currentStep}
						totalSteps={steps.length}
						onPrevious={prevStep}
						onNext={nextStep}
						onSubmit={() => onSuccess()}
						finalButtonText="Fechar"
					/>
				</Form>
			</form>
		</div>
	);
}
