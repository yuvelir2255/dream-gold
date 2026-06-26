# Supabase

The website **shares an existing Supabase project** with the brand's Telegram bot
(project ref `okylzqjlqbiwxbutsyvr`). The bot owns the bulk of the schema
(`items`, `orders`, `events`, `reviews`, `pending_media`) and its production data —
**do not modify or read those from the site** beyond what's explicitly intended.

## Migrations here

`migrations/` contains only the **website-owned** changes, kept under version
control for review. They are applied to the shared project via the Supabase MCP /
dashboard — this folder is a record, **not** a full migration history (the bot's
earlier migrations are not in this repo).

⚠️ Because the DB is shared, **never** run `supabase db reset` / a destructive push
against the remote project — you'd wipe the bot's data. Apply new website DDL
deliberately (and review it first).

- `…_create_web_inquiries_table.sql` — `web_inquiries` (site lead capture) + RLS.
- `…_harden_web_inquiries_insert_policy.sql` — length-bounded insert-only policy.

## Security model

`web_inquiries` is **insert-only** for `anon`/`authenticated` (no SELECT/UPDATE/
DELETE), so leads (PII) can't be read with the publishable key. The brand reads
them via Supabase Studio or a service-role admin. The publishable/anon key is safe
in the browser **only because RLS gates every table** — keep RLS enabled on every
public table.
