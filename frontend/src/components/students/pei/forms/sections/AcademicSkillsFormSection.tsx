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

export function AcademicSkillsFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Habilidades Acadêmicas
			</h3>

			<FormField
				control={form.control}
				name="step2.conteudosFacilidade"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Conteúdos que acompanha com mais facilidade:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva os conteúdos em que o aluno tem mais facilidade..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step2.areasDificuldade"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Áreas com maior dificuldade:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva as áreas de maior dificuldade..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step2.avaliacaoHabilidades"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Avaliação de habilidades acadêmicas emergentes:
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="pre-academicas"
										id="pre-academicas"
									/>
									<Label htmlFor="pre-academicas">
										Pré-acadêmicas (cores, formas)
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="reconhecimento-letras"
										id="reconhecimento-letras"
									/>
									<Label htmlFor="reconhecimento-letras">
										Reconhecimento de letras/números
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="leitura-escrita"
										id="leitura-escrita"
									/>
									<Label htmlFor="leitura-escrita">
										Leitura/escrita inicial
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="habilidades-serie"
										id="habilidades-serie"
									/>
									<Label htmlFor="habilidades-serie">
										Habilidades de série
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="acima-expectativa"
										id="acima-expectativa"
									/>
									<Label htmlFor="acima-expectativa">
										Acima da expectativa
									</Label>
								</div>
							</RadioGroup>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step2.habilidadeDestaque"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Habilidade/interesse que se destaca:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva habilidades ou interesses que se destacam..."
								rows={2}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
