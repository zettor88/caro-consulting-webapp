"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle, BarChart3, AlertTriangle, FileText, CheckCircle2, User, Mail, Building, Briefcase } from "lucide-react";
import supabase from "@/lib/supabase";

// --- DATA DEFINITION ---
const SECTIONS = [
    {
        id: "pricing",
        title: "1. PRICING & GESTIÓN COMERCIAL",
        questions: [
            { id: "P01", text: "La empresa tiene una estrategia de precios formalmente definida y documentada." },
            { id: "P02", text: "Los descuentos comerciales siguen reglas claras y son aprobados con niveles de autorización definidos." },
            { id: "P03", text: "Se analiza el impacto en margen antes de aprobar cambios de precio o descuentos especiales." },
            { id: "P04", text: "Los precios se fijan considerando costos, posicionamiento de mercado y objetivo de rentabilidad." },
            { id: "P05", text: "La empresa segmenta clientes y aplica políticas de precio diferenciadas según el segmento." }
        ]
    },
    {
        id: "rentabilidad",
        title: "2. RENTABILIDAD & MÁRGENES",
        questions: [
            { id: "R01", text: "La empresa conoce con precisión su rentabilidad por cliente o segmento de clientes." },
            { id: "R02", text: "Se identifican y gestionan activamente los productos o servicios que erosionan el margen." },
            { id: "R03", text: "Se monitorea la contribución marginal de forma regular (mensual o más frecuente)." },
            { id: "R04", text: "La empresa analiza el mix de ventas y su efecto en la rentabilidad global." },
            { id: "R05", text: "Existe visibilidad sobre las fugas de rentabilidad (devoluciones, bonos, costos ocultos, logística)." }
        ]
    },
    {
        id: "control",
        title: "3. CONTROL DE GESTIÓN",
        questions: [
            { id: "C01", text: "La empresa opera con KPIs estratégicos formalmente definidos y comunicados al equipo directivo." },
            { id: "C02", text: "Existe un proceso de presupuesto anual y se genera un forecast actualizado periódicamente." },
            { id: "C03", text: "Se analizan sistemáticamente las desviaciones entre resultados reales y presupuesto." },
            { id: "C04", text: "La alta dirección recibe reportes ejecutivos regulares con información suficiente para decidir." },
            { id: "C05", text: "Existe una rutina de control con frecuencia mínima mensual (reuniones + revisión de indicadores)." }
        ]
    },
    {
        id: "bi",
        title: "4. REPORTERÍA & BUSINESS INTELLIGENCE",
        questions: [
            { id: "B01", text: "Los reportes de gestión clave están automatizados y no requieren trabajo manual intensivo." },
            { id: "B02", text: "La gerencia utiliza dashboards o paneles de control para monitorear el desempeño del negocio." },
            { id: "B03", text: "Los reportes están disponibles dentro de las primeras 48–72 horas del cierre del período." },
            { id: "B04", text: "La calidad de los datos es confiable; existe un proceso de validación o gobierno del dato." },
            { id: "B05", text: "La información financiera y comercial está integrada en un sistema único (ERP, BI, plataforma)." }
        ]
    },
    {
        id: "proyectos",
        title: "5. GESTIÓN DE PROYECTOS",
        questions: [
            { id: "G01", text: "Los proyectos internos se gestionan con presupuesto, cronograma y responsable claramente definidos." },
            { id: "G02", text: "Se monitorea el avance de proyectos vs. lo planificado y se toman acciones correctivas oportunas." },
            { id: "G03", text: "Existe un proceso de cierre de proyectos con lecciones aprendidas documentadas." },
            { id: "G04", text: "Los proyectos estratégicos están alineados con los objetivos financieros y de rentabilidad." },
            { id: "G05", text: "Existe visibilidad del EAC (Estimado al Completar) y su desviación respecto al presupuesto original." }
        ],
        hasOpenChallenge: true
    }
];

export default function DiagnosticoPage() {
    const router = useRouter();
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [userAuth, setUserAuth] = useState<any>(null);

    // Lead Capture State (Paso 0 - No longer default start point)
    const [step, setStep] = useState<'lead_capture' | 'questions' | 'results'>('questions');
    const [leadData, setLeadData] = useState({ nombre: "", email: "", empresa: "", industria: "", cargo: "", tamaño_empresa: "" });

    // Form State
    const [currentSection, setCurrentSection] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [desafio, setDesafio] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Results State
    const [resultsData, setResultsData] = useState<any>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUserAuth(session.user);
            }
            // Allow anonymous access

            // Load saved progress if exists
            const saved = localStorage.getItem("diag_progress");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.answers) setAnswers(parsed.answers);
                    if (parsed.currentSection) setCurrentSection(parsed.currentSection);
                    if (parsed.desafio) setDesafio(parsed.desafio);
                    if (parsed.leadData) setLeadData(parsed.leadData);
                    if (parsed.step) setStep(parsed.step);
                } catch (e) { }
            }
            setLoadingInitial(false);
        };
        checkAuth();
    }, []);

    // Guardar en localStorage al cambiar respuestas
    useEffect(() => {
        if (!loadingInitial && !resultsData) {
            localStorage.setItem("diag_progress", JSON.stringify({ answers, currentSection, desafio, leadData, step }));
        }
    }, [answers, currentSection, desafio, leadData, step, loadingInitial, resultsData]);

    const handleSelectLikert = (qId: string, value: number) => {
        setAnswers(prev => ({ ...prev, [qId]: value }));
    };

    const isCurrentSectionComplete = () => {
        const section = SECTIONS[currentSection];
        return section.questions.every(q => answers[q.id]);
    };

    const nextSection = () => {
        if (isCurrentSectionComplete() && currentSection < SECTIONS.length - 1) {
            setCurrentSection(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevSection = () => {
        if (currentSection > 0) {
            setCurrentSection(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async () => {
        if (!isCurrentSectionComplete()) return;
        setSubmitting(true);

        // Calcular Scores
        const calculateAvg = (keys: string[]) => {
            const sum = keys.reduce((acc, k) => acc + (answers[k] || 0), 0);
            return parseFloat((sum / keys.length).toFixed(2));
        };

        const sPricing = calculateAvg(["P01", "P02", "P03", "P04", "P05"]);
        const sRentab = calculateAvg(["R01", "R02", "R03", "R04", "R05"]);
        const sControl = calculateAvg(["C01", "C02", "C03", "C04", "C05"]);
        const sBI = calculateAvg(["B01", "B02", "B03", "B04", "B05"]);
        const sProy = calculateAvg(["G01", "G02", "G03", "G04", "G05"]);

        const global = parseFloat(((sPricing + sRentab + sControl + sBI + sProy) / 5).toFixed(2));

        let nivel = "optimizado";
        if (global <= 2.0) nivel = "critico";
        else if (global <= 3.0) nivel = "reactivo";
        else if (global <= 4.0) nivel = "controlado";

        // Preparar para guardar (Hold off on submitting to DB untill we capture lead info)
        const dataToSave = {
            usuario_id: userAuth?.id || null,
            estado: "completado",
            fecha_completado: new Date().toISOString(),
            score_pricing: sPricing,
            score_rentabilidad: sRentab,
            score_control: sControl,
            score_bi: sBI,
            score_proyectos: sProy,
            score_global: global,
            nivel_madurez: nivel,
            respuestas_json: answers,
            desafio_abierto: desafio,
        };

        // If not logged in, we need to ask for their info first before showing results!
        if (!userAuth?.id) {
            setResultsData(dataToSave); // Store temporarily in state
            setStep('lead_capture');
            setSubmitting(false);
            window.scrollTo(0, 0);
            return;
        }

        try {
            const { data, error } = await supabase.from('diagnosticos').insert(dataToSave).select().single();
            if (error) throw error;

            // Limpiar cache local
            localStorage.removeItem("diag_progress");

            // Mostrar pantalla de resultados
            setResultsData(dataToSave);
            setStep('results');

            // En background: Se llama API route para generar PDF y Email automáticamente
            if (data && data.id) {
                fetch('/api/diagnostic-report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ diagnosticoId: data.id })
                }).catch(err => console.error("Report Generation Trigger Failed", err));
            }

        } catch (err) {
            console.error("Error al guardar diagnóstico:", err);
            alert("Error al procesar el diagnóstico. Por favor intenta otra vez.");
        } finally {
            setSubmitting(false);
            window.scrollTo(0, 0);
        }
    };

    const handleLeadSubmit = async () => {
        setSubmitting(true);
        try {
            // First save the user info to the leads table
            let currentUserId = null;
            const { data: leadUser, error: leadError } = await supabase
                .from('usuarios')
                .insert({
                    nombre: leadData.nombre,
                    email: leadData.email,
                    empresa: leadData.empresa,
                    industria: leadData.industria,
                    cargo: leadData.cargo,
                    tamaño_empresa: leadData.tamaño_empresa
                })
                .select()
                .single();

            if (!leadError && leadUser) {
                currentUserId = leadUser.id;
            } else {
                console.log("Could not save lead profile separately", leadError);
            }

            // Now append the user to the saved resultsData
            const finalDataToSave = {
                ...resultsData,
                usuario_id: currentUserId,
            };

            const { data, error } = await supabase.from('diagnosticos').insert(finalDataToSave).select().single();
            if (error) throw error;

            // Limpiar cache local
            localStorage.removeItem("diag_progress");

            setStep('results');

            // Generate PDF
            if (data && data.id) {
                fetch('/api/diagnostic-report', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ diagnosticoId: data.id })
                }).catch(err => console.error("Report Generation Trigger Failed", err));
            }

        } catch (err) {
            console.error("Error al guardar lead:", err);
            alert("Error al procesar. Por favor intenta otra vez.");
        } finally {
            setSubmitting(false);
            window.scrollTo(0, 0);
        }
    }

    const getColorByLevel = (level: string) => {
        if (level === "critico") return "text-red-500 bg-red-500/10 border-red-500/30";
        if (level === "reactivo") return "text-orange-500 bg-orange-500/10 border-orange-500/30";
        if (level === "controlado") return "text-blue-500 bg-blue-500/10 border-blue-500/30";
        return "text-green-500 bg-green-500/10 border-green-500/30";
    };

    const getColorByScore = (score: number) => {
        if (score <= 2.0) return "text-red-500 border-red-500/30";
        if (score <= 3.0) return "text-orange-500 border-orange-500/30";
        if (score <= 4.0) return "text-blue-500 border-blue-500/30";
        return "text-green-500 border-green-500/30";
    };

    if (loadingInitial) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    // PANTALLA DE RESULTADOS 
    if (resultsData) {
        const { score_global, nivel_madurez, score_pricing, score_rentabilidad, score_control, score_bi, score_proyectos } = resultsData;

        // Dimensiones ordenadas por urgencia (menor a mayor score)
        const sortedDimensions = [
            { name: "Pricing & Gestión Comercial", score: score_pricing, id: 'pricing' },
            { name: "Rentabilidad & Márgenes", score: score_rentabilidad, id: 'rentab' },
            { name: "Control de Gestión", score: score_control, id: 'control' },
            { name: "Reportería & BI", score: score_bi, id: 'bi' },
            { name: "Gestión de Proyectos", score: score_proyectos, id: 'proy' }
        ].sort((a, b) => a.score - b.score);

        const brechas = sortedDimensions.filter(d => d.score <= 3.0);

        return (
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary selection:text-slate-900 ">
                <main className="max-w-4xl mx-auto p-8 pt-16">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Tu Diagnóstico <span className="text-primary">Completado</span></h1>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Hemos procesado las variables de madurez de tu empresa. El algoritmo estructural arroja el siguiente panorama estratégico.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">

                        {/* SCORE GLOBAL CARD */}
                        <div className={`glass-card p-8 rounded-2xl border flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden col-span-1 border-slate-200`}>
                            {/* Bg glow based on level */}
                            <div className={`absolute inset-0 opacity-10 ${getColorByLevel(nivel_madurez).split(' ')[1]}`}></div>

                            <div className="relative z-10">
                                <span className="text-sm font-bold text-slate-600 uppercase tracking-widest block mb-2">Score Global</span>
                                <div className="text-7xl font-black mb-4 text-slate-900">
                                    {score_global.toFixed(1)}<span className="text-3xl text-slate-500">/5</span>
                                </div>
                                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border ${getColorByLevel(nivel_madurez)}`}>
                                    Nivel {nivel_madurez}
                                </div>
                            </div>
                        </div>

                        {/* MESSAGE BY LEVEL */}
                        <div className="glass-card p-8 rounded-2xl border border-slate-200 md:col-span-2 shadow-2xl flex flex-col justify-center">
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Análisis Inmediato:</h3>
                            <p className="text-slate-700 leading-relaxed">
                                {nivel_madurez === 'critico' && "La organización carece de procesos formales en áreas comerciales y financieras operando de forma reactiva y con alta exposición a pérdidas de rentabilidad no detectadas. Recomendamos intervención prioritaria."}
                                {nivel_madurez === 'reactivo' && "La empresa cuenta con procesos básicos pero sin sistematización ni gobernanza. Las decisiones de margen se toman con información tardía. Existen oportunidades de alto impacto disponibles a corto plazo en base al análisis."}
                                {nivel_madurez === 'controlado' && "La organización cuenta con procesos definidos y visibilidad. El desafío actual es la escalabilidad y analítica de datos predictiva. Hay brechas que significan rentabilidad cedida innecesariamente."}
                                {nivel_madurez === 'optimizado' && "Resultado destacado que refleja una cultura sólida basada en datos. El foco aquí debe estar en sofisticación algorítmica y ventaja competitiva de rentabilidad liderando la industria."}
                            </p>
                        </div>
                    </div>

                    {/* DETALLES DE DIMENSIONES */}
                    <h2 className="text-2xl font-black tracking-tight mb-6">Detalle por Dimensión</h2>
                    <div className="grid md:grid-cols-2 gap-4 mb-12">
                        {sortedDimensions.map((dim, i) => (
                            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base">{dim.name}</h4>
                                    <div className="text-xs font-bold text-slate-600 mt-1 uppercase">
                                        {dim.score <= 2.0 ? 'Prioridad Alta' : dim.score <= 3.0 ? 'Prioridad Media' : 'Mantenimiento Óptimo'}
                                    </div>
                                </div>
                                <div className={`text-2xl font-black ${getColorByScore(dim.score).split(' ')[0]}`}>
                                    {dim.score.toFixed(1)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BRECHAS Y RECOMENDACIONES */}
                    {brechas.length > 0 && (
                        <div className="mb-12">
                            <div className="flex items-center gap-2 mb-6 text-red-400">
                                <AlertTriangle className="w-6 h-6" />
                                <h2 className="text-2xl font-black tracking-tight">Brechas Críticas Detectadas</h2>
                            </div>
                            <div className="space-y-4">
                                {brechas.map((b, i) => (
                                    <div key={i} className="border-l-4 border-red-500 pl-5 py-2">
                                        <h4 className="font-bold text-lg mb-1">{b.name} (Score: {b.score.toFixed(1)})</h4>
                                        <p className="text-slate-600 text-sm">
                                            Recomendamos actuación prioritaria en esta dimensión para prevenir fuga de márgenes o problemas de visibilidad financiera que exponen a la empresa comercialmente.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA / PDF */}
                    <div className="p-8 bg-primary/10 rounded-2xl border border-primary/20 text-center shadow-xl shadow-primary/5">
                        <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                        <h3 className="text-2xl font-black mb-2 text-slate-900">Informe Ejecutivo Generado</h3>
                        <p className="text-slate-700 mb-8 max-w-xl mx-auto">
                            Estamos procesando el PDF oficial con todas las recomendaciones detalladas para el panel gerencial. Recibirás un enlace a tu correo en los próximos minutos.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-lg font-bold transition flex items-center justify-center gap-2">
                                <FileText className="w-5 h-5" /> Ver Informe PDF
                            </button>
                            <button onClick={() => router.push('/agendar')} className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-lg font-bold transition shadow-lg shadow-primary/20">
                                Agendar Auditoría Express
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // RENDERING LEAD CAPTURE
    if (step === 'lead_capture') {
        const isLeadFormComplete = leadData.nombre && leadData.email && leadData.empresa && leadData.industria && leadData.cargo && leadData.tamaño_empresa;
        return (
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary selection:text-slate-900 ">
                <header className="p-6 border-b border-slate-200 flex items-center justify-between max-w-5xl mx-auto w-full bg-white/80 backdrop-blur-md rounded-b-xl sticky top-0 z-50">
                    <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition font-medium">
                        <ArrowLeft className="w-5 h-5" /> Volver
                    </Link>
                    <span className="font-bold tracking-tight uppercase">
                        Caro <span className="text-primary">Consulting</span>
                    </span>
                </header>

                <main className="max-w-2xl mx-auto p-6 md:p-12 pb-24">
                    <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
                            <BarChart3 className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black mb-4">Diagnóstico Ejecutivo</h1>
                        <p className="text-slate-600 text-lg">
                            Descubre en 8 minutos tu nivel de madurez financiera y tus oportunidades de rentabilidad oculta. Totalmente gratis.
                        </p>
                    </div>

                    <div className="glass-card p-8 rounded-2xl border border-slate-200 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <h3 className="text-xl font-bold mb-6 text-slate-900 border-b border-slate-200 pb-4">Tus Datos para el Informe</h3>

                        <div className="space-y-4 relative z-10">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Nombre Completo</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input required type="text" className="w-full bg-white border border-slate-200 rounded-lg py-3 pl-12 pr-4 text-slate-900 placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Tu nombre" value={leadData.nombre} onChange={e => setLeadData({ ...leadData, nombre: e.target.value })} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Email Corporativo</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input required type="email" className="w-full bg-white border border-slate-200 rounded-lg py-3 pl-12 pr-4 text-slate-900 placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="nombre@empresa.com" value={leadData.email} onChange={e => setLeadData({ ...leadData, email: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Empresa</label>
                                    <div className="relative">
                                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input required type="text" className="w-full bg-white border border-slate-200 rounded-lg py-3 pl-11 pr-3 text-slate-900 placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Compañía" value={leadData.empresa} onChange={e => setLeadData({ ...leadData, empresa: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Cargo</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                        <input required type="text" className="w-full bg-white border border-slate-200 rounded-lg py-3 pl-11 pr-3 text-slate-900 placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="CEO, CFO..." value={leadData.cargo} onChange={e => setLeadData({ ...leadData, cargo: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Industria</label>
                                    <select required className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none" value={leadData.industria} onChange={e => setLeadData({ ...leadData, industria: e.target.value })}>
                                        <option value="" disabled>Selecciona...</option>
                                        <option value="Retail">Retail</option>
                                        <option value="Manufactura">Manufactura</option>
                                        <option value="Servicios">Servicios</option>
                                        <option value="Tecnologia">Tecnología</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2 ml-1">Tamaño</label>
                                    <select required className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 text-slate-900 placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none" value={leadData.tamaño_empresa} onChange={e => setLeadData({ ...leadData, tamaño_empresa: e.target.value })}>
                                        <option value="" disabled>Empresa...</option>
                                        <option value="micro">Micro</option>
                                        <option value="pequeña">Pequeña</option>
                                        <option value="mediana">Mediana</option>
                                        <option value="grande">Grande</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={handleLeadSubmit}
                                disabled={!isLeadFormComplete || submitting}
                                className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold py-4 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Quiero Descargar mi Informe en PDF"} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // PANTALLA DE CUESTIONARIO
    const sectionData = SECTIONS[currentSection];
    const progressPercent = ((currentSection) / SECTIONS.length) * 100;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary selection:text-slate-900 ">
            <header className="p-6 border-b border-slate-200 flex items-center justify-between max-w-5xl mx-auto w-full bg-white/80 backdrop-blur-md rounded-b-xl sticky top-0 z-50">
                <button onClick={() => router.push('/')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition font-medium">
                    <ArrowLeft className="w-5 h-5" /> Salir
                </button>
                <div className="flex-1 text-center">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:inline-block">Diagnóstico Ejecutivo / Paso {currentSection + 1} de {SECTIONS.length}</span>
                </div>
                <span className="font-bold tracking-tight uppercase">
                    Caro <span className="text-primary">Consulting</span>
                </span>
            </header>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white flex">
                <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
            </div>

            <main className="max-w-3xl mx-auto p-6 md:p-12 pb-24">

                <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl font-black mb-3 text-primary">{sectionData.title}</h2>
                    <p className="text-slate-600 text-lg">
                        Evalúa del 1 (Totalmente en desacuerdo) al 5 (Totalmente de acuerdo) según la realidad actual de la empresa.
                    </p>
                </div>

                <div className="space-y-12 mb-12">
                    {sectionData.questions.map((q, idx) => (
                        <div key={q.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                            <h3 className="text-lg font-medium text-slate-900 mb-6 leading-relaxed">
                                <span className="text-primary font-black mr-2">{q.id}.</span> {q.text}
                            </h3>

                            <div className="flex flex-col sm:flex-row justify-between gap-3">
                                <div className="hidden sm:block text-xs font-bold text-slate-500 uppercase pt-3 max-w-[80px] text-left">Totalmente en desacuerdo</div>

                                <div className="flex-1 flex justify-between sm:justify-center sm:gap-4 md:gap-8">
                                    {[1, 2, 3, 4, 5].map((val) => {
                                        const isSelected = answers[q.id] === val;
                                        return (
                                            <button
                                                key={val}
                                                onClick={() => handleSelectLikert(q.id, val)}
                                                className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all ${isSelected
                                                    ? "bg-primary text-white scale-110 shadow-xl shadow-primary/30 border-2 border-primary"
                                                    : "bg-white text-slate-500 hover:bg-blue-50 hover:text-blue-700 border border-slate-200"
                                                    }`}
                                            >
                                                {val}
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="hidden sm:block text-xs font-bold text-slate-500 uppercase pt-3 max-w-[80px] text-right">Totalmente de acuerdo</div>
                                <div className="flex sm:hidden justify-between w-full px-1 text-xs font-bold text-slate-500 uppercase mt-2">
                                    <span>Desacuerdo</span>
                                    <span>De Acuerdo</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {sectionData.hasOpenChallenge && (
                        <div className="pt-8 border-t border-slate-200 animate-in fade-in duration-500 delay-500">
                            <h3 className="text-lg font-medium text-slate-900 mb-3">
                                <span className="text-primary font-black mr-2">Opcional.</span> ¿Existe algún dolor, problema o desafío específico que no haya sido cubierto?
                            </h3>
                            <textarea
                                value={desafio}
                                onChange={(e) => setDesafio(e.target.value)}
                                maxLength={500}
                                rows={4}
                                className="w-full bg-white border border-slate-200 rounded-lg p-5 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition placeholder-slate-600 resize-none"
                                placeholder="Escribe brevemente aquí tu principal obstáculo..."
                            />
                            <div className="text-right text-xs text-slate-500 font-medium mt-2">{desafio.length}/500</div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-8 border-t border-slate-200">
                    {currentSection > 0 ? (
                        <button
                            onClick={prevSection}
                            className="px-6 py-3.5 rounded-lg font-bold transition-colors text-slate-600 hover:text-slate-900 hover:bg-white flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" /> Atrás
                        </button>
                    ) : <div></div>}

                    {currentSection < SECTIONS.length - 1 ? (
                        <button
                            onClick={nextSection}
                            disabled={!isCurrentSectionComplete()}
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-lg font-bold transition-all shadow-lg flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed group"
                        >
                            Siguiente <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={!isCurrentSectionComplete() || submitting}
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-lg font-bold transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {submitting ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Procesando Analítica...</>
                            ) : (
                                <><CheckCircle className="w-5 h-5" /> Finalizar Diagnóstico</>
                            )}
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}
