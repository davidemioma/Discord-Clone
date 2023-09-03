import { redirect } from "next/navigation";
import { getMember } from "@/actions/getMember";
import { redirectToSignIn } from "@clerk/nextjs";
import { getAccountProfile } from "@/actions/getAccountProfile";
import { getOrCreateConversation } from "@/actions/conversation";
import ChatHeader from "@/components/chat/ChatHeader";

export default async function ConversationPage({
  params,
}: {
  params: { id: string; memberId: string };
}) {
  const { id, memberId } = params;

  const profile = await getAccountProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  //This is to check if current user is a member on the server
  const currentMember = await getMember({
    serverId: id,
    profileId: profile.id,
  });

  const conversation = await getOrCreateConversation(
    currentMember?.id!,
    memberId
  );

  if (!currentMember) {
    return redirect("/");
  }

  if (!conversation) {
    return redirect(`/servers/${id}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="h-full bg-white dark:bg-[#313338] flex flex-col">
      <ChatHeader
        name={otherMember.profile.name}
        type="conversation"
        serverId={id}
        imgUrl={otherMember.profile.imgUrl}
      />
    </div>
  );
}
