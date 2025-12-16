-- 1. Enable Row Level Security (RLS)
-- This ensures that access to the table is denied by default unless a policy exists.
alter table public.contact_requests enable row level security;

-- 2. Create Policy for Public Submissions
-- This policy explicitly allows anyone (anon role) to INSERT data into the table.
-- It does NOT allow them to see (SELECT), update, or delete data.
create policy "Allow public inserts"
on public.contact_requests
for insert
to anon
with check (true);
