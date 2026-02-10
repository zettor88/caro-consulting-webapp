
-- NOTE: In most Supabase projects, RLS is already enabled on storage.objects.
-- Skipping the 'alter table' command to avoid permission errors.

-- 1. Allow authenticated users (You and Clients) to VIEW files in 'documents'
create policy "Authenticated users can view own documents v2"
on storage.objects for select
to authenticated
using ( bucket_id = 'documents' );

-- 2. Allow authenticated users (You) to UPLOAD files to 'documents'
create policy "Authenticated users can upload documents v2"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'documents' );

-- 3. Allow updates (if needed)
create policy "Authenticated users can update documents v2"
on storage.objects for update
to authenticated
using ( bucket_id = 'documents' );
