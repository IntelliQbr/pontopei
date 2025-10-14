"use client";

import { PrintButton } from "@/components/shared/PrintButton";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, SettingsIcon } from "lucide-react";
import { FamiliarInformationsFormStepPrintableForm } from "./forms/steps/FamiliarInformationsFormStep";

export function StudentAndPEIMoreOptionsMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"outline"}>
					<MoreVerticalIcon className="w-4 h-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className="flex items-center justify-between gap-2">
					<span>Mais opções</span>
					<SettingsIcon className="w-4 h-4" />
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<PrintButton
						PrintableElement={
							FamiliarInformationsFormStepPrintableForm
						}
						documentTitle="Formulário PEI"
						buttonLabel="Imprimir formulário/responsáveis"
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
