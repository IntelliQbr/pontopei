import { Note, PEI } from "@prisma/client";
import { CreatePEIContentType } from "./create-pei-content.type";

export type RenewPEIContentType = CreatePEIContentType & {
    previousPEI: PEI;
    latestNotes: Note[];
};
