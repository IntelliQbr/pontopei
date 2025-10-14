"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function PreFormWarning() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const formDataStep1 = localStorage.getItem(
			"create-student-and-pei-step1"
		);

		if (formDataStep1) {
			setIsVisible(true);
		}
	}, []);

	return (
		<Alert
			className={cn(
				"w-full bg-primary/10 border border-primary/20 text-primary",
				isVisible ? "grid" : "hidden"
			)}
			variant="default"
		>
			<AlertCircleIcon />
			<AlertTitle>Formulário PEI</AlertTitle>
			<AlertDescription className="text-primary/80 inline">
				Você tem um formulário PEI em preenchimento. Basta clicar no
				botão <strong className="underline">Novo Aluno/PEI</strong> para
				continuar preenchendo.
			</AlertDescription>
		</Alert>
	);
}
