"use client";

import React, { Fragment } from "react";
import { format } from "date-fns";
import ChatItem from "./ChatItem";
import { MessageType } from "@/types";
import { Member } from "@prisma/client";
import ChatWelcome from "./ChatWelcome";
import { DATE_FORMAT } from "@/lib/utils";
import { Loader2, ServerCrash } from "lucide-react";
import { useChatQuery } from "@/hooks/use-chat-query";

interface Props {
  name: string;
  type: "channel" | "conversation";
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

const ChatMessages = ({
  name,
  type,
  member,
  chatId,
  apiUrl,
  socketQuery,
  socketUrl,
  paramKey,
  paramValue,
}: Props) => {
  const queryKey = `chat:${chatId}`;

  const addKey = `chat:${chatId}:messages`;

  const updateKey = `chat:${chatId}:messages:update`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ queryKey, apiUrl, paramKey, paramValue });

  if (status === "loading") {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />

        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />

      <ChatWelcome name={name} type={type} />

      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group?.messages.map((message: MessageType) => (
              <ChatItem
                key={message.id}
                message={message}
                currentMember={member}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                isUpdated={message.updatedAt !== message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
