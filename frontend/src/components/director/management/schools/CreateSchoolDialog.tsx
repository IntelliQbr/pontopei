"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon, SchoolIcon } from "lucide-react";
import { useState } from "react";
import { CreateSchoolForm } from "./forms/CreateSchoolForm";

export function CreateSchoolDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size={"lg"}
                    className="bg-gradient-to-r from-primary to-blue-600 hover:opacity-90"
                >
                    <PlusIcon className="w-4 h-4" />
                    <span>Nova Escola</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <SchoolIcon className="w-4 h-4" />
                        <span>Nova Escola</span>
                    </DialogTitle>
                    <DialogDescription>
                        Preencha os campos abaixo para criar uma nova escola.
                    </DialogDescription>
                </DialogHeader>
                <CreateSchoolForm onSuccess={() => setIsOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}
