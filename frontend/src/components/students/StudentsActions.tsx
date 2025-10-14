"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Student } from "@/models/interfaces/student/student.intertface";
import { EllipsisIcon, PenIcon, Settings2Icon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { EditStudentForm } from "./forms/EditStudentForm";
import { RemoveStudentForm } from "./forms/RemoveStudentForm";

interface StudentsActionsProps {
	student: Student;
}

export function StudentsActions({ student }: StudentsActionsProps) {
	const [visibility, setVisibility] = useState<"edit" | "remove" | null>(
		null
	);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant={"outline"}
						aria-label="Ações"
						size={"icon"}
					>
						<EllipsisIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="space-y-2">
					<DropdownMenuLabel className="flex justify-between items-center gap-2">
						<span>Ações</span>
						<Settings2Icon className="w-4 h-4" />
					</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DropdownMenuItem onClick={() => setVisibility("edit")}>
						<div className="text-blue-500 w-full cursor-pointer flex justify-between items-center gap-2">
							<span>Editar</span>
							<PenIcon className="w-4 h-4 text-blue-500" />
						</div>
					</DropdownMenuItem>

					<DropdownMenuItem onClick={() => setVisibility("remove")}>
						<div className="text-red-500 w-full cursor-pointer flex justify-between items-center gap-2">
							<span>Excluir</span>
							<TrashIcon className="w-4 h-4 text-red-500" />
						</div>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{/* Edit Dialog */}
			<Dialog
				open={visibility === "edit"}
				onOpenChange={() => setVisibility(null)}
			>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<PenIcon className="w-4 h-4" />
							<span>Editar Aluno</span>
						</DialogTitle>
						<DialogDescription>
							Preencha os campos abaixo para editar o aluno.
						</DialogDescription>
					</DialogHeader>
					<EditStudentForm
						student={student}
						onSuccess={() => setVisibility(null)}
					/>
				</DialogContent>
			</Dialog>

			{/* Remove Dialog */}
			<Dialog
				open={visibility === "remove"}
				onOpenChange={() => setVisibility(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<TrashIcon className="w-4 h-4" />
							<span>Remover Aluno</span>
						</DialogTitle>
						<DialogDescription>
							Tem certeza que deseja remover este aluno?
						</DialogDescription>
					</DialogHeader>
					<RemoveStudentForm
						student={student}
						onSuccess={() => setVisibility(null)}
						onCancel={() => setVisibility(null)}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
