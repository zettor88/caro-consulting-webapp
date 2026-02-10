
-- 1. Get Client ID (assuming the user ran the previous seed)
-- We will Use a CTE to fetch it dynamically based on the company name 'Cliente Demo SpA'
-- OR you can just replace 'CLIENT_UUID_HERE' if you know it.
-- For safety, let's use a subquery approach relative to the user you created.

-- INSTRUCTIONS:
-- Replace 'PLACEHOLDER_USER_ID' with your Supabase User UID (same as before).
-- Then Run this script.

WITH client_info AS (
    SELECT id FROM clients WHERE auth_user_id = 'PLACEHOLDER_USER_ID' LIMIT 1
)
INSERT INTO documents (client_id, name, file_type, file_url, category, is_external_link, description)
SELECT 
    id as client_id,
    'Presupuesto Maestro 2024',
    'Google Sheets',
    'https://docs.google.com/spreadsheets/u/0/', -- Example Link
    'Presupuesto',
    true,
    'Versión final aprobada por directorio.'
FROM client_info
UNION ALL
SELECT 
    id,
    'Forecast Q3 - Escenario Base',
    'Google Sheets',
    'https://docs.google.com/spreadsheets/u/0/',
    'Forecast',
    true,
    'Proyección actualizada con ventas de Julio.'
FROM client_info
UNION ALL
SELECT 
    id,
    'Matriz de Riesgos Operacionales',
    'PDF',
    'https://drive.google.com/drive/u/0/', 
    'Matriz',
    true,
    'Evaluación de riesgos planta productiva.'
FROM client_info
UNION ALL
SELECT 
    id,
    'Reporte Mensual Agosto',
    'PDF',
    '#', -- Placeholder file link
    'Entregable',
    false, -- This simulates a file uploaded to Supabase (internal)
    'Resumen de KPIs y gestión.'
FROM client_info;
