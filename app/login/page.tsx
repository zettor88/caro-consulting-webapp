"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, BarChart3, Loader2, User, Building, Briefcase } from "lucide-react";
import Link from "next/link";
import supabase from "@/lib/supabase";

export default function LoginPage() {
    const router = useRouter();
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Login State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Register State
    const [nombre, setNombre] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [industria, setIndustria] = useState("");
    const [cargo, setCargo] = useState("");
    const [tamañoEmpresa, setTamañoEmpresa] = useState("");

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (mode === 'login') {
                const { error: loginError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (loginError) throw loginError;
                router.push("/formularios/diagnostico");
            } else {
                // Registrar usuario en Auth
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: nombre }
                    }
                });

                if (signUpError) throw signUpError;

                if (data.user) {
                    // Esperamos 1 segundo para asegurarnos que Auth propague (o en caso de triggers tarden)
                    // Insertamos perfil en public.usuarios
                    const { error: perfilError } = await supabase.from('usuarios').insert({
                        id: data.user.id,
                        nombre,
                        email,
                        empresa,
                        industria,
                        cargo,
                        tamaño_empresa: tamañoEmpresa
                    });

                    if (perfilError) {
                        console.error("Error al crear perfil publico:", perfilError);
                        // Continúa aunque falle el perfil público, luego se puede llenar
                    }
                }

                router.push("/formularios/diagnostico");
            }
        } catch (err: any) {
            console.error("Auth error:", err);
            setError(err.message || "Credenciales inválidas o error de red. Intenta nuevamente.");
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
                        {mode === 'login' ? (
                            <>Acceso Exclusivo a <br /><span className="text-primary">Inteligencia Financiera</span></>
                        ) : (
                            <>Inicia tu <br /><span className="text-primary">Diagnóstico Ejecutivo</span></>
                        )}
                    </h1>
                    <p className="text-slate-400 text-lg max-w-md">
                        {mode === 'login'
                            ? "Monitorea en tiempo real tus métricas clave de rentabilidad, flujo de caja y gestión estratégica."
                            : "Únete y descubre en minutos las fugas de rentabilidad y oportunidades de optimización en tu negocio con nuestro algoritmo experto."}
                    </p>
                </div>
                <div className="relative z-10">
                    <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10"></div>)}
                    </div>
                    <p className="text-sm font-bold text-white">Confían en nosotros líderes de la industria.</p>
                </div>
            </div>

            {/* Right: Auth Form */}
            <div className="flex items-center justify-center p-8 bg-[#101022] overflow-y-auto">
                <div className="w-full max-w-md my-8">
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

                        <div className="flex gap-4 mb-8">
                            <button
                                onClick={() => { setMode('login'); setError(""); }}
                                className={`flex-1 pb-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${mode === 'login' ? 'text-white border-primary' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                            >
                                Ingresar
                            </button>
                            <button
                                onClick={() => { setMode('register'); setError(""); }}
                                className={`flex-1 pb-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${mode === 'register' ? 'text-white border-primary' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
                            >
                                Registrarse
                            </button>
                        </div>

                        <form onSubmit={handleAuth} className="space-y-4">

                            {mode === 'register' && (
                                <>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase mb-2 ml-1">Nombre Completo</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                            <input required type="text" className="w-full bg-[#15152a] border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-300 uppercase mb-2 ml-1">Empresa</label>
                                            <div className="relative">
                                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                                <input required type="text" className="w-full bg-[#15152a] border border-white/10 rounded-lg py-3 pl-11 pr-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="Compañía" value={empresa} onChange={e => setEmpresa(e.target.value)} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-300 uppercase mb-2 ml-1">Cargo</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                                <input required type="text" className="w-full bg-[#15152a] border border-white/10 rounded-lg py-3 pl-11 pr-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition" placeholder="CEO, CFO..." value={cargo} onChange={e => setCargo(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-300 uppercase mb-2 ml-1">Industria</label>
                                            <select required className="w-full bg-[#15152a] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none" value={industria} onChange={e => setIndustria(e.target.value)}>
                                                <option value="" disabled>Selecciona...</option>
                                                <option value="Retail">Retail</option>
                                                <option value="Manufactura">Manufactura</option>
                                                <option value="Servicios">Servicios</option>
                                                <option value="Tecnologia">Tecnología</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-300 uppercase mb-2 ml-1">Tamaño</label>
                                            <select required className="w-full bg-[#15152a] border border-white/10 rounded-lg py-3 px-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition appearance-none" value={tamañoEmpresa} onChange={e => setTamañoEmpresa(e.target.value)}>
                                                <option value="" disabled>Empresa...</option>
                                                <option value="micro">Micro</option>
                                                <option value="pequeña">Pequeña</option>
                                                <option value="mediana">Mediana</option>
                                                <option value="grande">Grande</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}

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
                                        minLength={6}
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
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group mt-6"
                            >
                                {loading ? (
                                    <><Loader2 className="w-5 h-5 animate-spin" /> Procesando...</>
                                ) : (
                                    <>
                                        {mode === 'login' ? 'Ingresar a mi cuenta' : 'Crear Perfil y Empezar'}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
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
