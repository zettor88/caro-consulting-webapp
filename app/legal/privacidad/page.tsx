export default function PrivacidadPage() {
    return (
        <div className="min-h-screen bg-[#101022] text-slate-300 font-sans selection:bg-primary selection:text-white bg-hero-glow">
            <div className="max-w-4xl mx-auto p-8 md:p-12">
                <header className="mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Política de Privacidad y Seguridad</h1>
                    <p className="text-slate-500">Comprometidos con la confidencialidad de su información.</p>
                </header>

                <div className="glass-card p-10 rounded-2xl border border-white/5 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3 text-emerald-500">Confidencialidad de Datos</h2>
                        <p className="leading-relaxed">
                            Entendemos la sensibilidad de la información financiera y estratégica. Todos los datos cargados en la plataforma (ventas, márgenes, estrategias) están protegidos bajo estrictos acuerdos de confidencialidad (NDA).
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3 text-emerald-500">Seguridad de Infraestructura</h2>
                        <p className="leading-relaxed">
                            Nuestra plataforma utiliza encriptación de grado bancario (SSL/TLS) para todas las transmisiones de datos. Los archivos adjuntos se almacenan en servidores seguros con controles de acceso restringidos (RLS - Row Level Security), asegurando que **solo personal autorizado y su empresa** puedan acceder a sus documentos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3 text-emerald-500">Uso de Información</h2>
                        <p className="leading-relaxed">
                            La información recopilada se utiliza exclusivamente para:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Generar los reportes y dashboards contratados.</li>
                            <li>Brindar las recomendaciones estratégicas pertinentes.</li>
                            <li>Mejorar la experiencia de uso de la plataforma.</li>
                        </ul>
                        <p className="mt-2">**Nunca** comercializamos ni compartimos sus datos con terceros.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
