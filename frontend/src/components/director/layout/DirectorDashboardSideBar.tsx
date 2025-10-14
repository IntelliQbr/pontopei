"use client";

import { directorNavItems } from "@/data/director.data";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DashboardSidebar } from "../../dashboard/layout/side-bar/DashboardSidebar";
import { SideBarItem } from "../../dashboard/layout/side-bar/SideBarItem";

export function DirectorDashboardSideBar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(true);

	return (
		<DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen}>
			{directorNavItems.map((item) => (
				<SideBarItem
					key={item.label}
					icon={item.icon}
					href={item.href}
					soon={item.soon}
					isOpen={isOpen}
					isActive={pathname === item.href}
				>
					{item.label}
				</SideBarItem>
			))}
		</DashboardSidebar>
	);
}
