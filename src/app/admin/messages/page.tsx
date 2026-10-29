import { listMessages } from "@/lib/actions/messages";
import MessagesManager from "@/components/admin/MessagesManager";

export default async function AdminMessagesPage() {
  const messages = await listMessages();

  return <MessagesManager initialMessages={messages} />;
}
