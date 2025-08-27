import { ClientChatShell } from "@/components/chat/ClientChatShell";

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ClientChatShell id={id} />
    </div>
  );
}


