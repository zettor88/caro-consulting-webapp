"use client";

import { TrendingUp, Activity, DollarSign } from "lucide-react";
import { MarginChart, CashFlowChart } from "../Charts";

interface DashboardOverviewProps {
    kpis: {
        avg_margin: number;
        total_ebitda: number;
        monthly_cash_flow: number;
    };
    chartData: {
        margin: any[];
        cashFlow: any[];
    };
}

export default function DashboardOverview({ kpis, chartData }: DashboardOverviewProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#15152a] border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-primary/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="w-16 h-16 text-primary" />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-primary/10 rounded-lg text-primary border border-primary/20">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">Margen (Último Mes)</h3>
                    <p className="text-4xl font-black text-white mt-2">{kpis.avg_margin}%</p>
                </div>
                <div className="bg-[#15152a] border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-primary/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-16 h-16 text-emerald-500" />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-500 border border-emerald-500/20">
                            <Activity className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">EBITDA Total</h3>
                    <p className="text-4xl font-black text-white mt-2">${kpis.total_ebitda}k</p>
                </div>
                <div className="bg-[#15152a] border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-primary/30 transition-all">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign className="w-16 h-16 text-teal-400" />
                    </div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2.5 bg-teal-500/10 rounded-lg text-teal-400 border border-teal-500/20">
                            <DollarSign className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">Cash Flow Mes</h3>
                    <p className="text-4xl font-black text-white mt-2">${kpis.monthly_cash_flow}k</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#15152a] border border-white/5 p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" /> Evolución de Margen (%)
                    </h3>
                    {chartData.margin.length > 0 ? (
                        <MarginChart data={chartData.margin} />
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-slate-600 bg-black/20 rounded-lg border border-white/5">
                            No hay datos de margen
                        </div>
                    )}
                </div>
                <div className="bg-[#15152a] border border-white/5 p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-500" /> Flujo de Caja Operativo
                    </h3>
                    {chartData.cashFlow.length > 0 ? (
                        <CashFlowChart data={chartData.cashFlow} />
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-slate-600 bg-black/20 rounded-lg border border-white/5">
                            No hay datos de flujo
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
