import { DashboardHeader } from "@/components/dashboard/layout/header/DashboardHeader";
import { DirectorSideBarMobile } from "./DirectorSideBarMobile";

export function DirectorDashboardHeader() {
	return <DashboardHeader mobileMenu={<DirectorSideBarMobile />} />;
}
