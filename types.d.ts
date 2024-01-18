import { NextApiResponse } from "next";
import { Channel, Member, Profile, Server } from "@prisma/client";

export type MemberProps = Member & {
  profile: Profile;
};

export type ServerProps = Server & {
  channels: Channel[];
  members: MemberProps[];
};

export type MessageType = Message & {
  member: MemberProps;
};
