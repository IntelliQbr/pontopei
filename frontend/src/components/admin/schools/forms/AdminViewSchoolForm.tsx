"use client";

import { Button } from "@/components/ui/button";
import { School } from "@/models/interfaces/school/school.interface";
import { format } from "date-fns";
import {
	CalendarIcon,
	GraduationCap,
	MapPinIcon,
	SchoolIcon,
	UserIcon,
} from "lucide-react";

interface AdminViewSchoolFormProps {
	school: School;
	onClose: () => void;
}

export function AdminViewSchoolForm({
	school,
	onClose,
}: AdminViewSchoolFormProps) {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<SchoolIcon className="size-4" />
						</div>
						<span className="font-semibold">Nome</span>
					</div>
					<p className="text-sm">{school.name}</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<MapPinIcon className="size-4" />
						</div>
						<span className="font-semibold">Endereço</span>
					</div>
					<p className="text-sm">{school.address}</p>
				</div>

				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<UserIcon className="size-4" />
						</div>
						<span className="font-semibold">Diretor</span>
					</div>
					<p className="text-sm">
						{school.createdBy?.user?.fullName || "Sem diretor"}
					</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<UserIcon className="size-4" />
						</div>
						<span className="font-semibold">Email</span>
					</div>
					<p className="text-sm">
						{school.createdBy?.user?.email || "Sem email"}
					</p>
				</div>

				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<CalendarIcon className="size-4" />
						</div>
						<span className="font-semibold">Criada em</span>
					</div>
					<p className="text-sm">
						{school.createdAt
							? format(
									new Date(school.createdAt),
									"dd/MM/yyyy HH:mm"
							  )
							: "-"}
					</p>
				</div>

				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<CalendarIcon className="size-4" />
						</div>
						<span className="font-semibold">Atualizada em</span>
					</div>
					<p className="text-sm">
						{school.updatedAt
							? format(
									new Date(school.updatedAt),
									"dd/MM/yyyy HH:mm"
							  )
							: "-"}
					</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-primary/20 rounded-full p-1">
							<GraduationCap className="size-4" />
						</div>
						<span className="font-semibold">Professores</span>
					</div>
					<div className="text-sm flex gap-2 flex-wrap">
						{school?.profiles && school.profiles.length > 0 ? (
							school.profiles.map((profile) => (
								<span key={profile.id}>
									{profile.user.fullName},
								</span>
							))
						) : (
							<span>Nenhum professor</span>
						)}
					</div>
				</div>
			</div>
			<div className="flex justify-end pt-4">
				<Button onClick={onClose} variant="outline">
					Fechar
				</Button>
			</div>
		</div>
	);
}
