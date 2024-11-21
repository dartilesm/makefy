alter table "public"."Feedback" alter column "id" set default gen_random_uuid();

alter table "public"."Feedback" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."Feedback" alter column "updatedAt" set default now();

alter table "public"."Feedback" alter column "updatedAt" set data type timestamp with time zone using "updatedAt"::timestamp with time zone;

create policy "Authenticated users can insert a feedback."
on "public"."Feedback"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = "userId"));
