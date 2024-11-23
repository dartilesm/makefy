create extension if not exists "vector" with schema "public" version '0.7.0';

set check_function_bodies = off;

INSERT INTO storage.buckets (id, name, public)
SELECT 'documents', 'documents', TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'documents'
);

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Public Access'
    ) THEN
        create policy "Public Access"
            on storage.objects for select
            using ( bucket_id = 'documents' );
    END IF;
END
$$;


CREATE OR REPLACE FUNCTION public.remove_document_file_after_removing_chats()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
    DELETE FROM storage.objects 
    WHERE bucket_id = 'documents' AND name = OLD.id || '.pdf';
    
    RETURN OLD;
END;$function$
;

CREATE TRIGGER remove_document_file_after_chat_delete
AFTER DELETE ON public."Chat" FOR EACH ROW
EXECUTE FUNCTION public.remove_document_file_after_removing_chats ();

