"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, BarChart3, Loader2 } from "lucide-react";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            router.push("/dashboard");
        } catch (err: any) {
            console.error("Login error:", err);
            setError("Credenciales inválidas. Por favor intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#101022] font-sans selection:bg-primary selection:text-white">
            {/* Left: Branding */}
            <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-[#101022] to-[#0c0c1b] relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-glow"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="bg-primary/10 p-2 rounded border border-primary/20">
                            <BarChart3 className="w-8 h-8 text-primary" />
                        </div>
                        <span className="text-2xl font-black tracking-tight uppercase text-white">
                            Caro <span className="text-primary">Consulting</span>
                        </span>
                    </div>
                    <h1 className="text-5xl font-black text-white leading-tight mb-6">
                        Acceso Exclusivo a <br />
                        <span className="text-primary">Inteligencia Financiera</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-md">
                        Monitorea en tiempo real tus métricas clave de rentabilidad, flujo de caja y gestión estratégica.
                    </p>
                </div>
                <div className="relative z-10">
                    <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10"></div>)}
                    </div>
                    <p className="text-sm font-bold text-white">Confían en nosotros líderes de la industria.</p>
                </div>
            </div>

            {/* Right: Login Form */}
            <div className="flex items-center justify-center p-8 bg-[#101022]">
                <div className="w-full max-w-md">
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 p-1.5 rounded border border-primary/20">
                                <BarChart3 className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-xl font-bold tracking-tight uppercase text-white">
                                Caro <span className="text-primary">Consulting</span>
                            </span>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-white mb-2">Bienvenido</h2>
                        <p className="text-slate-400 mb-8">Ingresa tus credenciales para acceder al dashboard.</p>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase mb-2 ml-1">Email Corporativo</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-[#15152a] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                        placeholder="nombre@empresa.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase mb-2 ml-1">Contraseña</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full bg-[#15152a] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center font-medium">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {loading ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Ingresando...</>
                                ) : (
                                    <>Ingresar al Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 text-center">
                        <Link href="/" className="text-slate-500 hover:text-white text-sm transition font-medium">
                            &larr; Volver al sitio público
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
