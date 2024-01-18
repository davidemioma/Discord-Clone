import { useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import { useQueryClient } from "@tanstack/react-query";
import { Message, Member, Profile } from "@prisma/client";

type Props = {
  addKey: string;
  updateKey: string;
  queryKey: string;
  pusherKey: string;
};

type MessageProps = Message & {
  member: Member & {
    profile: Profile;
  };
};

export const useChatSocket = ({
  addKey,
  updateKey,
  queryKey,
  pusherKey,
}: Props) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);

    const newMessageHandler = (message: MessageProps) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [
              {
                messages: [message],
              },
            ],
          };
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          messages: [message, ...newData[0].messages],
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    };

    const updateMessageHandler = (message: MessageProps) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            messages: page.messages.map((msg: MessageProps) => {
              if (msg.id === message.id) {
                return message;
              }

              return msg;
            }),
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    };

    pusherClient.bind(addKey, newMessageHandler);

    pusherClient.bind(updateKey, updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);

      pusherClient.unbind(addKey, newMessageHandler);

      pusherClient.unbind(updateKey, updateMessageHandler);
    };
  }, [queryClient, queryKey, updateKey, addKey]);
};
