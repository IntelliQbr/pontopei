"use client";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { User } from "@/models/interfaces/user/user.interface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { AlertTriangleIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface RemoveTeacherFormProps {
    teacher: User;
    onSuccess: () => void;
    onCancel: () => void;
}

export function RemoveTeacherForm({
    teacher,
    onSuccess,
    onCancel,
}: RemoveTeacherFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function onSubmit() {
        setIsLoading(true);

        try {
            await api.delete(`/teachers/${teacher.id}`);

            onSuccess();
            router.refresh();
            toast.success("Professor removido com sucesso");
        } catch (error) {
            toast.error("Erro ao remover professor", {
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
                    Ao confirmar a remoção, todos os dados do professor serão
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
