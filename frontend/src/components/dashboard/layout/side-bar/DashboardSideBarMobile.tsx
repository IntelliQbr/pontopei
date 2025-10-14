import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { PlanBadge } from "../header/PlanBadge";
import { UserProfile } from "../header/UserProfile";

interface DashboardSideBarMobileProps {
	children: React.ReactNode;
}

export function DashboardSideBarMobile({
	children,
}: DashboardSideBarMobileProps) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>
					<MenuIcon className="w-4 h-4" />
				</Button>
			</SheetTrigger>
			<SheetContent className="bg-primary p-4 text-background">
				<SheetHeader>
					<SheetTitle className="text-background text-lg">
						Menu
					</SheetTitle>
				</SheetHeader>
				{children}
				<SheetFooter>
					<PlanBadge className="rounded" />
					<UserProfile className="bg-background text-foreground hover:bg-secondary" />
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
