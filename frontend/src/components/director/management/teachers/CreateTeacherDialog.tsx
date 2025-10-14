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
import { GraduationCapIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { CreateTeacherForm } from "./forms/CreateTeacherForm";

export function CreateTeacherDialog() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					size={"lg"}
					className="bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90"
				>
					<PlusIcon className="w-4 h-4" />
					<span>Novo Professor</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<GraduationCapIcon className="w-4 h-4" />
						<span>Novo Professor</span>
					</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo para criar um novo professor.
					</DialogDescription>
				</DialogHeader>
				<CreateTeacherForm onSuccess={() => setIsOpen(false)} />
			</DialogContent>
		</Dialog>
	);
}
