"use client";

import { PeiApi } from "@/api/pei.api";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileTextIcon, RefreshCcwIcon } from "lucide-react";
import { useState } from "react";
import { Loader } from "../shared/Loader";
import CreateStudentAndPEIForm from "../students/pei/forms/CreateStudentAndPEIForm";

interface RenewPEIDialogProps {
	studentId: string;
}

export function RenewPEIDialog({ studentId }: RenewPEIDialogProps) {
	const [isOpen, setIsOpen] = useState(false);

	const { data: latestPEI, isLoading } = useQuery({
		queryKey: ["latest-pei", studentId],
		queryFn: () => PeiApi.getLatestPEIByStudentIdToTeacher(studentId),
		enabled: !!studentId,
	});

	if (isLoading) {
		return (
			<Button disabled>
				<Loader />
			</Button>
		);
	}

	const isDisabled = latestPEI?.status !== "EXPIRED";

	const handleOpenDialog = () => {
		if (!isDisabled) {
			setIsOpen(true);
		}
	};

	return (
		<>
			<Tooltip>
				<TooltipTrigger asChild>
					<div>
						<Button
							disabled={isDisabled}
							size={"lg"}
							className="bg-primary relative sm:w-auto w-full"
							onClick={handleOpenDialog}
						>
							<RefreshCcwIcon className="w-4 h-4 " />
							<span>Renovar PEI</span>
						</Button>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					{isDisabled ? (
						<p>
							Renovação em{" "}
							{formatDistance(
								latestPEI?.endDate ?? new Date(),
								new Date(),
								{
									locale: ptBR,
								}
							)}
						</p>
					) : (
						<p>Renovar PEI</p>
					)}
				</TooltipContent>
			</Tooltip>

			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent className="sm:max-w-7xl sm:max-h-[90%]">
					<DialogHeader>
						<DialogTitle className="self-start text-2xl font-bold flex items-center gap-3">
							<div className="bg-gradient-to-r from-primary to-primary/80 rounded-full p-3 text-background flex items-center justify-center shadow-md">
								<FileTextIcon className="w-6 h-6" />
							</div>
							<span className="underline decoration-primary/50 decoration-2 underline-offset-4">
								Renovar PEI
							</span>
						</DialogTitle>
						<DialogDescription>
							Renove o formulário PEI para o ano atual. O
							formulário a cada passo.
						</DialogDescription>
					</DialogHeader>
					<CreateStudentAndPEIForm
						student={latestPEI?.student}
						isRenewal
						onSuccess={() => setIsOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</>
	);
}
