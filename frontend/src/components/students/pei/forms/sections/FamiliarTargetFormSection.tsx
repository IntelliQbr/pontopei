"use client";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { FormSectionProps } from "../create-student-and-pei-form.schema";

export function FamiliarTargetFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Metas Familiares
			</h3>

			<FormField
				control={form.control}
				name="step3.metaFamilia"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Principal meta da família para os próximos 3 meses:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Qual é a principal meta que a família gostaria de alcançar..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step3.comoFamiliaAjudar"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Como a família pode ajudar em casa?
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="De que forma a família pode contribuir com o desenvolvimento..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step3.maiorDificuldadeFamilia"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Maior dificuldade da família:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Qual é a maior dificuldade que a família enfrenta..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step3.informacoesClinicas"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Informações clínicas complementares que impactam a
							rotina escolar
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Informações clínicas do aluno"
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step3.autorizaUso"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Autoriza uso para fins pedagógicos?
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="sim"
										id="autoriza-sim"
									/>
									<Label htmlFor="autoriza-sim">Sim</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao"
										id="autoriza-nao"
									/>
									<Label htmlFor="autoriza-nao">Não</Label>
								</div>
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
