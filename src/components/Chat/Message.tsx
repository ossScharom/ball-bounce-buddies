import classNames from "classnames";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { ChatBubble } from "react-daisyui";
import type { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "~/server/api/root";
import Image from "next/image";

type GetMessageOutput =
  inferRouterOutputs<AppRouter>["message"]["getMessages"][0];

type Props = { message: GetMessageOutput; messageOfCurrentUser: boolean };

export default function Message({ message, messageOfCurrentUser }: Props) {
  return (
    <div
      className={classNames("chat", {
        "chat-start": messageOfCurrentUser,
        "chat-end": !messageOfCurrentUser,
      })}
    >
      <div className="chat-header">
        <ChatBubble.Time>
          {formatDistanceToNow(message.writtenAt, { addSuffix: true })}
        </ChatBubble.Time>
      </div>
      {message.user?.image && (
        <div className="chat-image avatar h-10 w-10 ">
            <Image fill className="rounded-full" src={message.user.image} alt={""}/>
        </div>
      )}
      <ChatBubble.Message
        className={classNames({
          "chat- chat-bubble-primary": messageOfCurrentUser,
        })}
      >
        {message.message}
      </ChatBubble.Message>
    </div>
  );
}
