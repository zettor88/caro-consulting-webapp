"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, PieChart, TrendingUp, CheckCircle, Linkedin, Mail, Calendar } from "lucide-react";
import supabase from "@/lib/supabase";

// Fallback content if DB is empty
const defaultContent = {
    hero: {
        tagline: "Consultoría Industrial B2B",
        title: "Impulsa tu rentabilidad con <br /> <span class=\"text-primary\">decisiones basadas en datos</span>",
        subtitle: "Optimización estratégica con el respaldo de Sebastián Caro: más de <span class=\"text-white font-bold\">+332MM</span> en mejoras generadas para líderes del sector.",
        cta_primary: "Solicitar Auditoría Express",
        cta_secondary: "Ver Casos de Éxito"
    },
    services: [
        {
            icon: "TrendingUp",
            title: "Pricing Strategy",
            description: "Diseño de arquitecturas de precios que maximizan la captura de valor sin sacrificar volumen.",
            items: ["Análisis de elasticidad", "Dynamic Pricing B2B"]
        },
        {
            icon: "PieChart",
            title: "Product Management",
            description: "Alineación del roadmap de producto con los objetivos financieros de la compañía.",
            items: ["Racionalización SKU", "Roadmap de innovación"]
        },
        {
            icon: "BarChart3",
            title: "FP&A Avanzado",
            description: "Modelos financieros predictivos y control de gestión para la toma de decisiones ejecutivas.",
            items: ["Modelado de escenarios", "Control OPEX/CAPEX"]
        }
    ],
    cases: [
        {
            title: "Tubexa",
            description: "Implementación de una nueva estructura de descuentos y optimización del mix de productos, logrando un incremento sostenido en el margen EBITDA del 15% en 6 meses.",
            metric_value: "+15%",
            metric_label: "EBITDA",
            time_value: "6 Meses",
            time_label: "Tiempo Ejecución"
        }
    ],
    bio: {
        name: "Sebastian Caro",
        role: "Expert Pricing & Financial Strategy",
        description: "Con más de 10 años de experiencia liderando transformaciones financieras. Mi enfoque combina el rigor analítico de la ingeniería financiera con una visión estratégica de negocio, asegurando impacto directo en la última línea del P&L.",
        linkedin: "https://www.linkedin.com/in/sebastiancaroalvarado/",
        email: "sebastian@caroconsulting.com",
        initials: "SC"
    }
};

export default function Home() {
    const [content, setContent] = useState<any>(defaultContent);

    useEffect(() => {
        const fetchContent = async () => {
            const { data } = await supabase.from('site_content').select('*');
            if (data && data.length > 0) {
                const contentMap: any = { ...defaultContent };
                data.forEach(item => {
                    contentMap[item.key] = item.content;
                });
                setContent(contentMap);
            }
        };
        fetchContent();
    }, []);

    const getIcon = (name: string) => {
        if (name === 'TrendingUp') return <TrendingUp className="w-8 h-8" />;
        if (name === 'PieChart') return <PieChart className="w-8 h-8" />;
        if (name === 'BarChart3') return <BarChart3 className="w-8 h-8" />;
        return <BarChart3 className="w-8 h-8" />;
    };

    return (
        <div className="min-h-screen bg-[#101022] text-white font-sans selection:bg-primary selection:text-white">
            {/* Navigation */}
            <nav className="glass-nav sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-1.5 rounded border border-primary/20">
                                <BarChart3 className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold tracking-tight uppercase">
                                Caro <span className="text-primary">Consulting</span>
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-10">
                            <a href="#servicios" className="text-sm font-semibold text-slate-300 hover:text-primary transition-colors">Servicios</a>
                            <a href="#casos" className="text-sm font-semibold text-slate-300 hover:text-primary transition-colors">Casos de Éxito</a>
                            <a href="#nosotros" className="text-sm font-semibold text-slate-300 hover:text-primary transition-colors">Consultor</a>
                            <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                                Acceso Clientes
                            </Link>
                            <Link
                                href="/agendar"
                                className="bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2.5 px-6 rounded shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                            >
                                <Calendar className="w-4 h-4" /> Agendar
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-hero-glow">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                        {content.hero.tagline}
                    </div>
                    <h1
                        className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight"
                        dangerouslySetInnerHTML={{ __html: content.hero.title }}
                    />
                    <p
                        className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: content.hero.subtitle }}
                    />
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/agendar"
                            className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:translate-y-[-2px]"
                        >
                            {content.hero.cta_primary} <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a
                            href="#casos"
                            className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-lg transition border border-white/10"
                        >
                            {content.hero.cta_secondary}
                        </a>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="servicios" className="py-24 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-black text-white mb-6">Nuestras Especialidades</h2>
                            <p className="text-lg text-slate-400">Soluciones estratégicas de alto impacto.</p>
                        </div>
                        <div className="h-1 flex-1 bg-white/5 ml-8 rounded-full hidden md:block"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {content.services.map((service: any, idx: number) => (
                            <div key={idx} className="group p-8 rounded border border-white/5 bg-white/5 hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-300">
                                <div className="w-14 h-14 bg-primary/10 rounded flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                                    {getIcon(service.icon)}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                <ul className="space-y-3">
                                    {service.items.map((item: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-primary" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Cases Section */}
            <section id="casos" className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {content.cases.map((caso: any, idx: number) => (
                        <div key={idx} className="grid md:grid-cols-2 gap-16 items-center mb-24 last:mb-0">
                            <div>
                                <h2 className="text-4xl font-black mb-6">Caso de Éxito: {caso.title}</h2>
                                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                    {caso.description}
                                </p>
                                <div className="flex gap-4">
                                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex-1">
                                        <span className="block text-3xl font-bold text-white">{caso.metric_value}</span>
                                        <span className="text-xs text-primary uppercase font-bold tracking-wider">{caso.metric_label}</span>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex-1">
                                        <span className="block text-3xl font-bold text-white">{caso.time_value}</span>
                                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">{caso.time_label}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-50"></div>
                                <div className="glass-card p-1 border border-white/10 relative">
                                    {/* Using the CSS Chart for visual flair, keeping it static for now as it helps sales */}
                                    <div className="bg-[#0c0c1b] rounded-lg p-6 h-80 flex flex-col justify-between">
                                        <div className="flex justify-between items-center mb-8">
                                            <span className="text-slate-400 font-medium">{caso.metric_label} Impact</span>
                                            <span className="text-primary font-bold">{caso.metric_value}</span>
                                        </div>
                                        <div className="flex items-end justify-between gap-2 h-full">
                                            {[35, 45, 40, 60, 55, 75, 85].map((h, i) => (
                                                <div key={i} className="w-full bg-primary/20 rounded-t hover:bg-primary/40 transition-all relative group" style={{ height: `${h}%` }}>
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {h}%
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Consultant Section */}
            <section id="nosotros" className="py-24 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-black mb-12">El Consultor</h2>
                    <div className="flex flex-col md:flex-row items-center gap-12 text-left">
                        <div className="w-48 h-48 bg-[#0c0c1b] rounded-full flex-shrink-0 border-4 border-white/10 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors"></div>
                            {/* Placeholder for Profile Photo */}
                            <div className="w-full h-full flex items-center justify-center text-slate-500 text-4xl font-bold bg-white/5">
                                {content.bio.initials}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-2">{content.bio.name}</h3>
                            <p className="text-primary font-bold tracking-wide uppercase text-sm mb-6">{content.bio.role}</p>
                            <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                                {content.bio.description}
                            </p>
                            <div className="flex gap-4">
                                <a href={content.bio.linkedin} target="_blank" className="flex items-center gap-2 text-white hover:text-primary transition font-medium">
                                    <Linkedin className="w-5 h-5" /> LinkedIn Profile
                                </a>
                                <a href={`mailto:${content.bio.email}`} className="flex items-center gap-2 text-white hover:text-primary transition font-medium">
                                    <Mail className="w-5 h-5" /> Email Directo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Footer Section */}
            <section className="py-24">
                <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                    <div className="bg-primary rounded-2xl p-12 md:p-16 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-700"></div>

                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">¿Listo para transformar tus márgenes?</h2>
                            <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                                Agenda un diagnóstico inicial de 30 minutos sin costo para identificar oportunidades inmediatas.
                            </p>
                            <Link
                                href="/agendar"
                                className="inline-flex bg-white text-primary hover:bg-emerald-50 font-bold py-4 px-10 rounded-lg transition shadow-xl text-lg items-center gap-2"
                            >
                                <Calendar className="w-5 h-5" /> Agendar Diagnóstico Ahora
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black/40 border-t border-white/5 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-primary/20 p-1.5 rounded">
                                    <BarChart3 className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-lg font-black tracking-tight text-white uppercase">Caro Consulting</span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Liderando la transformación financiera del sector industrial a través de datos y estrategia.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Servicios</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="#" className="hover:text-primary transition">Pricing Strategy</a></li>
                                <li><a href="#" className="hover:text-primary transition">Product Management</a></li>
                                <li><a href="#" className="hover:text-primary transition">FP&A Avanzado</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Compañía</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="#nosotros" className="hover:text-primary transition">Sobre Nosotros</a></li>
                                <li><a href="#casos" className="hover:text-primary transition">Casos de Éxito</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6">Legal</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link href="/legal/terminos" className="hover:text-primary transition">Términos y Condiciones</Link></li>
                                <li><Link href="/legal/privacidad" className="hover:text-primary transition">Políticas de Privacidad</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-10 text-center">
                        <p className="text-xs text-slate-600">© {new Date().getFullYear()} Caro Consulting. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
