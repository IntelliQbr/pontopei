import { Checkbox } from "@/components/ui/checkbox";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { FormSectionProps } from "../create-student-and-pei-form.schema";

export function InteractionBehaviorFormSection({ form }: FormSectionProps) {
	return (
		<div className="space-y-6">
			<h3 className="text-lg font-semibold border-b pb-2">
				Interação e Comportamento
			</h3>

			<FormField
				control={form.control}
				name="step2.interagecom"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel required className="text-base">
								O aluno interage com: (marcar mais de uma)
							</FormLabel>
						</div>
						<div className="space-y-2">
							{[
								"Colegas",
								"Adultos",
								"Evita interações",
								"Interage apenas quando solicitado",
							].map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="step2.interagecom"
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
				name="step2.comportamentosFuga"
				render={({ field }) => (
					<FormItem>
						<FormLabel required>
							Há comportamentos de fuga, autoestimulação ou
							agitação?
						</FormLabel>
						<FormControl>
							<Textarea
								{...field}
								placeholder="Descreva os comportamentos observados..."
								rows={3}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="step2.barreirasAprendizagem"
				render={() => (
					<FormItem>
						<div className="mb-4">
							<FormLabel required className="text-base">
								Quais barreiras de aprendizagem você identifica?
								(marcar mais de uma)
							</FormLabel>
						</div>
						<div className="space-y-2">
							{[
								"Autoestimulação excessiva",
								"Resistência a mudanças",
								"Dificuldade de atenção",
								"Comportamentos disruptivos",
								"Dependência de rotinas rígidas",
								"Seletividade de estímulos",
								"Nenhuma barreira significativa",
							].map((item) => (
								<FormField
									key={item}
									control={form.control}
									name="step2.barreirasAprendizagem"
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
		</div>
	);
}
