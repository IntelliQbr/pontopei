"use client";

import { UserProfileSkeleton } from "@/components/skeletons/UserProfile.skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon, LogOutIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";
import { PlanBadge } from "./PlanBadge";
import { SettingsDialog } from "./SettingsDialog";

export function UserProfile(props: ComponentProps<"div">) {
	const { user, signOut } = useAuthContext();

	if (!user) return <UserProfileSkeleton />;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="w-full">
				<div
					{...props}
					className={cn(
						"sm:min-w-[200px] min-w-[150px] flex items-center justify-between gap-2 cursor-pointer border rounded-lg p-2 hover:bg-primary/10",
						props.className
					)}
				>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage
								src={
									user.profile?.avatarUrl ||
									`https://avatar.vercel.sh/${user.email}`
								}
							/>
							<AvatarFallback>
								{user.fullName.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<p className="sm:max-w-[150px] max-w-[100px] truncate sm:text-base text-sm">
							{user.fullName}
						</p>
					</div>
					<ChevronsUpDownIcon className="w-4 h-4" />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{user.isAdmin && (
					<DropdownMenuItem
						asChild
						className="cursor-pointer text-primary hover:bg-primary/10"
					>
						<Link
							href="/dashboard/admin"
							className="flex items-center justify-between gap-2 "
						>
							<span>Painel Admin</span>
							<ShieldCheckIcon className="w-4 h-4 text-primary" />
						</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuItem
					aria-label="Sair"
					onClick={signOut}
					className="flex items-center justify-between text-red-500 cursor-pointer hover:bg-red-500/10 hover:text-red-500"
				>
					<span>Sair</span>
					<LogOutIcon className="w-4 h-4 text-red-500" />
				</DropdownMenuItem>
				<DropdownMenuItem
					onSelect={(e) => e.preventDefault()}
					aria-label="Configurações"
					className="sm:hidden flex items-center justify-between cursor-pointer hover:bg-primary/10"
				>
					<SettingsDialog className="h-5 justify-between w-full bg-background text-foreground hover:bg-secondary rounded-none" />
				</DropdownMenuItem>
				<PlanBadge className="flex sm:hidden rounded-md" />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
