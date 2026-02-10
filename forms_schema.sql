
-- Table: form_submissions
create table if not exists form_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  form_type text not null, -- 'INICIAL' or 'PRICING'
  data jsonb not null, -- Stores the Q&A
  status text default 'new', -- 'new', 'reviewed'
  user_id uuid references auth.users(id) -- Optional link to user
);

-- Enable RLS
alter table form_submissions enable row level security;

-- Policies

-- 1. Allow anyone (Anon + Auth) to INSERT (Submit forms)
create policy "Anyone can submit forms"
on form_submissions for insert
to public
with check ( true );

-- 2. Allow Authenticated users (Admin/Consultant) to VIEW submissions
-- Note: In a stricter setup, we would limit this to specific role/ID.
create policy "Authenticated users can view submissions"
on form_submissions for select
to authenticated
using ( true );

-- 3. Allow Authenticated users to UPDATE (Mark as reviewed)
create policy "Authenticated users can update submissions"
on form_submissions for update
to authenticated
using ( true );
