"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function FormulariosRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/formularios/diagnostico");
    }, [router]);

    return (
        <div className="min-h-screen bg-[#101022] flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
    );
}
