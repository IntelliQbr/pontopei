import { DashboardHeader } from "@/components/dashboard/layout/header/DashboardHeader";
import { TeacherSideBarMobile } from "./TeacherSideBarMobile";

export function TeacherDashboardHeader() {
	return <DashboardHeader mobileMenu={<TeacherSideBarMobile />} />;
}
