import { redirect } from "next/navigation";
import { getMember } from "@/actions/getMember";
import { redirectToSignIn } from "@clerk/nextjs";
import ChatHeader from "@/components/chat/ChatHeader";
import { getChannelById } from "@/actions/getChannelById";
import { getAccountProfile } from "@/actions/getAccountProfile";
import ChatInput from "@/components/chat/ChatInput";

export default async function ChannelPage({
  params,
}: {
  params: { id: string; channelId: string };
}) {
  const { id, channelId } = params;

  const profile = await getAccountProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await getChannelById(channelId);

  //This is to check if current user is a member on the server
  const currentMember = await getMember({
    serverId: id,
    profileId: profile.id,
  });

  if (!channel || !currentMember) {
    return redirect("/");
  }

  return (
    <div className="h-full bg-white dark:bg-[#313338] flex flex-col">
      <ChatHeader
        name={channel.name}
        type="channel"
        serverId={channel.serverId}
      />

      <div className="flex-1"></div>

      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: id,
        }}
      />
    </div>
  );
}
