"use client";

import { X, Download, FileText } from "lucide-react";

interface PDFViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileUrl: string;
    fileName: string;
}

export default function PDFViewerModal({ isOpen, onClose, fileUrl, fileName }: PDFViewerModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#15152a] border border-white/10 rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col relative animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0c0c1b]/50 rounded-t-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h3 className="text-white font-bold truncate max-w-md">{fileName}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <a
                            href={fileUrl}
                            download={fileName}
                            className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition"
                            title="Descargar"
                        >
                            <Download className="w-5 h-5" />
                        </a>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content (Iframe) */}
                <div className="flex-1 bg-slate-900 overflow-hidden relative">
                    <iframe
                        src={`${fileUrl}#toolbar=0`}
                        className="w-full h-full border-none"
                        title={fileName}
                    />
                </div>
            </div>
        </div>
    );
}
