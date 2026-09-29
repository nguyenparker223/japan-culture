import { createContext, FC, useContext, useState } from "react";
import {
  ChatContextProps,
  ConversationModel,
  initialChatContext,
  MessageModel,
} from "./_models.ts";
import { WithChildren } from "../../../../../_metronic/helpers";

const ChatContext = createContext<ChatContextProps>(initialChatContext);

const ChatProvider: FC<WithChildren> = ({ children }) => {
  const [conversation, setConversation] = useState<
    ConversationModel | undefined
  >();
  const [listConversation, setListConversation] = useState<
    ConversationModel[] | undefined
  >();
  const [listMessage, setListMessage] = useState<MessageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ChatContext.Provider
      value={{
        conversation,
        setConversation,
        listConversation,
        setListConversation,
        listMessage,
        setListMessage,
        loading,
        setLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => useContext(ChatContext);

export { ChatProvider, useChatContext };
