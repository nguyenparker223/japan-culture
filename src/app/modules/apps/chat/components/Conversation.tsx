import { FC, useEffect, useMemo, useState } from "react";
import { ConversationModel, MessageModel } from "../core/_models.ts";
import Utils from "../../../common/Utils.tsx";
import { useIntl } from "react-intl";
import { useStompClient } from "react-stomp-hooks";
import Topic from "../../../common/Topic.tsx";
import { useChatContext } from "../core/ChatProvider.tsx";
import { Avatar } from "./Avatar.tsx";
import Constants from "../../../common/Constants.tsx";

type Props = {
  key: string;
  c: ConversationModel;
  isLast?: boolean;
};

const Conversation: FC<Props> = ({ c, isLast = false }) => {
  const { setLoading, conversation, setConversation, setListMessage } =
    useChatContext();
  const [lastMessage, setLastMessage] = useState<MessageModel | undefined>(
    c && c.messageList && c.messageList.length > 0
      ? c.messageList[c.messageList.length - 1]
      : undefined
  );
  const client = useStompClient();
  const trans = useIntl();
  const unreadCnt = useMemo(() => {
    return c.messageList?.filter((m) => !m.read).length || 0;
  }, [lastMessage]);
  let refreshInterval: any;
  const t = (key: string, params?: any) => {
    return trans.formatMessage({ id: key }, params ? params : undefined);
  };
  const getTimeStamp = (tmp: MessageModel | undefined) => {
    return !tmp
      ? t("CHAT.LAST_MSG_NEVER")
      : Utils.getTimeAgo(tmp.date || "", t);
  };
  const autoUpdateTimeStamp = (refLastMessage: MessageModel | undefined) => {
    if (refreshInterval) clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      setLastMessage((prev) => {
        if (!refLastMessage) return undefined;
        if (!prev) return refLastMessage;
        prev.text = refLastMessage.text;
        prev.date = refLastMessage.date;
        prev.from = refLastMessage.from;
        return prev;
      });
    }, 60000);
  };
  const timeStamp = useMemo(() => {
    autoUpdateTimeStamp(lastMessage);
    return getTimeStamp(lastMessage);
  }, [lastMessage]);

  useEffect(() => {
    Utils.subscribeSW(Constants.SW_TYPE_NEW_MSG, (msgList: any) => {
      const tmp: MessageModel[] =
        msgList.filter((m: MessageModel) => {
          return c.id === m.chatId;
        }) || [];
      if (tmp.length > 0) {
        // No need to mark new message if it from me
        tmp.filter((m) => m.from !== c.id).forEach((m) => (m.read = true));
        setLastMessage(tmp[tmp.length - 1]);
        c.messageList?.push(...tmp);
        autoUpdateTimeStamp(tmp[tmp.length - 1]);
      }
    });
    if (conversation?.id === c.id)
      c.messageList?.forEach((m) => (m.read = true));
    console.log("render", c.userName);
  }, []);

  useEffect(() => {
    c.selected = conversation && conversation.id === c.id;
  }, [conversation]);

  const selectConversation = () => {
    if (client && conversation?.id !== c.id) {
      setListMessage([]);
      if (setConversation) setConversation(c);
      client.publish({
        destination: Topic.REQ_CHAT_HIS,
        body: JSON.stringify({
          chatId: c.id,
          botId: c.botId,
          sortBy: "date",
        }),
      });
    }
  };

  return (
    <>
      <div
        className={`d-flex flex-stack py-4 btn btn-custom text-start ${
          c.selected ? "btn-light-primary btn-active-light-primary" : ""
        }`}
        onClick={() => selectConversation()}
      >
        <div className="d-flex align-items-center">
          <Avatar fromUser={true} c={c} />
          <div className="ms-5">
            <a className="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2">
              {c.firstName}
            </a>
            <div className="fw-bold text-gray-500">
              {lastMessage && lastMessage.text
                ? Utils.truncateText(lastMessage.text, 15)
                : ""}
            </div>
          </div>
        </div>

        <div className="d-flex flex-column align-items-end ms-2">
          <span className="text-muted fs-7 mb-1">{timeStamp}</span>
          {unreadCnt > 0 ? (
            <span className="badge badge-sm badge-light-danger">New</span>
          ) : (
            <></>
          )}
        </div>
      </div>
      {!isLast ?? <div className="separator separator-dashed d-none"></div>}
    </>
  );
};

export { Conversation };
