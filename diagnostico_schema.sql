-- =========================================================================
-- TAREA 1: BASE DE DATOS - SISTEMA DE DIAGNÓSTICO EJECUTIVO
-- Caro Consulting
-- =========================================================================

-- 1. TABLA: usuarios
-- Almacena la información de perfil empresarial de los clientes
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    empresa TEXT,
    industria TEXT,
    cargo TEXT,
    tamaño_empresa TEXT CHECK (tamaño_empresa IN ('micro', 'pequeña', 'mediana', 'grande', '')),
    rol TEXT DEFAULT 'cliente' CHECK (rol IN ('cliente', 'admin')),
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS en usuarios
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver su propio perfil" ON public.usuarios
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON public.usuarios
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins pueden ver todos los usuarios" ON public.usuarios
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin')
    );


-- 2. TABLA: diagnosticos
-- Almacena cada intento de diagnóstico, sus scores y metadatos
CREATE TABLE IF NOT EXISTS public.diagnosticos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    fecha_inicio TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    fecha_completado TIMESTAMP WITH TIME ZONE,
    estado TEXT DEFAULT 'en_progreso' CHECK (estado IN ('en_progreso', 'completado', 'abandonado')),
    
    -- Scores
    score_pricing DECIMAL(3,2),
    score_rentabilidad DECIMAL(3,2),
    score_control DECIMAL(3,2),
    score_bi DECIMAL(3,2),
    score_proyectos DECIMAL(3,2),
    score_global DECIMAL(3,2),
    
    -- Nivel
    nivel_madurez TEXT CHECK (nivel_madurez IN ('critico', 'reactivo', 'controlado', 'optimizado', NULL)),
    
    -- Respuestas completas
    respuestas_json JSONB,
    desafio_abierto TEXT,
    
    -- Informe
    pdf_url TEXT,
    informe_enviado BOOLEAN DEFAULT false,
    email_enviado_at TIMESTAMP WITH TIME ZONE,
    recomendaciones_json JSONB
);

-- Habilitar RLS en diagnosticos
ALTER TABLE public.diagnosticos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuarios pueden ver sus propios diagnosticos" ON public.diagnosticos
    FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Usuarios pueden insertar sus propios diagnosticos" ON public.diagnosticos
    FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuarios pueden actualizar sus propios diagnosticos" ON public.diagnosticos
    FOR UPDATE USING (auth.uid() = usuario_id);

CREATE POLICY "Admins pueden ver todos los diagnosticos" ON public.diagnosticos
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.usuarios WHERE id = auth.uid() AND rol = 'admin')
    );

-- 3. STORAGE BUCKET: Para almacenar los PDFs generados
INSERT INTO storage.buckets (id, name, public) VALUES ('diagnosticos', 'diagnosticos', true)
ON CONFLICT (id) DO NOTHING;

-- Policies para el Storage
CREATE POLICY "Public Access" 
    ON storage.objects FOR SELECT 
    USING (bucket_id = 'diagnosticos');

CREATE POLICY "Authenticated users can upload PDFs" 
    ON storage.objects FOR INSERT 
    WITH CHECK (bucket_id = 'diagnosticos' AND auth.role() = 'authenticated');
