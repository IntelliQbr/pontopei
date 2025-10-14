import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { IconWithBackground } from "../shared/IconWithBackground";

interface CTASectionProps {
	title: string;
	description: string;
	buttonText: string;
	buttonLink: string;
	secondaryButtonText?: string;
	secondaryButtonLink?: string;
}

export function CTASection({
	title,
	description,
	buttonText,
	buttonLink,
	secondaryButtonText,
	secondaryButtonLink,
}: CTASectionProps) {
	return (
		<section className="py-16 bg-muted/30">
			<div className="container mx-auto px-4">
				<Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground transition-shadow duration-300 hover:shadow-2xl">
					<CardContent className="space-y-8 p-12 text-center">
						<div className="space-y-6">
							<h2 className="flex items-center justify-center text-3xl font-bold md:text-5xl">
								<IconWithBackground
									icon={Sparkles}
									className="mr-3 h-12 w-12"
									bgClassName="bg-primary-foreground/20"
									iconClassName="text-primary-foreground"
								/>
								{title}
							</h2>
							<p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-90">
								{description}
							</p>
						</div>

						<div className="flex flex-col justify-center gap-4 sm:flex-row">
							<Button
								size="lg"
								variant="secondary"
								className="px-12 py-4 text-xl font-semibold transition-transform hover:scale-105"
								asChild
							>
								<Link href={buttonLink}>
									{buttonText}
									<ArrowRight className="ml-2 h-6 w-6" />
								</Link>
							</Button>
							{secondaryButtonText && secondaryButtonLink && (
								<Button
									size="lg"
									variant="outline"
									className="border-primary-foreground bg-transparent px-12 py-4 text-xl font-semibold text-primary-foreground transition-transform hover:scale-105 hover:bg-primary-foreground hover:text-primary"
									asChild
								>
									<Link href={secondaryButtonLink}>
										{secondaryButtonText}
										<ArrowRight className="ml-2 h-6 w-6" />
									</Link>
								</Button>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
