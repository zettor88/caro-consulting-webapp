export default function TerminosPage() {
    return (
        <div className="min-h-screen bg-[#101022] text-slate-300 font-sans selection:bg-primary selection:text-white bg-hero-glow">
            <div className="max-w-4xl mx-auto p-8 md:p-12">
                <header className="mb-12 text-center">
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-4">Términos y Condiciones</h1>
                    <p className="text-slate-500">Última actualización: {new Date().toLocaleDateString()}</p>
                </header>

                <div className="glass-card p-10 rounded-2xl border border-white/5 space-y-8">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. Introducción</h2>
                        <p className="leading-relaxed">
                            Bienvenido a Caro Consulting. Al acceder a nuestros servicios de consultoría estratégica y uso de nuestra plataforma digital, usted acepta estar sujeto a estos términos y condiciones.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. Servicios de Consultoría</h2>
                        <p className="leading-relaxed">
                            Nuestros servicios incluyen asesoría en estrategia comercial, pricing, optimización de procesos y gestión de operaciones. El alcance específico de cada proyecto se detallará en el propuesto comercial o contrato de servicios particular.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. Uso de la Plataforma</h2>
                        <p className="leading-relaxed">
                            La plataforma digital (Dashboard) se provee "tal cual" para facilitar la visualización de métricas y el intercambio de documentos. Caro Consulting se reserva el derecho de realizar mantenimientos o actualizaciones que podrían interrumpir temporalmente el servicio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. Propiedad Intelectual</h2>
                        <p className="leading-relaxed">
                            Todos los informes, matrices y metodologías entregadas son propiedad intelectual de Caro Consulting, licenciados para el uso interno exclusivo del cliente contratante. No está permitida su reventa o distribución pública sin autorización escrita.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
