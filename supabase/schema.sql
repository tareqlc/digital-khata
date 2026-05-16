-- ডিজিটাল খাতা - Supabase Database Schema
-- supabase.com > SQL Editor এ এই পুরো কোডটা রান করো

-- Enable UUID
create extension if not exists "uuid-ossp";

-- ── Businesses Table ──────────────────────────────────────
create table public.businesses (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references auth.users(id) on delete cascade not null,
  name        text not null,
  owner_name  text not null,
  phone       text not null,
  plan        text default 'standard',
  created_at  timestamptz default now()
);

alter table public.businesses enable row level security;

create policy "Users can manage own business"
  on public.businesses for all
  using (auth.uid() = user_id);

-- ── Contacts Table (Customers + Suppliers) ────────────────
create table public.contacts (
  id           uuid default uuid_generate_v4() primary key,
  business_id  uuid references public.businesses(id) on delete cascade not null,
  name         text not null,
  phone        text,
  type         text check (type in ('customer', 'supplier')) not null,
  due          numeric default 0,
  paid         numeric default 0,
  created_at   timestamptz default now()
);

alter table public.contacts enable row level security;

create policy "Business owners can manage contacts"
  on public.contacts for all
  using (
    business_id in (
      select id from public.businesses where user_id = auth.uid()
    )
  );

-- ── Cash Transactions Table ───────────────────────────────
create table public.cash_transactions (
  id           uuid default uuid_generate_v4() primary key,
  business_id  uuid references public.businesses(id) on delete cascade not null,
  tx_type      text check (tx_type in ('cashSale','cashBuy','expense','ownerIn','ownerOut','dueCollected','paymentGiven')) not null,
  amount       numeric not null,
  description  text,
  tx_date      date default current_date,
  created_at   timestamptz default now()
);

alter table public.cash_transactions enable row level security;

create policy "Business owners can manage transactions"
  on public.cash_transactions for all
  using (
    business_id in (
      select id from public.businesses where user_id = auth.uid()
    )
  );

-- ── Indexes ───────────────────────────────────────────────
create index idx_contacts_business on public.contacts(business_id);
create index idx_cash_tx_business_date on public.cash_transactions(business_id, tx_date);
create index idx_businesses_user on public.businesses(user_id);

-- ── Demo seed (optional) ──────────────────────────────────
-- এটা রান করলে demo data পাবে (optional)
-- insert into public.businesses (user_id, name, owner_name, phone) 
-- values ('your-user-id', 'TG TAREQ', 'Tareq', '01700000000');
