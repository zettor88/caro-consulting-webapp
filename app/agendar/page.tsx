"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Linkedin } from "lucide-react";

export default function AgendarPage() {
    return (
        <div className="min-h-screen bg-[#101022] flex flex-col font-sans selection:bg-primary selection:text-white bg-hero-glow">
            <header className="p-6 border-b border-white/5 flex items-center justify-between max-w-7xl mx-auto w-full glass-nav rounded-b-xl mb-8">
                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition font-medium">
                    <ArrowLeft className="w-5 h-5" /> Volver al Inicio
                </Link>
                <span className="font-bold tracking-tight uppercase text-white">
                    Caro <span className="text-primary">Consulting</span>
                </span>
            </header>

            <main className="flex-1 flex flex-col items-center p-4 max-w-7xl mx-auto w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                        Agenda Online 24/7
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Sesión de Diagnóstico</h1>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto mb-6">
                        Selecciona el horario que más te acomode para tener una primera conversación estratégica de 30 minutos.
                    </p>

                    <a href="https://www.linkedin.com/in/sebastiancaroalvarado" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#0077b5] hover:bg-[#006396] text-white rounded-lg font-bold transition shadow-lg hover:shadow-blue-500/20">
                        <Linkedin className="w-4 h-4" />
                        Ver Perfil de LinkedIn
                    </a>
                </div>

                <div className="w-full max-w-5xl h-[700px] bg-[#15152a] rounded-2xl border border-white/5 overflow-hidden relative shadow-2xl">
                    <iframe
                        src="https://calendly.com/s-caro-alvarado/30min"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        title="Calendly Scheduling"
                        className="relative z-10"
                    ></iframe>

                    {/* Visual placeholder if Calendly is not loaded/configured */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                        <div className="text-center p-8 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md">
                            <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-500 mb-2 font-medium">Cargando Calendario...</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
