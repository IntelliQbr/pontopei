"use client";

import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { ComponentProps } from "react";

interface DataPaginationProps extends ComponentProps<"div"> {
	totalPages: number;
	pageParamName?: string;
}

export function DataPagination({
	totalPages,
	pageParamName = "page",
	className,
}: DataPaginationProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get(pageParamName)) || 1;

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set(pageParamName, pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	const previousPageNumber =
		currentPage === 1 ? currentPage : currentPage - 1;
	const nextPageNumber =
		currentPage === totalPages ? currentPage : currentPage + 1;

	const pages = Array.from({ length: totalPages })
		.map((_, i) => {
			const pageNumber = i + 1;
			const showDirectPage =
				pageNumber === 1 || // Primeira página
				pageNumber === totalPages || // Última página
				(pageNumber >= currentPage - 1 &&
					pageNumber <= currentPage + 1); // Páginas próximas à atual

			if (showDirectPage) {
				return {
					pageNumber,
					isActive: pageNumber === currentPage,
					href: createPageURL(pageNumber),
				};
			}

			// Adiciona ellipsis após primeira página e antes da última
			if (
				(pageNumber === 2 && currentPage > 4) ||
				(pageNumber === totalPages - 1 && currentPage < totalPages - 3)
			) {
				return {
					pageNumber: "...",
					isActive: false,
					href: "#",
				};
			}

			return null;
		})
		.filter(Boolean);

	return (
		<Pagination className={cn("mt-5", className)}>
			<PaginationContent className="gap-1">
				<PaginationItem>
					<Button
						aria-label="Pagina anterior"
						variant={"link"}
						disabled={currentPage === 1}
						className="p-0 m-0"
					>
						<PaginationPrevious
							className="text-xs"
							href={createPageURL(previousPageNumber)}
						/>
					</Button>
				</PaginationItem>
				{pages.map((page, i) => {
					if (page) {
						if (page.pageNumber === "...") {
							<PaginationItem
								key={`${page.pageNumber + i.toString()}`}
							>
								<PaginationEllipsis />
							</PaginationItem>;
						}

						return (
							<PaginationItem
								key={`${page.pageNumber + i.toString()}`}
							>
								<PaginationLink
									isActive={page.isActive}
									href={page.href}
									size={"sm"}
								>
									{page.pageNumber}
								</PaginationLink>
							</PaginationItem>
						);
					}
				})}
				<PaginationItem>
					<Button
						aria-label="Próxima pagina"
						variant={"link"}
						disabled={currentPage === totalPages}
						className="p-0 m-0"
					>
						<PaginationNext
							className="text-xs"
							href={createPageURL(nextPageNumber)}
						/>
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
