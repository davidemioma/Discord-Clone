import prismadb from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { getPagesAccountProfile } from "@/lib/getPagesAccountProfile";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const profile = await getPagesAccountProfile(req);

    const { serverId, channelId } = req.query;

    const { content, fileUrl } = req.body;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!serverId) {
      return res.status(400).json({ error: "Server ID required" });
    }

    if (!channelId) {
      return res.status(400).json({ error: "Channel ID required" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content required" });
    }

    const serverExists = await prismadb.server.findUnique({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!serverExists) {
      return res.status(404).json({ message: "Server not found" });
    }

    const channel = await prismadb.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const member = serverExists.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const message = await prismadb.message.create({
      data: {
        channelId: channelId as string,
        memberId: member.id,
        content,
        fileUrl,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;

    await pusherServer.trigger(channelId, channelKey, message);

    return res.status(200).json(message);
  } catch (err) {
    console.log("[MESSAGES_POST]", err);

    return res.status(500).json({ message: "Internal Error" });
  }
}
