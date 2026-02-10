
-- 1. Create table for Forms (if not exists)
create table if not exists form_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  form_type text not null, 
  data jsonb not null, 
  status text default 'new',
  user_id uuid references auth.users(id),
  file_urls jsonb default '[]'::jsonb -- For file uploads
);

-- Enable RLS for Form Submissions
alter table form_submissions enable row level security;

-- Policies for Forms
create policy "Anyone can submit forms" on form_submissions for insert to public with check ( true );
create policy "Authenticated users can view submissions" on form_submissions for select to authenticated using ( true );
create policy "Authenticated users can update submissions" on form_submissions for update to authenticated using ( true );


-- 2. Update Clients Table (Avatar & Subscriptions)
alter table clients 
add column if not exists avatar_url text,
add column if not exists subscription_status text default 'trial' check (subscription_status in ('active', 'inactive', 'trial', 'expired')),
add column if not exists subscription_end_date timestamp with time zone,
add column if not exists service_level text default 'Basic';


-- 3. Update Documents Table (Google Drive Support)
alter table documents 
add column if not exists category text default 'General',
add column if not exists is_external_link boolean default false, 
add column if not exists description text;


-- 4. Create Storage Buckets (if Supabase allows via SQL, otherwise User must do it)
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('form_uploads', 'form_uploads', false) on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('documents', 'documents', false) on conflict (id) do nothing;


-- 5. Storage Policies (Security)
create policy "Avatar Public View" on storage.objects for select using ( bucket_id = 'avatars' );
create policy "Avatar Upload Auth" on storage.objects for insert to authenticated with check ( bucket_id = 'avatars' );

create policy "Form Uploads Client" on storage.objects for insert to authenticated with check ( bucket_id = 'form_uploads' );

create policy "Documents Auth View" on storage.objects for select to authenticated using ( bucket_id = 'documents' );
