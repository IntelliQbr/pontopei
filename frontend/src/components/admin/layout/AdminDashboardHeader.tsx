import { DashboardHeader } from "@/components/dashboard/layout/header/DashboardHeader";
import { AdminSideBarMobile } from "./AdminSideBarMobile";

export function AdminDashboardHeader() {
	return <DashboardHeader mobileMenu={<AdminSideBarMobile />} />;
}
