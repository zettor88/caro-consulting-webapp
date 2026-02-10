"use client";

import { useState, useEffect } from "react";
import { FileText, ExternalLink, Download, FolderOpen, FileSpreadsheet, FileBarChart, Loader2, Eye } from "lucide-react";
import supabase from "@/lib/supabase";
import PDFViewerModal from "./PDFViewerModal";

interface Document {
    id: string;
    name: string;
    file_type: string;
    uploaded_at: string;
    file_url: string;
    category: string;
    is_external_link: boolean;
    description?: string;
}

interface DocumentRepositoryProps {
    clientId: string;
}

export default function DocumentRepository({ clientId }: DocumentRepositoryProps) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>("Todos");
    const [viewDoc, setViewDoc] = useState<Document | null>(null);

    const categories = ["Todos", "Presupuesto", "Forecast", "Matriz", "Entregable", "General"];

    useEffect(() => {
        if (clientId) {
            fetchDocuments();
        }
    }, [clientId]);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("documents")
                .select("*")
                .eq("client_id", clientId)
                .order("uploaded_at", { ascending: false });

            if (error) throw error;
            setDocuments(data || []);
        } catch (err) {
            console.error("Error fetching documents:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredDocs = activeCategory === "Todos"
        ? documents
        : documents.filter(d => d.category === activeCategory);

    const getIcon = (doc: Document) => {
        if (doc.is_external_link) return <ExternalLink className="w-5 h-5 text-blue-400" />;
        if (doc.category === "Presupuesto" || doc.category === "Forecast") return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
        if (doc.category === "Matriz") return <FileBarChart className="w-5 h-5 text-purple-400" />;
        return <FileText className="w-5 h-5 text-slate-400" />;
    };

    return (
        <div className="bg-[#15152a] border border-white/5 p-6 rounded-xl shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FolderOpen className="w-6 h-6 text-primary" /> Repositorio Documental
                    </h3>
                    <p className="text-slate-400 text-sm">Acceso a presupuestos, forecasts y entregables estratégicos.</p>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${activeCategory === cat
                                ? "bg-primary text-white shadow-lg active-tab"
                                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredDocs.length > 0 ? (
                        filteredDocs.map((doc) => (
                            <div
                                key={doc.id}
                                className="group flex items-center justify-between p-4 bg-slate-900/50 hover:bg-primary/5 border border-white/5 hover:border-primary/20 rounded-lg transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg bg-slate-800 group-hover:bg-slate-800/80 transition ${doc.is_external_link ? 'bg-blue-900/20' : ''}`}>
                                        {getIcon(doc)}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm group-hover:text-primary transition">{doc.name}</h4>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{doc.category}</span>
                                            <span>•</span>
                                            <span>{new Date(doc.uploaded_at).toLocaleDateString()}</span>
                                            {doc.description && (
                                                <>
                                                    <span>•</span>
                                                    <span className="italic truncate max-w-[150px]">{doc.description}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {doc.is_external_link ? (
                                    <a
                                        href={doc.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg transition bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white"
                                    >
                                        Abrir Drive <ExternalLink className="w-3 h-3" />
                                    </a>
                                ) : (
                                    (doc.file_type === 'PDF' || doc.name.toLowerCase().endsWith('.pdf')) ? (
                                        <button
                                            onClick={() => setViewDoc(doc)}
                                            className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg transition bg-slate-800 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/20"
                                        >
                                            Ver Reporte <Eye className="w-3 h-3" />
                                        </button>
                                    ) : (
                                        <a
                                            href={doc.file_url}
                                            download={doc.name}
                                            className="flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-lg transition bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                                        >
                                            Descargar <Download className="w-3 h-3" />
                                        </a>
                                    )
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl">
                            <FolderOpen className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">No hay documentos en esta categoría.</p>
                            <p className="text-xs text-slate-600 mt-1">Los documentos estratégicos aparecerán aquí.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Modal for PDF Preview */}
            <PDFViewerModal
                isOpen={!!viewDoc}
                onClose={() => setViewDoc(null)}
                fileUrl={viewDoc?.file_url || ""}
                fileName={viewDoc?.name || ""}
            />
        </div>
    );
}
