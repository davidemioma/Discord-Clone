export default function ChannelPage({
  params,
}: {
  params: { channelId: string };
}) {
  const { channelId } = params;

  return (
    <div className="h-full bg-white dark:bg-[#313338] flex flex-col">
      ChannelPage {channelId}
    </div>
  );
}
