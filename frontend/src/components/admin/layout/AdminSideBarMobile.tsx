"use client";

import { DashboardSideBarMobile } from "@/components/dashboard/layout/side-bar/DashboardSideBarMobile";
import { SideBarItem } from "@/components/dashboard/layout/side-bar/SideBarItem";
import { adminNavItems } from "@/data/admin.data";
import { usePathname } from "next/navigation";

export function AdminSideBarMobile() {
	const pathname = usePathname();

	return (
		<DashboardSideBarMobile>
			{adminNavItems.map((item) => (
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
		</DashboardSideBarMobile>
	);
}
