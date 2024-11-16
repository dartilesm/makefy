-- add the createdAt and updatedAt columns to the DocumentSections table
alter table "public"."DocumentSections" add column "createdAt" timestamp with time zone not null default now();
alter table "public"."DocumentSections" add column "updatedAt" timestamp with time zone not null default now();

-- Update existing null records with a default UUID to replace it with the auth.uid()
UPDATE "public"."Chat" SET "userId" = '00000000-0000-0000-0000-000000000000' WHERE "userId" IS NULL;
UPDATE "public"."Document" SET "userId" = '00000000-0000-0000-0000-000000000000' WHERE "userId" IS NULL;
UPDATE "public"."DocumentSections" SET "userId" = '00000000-0000-0000-0000-000000000000' WHERE "userId" IS NULL;
UPDATE "public"."Feedback" SET "userId" = '00000000-0000-0000-0000-000000000000' WHERE "userId" IS NULL;

-- Set the default value and make it not null
alter table "public"."Chat" alter column "userId" set default auth.uid();
alter table "public"."Chat" alter column "userId" set not null;

alter table "public"."Document" alter column "userId" set default auth.uid();
alter table "public"."Document" alter column "userId" set not null;

alter table "public"."DocumentSections" alter column "userId" set default auth.uid();
alter table "public"."DocumentSections" alter column "userId" set not null;

alter table "public"."Feedback" alter column "userId" set default auth.uid();
alter table "public"."Feedback" alter column "userId" set not null;