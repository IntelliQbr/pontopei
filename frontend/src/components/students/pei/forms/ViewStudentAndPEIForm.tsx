"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormStepNavigation } from "@/components/shared/FormStepNavigation";
import { Step, Stepper } from "@/components/shared/Stepper";
import { Form } from "@/components/ui/form";
import { useStepForm } from "@/hooks/useStepForm";
import {
	formSchema,
	type CreateStudentAndPEIFormData,
} from "./create-student-and-pei-form.schema";
import { FamiliarInformationsFormStep } from "./steps/FamiliarInformationsFormStep";
import { HealthDevelopmentTherapiesFormStep } from "./steps/HealthDevelopmentTherapiesFormStep";
import { IdentificationFormStep } from "./steps/IdentificationFormStep";
import { PedagogicalObservationsFormStep } from "./steps/PedagogicalObservationsFormStep";
import { PreferencesStrategiesFormStep } from "./steps/PreferencesStrategiesFormStep";

const steps: Step[] = [
	{
		id: 1,
		title: "Identificação",
		description: "Informações básicas do aluno",
	},
	{
		id: 2,
		title: "Observações Pedagógicas",
		description: "Avaliação do professor",
	},
	{
		id: 3,
		title: "Informações Familiares",
		description: "Dados dos pais/responsáveis",
	},
	{
		id: 4,
		title: "Saúde e Terapias",
		description: "Desenvolvimento e saúde",
	},
	{
		id: 5,
		title: "Preferências e Estratégias",
		description: "Gatilhos e interesses",
	},
];

interface ViewStudentAndPEIFormProps {
	onSuccess: () => void;
	isRenewal?: boolean;
	defaultValues?: CreateStudentAndPEIFormData;
}

export default function ViewStudentAndPEIForm({
	onSuccess,
	defaultValues,
}: ViewStudentAndPEIFormProps) {
	const storageKeyPrefix = "create-student-and-pei";

	const form = useForm<CreateStudentAndPEIFormData>({
		resolver: zodResolver(formSchema),
		disabled: true,
		defaultValues: defaultValues,
		mode: "all",
	});

	const { currentStep, nextStep, prevStep, progress } =
		useStepForm<CreateStudentAndPEIFormData>({
			steps,
			form,
			storageKeyPrefix,
			defaultValues: form.getValues(),
			isReadOnly: true,
		});

	const renderCurrentSection = () => {
		switch (currentStep) {
			case 1:
				return <IdentificationFormStep form={form} />;
			case 2:
				return <PedagogicalObservationsFormStep form={form} />;
			case 3:
				return <FamiliarInformationsFormStep form={form} />;
			case 4:
				return <HealthDevelopmentTherapiesFormStep form={form} />;
			case 5:
				return <PreferencesStrategiesFormStep form={form} />;
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
