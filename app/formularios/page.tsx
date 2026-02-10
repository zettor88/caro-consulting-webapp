"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Send, Loader2, UploadCloud, X, FileText } from "lucide-react";
import supabase from "@/lib/supabase";

export default function FormulariosPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'INICIAL' | 'PRICING'>('INICIAL');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form States - Dynamic based on active tab
    const [formData, setFormData] = useState<any>({});
    const [files, setFiles] = useState<File[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // Append new files to existing ones
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const uploadFilesToStorage = async (userId: string | undefined) => {
        if (files.length === 0) return [];

        const uploadedUrls: string[] = [];
        const folder = userId ? userId : 'anonymous';

        for (const file of files) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${folder}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('form_uploads')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Error uploading file:', uploadError);
                continue; // Skip failed uploads but try others
            }

            // For private buckets, we store the path so we can generate signed URLs later
            uploadedUrls.push(filePath);
        }

        return uploadedUrls;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setUploading(files.length > 0);

        // Get current user (if any)
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;

        try {
            // 1. Upload Files first
            const filePaths = await uploadFilesToStorage(userId);
            setUploading(false);

            // 2. Submit Form Data
            const { error } = await supabase.from('form_submissions').insert({
                form_type: activeTab,
                data: formData,
                user_id: userId || null,
                status: 'new',
                file_urls: filePaths // Save the paths
            });

            if (error) throw error;

            setSuccess(true);
            setFormData({}); // Reset form
            setFiles([]);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Hubo un error al enviar el formulario. Por favor intente nuevamente.");
        } finally {
            setSubmitting(false);
            setUploading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#101022] text-white flex flex-col items-center justify-center p-8 text-center bg-hero-glow">
                <CheckCircle className="w-20 h-20 text-primary mb-6" />
                <h1 className="text-3xl font-black mb-4">¡Formulario Enviado!</h1>
                <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
                    Hemos recibido tus respuestas y archivos correctamente. El equipo de Caro Consulting las revisará a la brevedad.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={() => setSuccess(false)}
                        className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-bold transition border border-white/10"
                    >
                        Enviar otro formulario
                    </button>
                    <Link href="/" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-primary/20">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#101022] text-white font-sans selection:bg-primary selection:text-white bg-hero-glow">
            <header className="p-6 border-b border-white/5 flex items-center justify-between max-w-5xl mx-auto w-full glass-nav rounded-b-xl">
                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition font-medium">
                    <ArrowLeft className="w-5 h-5" /> Volver
                </Link>
                <span className="font-bold tracking-tight uppercase">
                    Caro <span className="text-primary">Consulting</span>
                </span>
            </header>

            <main className="max-w-3xl mx-auto p-8">
                <h1 className="text-4xl font-black mb-3 text-center">Centro de Datos</h1>
                <p className="text-slate-400 text-center mb-10 text-lg">
                    Ingreso seguro de información para clientes.
                </p>

                {/* Tabs */}
                <div className="flex bg-black/20 p-1.5 rounded-xl mb-8 border border-white/5">
                    <button
                        onClick={() => { setActiveTab('INICIAL'); setFormData({}); setFiles([]); }}
                        className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'INICIAL' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        Levantamiento Inicial
                    </button>
                    <button
                        onClick={() => { setActiveTab('PRICING'); setFormData({}); setFiles([]); }}
                        className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${activeTab === 'PRICING' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        Cuestionario de Pricing
                    </button>
                </div>

                {/* Dynamic Form Container */}
                <div className="glass-card p-8 md:p-10 shadow-2xl relative overflow-hidden">
                    {/* Subtle glow effect inside card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                        {activeTab === 'INICIAL' ? (
                            <>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Nombre de la Empresa</label>
                                        <input required name="empresa" onChange={handleInputChange} className="w-full bg-[#15152a] border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition placeholder-slate-600" placeholder="Ej: Importadora Global SpA" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Sitio Web</label>
                                        <input name="website" onChange={handleInputChange} className="w-full bg-[#15152a] border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition placeholder-slate-600" placeholder="www.tuempresa.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Industria / Rubro</label>
                                        <div className="relative">
                                            <select required name="industria" onChange={handleInputChange} className="w-full bg-[#15152a] border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none">
                                                <option value="">Selecciona una opción...</option>
                                                <option value="Retail">Retail / Comercio</option>
                                                <option value="Servicios">Servicios Profesionales</option>
                                                <option value="Manufactura">Manufactura / Industrial</option>
                                                <option value="Tecnologia">Tecnología / Software</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Facturación Mensual (Aprox)</label>
                                        <div className="relative">
                                            <select required name="facturacion" onChange={handleInputChange} className="w-full bg-[#15152a] border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none">
                                                <option value="">Selecciona un rango...</option>
                                                <option value="<10M">Menos de $10M</option>
                                                <option value="10M-50M">Entre $10M y $50M</option>
                                                <option value="50M-100M">Entre $50M y $100M</option>
                                                <option value=">100M">Más de $100M</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Desafío Principal</label>
                                        <textarea required name="desafio" onChange={handleInputChange} rows={4} className="w-full bg-[#15152a] border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition placeholder-slate-600" placeholder="¿Qué problema necesitas resolver con mayor urgencia?" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Nombre de quien responde</label>
                                        <input required name="nombre" onChange={handleInputChange} className="w-full bg-[#15152a] border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Estrategia de Precios Actual</label>
                                        <div className="relative">
                                            <select required name="estrategia_pricing" onChange={handleInputChange} className="w-full bg-[#15152a] border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none">
                                                <option value="">Selecciona una opción...</option>
                                                <option value="Costo + Margen">Costo + Margen Fijo</option>
                                                <option value="Competencia">Mirando a la competencia</option>
                                                <option value="Valor">Según valor percibido</option>
                                                <option value="Intuicion">Intuición / Histórico</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Última Alza de Precios</label>
                                        <div className="relative">
                                            <select required name="ultima_alza" onChange={handleInputChange} className="w-full bg-[#15152a] border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none">
                                                <option value="">Selecciona una opción...</option>
                                                <option value="<3 meses">Hace menos de 3 meses</option>
                                                <option value="6 meses">Hace 6 meses</option>
                                                <option value="1 año">Hace 1 año</option>
                                                <option value=">2 años">Más de 2 años</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">¿Quién decide los descuentos?</label>
                                        <input required name="decision_descuentos" onChange={handleInputChange} className="w-full bg-[#15152a] border border-white/10 rounded-lg p-4 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Ej: Gerente Comercial" />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* File Upload Section */}
                        <div className="pt-4 border-t border-white/5">
                            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                                Archivos Adjuntos <span className="text-slate-500 font-normal lowercase">(Opcional)</span>
                            </label>

                            <div className="relative group">
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    multiple
                                    onChange={handleFileChange}
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-800 hover:border-primary/50 transition-all group-hover:text-primary"
                                >
                                    <UploadCloud className="w-8 h-8 text-slate-500 mb-3 group-hover:text-primary transition-colors" />
                                    <p className="text-sm text-slate-400 font-medium group-hover:text-white">Click para subir o arrastra archivos aquí</p>
                                    <p className="text-xs text-slate-600 mt-1">PDF, Excel, Imágenes (Max 10MB)</p>
                                </label>
                            </div>

                            {/* File List */}
                            {files.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {files.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between bg-slate-800 p-3 rounded-lg border border-white/5">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="bg-primary/20 p-2 rounded-lg">
                                                    <FileText className="w-4 h-4 text-primary" />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-sm text-white font-medium truncate">{file.name}</span>
                                                    <span className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="text-slate-500 hover:text-red-400 p-1 hover:bg-white/5 rounded transition"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                        >
                            {submitting ? (
                                <>{uploading ? <UploadCloud className="w-5 h-5 animate-bounce" /> : <Loader2 className="w-5 h-5 animate-spin" />} {uploading ? "Subiendo archivos..." : "Enviando..."}</>
                            ) : (
                                <><Send className="w-5 h-5" /> Enviar Respuestas</>
                            )}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
