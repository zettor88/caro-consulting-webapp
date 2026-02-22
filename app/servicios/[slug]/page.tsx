"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ChevronRight, MessageSquare, Calendar, BarChart3, PieChart, Target, MonitorPlay, Layers } from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";
import Image from "next/image";

export default function ServicioPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;
    const service = SERVICES_DATA[slug];

    if (!service) {
        return notFound();
    }

    const Icon = service.icon;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary selection:text-slate-100">
            {/* Navigation */}
            <header className="p-6 md:px-12 flex items-center justify-between sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition font-medium">
                    <ArrowLeft className="w-5 h-5" /> Volver al Inicio
                </Link>
                <div className="font-bold tracking-tight uppercase">
                    Caro <span className="text-primary">Consulting</span>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative py-20 overflow-hidden bg-slate-900 text-white">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-3/5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">
                                    Servicio Especializado
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                                    {service.title}
                                </h1>
                                <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                                    {service.subtitle}
                                </p>

                                <div className="flex flex-wrap gap-4 mt-10">
                                    <Link
                                        href="/agendar"
                                        className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold transition shadow-lg shadow-primary/20 flex items-center gap-2"
                                    >
                                        <Calendar className="w-5 h-5" /> Agendar Auditoría Express
                                    </Link>
                                    <Link
                                        href="/formularios/diagnostico"
                                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-bold transition flex items-center gap-2"
                                    >
                                        <Target className="w-5 h-5" /> Realizar Diagnóstico Gratis
                                    </Link>
                                </div>
                            </div>

                            <div className="md:w-2/5 flex justify-center">
                                <div className="w-48 h-48 md:w-64 md:h-64 bg-primary/20 rounded-3xl border border-primary/30 flex items-center justify-center relative shadow-2xl animate-pulse">
                                    <Icon className="w-24 h-24 md:w-32 md:h-32 text-primary" />
                                    <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full -z-10"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-24 max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-16">

                        {/* Details Column */}
                        <div className="lg:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 text-slate-900">¿Por qué es crítico para tu negocio?</h2>
                                <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                                    {service.description}
                                </p>
                            </div>

                            <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                        <CheckCircle className="w-6 h-6" />
                                    </span>
                                    Alcance del Servicio
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {service.features.map((feature: string, idx: number) => (
                                        <div key={idx} className="flex gap-4 group">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                            <p className="text-slate-700 font-medium">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>

                                <h3 className="text-xl font-bold mb-6 relative z-10">Beneficios Esperados</h3>
                                <div className="space-y-4 relative z-10">
                                    {service.benefits.map((benefit: string, idx: number) => (
                                        <div key={idx} className="flex gap-3">
                                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                                                <CheckCircle className="w-3.5 h-3.5 text-white" />
                                            </div>
                                            <p className="text-slate-300 text-sm font-medium leading-relaxed">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
                                <h3 className="text-lg font-bold mb-4">¿Tienes una duda rápida?</h3>
                                <p className="text-slate-600 text-sm mb-6">Contáctame directamente por WhatsApp para una asesoría express.</p>
                                <Link
                                    href="https://wa.me/56984180415"
                                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                                >
                                    <MessageSquare className="w-5 h-5 text-white" /> Chat por WhatsApp
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer CTA Section */}
                <section className="py-24 bg-slate-100 border-t border-slate-200">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <div className="bg-white p-12 md:p-20 rounded-[48px] shadow-2xl border border-slate-200 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 relative z-10">¿Listo para maximizar tu rentabilidad?</h2>
                            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto relative z-10">
                                Agenda una sesión de 15 minutos para entender tu contexto y definir un plan de acción concreto.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                                <Link
                                    href="/agendar"
                                    className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl font-bold transition shadow-xl shadow-primary/30 flex items-center justify-center gap-2 text-lg"
                                >
                                    Agendar Sesión Express
                                </Link>
                                <Link
                                    href="/formularios/diagnostico"
                                    className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-bold transition flex items-center justify-center gap-2 text-lg shadow-xl shadow-slate-900/20"
                                >
                                    Diagnóstico Ejecutivo 100% Gratis
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Simple Footer */}
            <footer className="py-12 border-t border-slate-200 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Caro Consulting. Todos los derechos reservados.
            </footer>
        </div>
    );
}
