import { ChatIdContainer } from "@/components/pages-containers/chat-id-container";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getChat } from "@/lib/supabase/queries/get-chat";
import { getDocumentByChatId } from "@/app/actions/get-document-by-chat-id";

type Props = {
  params: Promise<{ documentId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params;
  const document = await getDocumentByChatId(documentId);

  return {
    title: `Chat - ${document?.name || "Untitled"}`,
  };
}

export default async function Page({ params }: Props) {
  const { documentId } = await params;
  const chatData = await getChat(documentId);

  if (!chatData) redirect("/chat");

  return <ChatIdContainer chatData={chatData} />;
}
