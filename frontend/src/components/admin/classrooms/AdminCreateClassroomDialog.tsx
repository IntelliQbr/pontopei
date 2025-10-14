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
import { PlusIcon, UsersIcon } from "lucide-react"; // Ícone para classroom
import { useState } from "react";
import { AdminCreateClassroomForm } from "./forms/AdminCreateClassroomForm";

export function AdminCreateClassroomDialog() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					size={"lg"}
					className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
				>
					<PlusIcon className="w-4 h-4" />
					<span>Nova Sala de Aula</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<UsersIcon className="w-4 h-4" />
						<span>Nova Sala de Aula</span>
					</DialogTitle>
					<DialogDescription>
						Preencha os campos abaixo para criar uma nova sala de
						aula.
					</DialogDescription>
				</DialogHeader>
				<AdminCreateClassroomForm onSuccess={() => setIsOpen(false)} />
			</DialogContent>
		</Dialog>
	);
}
