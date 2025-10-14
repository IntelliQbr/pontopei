"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormSectionProps } from "../create-student-and-pei-form.schema";

export function FamiliarContextFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Contexto Familiar
			</h3>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					control={form.control}
					name="step3.quantasPessoas"
					render={({ field }) => (
						<FormItem>
							<FormLabel required>
								Quantas pessoas moram na casa?
							</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Ex: 4 pessoas" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="step3.temIrmaos"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel required>Tem irmãos?</FormLabel>
							<FormControl>
								<RadioGroup
									disabled={field.disabled}
									onValueChange={field.onChange}
									value={field.value}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="nao-tem"
											id="nao-irmaos"
										/>
										<Label htmlFor="nao-irmaos">
											Não tem irmãos
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="1-irmao"
											id="1-irmao"
										/>
										<Label htmlFor="1-irmao">
											Tem 1 irmão
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="2-irmaos"
											id="2-irmaos"
										/>
										<Label htmlFor="2-irmaos">
											Tem 2 irmãos
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="3-ou-mais"
											id="3-ou-mais"
										/>
										<Label htmlFor="3-ou-mais">
											Tem 3 ou mais irmãos
										</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>

			<FormField
				control={form.control}
				name="step3.ajudaAtividades"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel className="text-base" required>
								Quem ajuda com as atividades escolares? (marcar
								mais de uma)
							</FormLabel>
						</div>
						<div className="grid grid-cols-2 gap-2">
							{[
								"Pai",
								"Mãe",
								"Avós",
								"Irmãos",
								"Outros familiares",
								"Ninguém pode ajudar",
							].map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="step3.ajudaAtividades"
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
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<FormField
					control={form.control}
					name="step3.tempoAtividadesEspeciais"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel required>
								Família tem tempo para fazer atividades
								especiais?
							</FormLabel>
							<FormControl>
								<RadioGroup
									disabled={field.disabled}
									onValueChange={field.onChange}
									value={field.value}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="bastante-tempo"
											id="bastante-tempo"
										/>
										<Label htmlFor="bastante-tempo">
											Sim, bastante tempo
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="pouco-tempo"
											id="pouco-tempo"
										/>
										<Label htmlFor="pouco-tempo">
											Sim, um pouco
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="fins-semana"
											id="fins-semana"
										/>
										<Label htmlFor="fins-semana">
											Só nos fins de semana
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="quase-nao-tem"
											id="quase-nao-tem"
										/>
										<Label htmlFor="quase-nao-tem">
											Quase não tem tempo
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="nao-tem"
											id="nao-tem-tempo"
										/>
										<Label htmlFor="nao-tem-tempo">
											Não tem tempo
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
					name="step3.comprarMateriais"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel required>
								A familia consgue comprar materiais para o
								aluno?
							</FormLabel>
							<FormControl>
								<RadioGroup
									disabled={field.disabled}
									onValueChange={field.onChange}
									value={field.value}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="sem-dificuldade"
											id="sem-dificuldade"
										/>
										<Label htmlFor="sem-dificuldade">
											Sem dificuldade
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="pouco-esforco"
											id="pouco-esforco"
										/>
										<Label htmlFor="pouco-esforco">
											Pouco esforço
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="depende-valor"
											id="depende-valor"
										/>
										<Label htmlFor="depende-valor">
											Depende do valor
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="so-baratos"
											id="so-baratos"
										/>
										<Label htmlFor="so-baratos">
											Só baratos
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="nao-consegue"
											id="nao-consegue"
										/>
										<Label htmlFor="nao-consegue">
											Não consegue
										</Label>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}
