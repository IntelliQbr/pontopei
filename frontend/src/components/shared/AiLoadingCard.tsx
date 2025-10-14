import { BrainIcon } from "lucide-react";

interface AiLoadingCardProps {
	children: React.ReactNode;
}

export function AiLoadingCard({ children }: AiLoadingCardProps) {
	return (
		<div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 h-full w-full ">
			<div className="flex flex-col items-center justify-center h-full shadow-lg">
				<div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-pink-100 to-blue-100 p-10 rounded-lg border border-primary/10">
					<div className="bg-background p-4 rounded-full relative shadow-lg">
						<BrainIcon className="text-purple-400" />
						<div className="bg-background h-full w-full absolute top-0 left-0 rounded-full animate-ping" />
					</div>
					<div className="flex flex-col items-center justify-center gap-4 shadow-lg">
						<p className="text-sm bg-background p-2 rounded-lg text-primary animate-pulse">
							{children}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
