"use client";

import { SubmitButton } from "@/components/shared/SubmitButton";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/AuthContext";
import { api } from "@/lib/axios";
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlocksIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signUpFormFormSchema = z
	.object({
		fullName: z
			.string("O nome deve ser preenchido.")
			.nonempty("O nome deve ser preenchido.")
			.min(3, "O nome deve ter no mínimo 3 caracteres.")
			.max(100, "O nome deve ter no máximo 100 caracteres."),

		email: z
			.string("O email deve ser preenchido.")
			.nonempty("O email deve ser preenchido.")
			.email("O email deve ser valido."),

		password: z
			.string("A senha deve ser preenchida.")
			.nonempty("A senha deve ser preenchida.")
			.min(8, "A senha deve ter no mínimo 8 caracteres.")
			.max(20, "A senha deve ter no máximo 20 caracteres."),

		confirmPassword: z
			.string("A confirmação de senha deve ser preenchida.")
			.nonempty("A confirmação de senha deve ser preenchida.")
			.min(8, "A confirmação de senha deve ter no mínimo 8 caracteres.")
			.max(
				20,
				"A confirmação de senha deve ter no máximo 20 caracteres."
			),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas não coincidem.",
		path: ["confirmPassword"],
	});

export type SignUpFormFormData = z.infer<typeof signUpFormFormSchema>;

export function SignUpForm() {
	const form = useForm<SignUpFormFormData>({
		resolver: zodResolver(signUpFormFormSchema),
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		mode: "onChange",
	});

	const { signIn } = useAuthContext();
	const router = useRouter();

	async function onSubmit(data: SignUpFormFormData) {
		try {
			await api.post("/auth/sign-up", data);
			await signIn({ email: data.email, password: data.password });
			toast.success("Cadastro realizado com sucesso.");

			router.push("/onboarding/plans");
		} catch (error) {
			toast.error("Erro ao fazer cadastro.", {
				description: getMessageFromAxiosError(error),
			});
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-5 self-stretch"
			>
				<FormField
					control={form.control}
					name="fullName"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>Nome do Responsável</FormLabel>
							<FormControl>
								<Input {...field} required />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>E-mail</FormLabel>
							<FormControl>
								<Input type="email" {...field} required />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>Senha</FormLabel>
							<FormControl>
								<Input {...field} required type="password" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>Confirme a Senha</FormLabel>
							<FormControl>
								<Input {...field} required type="password" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-col justify-center items-center gap-2">
					<Link href={"/auth/sign-in"}>
						Ja possui uma conta?{" "}
						<strong className="text-primary underline">
							Clique aqui
						</strong>
					</Link>
					<SubmitButton
						icon={<BlocksIcon />}
						isLoading={form.formState.isSubmitting}
					>
						Cadastrar
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
