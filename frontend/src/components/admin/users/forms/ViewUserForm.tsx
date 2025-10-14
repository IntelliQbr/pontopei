"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/models/interfaces/user/user.interface";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EyeOffIcon } from "lucide-react";

interface ViewUserFormProps {
	user: User;
	onClose: () => void;
}

export function ViewUserForm({ user, onClose }: ViewUserFormProps) {
	if (!user) {
		return (
			<div className="flex flex-col items-center justify-center py-10">
				<EyeOffIcon className="w-10 h-10 text-muted-foreground" />
				<p className="text-muted-foreground mt-2">
					Nenhum dado de usuário disponível
				</p>
				<Button onClick={onClose} variant="outline" className="mt-4">
					Fechar
				</Button>
			</div>
		);
	}

	const formattedCreatedAt = user.createdAt
		? format(new Date(user.createdAt), "dd 'de' MMMM 'de' yyyy", {
				locale: ptBR,
		  })
		: "N/A";

	const formattedUpdatedAt = user.updatedAt
		? format(new Date(user.updatedAt), "dd 'de' MMMM 'de' yyyy", {
				locale: ptBR,
		  })
		: "N/A";

	const getRoleBadge = (role: string) => {
		switch (role) {
			case "TEACHER":
				return (
					<Badge variant="outline" className="bg-green-100">
						Professor
					</Badge>
				);
			case "DIRECTOR":
				return (
					<Badge variant="outline" className="bg-blue-100">
						Diretor
					</Badge>
				);
			default:
				return (
					<Badge variant="outline" className="bg-gray-100">
						{role}
					</Badge>
				);
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-center">
				<Avatar className="w-20 h-20">
					<AvatarImage
						src={
							user.profile?.avatarUrl ||
							`https://avatar.vercel.sh/${user.email}`
						}
						alt={user.fullName}
					/>
					<AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
				</Avatar>
			</div>

			<div className="space-y-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<h3 className="text-sm font-medium text-muted-foreground">
							Nome
						</h3>
						<p className="text-base">{user.fullName}</p>
					</div>

					<div>
						<h3 className="text-sm font-medium text-muted-foreground">
							Email
						</h3>
						<p className="text-sm">{user.email}</p>
					</div>

					<div>
						<h3 className="text-sm font-medium text-muted-foreground">
							Função
						</h3>
						<div className="mt-1">
							{user.profile?.role
								? getRoleBadge(user.profile.role)
								: "N/A"}
						</div>
					</div>

					<div>
						<h3 className="text-sm font-medium text-muted-foreground">
							Status Admin
						</h3>
						<div className="mt-1">
							{user?.isAdmin ? (
								<Badge
									variant="outline"
									className="bg-purple-100"
								>
									Administrador
								</Badge>
							) : (
								<Badge
									variant="outline"
									className="bg-gray-100"
								>
									Usuário comum
								</Badge>
							)}
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
					<div>
						<h3 className="text-sm font-medium text-muted-foreground">
							Criado em
						</h3>
						<p className="text-sm">{formattedCreatedAt}</p>
					</div>

					<div>
						<h3 className="text-sm font-medium text-muted-foreground">
							Atualizado em
						</h3>
						<p className="text-sm">{formattedUpdatedAt}</p>
					</div>
				</div>
			</div>

			<div className="flex justify-center pt-4">
				<Button onClick={onClose} variant="outline">
					Fechar
				</Button>
			</div>
		</div>
	);
}
