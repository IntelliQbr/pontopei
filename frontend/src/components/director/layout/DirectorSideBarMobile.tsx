"use client";

import { DashboardSideBarMobile } from "@/components/dashboard/layout/side-bar/DashboardSideBarMobile";
import { SideBarItem } from "@/components/dashboard/layout/side-bar/SideBarItem";
import { directorNavItems } from "@/data/director.data";
import { usePathname } from "next/navigation";

export function DirectorSideBarMobile() {
	const pathname = usePathname();

	return (
		<DashboardSideBarMobile>
			{directorNavItems.map((item) => (
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
