"use client";

import { Clock, CheckCircle2 } from "lucide-react";

interface Project {
    phase_name: string;
    status: 'completed' | 'current' | 'upcoming';
    due_date: string;
}

interface ProjectTimelineProps {
    timeline: Project[];
}

export default function ProjectTimeline({ timeline }: ProjectTimelineProps) {
    return (
        <div className="bg-[#15152a] border border-white/5 p-8 rounded-xl shadow-xl w-full max-w-3xl mx-auto animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <Clock className="w-6 h-6 text-purple-400" /> Cronograma del Proyecto
            </h3>
            <div className="space-y-8 relative pl-2">
                {/* Vertical Line */}
                <div className="absolute left-[37px] top-4 bottom-4 w-0.5 bg-slate-800"></div>

                {timeline.length > 0 ? timeline.map((item, idx) => (
                    <div key={idx} className="flex gap-6 relative z-10 group">
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-300 group-hover:scale-110 
                                ${item.status === 'completed' ? 'bg-emerald-600 border-emerald-500 text-white' :
                                    item.status === 'current' ? 'bg-[#15152a] border-primary text-primary animate-pulse shadow-primary/20' :
                                        'bg-[#15152a] border-slate-700 text-slate-600'}`}>
                                {item.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-bold">{idx + 1}</span>}
                            </div>
                        </div>
                        <div className="bg-[#0c0c1b] border border-white/5 p-5 rounded-xl flex-1 hover:border-primary/30 transition-all hover:bg-white/5 cursor-default">
                            <h4 className={`font-bold text-lg ${item.status === 'upcoming' ? 'text-slate-500' : 'text-white'}`}>{item.phase_name}</h4>
                            <div className="flex justify-between items-center mt-3">
                                <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
                                    Vencimiento: <span className="text-slate-300">{new Date(item.due_date).toLocaleDateString()}</span>
                                </p>
                                {item.status === 'current' && <span className="px-3 py-1 rounded-full text-xs bg-primary/20 text-primary font-bold uppercase tracking-wider border border-primary/20">En Curso</span>}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center text-slate-600 py-12">No hay hitos activos en este momento.</div>
                )}
            </div>
        </div>
    );
}
