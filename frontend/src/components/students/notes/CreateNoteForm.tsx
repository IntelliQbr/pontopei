"use client";

import { SubmitButton } from "@/components/shared/SubmitButton";
import { DashboardTitle } from "@/components/typography/DashboardTitle";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/axios";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlertIcon, FileIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createNoteFormFormSchema = z.object({
	content: z
		.string()
		.nonempty("Conteúdo é obrigatório")
		.max(1000, "Máximo de 1000 caracteres"),
});

export type CreateNoteFormFormData = z.infer<typeof createNoteFormFormSchema>;

interface CreateNoteFormProps {
	studentId: string;
}

export function CreateNoteForm({ studentId }: CreateNoteFormProps) {
	const form = useForm<CreateNoteFormFormData>({
		resolver: zodResolver(createNoteFormFormSchema),
		defaultValues: {
			content: "",
		},
		mode: "onChange",
	});

	const router = useRouter();

	async function onSubmit(data: CreateNoteFormFormData) {
		try {
			await api.post("/notes", {
				...data,
				studentId,
			});

			toast.success("Anotação criada com sucesso");
			form.reset();
			router.refresh();
		} catch (error) {
			toast.error("Erro ao criar anotação", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="flex items-center justify-between gap-2 flex-wrap">
					<DashboardTitle Icon={FileIcon}>
						Nova Anotação
					</DashboardTitle>
					<div className="text-sm text-yellow-600 bg-yellow-500/10 p-2 rounded-md border border-yellow-500/20 mb-4 flex items-center gap-2">
						<CircleAlertIcon className="w-4 h-4" />
						<span>
							Os últimos 3 meses serão utilizados na renovação do
							PEI.
						</span>
					</div>
				</div>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>Conteúdo</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Digite suas observações sobre o progresso do aluno..."
									className="resize-none h-full"
									rows={15}
									{...field}
								/>
							</FormControl>
							<FormDescription>
								Com suporte a{" "}
								<Link
									href={
										"https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open"
									}
									target="_blank"
									className="text-primary underline"
								>
									markdown.
								</Link>
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<SubmitButton
					icon={<PlusIcon />}
					className="w-40 h-10"
					isLoading={form.formState.isSubmitting}
				>
					Adicionar
				</SubmitButton>
			</form>
		</Form>
	);
}
