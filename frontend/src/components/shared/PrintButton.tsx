"use client";

import { cn } from "@/lib/utils";
import { generatePrintableForm } from "@/utils/forms";
import { PrinterIcon } from "lucide-react";
import { ComponentProps, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/button";

interface PrintButtonProps extends ComponentProps<typeof Button> {
	documentTitle: string;
	PrintableElement: ReturnType<typeof generatePrintableForm>;
	buttonLabel?: string;
}

export function PrintButton({
	documentTitle,
	PrintableElement,
	buttonLabel = "Imprimir",
	...props
}: PrintButtonProps) {
	const printRef = useRef<HTMLDivElement>(null);

	const handlePrint = useReactToPrint({
		contentRef: printRef,
		documentTitle,
		pageStyle: `
			@page {
				size: A4;
				margin: 2cm;
			}
		`,
	});

	return (
		<>
			<Button
				type="button"
				variant="outline"
				size="sm"
				onClick={handlePrint}
				{...props}
				className={cn("flex items-center gap-2", props.className)}
			>
				<PrinterIcon className="w-4 h-4" />
				<span className="hidden md:block">{buttonLabel}</span>
			</Button>
			<div className="hidden">
				<div ref={printRef}>
					<PrintableElement />
				</div>
			</div>
		</>
	);
}
