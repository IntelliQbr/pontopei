import { Logo } from "@/components/shared/Logo";
import { PlanBadge } from "./PlanBadge";
import { SettingsDialog } from "./SettingsDialog";
import { UserProfile } from "./UserProfile";

interface DashboardHeaderProps {
	mobileMenu: React.ReactNode;
}

export function DashboardHeader({ mobileMenu }: DashboardHeaderProps) {
	return (
		<header className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-b shadow-sm bg-background/50 backdrop-blur-sm">
			<div className="flex items-end gap-5">
				<Logo />
			</div>
			<div className="hidden sm:flex items-center gap-2">
				<PlanBadge />
				<SettingsDialog />
				<UserProfile />
			</div>
			<div className="sm:hidden">{mobileMenu}</div>
		</header>
	);
}
