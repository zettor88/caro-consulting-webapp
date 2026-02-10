"use client";

import { useEffect, useState } from "react";
import { FileText, ShieldCheck, Download, CheckCircle, AlertTriangle } from "lucide-react";
import supabase from "@/lib/supabase";

interface ContractProps {
    clientId: string;
}

export default function ContractViewer({ clientId }: ContractProps) {
    const [clientData, setClientData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientData = async () => {
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .eq('id', clientId)
                .single();

            if (!error && data) {
                setClientData(data);
            }
            setLoading(false);
        };

        if (clientId) fetchClientData();
    }, [clientId]);

    if (loading) return <div className="p-6 text-slate-500">Cargando contrato...</div>;
    if (!clientData) return null;

    const isActive = clientData.subscription_status === 'active';
    const planName = clientData.service_level || "Consultoría Base";
    const endDate = clientData.subscription_end_date
        ? new Date(clientData.subscription_end_date).toLocaleDateString()
        : "Indefinido";

    return (
        <div className="bg-[#15152a] border border-white/5 rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" /> Contrato de Servicios
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${isActive ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                    {isActive ? "Vigente" : "Inactivo / Vencido"}
                </span>
            </div>

            <div className="p-8 space-y-6 text-sm text-slate-300 relative">
                {!isActive && (
                    <div className="absolute inset-0 bg-[#101022]/80 backdrop-blur-sm flex items-center justify-center z-10">
                        <div className="bg-slate-900 border border-red-500/50 p-6 rounded-xl max-w-sm text-center">
                            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                            <h4 className="text-white font-bold text-lg">Contrato Pausado</h4>
                            <p className="text-slate-400 mt-2">Su plan ha expirado. Por favor contacte a su consultor para reactivar los servicios.</p>
                        </div>
                    </div>
                )}

                {/* Contract Mockup Content */}
                <div className="font-serif leading-relaxed space-y-4 opacity-90 p-8 bg-white text-slate-900 rounded shadow-inner">
                    <h2 className="text-center font-bold text-xl uppercase border-b-2 border-slate-200 pb-4 mb-6">Contrato de Prestación de Servicios</h2>

                    <p>
                        En Santiago de Chile, a <strong>{new Date().toLocaleDateString()}</strong>, comparecen:
                    </p>
                    <p>
                        Por una parte, <strong>CARO CONSULTING SpA</strong>, prestador del servicio; y por otra parte, <strong>{clientData.company_name}</strong> (en adelante "El Cliente"), quienes acuerdan lo siguiente:
                    </p>

                    <h4 className="font-bold underline mt-4">PRIMERO: Objeto</h4>
                    <p>
                        Caro Consulting entregará servicios de asesoría estratégica bajo la modalidad <strong>{planName}</strong>, incluyendo acceso a plataforma digital, reportes mensuales y reuniones de seguimiento.
                    </p>

                    <h4 className="font-bold underline mt-4">SEGUNDO: Vigencia y Plazos</h4>
                    <p>
                        El presente contrato tiene vigencia hasta el <strong>{endDate}</strong>, renovable automáticamente salvo aviso contrario.
                    </p>

                    <h4 className="font-bold underline mt-4">TERCERO: Confidencialidad</h4>
                    <p>
                        Ambas partes se obligan a mantener estricta confidencialidad sobre la información financiera y estratégica compartida durante la ejecución de este servicio.
                    </p>

                    <div className="mt-12 pt-8 border-t border-slate-300 flex justify-between">
                        <div className="text-center">
                            <div className="h-16 flex items-end justify-center">
                                <img src="/signature_placeholder.png" alt="" className="h-12 opacity-50" />
                                {/* Placeholder signature */}
                            </div>
                            <div className="border-t border-slate-900 w-40 mx-auto mt-2"></div>
                            <p className="font-bold text-xs mt-1">Sebastián Caro</p>
                            <p className="text-[10px] text-slate-500">Caro Consulting</p>
                        </div>
                        <div className="text-center">
                            <div className="h-16"></div>
                            <div className="border-t border-slate-900 w-40 mx-auto mt-2"></div>
                            <p className="font-bold text-xs mt-1">Representante Legal</p>
                            <p className="text-[10px] text-slate-500">{clientData.company_name}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/50 p-4 border-t border-white/5 flex justify-end">
                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition text-xs font-bold uppercase tracking-wider">
                    <Download className="w-4 h-4" /> Descargar PDF Firmado
                </button>
            </div>
        </div>
    );
}
