create extension if not exists "vector" with schema "public" version '0.7.0';

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.remove_document_file_after_removing_chats()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
    DELETE FROM storage.objects 
    WHERE bucket_id = 'documents' AND name = OLD.id || '.pdf';
    
    RETURN OLD;
END;$function$
;


