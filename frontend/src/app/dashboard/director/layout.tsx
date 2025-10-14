import { RootLayoutProps } from "@/app/layout";
import { DirectorDashboardHeader } from "@/components/director/layout/DirectorDashboardHeader";
import { DirectorDashboardSideBar } from "@/components/director/layout/DirectorDashboardSideBar";

export default function DirectorDashboardLayout({ children }: RootLayoutProps) {
	return (
		<div className="flex flex-col h-full overflow-hidden">
			<DirectorDashboardHeader />
			<div className="flex h-full flex-1 relative">
				<div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-primary/8 to-primary/5 opacity-60" />
				<div
					className="absolute inset-0 opacity-30"
					style={{
						backgroundImage: `
							linear-gradient(to right, rgba(59, 130, 246, 0.15) 1px, transparent 1px),
							linear-gradient(to bottom, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
						`,
						backgroundSize: "25px 25px",
					}}
				/>
				<DirectorDashboardSideBar />
				<main className="flex-1 p-4 overflow-y-auto mb-10 relative z-10">
					{children}
				</main>
			</div>
		</div>
	);
}
