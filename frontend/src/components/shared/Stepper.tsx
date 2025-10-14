import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

export interface Step {
	id: number;
	title: string;
	description: string;
}

export interface StepperProps {
	steps: Step[];
	currentStep: number;
	progress: number;
}

export function Stepper({ steps, currentStep, progress }: StepperProps) {
	return (
		<div className="space-y-4">
			<Progress value={progress} className="w-full" />
			<div className="flex justify-between">
				{steps.map((step) => (
					<div
						key={step.id}
						className={`flex flex-col items-center space-y-2 ${
							step.id === currentStep
								? "text-primary"
								: step.id < currentStep
								? "text-green-600"
								: "text-muted-foreground"
						}`}
					>
						<div
							className={`lg:w-10 lg:h-10 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
								step.id === currentStep
									? "border-primary bg-primary text-primary-foreground"
									: step.id < currentStep
									? "border-green-600 bg-green-600 text-white"
									: "border-muted-foreground"
							}`}
						>
							{step.id < currentStep ? (
								<Check className="w-5 h-5" />
							) : (
								step.id
							)}
						</div>
						<div className="text-center">
							<p className="font-medium sm:text-sm hidden sm:block">
								{step.title}
							</p>
							<p className="text-xs text-muted-foreground hidden lg:block">
								{step.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
