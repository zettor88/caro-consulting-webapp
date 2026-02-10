
-- 1. Create table for Clients (linked to auth.users if using Supabase Auth, or standalone)
create table clients (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  assigned_consultant text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  -- Link to Supabase Auth user (optional but recommended)
  auth_user_id uuid references auth.users(id)
);

-- 2. Create table for Metrics
create table financial_metrics (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references clients(id) not null,
  month date not null,
  revenue numeric,
  margin_percent numeric,
  ebitda numeric,
  cash_flow numeric,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create table for Documents
create table documents (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references clients(id) not null,
  name text not null,
  file_url text not null,
  file_type text,
  uploaded_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create table for Projects (Timeline)
create table projects (
  id uuid default gen_random_uuid() primary key,
  client_id uuid references clients(id) not null,
  phase_name text not null,
  status text check (status in ('completed', 'current', 'upcoming')),
  due_date date
);

-- 5. Row Level Security (RLS) Policies
-- Enable RLS
alter table clients enable row level security;
alter table financial_metrics enable row level security;
alter table documents enable row level security;
alter table projects enable row level security;

-- Policy: Clients can view their own data
create policy "Clients can view own data" on clients
  for select using (auth.uid() = auth_user_id);

create policy "Clients can view own metrics" on financial_metrics
  for select using (
    exists ( select 1 from clients where id = financial_metrics.client_id and auth_user_id = auth.uid() )
  );

create policy "Clients can view own documents" on documents
  for select using (
    exists ( select 1 from clients where id = documents.client_id and auth_user_id = auth.uid() )
  );
  
create policy "Clients can view own projects" on projects
  for select using (
    exists ( select 1 from clients where id = projects.client_id and auth_user_id = auth.uid() )
  );
