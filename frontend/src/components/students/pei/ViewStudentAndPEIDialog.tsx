"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PEI } from "@/models/interfaces/pei/pei.interface";
import { FileTextIcon, ScanEyeIcon } from "lucide-react";
import { useState } from "react";
import { CreateStudentAndPEIFormData } from "./forms/create-student-and-pei-form.schema";
import ViewStudentAndPEIForm from "./forms/ViewStudentAndPEIForm";

interface ViewStudentAndPEIDialogProps {
	pei: PEI;
}

export function ViewStudentAndPEIDialog({ pei }: ViewStudentAndPEIDialogProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size={"sm"} className="bg-primary">
					<ScanEyeIcon className="w-4 h-4 " />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-5 sm:max-w-7xl sm:max-h-full lg:h-full 2xl:h-auto">
				<DialogHeader>
					<DialogTitle className="self-start text-2xl font-bold flex items-center gap-3">
						<div className="bg-gradient-to-r from-primary to-primary/80 rounded-full p-3 text-background flex items-center justify-center shadow-md">
							<FileTextIcon className="w-6 h-6" />
						</div>
						<span className="underline decoration-primary/50 decoration-2 underline-offset-4">
							Formulário PEI
						</span>
					</DialogTitle>
					<DialogDescription className="hidden sm:block">
						Formulário utilizado na criação de um novo Aluno/PEI.
					</DialogDescription>
				</DialogHeader>
				<ViewStudentAndPEIForm
					onSuccess={() => setIsOpen(false)}
					defaultValues={
						pei.formQuestions as unknown as CreateStudentAndPEIFormData
					}
				/>
			</DialogContent>
		</Dialog>
	);
}
