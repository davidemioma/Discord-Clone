import { Channel, Member, Profile, Server } from "@prisma/client";

export type MemberProps = Member & {
  profile: Profile;
};

export type ServerProps = Server & {
  channels: Channel[];
  members: MemberProps[];
};
