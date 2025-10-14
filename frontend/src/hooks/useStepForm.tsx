import { Step } from "@/components/shared/Stepper";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface UseStepFormProps<T extends FieldValues> {
	steps: Step[];
	form: UseFormReturn<T>;
	storageKeyPrefix: string;
	defaultValues: T;
	isReadOnly?: boolean;
}

export function useStepForm<T extends FieldValues>(props: UseStepFormProps<T>) {
	const { steps, form, storageKeyPrefix, defaultValues, isReadOnly } = props;

	const [currentStep, setCurrentStep] = useState(1);

	const saveStepInLocalStorage = useCallback(
		(step: number) => {
			const stepKey = `step${step}` as Path<T>;
			const stepData = form.getValues(stepKey);

			const storageKey = `${storageKeyPrefix}-${stepKey}`;
			localStorage.setItem(storageKey, JSON.stringify(stepData));
		},
		[form, storageKeyPrefix]
	);

	const nextStep = useCallback(async () => {
		if (isReadOnly) {
			if (currentStep < steps.length) {
				setCurrentStep(currentStep + 1);
			}
			return;
		}

		const currentStepKey = `step${currentStep}` as Path<T>;

		await form.trigger(currentStepKey);

		const errors = form.formState.errors?.[currentStepKey];
		if (errors) {
			toast.error(
				`Por favor, preencha todos os campos obrigatórios do passo ${currentStep}.`
			);
			return;
		}

		saveStepInLocalStorage(currentStep);
		toast.info(`Passo ${currentStep} salvo com sucesso!`, {
			position: "top-center",
		});

		if (currentStep < steps.length) {
			setCurrentStep(currentStep + 1);
		}
	}, [form, currentStep, isReadOnly, steps.length, saveStepInLocalStorage]);

	const loadStepsFromLocalStorage = useCallback(() => {
		for (let i = 1; i <= steps.length; i++) {
			const stepKey = `step${i}` as Path<T>;
			const storageKey = `${storageKeyPrefix}-${stepKey}`;

			const stepData = localStorage.getItem(storageKey);
			if (stepData) {
				const stepDataParsed = JSON.parse(stepData) as T;

				form.reset({
					...form.getValues(),
					[stepKey]: stepDataParsed,
				});

				setCurrentStep(i);
			}
		}
	}, [form, storageKeyPrefix, steps.length]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			loadStepsFromLocalStorage();
		}, 100);

		return () => clearTimeout(timeout);
	}, [loadStepsFromLocalStorage]);

	const clearLocalStorage = useCallback(() => {
		for (let i = 1; i <= steps.length; i++) {
			const stepKey = `step${i}` as Path<T>;
			const storageKey = `${storageKeyPrefix}-${stepKey}`;

			localStorage.removeItem(storageKey);
		}
	}, [storageKeyPrefix, steps.length]);

	const clearForm = useCallback(() => {
		clearLocalStorage();
		form.reset(defaultValues);
		toast.info("Formulário limpo com sucesso!");
	}, [form, clearLocalStorage, defaultValues]);

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const progress = (currentStep / steps.length) * 100;

	return {
		currentStep,
		nextStep,
		prevStep,
		progress,
		clearForm,
	};
}
