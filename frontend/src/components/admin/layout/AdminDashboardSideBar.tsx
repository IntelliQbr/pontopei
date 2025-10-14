"use client";

import { adminNavItems } from "@/data/admin.data";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DashboardSidebar } from "../../dashboard/layout/side-bar/DashboardSidebar";
import { SideBarItem } from "../../dashboard/layout/side-bar/SideBarItem";

export function AdminDashboardSideBar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(true);

	return (
		<DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen}>
			{adminNavItems.map((item) => (
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
