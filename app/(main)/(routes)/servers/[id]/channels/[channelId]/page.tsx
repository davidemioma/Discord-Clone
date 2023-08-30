export default function ChannelPage({
  params,
}: {
  params: { channelId: string };
}) {
  const { channelId } = params;

  return <div>ChannelPage {channelId}</div>;
}
