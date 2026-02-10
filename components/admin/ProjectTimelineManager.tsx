"use client";

import { useState, useEffect } from "react";
import { Clock, Plus, Trash2, Calendar, CheckCircle, Circle, AlertCircle } from "lucide-react";
import supabase from "@/lib/supabase";

interface ProjectTimelineManagerProps {
    clientId: string;
}

interface ProjectPhase {
    id: string;
    phase_name: string;
    status: 'completed' | 'current' | 'upcoming';
    due_date: string;
}

export default function ProjectTimelineManager({ clientId }: ProjectTimelineManagerProps) {
    const [phases, setPhases] = useState<ProjectPhase[]>([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // New Phase Form
    const [newPhase, setNewPhase] = useState({
        phase_name: '',
        status: 'upcoming',
        due_date: ''
    });

    useEffect(() => {
        if (clientId) fetchPhases();
    }, [clientId]);

    const fetchPhases = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('client_id', clientId)
            .order('due_date', { ascending: true });

        if (data) setPhases(data);
        setLoading(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsg(null);

        try {
            const { error } = await supabase.from('projects').insert({
                client_id: clientId,
                phase_name: newPhase.phase_name,
                status: newPhase.status,
                due_date: newPhase.due_date
            });

            if (error) throw error;

            setMsg({ type: 'success', text: "Hito agregado exitosamente" });
            setNewPhase({ phase_name: '', status: 'upcoming', due_date: '' });
            fetchPhases();
        } catch (error: any) {
            setMsg({ type: 'error', text: error.message });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar este hito?")) return;

        try {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (error) throw error;
            fetchPhases();
        } catch (error: any) {
            alert("Error eliminando: " + error.message);
        }
    };

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" /> Línea de Tiempo del Proyecto
            </h2>

            {msg && (
                <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${msg.type === 'success' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'}`}>
                    {msg.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {msg.text}
                </div>
            )}

            {/* List Existing */}
            <div className="space-y-2 mb-6 max-h-60 overflow-y-auto pr-2">
                {phases.length === 0 && <p className="text-slate-500 text-sm italic">No hay hitos registrados.</p>}
                {phases.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3">
                            {p.status === 'completed' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                            {p.status === 'current' && <Circle className="w-4 h-4 text-primary animate-pulse" />}
                            {p.status === 'upcoming' && <Circle className="w-4 h-4 text-slate-500" />}
                            <div>
                                <p className="text-white text-sm font-medium">{p.phase_name}</p>
                                <p className="text-xs text-slate-500">{new Date(p.due_date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(p.id)}
                            className="text-slate-500 hover:text-red-400 p-1"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Add New */}
            <form onSubmit={handleAdd} className="space-y-3 pt-4 border-t border-slate-800">
                <h3 className="text-xs font-bold text-slate-400 uppercase">Agregar Nuevo Hito</h3>
                <input
                    type="text"
                    placeholder="Nombre de la fase/hito"
                    required
                    className="w-full bg-slate-800 border-slate-700 rounded p-2 text-sm text-white"
                    value={newPhase.phase_name}
                    onChange={e => setNewPhase({ ...newPhase, phase_name: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                    <select
                        className="bg-slate-800 border-slate-700 rounded p-2 text-sm text-white"
                        value={newPhase.status}
                        onChange={e => setNewPhase({ ...newPhase, status: e.target.value as any })}
                    >
                        <option value="upcoming">Pendiente</option>
                        <option value="current">En Curso</option>
                        <option value="completed">Completado</option>
                    </select>
                    <input
                        type="date"
                        required
                        className="bg-slate-800 border-slate-700 rounded p-2 text-sm text-white"
                        value={newPhase.due_date}
                        onChange={e => setNewPhase({ ...newPhase, due_date: e.target.value })}
                    />
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-lg text-sm font-bold flex justify-center items-center gap-2 transition">
                    <Plus className="w-4 h-4" /> Agregar Hito
                </button>
            </form>
        </div>
    );
}
