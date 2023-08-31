export default function ConversationPage({
  params,
}: {
  params: { memberId: string };
}) {
  const { memberId } = params;

  return <div>ConversationPage {memberId}</div>;
}
