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
import { User } from "@/models/interfaces/user/user.interface";
import {
	EllipsisIcon,
	EyeIcon,
	PenIcon,
	Settings2Icon,
	ShieldIcon,
	TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { EditUserForm } from "./forms/EditUserForm";
import { RemoveUserForm } from "./forms/RemoveUserForm";
import { SetAdminUserForm } from "./forms/SetAdminUserForm";
import { ViewUserForm } from "./forms/ViewUserForm";

interface UserActionsProps {
	user: User;
}

export function UsersActions({ user }: UserActionsProps) {
	const [visibility, setVisibility] = useState<
		"edit" | "remove" | "view" | "setAdmin" | null
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

					<DropdownMenuItem onClick={() => setVisibility("setAdmin")}>
						<div className="text-purple-500 w-full cursor-pointer flex justify-between items-center gap-2">
							<span>Permissões</span>
							<ShieldIcon className="w-4 h-4 text-purple-500" />
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
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<EyeIcon className="w-4 h-4" />
							<span>Visualizar Usuário</span>
						</DialogTitle>
						<DialogDescription>
							Detalhes do usuário selecionado.
						</DialogDescription>
					</DialogHeader>
					<ViewUserForm
						user={user}
						onClose={() => setVisibility(null)}
					/>
				</DialogContent>
			</Dialog>

			{/* Edit Dialog */}
			<Dialog
				open={visibility === "edit"}
				onOpenChange={() => setVisibility(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<PenIcon className="w-4 h-4" />
							<span>Editar Usuário</span>
						</DialogTitle>
						<DialogDescription>
							Preencha os campos abaixo para editar o usuário.
						</DialogDescription>
					</DialogHeader>
					<EditUserForm
						user={user}
						onSuccess={() => setVisibility(null)}
					/>
				</DialogContent>
			</Dialog>

			{/* Set Admin Dialog */}
			<Dialog
				open={visibility === "setAdmin"}
				onOpenChange={() => setVisibility(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<ShieldIcon className="w-4 h-4" />
							<span>Permissões de Administrador</span>
						</DialogTitle>
						<DialogDescription>
							Defina as permissões de administrador para este
							usuário.
						</DialogDescription>
					</DialogHeader>
					<SetAdminUserForm
						user={user}
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
							<span>Remover Usuário</span>
						</DialogTitle>
						<DialogDescription>
							Tem certeza que deseja remover este usuário?
						</DialogDescription>
					</DialogHeader>
					<RemoveUserForm
						user={user}
						onSuccess={() => setVisibility(null)}
						onCancel={() => setVisibility(null)}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
