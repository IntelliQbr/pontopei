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
import { Classroom } from "@/models/interfaces/classroom/classroom.interface";
import {
	EllipsisIcon,
	EyeIcon,
	PenIcon,
	Settings2Icon,
	TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { AdminEditClassroomForm } from "./forms/AdminEditClassroomForm";
import { AdminRemoveClassroomForm } from "./forms/AdminRemoveClassroomForm";
import { AdminViewClassroomForm } from "./forms/AdminViewClassroomForm";

interface AdminClassroomActionsProps {
	classroom: Classroom;
}

export function AdminClassroomActions({
	classroom,
}: AdminClassroomActionsProps) {
	const [visibility, setVisibility] = useState<
		"view" | "edit" | "remove" | null
	>(null);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button aria-label="Ações" size={"icon"}>
						<EllipsisIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="space-y-2">
					<DropdownMenuLabel className="flex justify-between items-center gap-2">
						<span>Ações</span>
						<Settings2Icon className="w-4 h-4" />
					</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DropdownMenuItem onClick={() => setVisibility("view")}>
						<div className="text-gray-600 w-full cursor-pointer flex justify-between items-center gap-2">
							<span>Visualizar</span>
							<EyeIcon className="w-4 h-4 text-gray-600" />
						</div>
					</DropdownMenuItem>

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

			{/* View Dialog */}
			<Dialog
				open={visibility === "view"}
				onOpenChange={() => setVisibility(null)}
			>
				<DialogContent className="max-w-2xl sm:max-w-3xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<EyeIcon className="w-4 h-4" />
							<span>Visualizar Sala de Aula</span>
						</DialogTitle>
						<DialogDescription>
							Detalhes da sala de aula selecionada.
						</DialogDescription>
					</DialogHeader>
					<AdminViewClassroomForm
						classroom={classroom}
						onClose={() => setVisibility(null)}
					/>
				</DialogContent>
			</Dialog>

			{/* Edit Dialog */}
			<Dialog
				open={visibility === "edit"}
				onOpenChange={() => setVisibility(null)}
			>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<PenIcon className="w-4 h-4" />
							<span>Editar Sala de Aula</span>
						</DialogTitle>
						<DialogDescription>
							Preencha os campos abaixo para editar a sala de
							aula.
						</DialogDescription>
					</DialogHeader>
					<AdminEditClassroomForm
						classroom={classroom}
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
							<span>Remover Sala de Aula</span>
						</DialogTitle>
						<DialogDescription>
							Tem certeza que deseja remover esta sala de aula?
						</DialogDescription>
					</DialogHeader>
					<AdminRemoveClassroomForm
						classroom={classroom}
						onSuccess={() => setVisibility(null)}
						onCancel={() => setVisibility(null)}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
