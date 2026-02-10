-- Create table for Site Content (Mini-CMS)
CREATE TABLE IF NOT EXISTS public.site_content (
  key text PRIMARY KEY,
  content jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read
CREATE POLICY "Public items are viewable by everyone" ON public.site_content
  FOR SELECT USING (true);

-- Policy: Only authenticated users (Admin) can insert/update
CREATE POLICY "Admins can insert content" ON public.site_content
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update content" ON public.site_content
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Initial Seed Data (Structure corresponding to Landing Page sections)

-- 1. Hero Section
INSERT INTO public.site_content (key, content)
VALUES (
  'hero', 
  '{
    "tagline": "Consultoría Industrial B2B",
    "title": "Impulsa tu rentabilidad con <br /> <span class=\"text-primary\">decisiones basadas en datos</span>",
    "subtitle": "Optimización estratégica con el respaldo de Sebastián Caro: más de <span class=\"text-white font-bold\">+332MM</span> en mejoras generadas para líderes del sector.",
    "cta_primary": "Solicitar Auditoría Express",
    "cta_secondary": "Ver Casos de Éxito"
  }'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- 2. Services Section
INSERT INTO public.site_content (key, content)
VALUES (
  'services', 
  '[
    {
      "icon": "TrendingUp",
      "title": "Pricing Strategy",
      "description": "Diseño de arquitecturas de precios que maximizan la captura de valor sin sacrificar volumen.",
      "items": ["Análisis de elasticidad", "Dynamic Pricing B2B"]
    },
    {
      "icon": "PieChart",
      "title": "Product Management",
      "description": "Alineación del roadmap de producto con los objetivos financieros de la compañía.",
      "items": ["Racionalización SKU", "Roadmap de innovación"]
    },
    {
      "icon": "BarChart3",
      "title": "FP&A Avanzado",
      "description": "Modelos financieros predictivos y control de gestión para la toma de decisiones ejecutivas.",
      "items": ["Modelado de escenarios", "Control OPEX/CAPEX"]
    }
  ]'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- 3. Case Studies
INSERT INTO public.site_content (key, content)
VALUES (
  'cases', 
  '[
    {
      "title": "Tubexa",
      "description": "Implementación de una nueva estructura de descuentos y optimización del mix de productos, logrando un incremento sostenido en el margen EBITDA del 15% en 6 meses.",
      "metric_value": "+15%",
      "metric_label": "EBITDA",
      "time_value": "6 Meses",
      "time_label": "Tiempo Ejecución"
    }
  ]'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- 4. Consultant Bio
INSERT INTO public.site_content (key, content)
VALUES (
  'bio', 
  '{
    "name": "Sebastian Caro",
    "role": "Expert Pricing & Financial Strategy",
    "description": "Con más de 10 años de experiencia liderando transformaciones financieras. Mi enfoque combina el rigor analítico de la ingeniería financiera con una visión estratégica de negocio, asegurando impacto directo en la última línea del P&L.",
    "linkedin": "https://www.linkedin.com/in/sebastiancaroalvarado/",
    "email": "sebastian@caroconsulting.com",
    "initials": "SC"
  }'::jsonb
) ON CONFLICT (key) DO NOTHING;
