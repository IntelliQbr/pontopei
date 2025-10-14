"use client";

import { Toaster } from "@/components/ui/sonner";
import AuthContextProvider from "@/contexts/AuthContext";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export interface RootProvidersProps {
    children: React.ReactNode;
}

export function RootProviders({ children }: RootProvidersProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    {children}
                    <Toaster richColors closeButton position="bottom-center" />
                </AuthContextProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
