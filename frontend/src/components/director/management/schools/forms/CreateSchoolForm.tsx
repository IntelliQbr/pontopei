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
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createSchoolFormFormSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório"),
    address: z.string().nonempty("Endereço é obrigatório"),
});

export type CreateSchoolFormFormData = z.infer<
    typeof createSchoolFormFormSchema
>;

interface CreateSchoolFormProps {
    onSuccess: () => void;
}

export function CreateSchoolForm({ onSuccess }: CreateSchoolFormProps) {
    const form = useForm<CreateSchoolFormFormData>({
        resolver: zodResolver(createSchoolFormFormSchema),
        defaultValues: {
            name: "",
            address: "",
        },
    });

    const router = useRouter();

    async function onSubmit(data: CreateSchoolFormFormData) {
        try {
            await api.post("/schools", data);
            onSuccess();

            router.refresh();
            toast.success("Escola criada com sucesso");
        } catch (error) {
            toast.error("Erro ao criar escola", {
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
                        icon={<PlusIcon />}
                        isLoading={form.formState.isSubmitting}
                    >
                        Criar Escola
                    </SubmitButton>
                </div>
            </form>
        </Form>
    );
}
