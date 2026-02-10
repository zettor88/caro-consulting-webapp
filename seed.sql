
-- INSTRUCTIONS:
-- 1. Create a user in Supabase (Authentication -> Users -> Add User).
-- 2. Copy the 'User UID' of that user.
-- 3. Replace 'PLACEHOLDER_USER_ID' below with that UUID (keep the quotes).
-- 4. Run this script in the SQL Editor.

-- 1. Create the Client Profile linked to your user
INSERT INTO clients (company_name, assigned_consultant, auth_user_id)
VALUES 
('Cliente Demo SpA', 'Sebastian Caro', 'PLACEHOLDER_USER_ID');

-- 2. Add Financial Metrics (Last 6 months)
INSERT INTO financial_metrics (client_id, month, revenue, margin_percent, ebitda, cash_flow)
SELECT 
  id as client_id,
  '2026-01-01', 100000, 22.5, 22500, 15000
FROM clients WHERE auth_user_id = 'PLACEHOLDER_USER_ID';

INSERT INTO financial_metrics (client_id, month, revenue, margin_percent, ebitda, cash_flow)
SELECT 
  id as client_id,
  '2026-02-01', 120000, 24.0, 28800, 18000
FROM clients WHERE auth_user_id = 'PLACEHOLDER_USER_ID';

INSERT INTO financial_metrics (client_id, month, revenue, margin_percent, ebitda, cash_flow)
SELECT 
  id as client_id,
  '2026-03-01', 115000, 23.5, 27025, 12000
FROM clients WHERE auth_user_id = 'PLACEHOLDER_USER_ID';

-- 3. Add Documents
INSERT INTO documents (client_id, name, file_url, file_type, uploaded_at)
SELECT 
  id, 'Propuesta Comercial vFinal.pdf', 'https://example.com/demo.pdf', 'PDF', NOW() - INTERVAL '5 days'
FROM clients WHERE auth_user_id = 'PLACEHOLDER_USER_ID';

INSERT INTO documents (client_id, name, file_url, file_type, uploaded_at)
SELECT 
  id, 'Planilla de Costos.xlsx', 'https://example.com/demo.xlsx', 'Excel', NOW() - INTERVAL '2 days'
FROM clients WHERE auth_user_id = 'PLACEHOLDER_USER_ID';

-- 4. Add Project Timeline
INSERT INTO projects (client_id, phase_name, status, due_date)
SELECT id, 'Diagnóstico Inicial', 'completed', '2026-01-15' FROM clients WHERE auth_user_id = 'PLACEHOLDER_USER_ID';

INSERT INTO projects (client_id, phase_name, status, due_date)
SELECT id, 'Implementación de Pricing', 'current', '2026-02-28' FROM clients WHERE auth_user_id = 'PLACEHOLDER_USER_ID';

INSERT INTO projects (client_id, phase_name, status, due_date)
SELECT id, 'Capacitación Equipos', 'upcoming', '2026-03-15' FROM clients WHERE auth_user_id = 'PLACEHOLDER_USER_ID';
