"use client";

import { teacherNavItems } from "@/data/teacher.data";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DashboardSidebar } from "../../dashboard/layout/side-bar/DashboardSidebar";
import { SideBarItem } from "../../dashboard/layout/side-bar/SideBarItem";

export function TeacherDashboardSideBar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(true);

	return (
		<DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen}>
			{teacherNavItems.map((item) => (
				<SideBarItem
					key={item.label}
					icon={item.icon}
					href={item.href}
					isOpen={isOpen}
					isActive={pathname === item.href}
					soon={item.soon}
				>
					{item.label}
				</SideBarItem>
			))}
		</DashboardSidebar>
	);
}
