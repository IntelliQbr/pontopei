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
import { getMessageFromAxiosError } from "@/utils/exceptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signInFormSchema = z.object({
	email: z
		.string("O email deve ser preenchido.")
		.nonempty("O email deve ser preenchido.")
		.email("O email deve ser valido."),

	password: z
		.string("A senha deve ser preenchida.")
		.nonempty("A senha deve ser preenchida.")
		.min(8, "A senha deve ter no mínimo 8 caracteres.")
		.max(20, "A senha deve ter no máximo 20 caracteres."),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;

export function SignInForm() {
	const form = useForm<SignInFormData>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const { signIn } = useAuthContext();
	const router = useRouter();

	async function onSubmit(data: SignInFormData) {
		try {
			await signIn(data);
			toast.success("Login realizado com sucesso.");
			router.push("/dashboard");
		} catch (error) {
			toast.error("Erro ao fazer login.", {
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
				<div className="flex flex-col justify-center items-center gap-2">
					<Link href={"/auth/sign-up"}>
						Não possui uma conta?{" "}
						<strong className="text-primary underline">
							Clique aqui
						</strong>
					</Link>
					<SubmitButton
						icon={<ArrowRightIcon />}
						isLoading={form.formState.isSubmitting}
					>
						Entrar
					</SubmitButton>
				</div>
			</form>
		</Form>
	);
}
