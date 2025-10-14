"use client";

import { AdminSchoolsApi } from "@/api/admin-schools.api";
import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { School } from "@/models/interfaces/school/school.interface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { AlertTriangleIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AdminRemoveSchoolFormProps {
	school: School;
	onSuccess: () => void;
	onCancel: () => void;
}

export function AdminRemoveSchoolForm({
	school,
	onSuccess,
	onCancel,
}: AdminRemoveSchoolFormProps) {
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	async function onSubmit() {
		setIsLoading(true);

		try {
			await AdminSchoolsApi.remove(school.id);
			onSuccess();
			router.refresh();
			toast.success("Escola removida com sucesso");
		} catch (error) {
			toast.error("Erro ao remover escola", {
				description: getMessageFromAxiosError(error),
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="space-y-4">
			<div className="bg-destructive/10 p-1 rounded flex items-center gap-2">
				<AlertTriangleIcon className="text-destructive" />
				<p className="text-destructive text-sm">
					Ao confirmar a remoção, todos os dados da escola serão
					permanentemente removidos.
				</p>
			</div>
			<div className="flex gap-2 justify-end">
				<Button onClick={onCancel} type="button" variant={"outline"}>
					Cancelar
				</Button>
				<SubmitButton
					onClick={onSubmit}
					size={"default"}
					className="h-9 w-24 bg-gradient-to-r from-red-400 to-red-600 hover:opacity-90"
					icon={<TrashIcon />}
					variant={"destructive"}
					isLoading={isLoading}
				>
					Remover
				</SubmitButton>
			</div>
		</div>
	);
}
