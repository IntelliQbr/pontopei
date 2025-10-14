"use client";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

interface FormStepNavigationProps {
	currentStep: number;
	totalSteps: number;
	onPrevious: () => void;
	onNext: () => void;
	onSubmit: () => void;
	isSubmitting: boolean;
	finalButtonText?: string;
}

export function FormStepNavigation({
	currentStep,
	totalSteps,
	onPrevious,
	onNext,
	onSubmit,
	isSubmitting,
	finalButtonText = "Finalizar",
}: FormStepNavigationProps) {
	return (
		<div className="flex justify-between">
			<Button
				type="button"
				variant="outline"
				onClick={onPrevious}
				disabled={currentStep === 1}
				className="flex items-center gap-2 bg-transparent"
			>
				<ChevronLeft className="w-4 h-4" />
				Anterior
			</Button>

			{currentStep < totalSteps ? (
				<Button
					type="button"
					onClick={onNext}
					className="flex items-center gap-2"
				>
					Próximo
					<ChevronRight className="w-4 h-4" />
				</Button>
			) : (
				<SubmitButton
					icon={<Check className="w-4 h-4" />}
					className="flex items-center gap-2 w-[150px] h-[40px]"
					onClick={onSubmit}
					isLoading={isSubmitting}
				>
					{finalButtonText}
				</SubmitButton>
			)}
		</div>
	);
}
