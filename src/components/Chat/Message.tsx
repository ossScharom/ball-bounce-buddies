import classNames from "classnames";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { ChatBubble } from "react-daisyui";
import type { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";

type GetMessageOutput =
  inferRouterOutputs<AppRouter>["message"]["getMessages"][0];

type Props = { message: GetMessageOutput; messageOfCurrentUser: boolean };

export default function Message({ message, messageOfCurrentUser }: Props) {
  return (
    <ChatBubble  end={messageOfCurrentUser}>
      <ChatBubble.Header>
        <ChatBubble.Time>
          {formatDistanceToNow(message.writtenAt, { addSuffix: true })}
        </ChatBubble.Time>
      </ChatBubble.Header>
      {message.user?.image && (
        <ChatBubble.Avatar className="h-10 w-10" src={message.user.image} />
      )}
      <ChatBubble.Message
        className={classNames({
          "chat-bubble chat-bubble-primary": messageOfCurrentUser,
        })}
      >
        {message.message}
      </ChatBubble.Message>
    </ChatBubble>
  );
}
