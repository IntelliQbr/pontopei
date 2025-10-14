"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataSelectFilterProps {
	filterName: string;
	placeholder: string;
	data: { value: string; label: string }[];
	defaultValue?: string;
}

export function DataSelectFilter({
	filterName,
	data,
	placeholder,
	defaultValue,
}: DataSelectFilterProps) {
	const searchParams = useSearchParams();
	const currentValue = searchParams.get(filterName) ?? "";
	const pathname = usePathname();
	const router = useRouter();

	const handleChange = (value: string) => {
		const params = new URLSearchParams(searchParams);
		params.set(filterName, value);
		router.push(`${pathname}?${params.toString()}`);
	};

	return (
		<Select
			onValueChange={handleChange}
			defaultValue={defaultValue ?? currentValue}
		>
			<SelectTrigger className="w-full max-w-full truncate">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{data.map((item) => (
					<SelectItem key={item.value} value={item.value}>
						{item.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
