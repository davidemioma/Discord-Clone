export default function ConversationPage({
  params,
}: {
  params: { convoId: string };
}) {
  const { convoId } = params;

  return <div>ConversationPage {convoId}</div>;
}
