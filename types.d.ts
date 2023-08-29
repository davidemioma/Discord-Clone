import { Channel, Member, Profile, Server } from "@prisma/client";

export type ServerProps = Server & {
  channels: Channel[];
  members: Member &
    {
      profile: Profile;
    }[];
};
