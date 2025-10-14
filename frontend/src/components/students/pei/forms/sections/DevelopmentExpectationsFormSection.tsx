"use client";

import { Checkbox } from "@/components/ui/checkbox";
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

export function DevelopmentExpectationsFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Desenvolvimento e Expectativas
			</h3>

			<FormField
				control={form.control}
				name="step3.maisGostaFazer"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							O que mais gosta de fazer?
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva as atividades preferidas da criança..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step3.acompanhamentoTerapeutico"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Acompanhamento terapêutico?
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
										id="terapia-sim"
									/>
									<Label htmlFor="terapia-sim">Sim</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="nao"
										id="terapia-nao"
									/>
									<Label htmlFor="terapia-nao">Não</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="avaliacao"
										id="terapia-aval"
									/>
									<Label htmlFor="terapia-aval">
										Em avaliação
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
				name="step3.expectativasAno"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>Expectativas para o ano:</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Quais são as expectativas da família para este ano letivo..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step3.habilidadesPriorizar"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel className="text-base">
								Habilidades para priorizar: (marcar mais de uma)
							</FormLabel>
						</div>
						<div className="grid grid-cols-2 gap-2">
							{[
								"Comunicação/fala",
								"Habilidades sociais",
								"Independência",
								"Habilidades acadêmicas",
								"Regulação emocional",
								"Habilidades motoras",
							].map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="step3.habilidadesPriorizar"
									render={({ field }) => {
										return (
											<FormItem
												key={item}
												className="flex flex-row items-start space-x-3 space-y-0"
											>
												<FormControl>
													<Checkbox
														disabled={
															field.disabled
														}
														checked={field.value?.includes(
															item
														)}
														onCheckedChange={(
															checked
														) => {
															return checked
																? field.onChange(
																		[
																			...field.value,
																			item,
																		]
																  )
																: field.onChange(
																		field.value?.filter(
																			(
																				value
																			) =>
																				value !==
																				item
																		)
																  );
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal">
													{item}
												</FormLabel>
											</FormItem>
										);
									}}
								/>
							))}
						</div>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step3.progressoAnterior"
				render={({ field }) => (
					<FormItem className="space-y-3">
						<FormLabel required>
							Progresso comparado ao ano anterior:
						</FormLabel>
						<FormControl>
							<RadioGroup
								disabled={field.disabled}
								onValueChange={field.onChange}
								value={field.value}
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="regrediu"
										id="regrediu"
									/>
									<Label htmlFor="regrediu">Regrediu</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="sem-mudancas"
										id="sem-mudancas"
									/>
									<Label htmlFor="sem-mudancas">
										Sem mudanças
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="progresso-lento"
										id="progresso-lento"
									/>
									<Label htmlFor="progresso-lento">
										Progresso lento
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="progresso-significativo"
										id="progresso-sig"
									/>
									<Label htmlFor="progresso-sig">
										Progresso significativo
									</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="progresso-excepcional"
										id="progresso-exc"
									/>
									<Label htmlFor="progresso-exc">
										Progresso excepcional
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
				name="step3.maiorDesejoEscolar"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Maior desejo para o desenvolvimento escolar:
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Qual é o maior desejo da família para o desenvolvimento escolar..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
