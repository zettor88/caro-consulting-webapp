"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    BarChart3,
    FileText,
    Clock,
    LogOut,
    ShieldCheck,
    AlertCircle,
} from "lucide-react";

// Components
import DashboardOverview from "../../components/dashboard/DashboardOverview";
import DocumentRepository from "../../components/dashboard/DocumentRepository";
import ContractViewer from "../../components/dashboard/ContractViewer";
import ProjectTimeline from "../../components/dashboard/ProjectTimeline";
import supabase from "@/lib/supabase";

// Types
interface Metric {
    avg_margin: number;
    total_ebitda: number;
    monthly_cash_flow: number;
}

interface Project {
    phase_name: string;
    status: 'completed' | 'current' | 'upcoming';
    due_date: string;
}

// Navigation Tabs
type Tab = 'overview' | 'documents' | 'projects' | 'contracts';

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [clientId, setClientId] = useState<string | null>(null);
    const [clientAvatar, setClientAvatar] = useState<string | null>(null); // New State
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    // Data State
    const [kpis, setKpis] = useState<Metric>({ avg_margin: 0, total_ebitda: 0, monthly_cash_flow: 0 });
    const [chartData, setChartData] = useState<{ margin: any[], cashFlow: any[] }>({ margin: [], cashFlow: [] });
    const [timeline, setTimeline] = useState<Project[]>([]);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/login");
                return;
            }
            setUser(session.user);
            fetchDashboardData(session.user.id);
        };

        checkUser();
    }, [router]);

    const fetchDashboardData = async (userId: string) => {
        try {
            setLoading(true);

            // 1. Get Client ID
            const { data: clientData, error: clientError } = await supabase
                .from('clients')
                .select('id, company_name, avatar_url')
                .eq('auth_user_id', userId)
                .single();

            if (clientError && clientError.code !== 'PGRST116') throw clientError;

            if (!clientData) {
                setLoading(false);
                return;
            }

            const cId = clientData.id;
            setClientId(cId);
            setClientAvatar(clientData.avatar_url); // Set Avatar

            // 2. Fetch Metrics
            const { data: metrics, error: metricsError } = await supabase
                .from('financial_metrics')
                .select('*')
                .eq('client_id', cId)
                .order('month', { ascending: true });

            if (metricsError) throw metricsError;

            // Process Metrics
            if (metrics && metrics.length > 0) {
                const processedMargin = metrics.map(m => ({
                    month: new Date(m.month).toLocaleDateString('es-ES', { month: 'short' }),
                    margin: m.margin_percent
                }));

                const processedCashFlow = metrics.map(m => ({
                    month: new Date(m.month).toLocaleDateString('es-ES', { month: 'short' }),
                    value: m.cash_flow
                }));

                setChartData({ margin: processedMargin, cashFlow: processedCashFlow });

                const lastMetric = metrics[metrics.length - 1];
                setKpis({
                    avg_margin: lastMetric.margin_percent,
                    total_ebitda: lastMetric.ebitda,
                    monthly_cash_flow: lastMetric.cash_flow
                });
            }

            // 3. Fetch Timeline
            const { data: projs, error: projError } = await supabase
                .from('projects')
                .select('*')
                .eq('client_id', cId)
                .order('due_date', { ascending: true });

            if (projError) throw projError;
            setTimeline(projs || []);

        } catch (err: any) {
            console.error(err);
            setError("Error cargando los datos del dashboard. " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    // Helper for Navigation Button Styles
    const navButtonClass = (tab: Tab) => `
        flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left
        ${activeTab === tab
            ? 'bg-primary/10 border border-primary/20 text-white shadow-lg shadow-primary/5 font-bold'
            : 'text-slate-400 hover:bg-white/5 hover:text-white font-medium'}
    `;

    if (loading) {
        return (
            <div className="min-h-screen bg-[#101022] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#101022] flex font-sans text-white bg-hero-glow">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0c0c1b]/50 border-r border-white/5 hidden md:flex flex-col backdrop-blur-xl sticky top-0 h-screen">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 font-black text-white text-xl uppercase tracking-tighter">
                        Caro <span className="text-primary">C.</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <button onClick={() => setActiveTab('overview')} className={navButtonClass('overview')}>
                        <BarChart3 className={`w-5 h-5 ${activeTab === 'overview' ? 'text-primary' : ''}`} />
                        <span className="text-sm">Dashboard</span>
                    </button>
                    <button onClick={() => setActiveTab('documents')} className={navButtonClass('documents')}>
                        <FileText className={`w-5 h-5 ${activeTab === 'documents' ? 'text-primary' : ''}`} />
                        <span className="text-sm">Documentos</span>
                    </button>
                    <button onClick={() => setActiveTab('projects')} className={navButtonClass('projects')}>
                        <Clock className={`w-5 h-5 ${activeTab === 'projects' ? 'text-primary' : ''}`} />
                        <span className="text-sm">Proyectos</span>
                    </button>
                    <button onClick={() => setActiveTab('contracts')} className={navButtonClass('contracts')}>
                        <ShieldCheck className={`w-5 h-5 ${activeTab === 'contracts' ? 'text-primary' : ''}`} />
                        <span className="text-sm">Contratos</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition w-full text-left rounded-lg hover:bg-white/5">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium text-sm">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-screen">
                <header className="bg-[#0c0c1b]/60 border-b border-white/10 p-6 flex justify-between items-center sticky top-0 z-30 backdrop-blur-md">
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight">
                            {activeTab === 'overview' && (user?.email ? `Hola, ${user.email.split('@')[0]}` : "Hola, Cliente")}
                            {activeTab === 'documents' && "Repositorio Digital"}
                            {activeTab === 'projects' && "Cronograma de Proyecto"}
                            {activeTab === 'contracts' && "Estado Legal & Suscripción"}
                        </h1>
                        <p className="text-slate-400 text-sm font-medium">
                            {activeTab === 'overview' && "Resumen ejecutivo actualizado."}
                            {activeTab === 'documents' && "Accede y gestiona tus archivos estratégicos."}
                            {activeTab === 'projects' && "Seguimiento en tiempo real de nuestros hitos."}
                            {activeTab === 'contracts' && "Tu marco legal y nivel de servicio."}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {clientAvatar ? (
                            <img
                                src={clientAvatar}
                                alt="Client Logo"
                                className="w-10 h-10 rounded-full object-cover border border-white/10 shadow-lg"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-700 flex items-center justify-center text-white font-bold uppercase shadow-lg border border-white/10">
                                {user?.email ? user.email[0] : "C"}
                            </div>
                        )}
                    </div>
                </header>

                <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto min-h-[calc(100vh-100px)]">

                    {error && (
                        <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                            <div className="text-xs ml-2 text-slate-500">(Asegúrate de haber corrido el script SQL en Supabase)</div>
                        </div>
                    )}

                    {/* Dynamic View Rendering */}
                    {activeTab === 'overview' && (
                        <DashboardOverview kpis={kpis} chartData={chartData} />
                    )}

                    {activeTab === 'documents' && (
                        clientId ? <DocumentRepository clientId={clientId} /> : <div className="text-slate-500">Cargando repositorio...</div>
                    )}

                    {activeTab === 'projects' && (
                        <ProjectTimeline timeline={timeline} />
                    )}

                    {activeTab === 'contracts' && (
                        clientId ? <ContractViewer clientId={clientId} /> : <div className="text-slate-500">Cargando contratos...</div>
                    )}

                </div>
            </main>
        </div>
    );
}
