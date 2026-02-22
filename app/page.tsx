import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, PieChart, TrendingUp, CheckCircle, Linkedin, Calendar, MonitorPlay, ChevronRight, Mail, Target, Layers } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
            {/* Navegación - Estilo Premium Minimalista */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-900 p-2 rounded text-white shadow-sm border border-slate-700">
                                <BarChart3 className="w-5 h-5 flex-shrink-0" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">
                                Caro <span className="font-light">Consulting</span>
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#servicios" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Ejes de Intervención</a>
                            <a href="#metodologia" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Nuestro Enfoque</a>
                            <a href="#consultor" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">El Consultor</a>
                            <Link href="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                Acceso Plataforma
                            </Link>
                            <Link
                                href="/agendar"
                                className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-2.5 px-6 rounded-md transition-all flex items-center gap-2 shadow-md shadow-slate-200"
                            >
                                <Calendar className="w-4 h-4" /> Solicitar Auditoría Express
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-200 text-xs font-semibold uppercase tracking-wider mb-8">
                            Control de Gestión & Rentabilidad B2B
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight text-balance">
                            Impulsa tu rentabilidad con pricing, control de gestión e <span className="text-blue-400">indicadores claros</span>.
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto text-pretty">
                            Externaliza el análisis y la reportería crítica de tu negocio. Implementamos pricing, KPIs y BI para que decidas con datos, no con intuición.
                        </p>

                        <div className="inline-flex items-center gap-2 bg-blue-900/40 border border-blue-500/30 px-5 py-3 rounded-lg text-blue-100 text-sm font-medium mb-12 shadow-inner">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                            <strong>Respaldo con resultados:</strong> +332MM en mejoras de contribución en 6 meses mediante rediseño de pricing y rentabilidad.
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/formularios/diagnostico"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-md transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                            >
                                Realizar Diagnóstico Gratuito <ArrowRight className="w-5 h-5 flex-shrink-0" />
                            </Link>
                            <a
                                href="#servicios"
                                className="bg-transparent hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-md transition-all border border-white/20 flex items-center justify-center gap-2"
                            >
                                Ver Servicios
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pain Points / Desafíos */}
            <section id="dolores" className="py-24 bg-white border-b border-slate-200 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="mb-16 text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">¿Te suenan familiares estos desafíos?</h2>
                        <p className="text-slate-600 text-lg">La falta de información frena el crecimiento y destruye valor corporativo.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* Dolor 1 */}
                        <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl hover:shadow-md transition">
                            <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center mb-6">
                                <span className="text-2xl">💸</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">Precios y descuentos sin gobernanza</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Se negocia caso a caso, se pierde margen sin visibilidad y el equipo vende "por presión".</p>
                        </div>

                        {/* Dolor 2 */}
                        <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl hover:shadow-md transition">
                            <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center mb-6">
                                <span className="text-2xl">📦</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">Rentabilidad desconocida</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">No está claro qué clientes o SKUs (productos) generan valor real y cuáles simplemente destruyen contribución.</p>
                        </div>

                        {/* Dolor 3 */}
                        <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl hover:shadow-md transition">
                            <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center mb-6">
                                <span className="text-2xl">🐢</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">Reportería lenta o manual</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Los reportes llegan tarde, operando con archivos Excel manuales frágiles y sin un "número único" confiable en toda la empresa.</p>
                        </div>

                        {/* Dolor 4 */}
                        <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl hover:shadow-md transition">
                            <div className="w-12 h-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center mb-6">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">Falta de KPIs para gestionar</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">Se mide la actividad diaria, pero no la performance clave: margen, mix, contribución, rotación de inventario o cumplimiento normativo.</p>
                        </div>
                    </div>

                    <div className="text-center bg-blue-50 border border-blue-100 rounded-lg py-6 px-8 max-w-3xl mx-auto">
                        <p className="text-blue-900 font-medium">
                            <span className="font-bold">Si esto te pasa, necesitas estructura de control</span> — sin necesariamente contratar un equipo interno complejo.
                        </p>
                    </div>
                </div>
            </section>

            {/* Soluciones & Servicios */}
            <section id="servicios" className="py-28 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <div className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-4">Nuestras Soluciones Externas</div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Intervenimos los ejes decisivos para la última línea</h2>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            No despachamos teorías. Entregamos políticas, estructuras de datos y reportería profesional para medianas y grandes empresas.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:grid-cols-3 mb-12">
                        {/* Servicio 1 */}
                        <Link href="/servicios/pricing-estrategico" className="group bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col">
                            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-800 mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Pricing Estratégico & Gobernanza Comercial</h3>
                            <p className="text-slate-600 mb-6 text-sm font-medium leading-relaxed">Aumentar contribución sin perder competitividad.</p>
                            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between text-primary font-bold text-sm">
                                Ver más detalles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Servicio 2 */}
                        <Link href="/servicios/control-gestion" className="group bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col">
                            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-800 mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Control de Gestión Externo (PYMEs)</h3>
                            <p className="text-slate-600 mb-6 text-sm font-medium leading-relaxed">Control mensual y visibilidad ejecutiva sin sumar estructura fija.</p>
                            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between text-primary font-bold text-sm">
                                Ver más detalles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Servicio 3 */}
                        <Link href="/servicios/implementacion-kpis" className="group bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col">
                            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-800 mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Implementación de KPIs e Indicadores</h3>
                            <p className="text-slate-600 mb-6 text-sm font-medium leading-relaxed">Medir lo que importa para mejorar performance.</p>
                            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between text-primary font-bold text-sm">
                                Ver más detalles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Servicio 4 */}
                        <Link href="/servicios/business-intelligence" className="group bg-slate-900 text-white p-10 rounded-2xl border border-slate-800 shadow-lg hover:shadow-primary/10 transition-all flex flex-col lg:col-span-1 md:col-span-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
                                <MonitorPlay className="w-32 h-32" />
                            </div>
                            <div className="relative z-10 w-14 h-14 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white mb-6 group-hover:bg-primary transition-colors">
                                <MonitorPlay className="w-6 h-6" />
                            </div>
                            <h3 className="relative z-10 text-xl font-bold text-white mb-2">Business Intelligence (Power BI)</h3>
                            <p className="relative z-10 text-slate-300 mb-6 text-sm font-medium leading-relaxed">Reportería automatizada para decidir a tiempo.</p>
                            <div className="relative z-10 mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-blue-400 font-bold text-sm">
                                Ver más detalles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        {/* Servicio 5 */}
                        <Link href="/servicios/control-proyectos" className="group bg-white p-10 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all flex flex-col lg:col-span-2 md:col-span-2">
                            <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-800 mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <Layers className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Control Financiero de Proyectos</h3>
                            <p className="text-slate-600 mb-6 text-sm font-medium leading-relaxed">Evitar desviaciones y sobrecostos en obras o proyectos complejos.</p>
                            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between text-primary font-bold text-sm">
                                Ver más detalles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/agendar"
                            className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-50 border border-slate-300 px-8 py-3.5 rounded-md text-sm font-bold shadow-sm transition-all"
                        >
                            Quiero externalizar mi reportería <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Metodología */}
            <section id="metodologia" className="py-24 bg-white border-y border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Nuestro Enfoque Operativo</h2>
                        <p className="text-slate-600 text-lg">Metodología ágil en 3 pasos orientada a producir rentabilidad mes a mes.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-slate-200 z-0"></div>

                        {/* Step 1 */}
                        <div className="relative z-10">
                            <div className="w-16 h-16 mx-auto bg-white border-2 border-slate-200 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <span className="text-lg font-bold text-slate-900">1</span>
                            </div>
                            <h3 className="text-lg text-center font-bold text-slate-900 mb-3">Diagnóstico Inicial</h3>
                            <p className="text-sm text-center text-slate-600 leading-relaxed max-w-xs mx-auto">
                                Revisamos datos, precios, márgenes y reportería para detectar fugas y oportunidades rápidamente.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative z-10">
                            <div className="w-16 h-16 mx-auto bg-white border-2 border-blue-500 rounded-full flex items-center justify-center mb-6 shadow-md">
                                <span className="text-lg font-bold text-blue-600">2</span>
                            </div>
                            <h3 className="text-lg text-center font-bold text-slate-900 mb-3">Diseño del Modelo</h3>
                            <p className="text-sm text-center text-slate-600 leading-relaxed max-w-xs mx-auto">
                                Definimos reglas, KPIs escalables y tableros con foco puramente en impacto financiero real.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative z-10">
                            <div className="w-16 h-16 mx-auto bg-slate-900 border-2 border-slate-900 text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                                <span className="text-lg font-bold">3</span>
                            </div>
                            <h3 className="text-lg text-center font-bold text-slate-900 mb-3">Implementación</h3>
                            <p className="text-sm text-center text-slate-600 leading-relaxed max-w-xs mx-auto">
                                Dejamos la operación andando: reportes instalados, dashboards interactivos y rutina de control ejecutivo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* El Consultor & Resultados */}
            <section id="consultor" className="py-24 bg-slate-900 border-y border-slate-800 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-16">

                        {/* Stats / Resultados Column */}
                        <div className="w-full md:w-5/12 order-2 md:order-1 flex flex-col justify-center">
                            <h3 className="text-xl font-bold mb-8 text-blue-400">Trayectoria & Resultados Demostrables</h3>
                            <div className="space-y-6">
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <div className="text-4xl font-black text-white mb-1">+10 Años</div>
                                    <div className="text-sm text-slate-400 font-medium">Experiencia en pricing, rentabilidad y control</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <div className="text-4xl font-black text-white mb-1">+332MM</div>
                                    <div className="text-sm text-slate-400 font-medium">En contribución en 6 meses (rediseño Pricing & Rentabilidad)</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
                                    <div className="text-4xl font-black text-white mb-1">$200MM</div>
                                    <div className="text-sm text-slate-400 font-medium">Ahorros generados en 6 meses (optimización costos)</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-xl relative overflow-hidden">
                                    <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                                        <PieChart className="w-32 h-32" />
                                    </div>
                                    <div className="text-3xl font-black text-white mb-2 leading-none relative z-10">AMB (~$20.000MM)</div>
                                    <div className="text-sm text-slate-400 font-medium relative z-10">Proyectos controlados (Gestión financiera integral)</div>
                                </div>
                            </div>
                        </div>

                        {/* Bio Column */}
                        <div className="w-full md:w-7/12 order-1 md:order-2">
                            <div className="flex flex-col md:flex-row gap-8 items-start mb-8 border-b border-white/10 pb-8">
                                {/* Profile Image */}
                                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 relative rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-600">
                                    <Image
                                        src="/foto-perfil-1.png"
                                        alt="Sebastián Caro - Consultor B2B"
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 768px) 128px, 192px"
                                        priority
                                    />
                                </div>

                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold uppercase tracking-widest mb-4">
                                        El Consultor
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Sebastián Caro</h2>
                                    <p className="text-blue-400 text-lg font-semibold mb-5">
                                        Pricing Estratégico | Rentabilidad | Control de Gestión | BI (Power BI)
                                    </p>
                                    <a
                                        href="https://www.linkedin.com/in/sebastiancaroalvarado/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#005e93] text-white px-5 py-2.5 rounded-md text-sm font-semibold transition shadow-md"
                                    >
                                        <Linkedin className="w-4 h-4 shrink-0" /> Ver trayectoria en LinkedIn
                                    </a>
                                </div>
                            </div>

                            <p className="text-slate-300 leading-relaxed text-lg mb-6">
                                Soy Ingeniero Civil Industrial y MBA(c), con más de 10 años liderando estrategia comercial,
                                pricing y gestión de rentabilidad en negocios B2B de alta escala.
                            </p>
                            <p className="text-slate-300 leading-relaxed text-lg mb-8">
                                Diseño e implemento modelos de pricing, control de gestión e inteligencia de negocios
                                (Power BI/Python) para mejorar márgenes, optimizar mix y profesionalizar la toma de decisiones.
                                He liderado gobernanza comercial, KPIs accionables y análisis de alto impacto para
                                gerencias comerciales y financieras.
                            </p>

                            <div className="space-y-4 mb-10 pl-4 border-l-2 border-primary/40 bg-white/5 p-4 rounded-r-lg">
                                <ul className="space-y-3">
                                    <li className="flex text-slate-200 text-sm items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                                        <span>+332MM en contribución en 6 meses tras rediseño de pricing y rentabilidad.</span>
                                    </li>
                                    <li className="flex text-slate-200 text-sm items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                                        <span>Reducción de pérdidas de margen de 5,4% a 2,8%.</span>
                                    </li>
                                    <li className="flex text-slate-200 text-sm items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                                        <span>Ahorros por $200MM en 6 meses optimizando estructuras de costos.</span>
                                    </li>
                                    <li className="flex text-slate-200 text-sm items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                                        <span>Control financiero de proyecto Aeropuerto AMB (~$20.000MM).</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/agendar" className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3.5 rounded-md text-sm font-bold shadow-lg shadow-blue-900/50 transition">
                                    Solicitar Auditoría Express
                                </Link>
                                <a href="https://www.linkedin.com/in/sebastiancaroalvarado/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-6 py-3.5 rounded-md text-sm font-semibold transition">
                                    <Linkedin className="w-5 h-5" /> Ver LinkedIn
                                </a>
                                <a href="mailto:director@caro-consulting.cl" className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 border border-white/20 text-white px-6 py-3.5 rounded-md text-sm font-semibold transition">
                                    <Mail className="w-5 h-5" /> Escribir por Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-white relative">
                <div className="absolute inset-0 bg-slate-50/50"></div>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">Es momento de tomar posesión real del margen.</h2>
                    <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                        Agenda un diagnóstico inicial de 30 minutos para identificar oportunidades directas en pricing, rentabilidad y control estructurado.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/formularios/diagnostico"
                            className="inline-flex bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-md transition shadow-2xl shadow-blue-500/20 text-lg items-center justify-center gap-3 w-full md:w-auto"
                        >
                            <BarChart3 className="w-5 h-5 flex-shrink-0" /> Iniciar Diagnóstico Gratuito
                        </Link>
                        <Link
                            href="/agendar"
                            className="inline-flex bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-md transition shadow-2xl shadow-slate-900/10 text-lg items-center justify-center gap-3 w-full md:w-auto"
                        >
                            <Calendar className="w-5 h-5 flex-shrink-0" /> Agendar auditoría (30 min)
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer Sobrio Corporativo */}
            <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-slate-800 p-2 rounded text-white border border-slate-700">
                                    <BarChart3 className="w-5 h-5" />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-white uppercase">Caro Consulting</span>
                            </div>
                            <p className="text-slate-500 leading-relaxed max-w-sm">
                                Transformación ejecutiva enfocada exclusivamente en rentabilidad B2B, pricing paramétrico y ecosistemas de inteligencia de negocios para medianas y grandes empresas.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Expertise</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><a href="#servicios" className="hover:text-white transition">Pricing Estratégico</a></li>
                                <li><a href="#servicios" className="hover:text-white transition">Control de Gestión B2B</a></li>
                                <li><a href="#servicios" className="hover:text-white transition">Desarrollo KPIs</a></li>
                                <li><a href="#servicios" className="hover:text-white transition">Business Intelligence</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contacto Directo</h4>
                            <ul className="space-y-4 text-sm text-slate-500">
                                <li><Link href="/agendar" className="hover:text-white transition text-blue-400 font-semibold">Agendar Auditoría Express</Link></li>
                                <li><Link href="/login" className="hover:text-white transition">Portal de Clientes</Link></li>
                                <li className="pt-4"><a href="mailto:director@caro-consulting.cl" className="hover:text-white transition underline underline-offset-4">director@caro-consulting.cl</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-wide">
                        <p>© {new Date().getFullYear()} Caro Consulting SPA. Todos los derechos reservados.</p>
                        <div className="flex gap-6">
                            <span className="hover:text-white cursor-pointer transition">Políticas de Privacidad</span>
                            <span className="hover:text-white cursor-pointer transition">Términos de Servicio</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
