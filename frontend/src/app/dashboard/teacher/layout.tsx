import { RootLayoutProps } from "@/app/layout";
import { TeacherDashboardHeader } from "@/components/teacher/layout/TeacherDashboardHeader";
import { TeacherDashboardSideBar } from "@/components/teacher/layout/TeacherDashboardSideBar";

export default function TeacherDashboardLayout({ children }: RootLayoutProps) {
	return (
		<div className="flex flex-col h-full overflow-hidden">
			<TeacherDashboardHeader />
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
				<TeacherDashboardSideBar />
				<main className="flex-1 p-4 overflow-y-auto mb-10 relative z-10">
					{children}
				</main>
			</div>
		</div>
	);
}
