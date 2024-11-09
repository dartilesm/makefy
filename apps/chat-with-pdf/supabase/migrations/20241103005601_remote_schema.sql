create extension if not exists "vector" with schema "public" version '0.7.0';

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.remove_document_file_after_removing_chats()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    PERFORM remove_file('documents', OLD.id::text || '.pdf');

    RETURN OLD;
END;
$function$
;

CREATE TRIGGER chat_delete_trigger AFTER DELETE ON public."Chat" FOR EACH ROW EXECUTE FUNCTION remove_document_file_after_removing_chats();


