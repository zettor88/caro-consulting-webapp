
-- 1. Enable RLS on storage.objects (usually enabled by default, but good to ensure)
alter table storage.objects enable row level security;

-- 2. Allow authenticated users (You and Clients) to VIEW files in 'documents'
create policy "Authenticated users can view documents"
on storage.objects for select
to authenticated
using ( bucket_id = 'documents' );

-- 3. Allow authenticated users (You) to UPLOAD files to 'documents'
create policy "Authenticated users can upload documents"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'documents' );

-- 4. Allow updates (if needed)
create policy "Authenticated users can update documents"
on storage.objects for update
to authenticated
using ( bucket_id = 'documents' );
