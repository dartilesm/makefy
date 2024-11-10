create extension if not exists "moddatetime" with schema "extensions";


create extension if not exists "vector" with schema "public" version '0.7.0';

drop policy "enabled for all" on "public"."DocumentSections";

alter table "public"."Chat" add column "suggestedQuestions" text[];

alter table "public"."Chat" add column "userId" uuid;

update "public"."Chat" set "userId" = auth.uid();

alter table "public"."Chat" enable row level security;

alter table "public"."Document" add column "userId" uuid;

update "public"."Document" set "userId" = auth.uid();

alter table "public"."Document" enable row level security;

alter table "public"."DocumentSections" add column "userId" uuid;

update "public"."DocumentSections" set "userId" = auth.uid();

alter table "public"."DocumentSections" enable row level security;

alter table "public"."Feedback" add column "userId" uuid;

update "public"."Feedback" set "userId" = auth.uid();

alter table "public"."Feedback" enable row level security;

do $$
begin
  if exists (
    select 1 from pg_roles where rolname = 'supabase_functions_admin'
  ) then
    grant delete on table "public"."DocumentSections" to "supabase_functions_admin";
    grant insert on table "public"."DocumentSections" to "supabase_functions_admin";
    grant references on table "public"."DocumentSections" to "supabase_functions_admin";
    grant select on table "public"."DocumentSections" to "supabase_functions_admin";
    grant trigger on table "public"."DocumentSections" to "supabase_functions_admin";
    grant truncate on table "public"."DocumentSections" to "supabase_functions_admin";
    grant update on table "public"."DocumentSections" to "supabase_functions_admin";
  end if;
end $$;

create policy "Authenticated users can delete a chat."
on "public"."Chat"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = "userId"));


create policy "Authenticated users can insert a chat."
on "public"."Chat"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = "userId"));


create policy "Authenticated users can update a chat."
on "public"."Chat"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = "userId"))
with check ((( SELECT auth.uid() AS uid) = "userId"));


create policy "Authenticated users can view their own chats."
on "public"."Chat"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = "userId"));


create policy "Authenticated users can delete a chat."
on "public"."Document"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = "userId"));


create policy "Authenticated users can insert a chat."
on "public"."Document"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = "userId"));


create policy "Authenticated users can update a chat."
on "public"."Document"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = "userId"))
with check ((( SELECT auth.uid() AS uid) = "userId"));


create policy "Authenticated users can view their own chats."
on "public"."Document"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = "userId"));


create policy "Authenticated users can delete a chat."
on "public"."DocumentSections"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = "userId"));


create policy "Authenticated users can insert a chat."
on "public"."DocumentSections"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = "userId"));


create policy "Authenticated users can update a chat."
on "public"."DocumentSections"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = "userId"))
with check ((( SELECT auth.uid() AS uid) = "userId"));


create policy "Authenticated users can view their own chats."
on "public"."DocumentSections"
as permissive
for select
to public
using ((( SELECT auth.uid() AS uid) = "userId"));


CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public."Chat" FOR EACH ROW EXECUTE FUNCTION moddatetime('updatedAt');

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public."Document" FOR EACH ROW EXECUTE FUNCTION moddatetime('updatedAt');

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public."DocumentSections" FOR EACH ROW EXECUTE FUNCTION moddatetime('updatedAt');


