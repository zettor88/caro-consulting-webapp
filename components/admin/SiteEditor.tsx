"use client";

import { useState, useEffect } from "react";
import { Save, Upload, Download, RefreshCw, CheckCircle, AlertCircle, FileJson, Code } from "lucide-react";
import supabase from "@/lib/supabase";

export default function SiteEditor() {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<any>({});
    const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Initial Keys we expect
    const keys = ['hero', 'services', 'cases', 'bio'];

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('site_content').select('*');
            if (error) throw error;

            const contentMap: any = {};
            data?.forEach(item => {
                contentMap[item.key] = item.content;
            });
            setContent(contentMap);
        } catch (error: any) {
            console.error("Error fetching content:", error);
            setMsg({ type: 'error', text: "Error cargando contenido" });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (key: string, newContent: any) => {
        try {
            const { error } = await supabase
                .from('site_content')
                .upsert({ key, content: newContent, updated_at: new Date() });

            if (error) throw error;
            setMsg({ type: 'success', text: `Sección '${key}' guardada.` });

            // Update local state primarily to reflect saved status
            setContent({ ...content, [key]: newContent });

        } catch (error: any) {
            setMsg({ type: 'error', text: error.message });
        }
    };

    const handleExport = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "caro_consulting_content.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileReader = new FileReader();
        if (e.target.files && e.target.files[0]) {
            fileReader.readAsText(e.target.files[0], "UTF-8");
            fileReader.onload = async (event) => {
                try {
                    const parsed = JSON.parse(event.target?.result as string);

                    // Upsert all keys
                    for (const key of Object.keys(parsed)) {
                        await supabase
                            .from('site_content')
                            .upsert({ key, content: parsed[key], updated_at: new Date() });
                    }

                    setMsg({ type: 'success', text: "Configuración importada exitosamente." });
                    fetchContent(); // Refresh
                } catch (error) {
                    setMsg({ type: 'error', text: "Archivo JSON inválido." });
                }
            };
        }
    };

    if (loading) return <div className="text-white">Cargando editor...</div>;

    return (
        <div className="space-y-8 animate-in fade-in">

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-white">Editor de Contenido</h2>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition"
                    >
                        <Download className="w-4 h-4" /> Exportar JSON
                    </button>
                    <label className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold transition cursor-pointer">
                        <Upload className="w-4 h-4" /> Importar JSON
                        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                </div>
            </div>

            {msg && (
                <div className={`p-4 rounded-lg flex items-center gap-2 ${msg.type === 'success' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'}`}>
                    {msg.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                    {msg.text}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* 1. HERO EDITOR */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-white">Hero Section</h3>
                        <button
                            onClick={() => handleSave('hero', content.hero)}
                            className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition"
                            title="Guardar Hero"
                        >
                            <Save className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs text-slate-500 uppercase">Tagline</label>
                            <input
                                type="text"
                                className="w-full bg-slate-800 border-slate-700 rounded p-2 text-white text-sm"
                                value={content.hero?.tagline || ''}
                                onChange={(e) => setContent({ ...content, hero: { ...content.hero, tagline: e.target.value } })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 uppercase">Título (HTML permitido)</label>
                            <textarea
                                className="w-full bg-slate-800 border-slate-700 rounded p-2 text-white text-sm h-20 font-mono"
                                value={content.hero?.title || ''}
                                onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 uppercase">Subtítulo</label>
                            <textarea
                                className="w-full bg-slate-800 border-slate-700 rounded p-2 text-white text-sm h-20"
                                value={content.hero?.subtitle || ''}
                                onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. BIO EDITOR */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-white">Consultor Bio</h3>
                        <button
                            onClick={() => handleSave('bio', content.bio)}
                            className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition"
                            title="Guardar Bio"
                        >
                            <Save className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-slate-500 uppercase">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border-slate-700 rounded p-2 text-white text-sm"
                                    value={content.bio?.name || ''}
                                    onChange={(e) => setContent({ ...content, bio: { ...content.bio, name: e.target.value } })}
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase">Rol</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border-slate-700 rounded p-2 text-white text-sm"
                                    value={content.bio?.role || ''}
                                    onChange={(e) => setContent({ ...content, bio: { ...content.bio, role: e.target.value } })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-slate-500 uppercase">Descripción</label>
                            <textarea
                                className="w-full bg-slate-800 border-slate-700 rounded p-2 text-white text-sm h-32"
                                value={content.bio?.description || ''}
                                onChange={(e) => setContent({ ...content, bio: { ...content.bio, description: e.target.value } })}
                            />
                        </div>
                    </div>
                </div>

                {/* 3. CASE STUDIES (JSON Raw Editor for flexibility) */}
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <FileJson className="w-4 h-4 text-yellow-500" /> Casos de Éxito (JSON)
                        </h3>
                        <button
                            onClick={() => handleSave('cases', content.cases)}
                            className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition"
                            title="Guardar Casos"
                        >
                            <Save className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">Edita directamente la estructura JSON para añadir más casos.</p>
                    <textarea
                        className="w-full bg-slate-800 border-slate-700 rounded p-4 text-emerald-400 text-sm font-mono h-64"
                        value={JSON.stringify(content.cases, null, 2)}
                        onChange={(e) => {
                            try {
                                const parsed = JSON.parse(e.target.value);
                                setContent({ ...content, cases: parsed });
                            } catch (err) {
                                // Allow typing invalid JSON momentarily, but maybe warn
                            }
                        }}
                    />
                </div>

            </div>
        </div>
    );
}
