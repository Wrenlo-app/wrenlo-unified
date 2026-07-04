-- Sprint 3: business_members
-- Links a Supabase auth user to a business with a role (owner/staff).
-- Rows are created manually/by an admin this sprint — no self-serve signup
-- or staff-invite flow yet (that's a future sprint).

create table if not exists public.business_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  business_id uuid not null references public.businesses (id) on delete cascade,
  role text not null check (role in ('owner', 'staff')),
  created_at timestamptz not null default now(),

  -- Assumption: one membership row per (user, business) pair. If you later
  -- need the same person to hold two roles on the same business, drop this
  -- constraint — flagging it now since it's an easy thing to hit later.
  unique (user_id, business_id)
);

create index if not exists business_members_user_id_idx
  on public.business_members (user_id);

create index if not exists business_members_business_id_idx
  on public.business_members (business_id);

alter table public.business_members enable row level security;

-- A logged-in user can see their own membership row(s) only.
-- This does NOT let a user see other members of their own business (owner
-- included) — that's a reasonable next step once staff-invite/team-list UI
-- exists, but out of scope for this sprint since it wasn't requested.
create policy "Users can view their own business_members rows"
  on public.business_members
  for select
  using (auth.uid() = user_id);

-- Intentionally no insert/update/delete policy for regular users.
-- Rows are created via the Supabase dashboard (Table Editor) or with the
-- service-role key (which bypasses RLS entirely), per this sprint's scope.
-- A future "staff invite" sprint will need its own carefully-scoped insert
-- policy (e.g. only an existing 'owner' of that business_id can insert a
-- 'staff' row for that same business_id).
