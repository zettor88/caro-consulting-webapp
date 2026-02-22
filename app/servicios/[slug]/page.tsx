"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle,
    ChevronRight,
    MessageSquare,
    Calendar,
    BarChart3,
    PieChart,
    Target,
    MonitorPlay,
    Layers,
    Search,
    ClipboardList,
    TrendingUp,
    Zap,
    ArrowRight
} from "lucide-react";
import { SERVICES_DATA } from "@/lib/services-data";

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
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary selection:text-white">
            {/* Transparent Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-semibold group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
                    </Link>
                    <div className="text-xl font-bold tracking-tight">
                        CARO <span className="text-primary font-light">CONSULTING</span>
                    </div>
                </div>
            </header>

            <main className="pt-20">
                {/* Hero Minimalist Like Reference */}
                <section className="bg-slate-50 py-24 md:py-32 border-b border-slate-100">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                            Área de Intervención
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-[1.1]">
                            {service.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium">
                            {service.subtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                            <Link
                                href="/agendar"
                                className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-xl font-bold transition shadow-xl shadow-primary/20 flex items-center justify-center gap-2 text-lg"
                            >
                                <Calendar className="w-5 h-5" /> Agendar Auditoría Express
                            </Link>
                            <Link
                                href="/formularios/diagnostico"
                                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-10 py-5 rounded-xl font-bold transition flex items-center justify-center gap-2 text-lg shadow-sm"
                            >
                                <Target className="w-5 h-5 text-primary" /> Diagnóstico de Rentabilidad
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Problem & Solution Intro text */}
                <section className="py-24 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Enfoque de Negocio</h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                        {service.description.split('. ').map((sentence: string, i: number) => (
                            <span key={i} className={i % 2 === 0 ? "font-medium text-slate-700" : ""}>
                                {sentence}.{" "}
                            </span>
                        ))}
                    </p>
                </section>

                {/* How We Help Cards (Reference style) */}
                <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[150px]"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]"></div>
                    </div>

                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center">Así ayudaremos a tu empresa</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {service.howWeHelp?.map((item: any, idx: number) => (
                                <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 rounded-[32px] hover:bg-white/10 transition-all group">
                                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        {idx === 0 && <Search className="w-6 h-6 text-primary" />}
                                        {idx === 1 && <ClipboardList className="w-6 h-6 text-primary" />}
                                        {idx === 2 && <TrendingUp className="w-6 h-6 text-primary" />}
                                        {idx === 3 && <Zap className="w-6 h-6 text-primary" />}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed text-lg">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Scope & Methodology grid */}
                <section className="py-24 max-w-6xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20">
                        {/* Features List */}
                        <div>
                            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                                <span className="w-2 h-8 bg-primary rounded-full"></span>
                                Alcance del Servicio
                            </h2>
                            <div className="space-y-6">
                                {service.features.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex gap-4 items-start py-4 border-b border-slate-100 group">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                        <p className="text-slate-700 font-medium text-lg leading-snug group-hover:text-primary transition-colors">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Process List */}
                        <div>
                            <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
                                <span className="w-2 h-8 bg-slate-900 rounded-full"></span>
                                Metodología de Trabajo
                            </h2>
                            <div className="space-y-8">
                                {service.process?.map((step: string, idx: number) => (
                                    <div key={idx} className="relative pl-12">
                                        <div className="absolute left-0 top-0 w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                                            {idx + 1}
                                        </div>
                                        <p className="text-slate-600 text-lg font-medium leading-relaxed">
                                            {step}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Box in Sidebar */}
                            <div className="mt-16 bg-blue-50 p-10 rounded-[32px] border border-blue-100">
                                <h3 className="text-xl font-bold mb-4 text-blue-900">¿Listo para empezar?</h3>
                                <p className="text-blue-800/70 mb-8 font-medium">
                                    Agenda una sesión estratégica para entender la viabilidad técnica y el ROI esperado de la implementación en tu caso particular.
                                </p>
                                <Link
                                    href="https://wa.me/56984180415"
                                    className="inline-flex items-center gap-3 text-primary font-black text-lg group"
                                >
                                    Chatea con un consultor <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final Result/Benefits Section */}
                <section className="py-24 bg-white">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="bg-slate-50 rounded-[48px] p-12 md:p-20 text-center">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-12">Resultados Esperados</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {service.benefits.map((benefit: string, idx: number) => (
                                    <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-transform hover:-translate-y-2">
                                        <div className="text-primary font-black text-4xl mb-4">0{idx + 1}</div>
                                        <p className="text-slate-700 font-bold leading-tight">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer CTA Section */}
                <section className="py-32">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 tracking-tight">Empieza ahora</h2>
                        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                            Transforma tus procesos y datos en decisiones estratégicas de alta rentabilidad con Caro Consulting.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link
                                href="/agendar"
                                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-12 py-6 rounded-2xl font-bold transition shadow-2xl shadow-primary/30 text-xl"
                            >
                                Agendar Auditoría
                            </Link>
                            <Link
                                href="https://wa.me/56984180415"
                                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-12 py-6 rounded-2xl font-bold transition flex items-center justify-center gap-3 text-xl shadow-2xl shadow-green-200"
                            >
                                <MessageSquare className="w-6 h-6" /> Chat por WhatsApp
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Simple Footer */}
            <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Caro Consulting. Todos los derechos reservados.
            </footer>
        </div>
    );
}
