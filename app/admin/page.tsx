"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Upload, Plus, Save, CheckCircle, AlertCircle, Image as ImageIcon, Users, LayoutTemplate } from "lucide-react";
import supabase from "@/lib/supabase";
import SiteEditor from "@/components/admin/SiteEditor";
import ProjectTimelineManager from "@/components/admin/ProjectTimelineManager";

export default function AdminPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'clients' | 'cms'>('clients');
    const [clients, setClients] = useState<any[]>([]);
    const [selectedClientId, setSelectedClientId] = useState<string>("");

    // Form States
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    // Avatar State
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarUploading, setAvatarUploading] = useState(false);

    const [metrics, setMetrics] = useState({
        month: new Date().toISOString().slice(0, 7) + "-01", // YYYY-MM-01
        revenue: 0,
        margin_percent: 0,
        ebitda: 0,
        cash_flow: 0
    });

    const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        checkAdmin();
        fetchClients();
    }, []);

    const checkAdmin = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push("/login");
        }
        setLoading(false);
    };

    const fetchClients = async () => {
        const { data, error } = await supabase.from('clients').select('*');
        if (data) setClients(data);
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !selectedClientId) return;
        setUploading(true);
        setMsg(null);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${file.name}`;
            const filePath = `${selectedClientId}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('documents')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('documents')
                .getPublicUrl(filePath);

            const { error: dbError } = await supabase.from('documents').insert({
                client_id: selectedClientId,
                name: file.name,
                file_type: fileExt?.toUpperCase() || 'FILE',
                file_url: publicUrl,
                uploaded_at: new Date()
            });

            if (dbError) throw dbError;

            setMsg({ type: 'success', text: 'Documento subido correctamente' });
            setFile(null);
        } catch (error: any) {
            setMsg({ type: 'error', text: error.message });
        } finally {
            setUploading(false);
        }
    };

    const handleAvatarUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!avatarFile || !selectedClientId) return;
        setAvatarUploading(true);
        setMsg(null);

        try {
            const fileExt = avatarFile.name.split('.').pop();
            const fileName = `avatar-${Date.now()}.${fileExt}`;
            const filePath = `avatars/${selectedClientId}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('documents')
                .upload(filePath, avatarFile, { upsert: true });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('documents')
                .getPublicUrl(filePath);

            const { error: dbError } = await supabase
                .from('clients')
                .update({ avatar_url: publicUrl })
                .eq('id', selectedClientId);

            if (dbError) throw dbError;

            setMsg({ type: 'success', text: 'Logo actualizado correctamente' });
            setAvatarFile(null);
            fetchClients();
        } catch (error: any) {
            setMsg({ type: 'error', text: error.message });
        } finally {
            setAvatarUploading(false);
        }
    }

    const handleMetricsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClientId) return;
        setMsg(null);

        try {
            const { error } = await supabase.from('financial_metrics').insert({
                client_id: selectedClientId,
                ...metrics
            });

            if (error) throw error;
            setMsg({ type: 'success', text: 'Métricas actualizadas correctamente' });
        } catch (error: any) {
            setMsg({ type: 'error', text: error.message });
        }
    };

    if (loading) return <div className="p-8 text-white">Cargando panel...</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <header className="bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-center">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <span className="text-emerald-500">ADMIN</span> CARO CONSULTING
                </h1>
                <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white">
                    Ir al Dashboard Cliente &rarr;
                </Link>
            </header>

            <main className="max-w-7xl mx-auto p-8 space-y-8">

                {/* Tab Navigation */}
                <div className="flex gap-4 border-b border-slate-800 pb-4">
                    <button
                        onClick={() => setActiveTab('clients')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${activeTab === 'clients' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Users className="w-4 h-4" /> Gestión Clientes
                    </button>
                    <button
                        onClick={() => setActiveTab('cms')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition ${activeTab === 'cms' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <LayoutTemplate className="w-4 h-4" /> Editor Web
                    </button>
                </div>

                {activeTab === 'cms' ? (
                    <SiteEditor />
                ) : (
                    <>
                        {/* Client Selector */}
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 max-w-xl">
                            <label className="block text-sm font-medium text-slate-400 mb-2">Seleccionar Cliente</label>
                            <select
                                className="w-full bg-slate-800 border-slate-700 rounded-lg p-3 text-white"
                                onChange={(e) => setSelectedClientId(e.target.value)}
                                value={selectedClientId}
                            >
                                <option value="">-- Selecciona un cliente --</option>
                                {clients.map(c => (
                                    <option key={c.id} value={c.id}>{c.company_name}</option>
                                ))}
                            </select>
                        </div>

                        {selectedClientId && (
                            <>
                                {/* Feedback Message */}
                                {msg && (
                                    <div className={`p-4 rounded-lg flex items-center gap-2 ${msg.type === 'success' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'}`}>
                                        {msg.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                        {msg.text}
                                    </div>
                                )}

                                <div className="space-y-8">
                                    {/* Operational Forms Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                                        {/* Upload Document */}
                                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 h-full">
                                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                <Upload className="w-5 h-5 text-emerald-500" /> Nuevo Documento
                                            </h2>
                                            <form onSubmit={handleUpload} className="space-y-4">
                                                <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-emerald-500/50 transition bg-slate-800/50">
                                                    <input
                                                        type="file"
                                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                                        className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-500 hover:file:bg-emerald-500/20"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={uploading || !file}
                                                    className="w-full bg-emerald-600 hover:bg-emerald-500 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {uploading ? 'Subiendo...' : 'Publicar'}
                                                </button>
                                            </form>
                                        </div>

                                        {/* Upload Avatar */}
                                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 h-full">
                                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                <ImageIcon className="w-5 h-5 text-purple-500" /> Logo de Cliente
                                            </h2>
                                            <form onSubmit={handleAvatarUpload} className="space-y-4">
                                                <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-purple-500/50 transition bg-slate-800/50">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                                                        className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500/10 file:text-purple-500 hover:file:bg-purple-500/20"
                                                    />
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={avatarUploading || !avatarFile}
                                                    className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {avatarUploading ? 'Actualizando...' : 'Actualizar Logo'}
                                                </button>
                                            </form>
                                        </div>

                                        {/* Update Metrics */}
                                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 h-full">
                                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                                <Plus className="w-5 h-5 text-emerald-500" /> Nuevas Métricas
                                            </h2>
                                            <form onSubmit={handleMetricsSubmit} className="space-y-4">
                                                <div>
                                                    <label className="text-xs text-slate-500 uppercase">Mes</label>
                                                    <input type="date" required
                                                        className="w-full bg-slate-800 border-slate-700 rounded p-2"
                                                        value={metrics.month}
                                                        onChange={e => setMetrics({ ...metrics, month: e.target.value })}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-xs text-slate-500 uppercase">Rev ($)</label>
                                                        <input type="number" required
                                                            className="w-full bg-slate-800 border-slate-700 rounded p-1"
                                                            value={metrics.revenue}
                                                            onChange={e => setMetrics({ ...metrics, revenue: Number(e.target.value) })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-slate-500 uppercase">Marg (%)</label>
                                                        <input type="number" step="0.1" required
                                                            className="w-full bg-slate-800 border-slate-700 rounded p-1"
                                                            value={metrics.margin_percent}
                                                            onChange={e => setMetrics({ ...metrics, margin_percent: Number(e.target.value) })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-slate-500 uppercase">EBITDA</label>
                                                        <input type="number" required
                                                            className="w-full bg-slate-800 border-slate-700 rounded p-1"
                                                            value={metrics.ebitda}
                                                            onChange={e => setMetrics({ ...metrics, ebitda: Number(e.target.value) })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-slate-500 uppercase">CashFlow</label>
                                                        <input type="number" required
                                                            className="w-full bg-slate-800 border-slate-700 rounded p-1"
                                                            value={metrics.cash_flow}
                                                            onChange={e => setMetrics({ ...metrics, cash_flow: Number(e.target.value) })}
                                                        />
                                                    </div>
                                                </div>
                                                <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg font-medium flex justify-center items-center gap-2">
                                                    <Save className="w-4 h-4" /> Guardar
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                    {/* Timeline Manager (Full Width) */}
                                    <div className="w-full">
                                        <ProjectTimelineManager clientId={selectedClientId} />
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
