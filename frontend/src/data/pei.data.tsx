import { PEIStatusEnum } from "@/models/enums/pei/pei-status.enum";

export const peiStatusLabels: Record<PEIStatusEnum, string> = {
	[PEIStatusEnum.ACTIVE]: "Ativo",
	[PEIStatusEnum.EXPIRED]: "Expirado",
	[PEIStatusEnum.INACTIVE]: "Inativo",
};

export const peiStatusColors: Record<PEIStatusEnum, string> = {
	[PEIStatusEnum.ACTIVE]: "bg-green-100 text-green-800",
	[PEIStatusEnum.EXPIRED]: "bg-red-100 text-red-800",
	[PEIStatusEnum.INACTIVE]: "bg-gray-100 text-gray-800",
};
