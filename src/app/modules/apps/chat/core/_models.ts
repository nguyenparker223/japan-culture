import {Dispatch, SetStateAction} from "react";

export type ConversationModel = {
  id?: string,
  botId?: string,
  botUserId?: string,
  userName?: string,
  firstName?: string,
  lastName?: string,
  bio?: string,
  description?: string,
  linkedChatId?: string,
  messageList?: MessageModel[],
  platform?: string,
  title?: string,
  type?: string,
  avatar?: string,
  selected?: boolean
}

export type MessageModel = {
  id?: string
  platform?: string
  messageThreadId?: any
  from?: string
  date?: string
  chatId?: string
  forwardFrom?: any
  forwardFromChat?: any
  forwardDate?: any
  replyToMessage?: any
  text?: string,
  read?: boolean
}

export type ChatContextProps = {
  conversation?: ConversationModel
  setConversation?: Dispatch<SetStateAction<ConversationModel | undefined>>
  listConversation?: ConversationModel[]
  setListConversation?: Dispatch<SetStateAction<ConversationModel[] | undefined>>
  listMessage: MessageModel[]
  setListMessage: Dispatch<SetStateAction<MessageModel[]>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const initialChatContext: any = {
  listMessage: [],
  loading: false
}
