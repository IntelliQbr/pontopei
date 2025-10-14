"use client";

import { DashboardSideBarMobile as DashboardSideBarMobileComponent } from "@/components/dashboard/layout/side-bar/DashboardSideBarMobile";
import { SideBarItem } from "@/components/dashboard/layout/side-bar/SideBarItem";
import { teacherNavItems } from "@/data/teacher.data";
import { usePathname } from "next/navigation";

export function TeacherSideBarMobile() {
	const pathname = usePathname();

	return (
		<DashboardSideBarMobileComponent>
			{teacherNavItems.map((item) => (
				<SideBarItem
					key={item.label}
					icon={item.icon}
					href={item.href}
					isOpen={true}
					isActive={pathname === item.href}
					soon={item.soon}
				>
					{item.label}
				</SideBarItem>
			))}
		</DashboardSideBarMobileComponent>
	);
}
