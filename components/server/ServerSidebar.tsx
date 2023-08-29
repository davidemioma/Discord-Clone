import React from "react";
import ServerHeader from "./ServerHeader";
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";
import { redirectToSignIn } from "@clerk/nextjs";
import { getServerById } from "@/actions/getServerById";
import { getAccountProfile } from "@/actions/getAccountProfile";

interface Props {
  serverId: string;
}

const ServerSidebar = async ({ serverId }: Props) => {
  const profile = await getAccountProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await getServerById({
    serverId,
    profileId: profile.id,
  });

  if (!server) {
    redirect("/");
  }

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );

  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );

  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  const currentUserRole = server?.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="w-full h-full flex flex-col bg-[#f2f3f5] dark:bg-[#2b2d31] text-primary">
      {/* @ts-ignore */}
      <ServerHeader server={server} role={currentUserRole} />
    </div>
  );
};

export default ServerSidebar;
