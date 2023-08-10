import React, { forwardRef, useRef, useState } from "react";
import { Button, ChatBubble, Input, InputGroup, Modal } from "react-daisyui";
import { api } from "~/utils/api";
import LoadingSpinner from "../LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark,
  faPaperPlane,
  faRotate
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import Message from "./Message";
import classNames from "classnames";
import { create } from "domain";

type Props = {
  handleCloseChat: (showChat: boolean) => void;
  sportPlaceId: string | undefined;
};

const ChatModal = ({ sportPlaceId, handleCloseChat }: Props) => {
  // Query Sport Places
  const messages = api.message.getMessages.useQuery({
    sportPlaceId,
  });

  const [currMessage, setCurrMessage] = useState<string>("");
  const [refetchingMessages, setRefetchingMessages] = useState(false)

  const createMessageMutation = api.message.create.useMutation({
    onSuccess: () => {
      messages.refetch();
      setCurrMessage("");
    },
  });

  const { data: session } = useSession();

  const handleCurrMessageUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrMessage(e.currentTarget.value);
  };

  const handleSendMessage = () => {
    if (sportPlaceId && currMessage) {
      createMessageMutation.mutate({ sportPlaceId, message: currMessage });
    }
  };

  const handleReload = () => {
    messages.refetch()
    setRefetchingMessages(true)
    setTimeout(() => setRefetchingMessages(false), 200)
  }

  return (
    <div className="flex w-1/3 flex-col justify-between gap-3">
      <div className="grid grid-cols-3">
        <h2 className="col-start-2 inline-block items-center self-center justify-self-center text-2xl font-bold">
          Chat
        </h2>
        <Button
          className="col-start-3 h-2 w-2 justify-self-end rounded-none bg-red-500 text-white"
          onClick={() => handleCloseChat(false)}
        >
          <FontAwesomeIcon className="text-3xl" icon={faXmark} />
        </Button>
      </div>
      <div className="flex-grow overflow-auto px-5">
        {messages.data ? (
          messages.data.map((message) => (
            <Message
              key={message.id}
              message={message}
              messageOfCurrentUser={message.userId != session?.user.id}
            />
          ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <InputGroup className="grid grid-cols-8 justify-center">
        <Button className="btn-primary col-span-1" onClick={handleReload} disabled={messages.isLoading || messages.isRefetching} >
          <FontAwesomeIcon className={classNames("text-3xl", {'animate-spin': refetchingMessages})} icon={faRotate} />
        </Button>
        <Input
          className="col-span-6"
          onChange={handleCurrMessageUpdate}
          placeholder="Type here"
          value={currMessage}
        />

        <Button className="btn-primary col-span-1" onClick={handleSendMessage} loading={createMessageMutation.isLoading} disabled={createMessageMutation.isLoading || messages.isLoading || messages.isRefetching}>
          <FontAwesomeIcon className="text-3xl" icon={faPaperPlane} />
        </Button>
      </InputGroup>
    </div>
  );
};

export default ChatModal;
