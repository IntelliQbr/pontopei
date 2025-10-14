"use client";

import { SubmitButton } from "@/components/shared/SubmitButton";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { School } from "@/models/interfaces/school/school.interface";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const editSchoolFormFormSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    address: z.string().nonempty("Endereço é obrigatório"),
});

export type EditSchoolFormFormData = z.infer<typeof editSchoolFormFormSchema>;

interface EditSchoolFormProps {
    school: School;
    onSuccess: () => void;
}

export function EditSchoolForm({ school, onSuccess }: EditSchoolFormProps) {
    const form = useForm<EditSchoolFormFormData>({
        resolver: zodResolver(editSchoolFormFormSchema),
        defaultValues: {
            name: school?.name || "",
            address: school?.address || "",
        },
    });

    const router = useRouter();

    async function onSubmit(data: EditSchoolFormFormData) {
        try {
            await api.put(`/schools/${school.id}`, data);
            onSuccess();

            router.refresh();
            toast.success("Escola editada com sucesso");
        } catch (error) {
            toast.error("Erro ao editar escola", {
                description: getMessageFromAxiosError(error),
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Nome</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>Nome da escola.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel required>Endereço</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                Endereço da escola.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-center">
                    <SubmitButton
                        className="h-10 m-auto bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
                        icon={<PenIcon />}
                        isLoading={form.formState.isSubmitting}
                    >
                        Editar Escola
                    </SubmitButton>
                </div>
            </form>
        </Form>
    );
}
