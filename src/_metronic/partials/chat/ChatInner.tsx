import { FC, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import ScrollToBottom from "react-scroll-to-bottom";
import { useChatContext } from "../../../app/modules/apps/chat/core/ChatProvider.tsx";
import { MessageModel } from "../../../app/modules/apps/chat/core/_models.ts";
import { Client } from "react-stomp-hooks";
import { Avatar } from "../../../app/modules/apps/chat/components/Avatar.tsx";
import Utils from "../../../app/modules/common/Utils.tsx";
import Topic from "../../../app/modules/common/Topic.tsx";
import Constants from "../../../app/modules/common/Constants.tsx";

type Props = {
  isDrawer?: boolean;
  client?: Client;
};

const ChatInner: FC<Props> = ({ client, isDrawer = false }) => {
  const [chatUpdateFlag, toggleChatUpdateFlag] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const { conversation, listMessage } = useChatContext();

  useEffect(() => {
    if (!client) return;

    Utils.subscribeSW(Constants.SW_TYPE_NEW_MSG, (messageList: any) => {
      if (messageList && messageList.length > 0 && conversation) {
        setMessages((prev) => [
          ...prev,
          ...messageList.filter((m: MessageModel) => {
            return m.chatId === conversation.id;
          }),
        ]);
      }
    });
  }, []);

  const sendMessage = () => {
    if (!client || !message || !conversation) return;
    const newMessage: any = {
      message,
      botId: conversation.botId,
      chatId: conversation.id,
    };

    client.publish({
      destination: Topic.REQ_CHAT_MSG,
      body: JSON.stringify(newMessage),
    });
    setMessage("");
  };

  const reformatMessage = (msg: string) => {
    if (!msg) return msg;
    return msg.replace(/\r?\n/, "<br />");
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const Messages: FC = () => {
    if (!conversation) return <></>;
    return messages.map((message, index) => {
      const fromUser = message.from === conversation.id;
      const state = fromUser ? "info" : "primary";
      const contentClass = `${isDrawer ? "" : "d-flex"} justify-content-${
        fromUser ? "start" : "end"
      } mb-10`;
      return (
        <div
          key={`message-${index}`}
          className={clsx("d-flex", contentClass, "mb-10")}
        >
          <div
            className={clsx(
              "d-flex flex-column align-items",
              `align-items-${fromUser ? "start" : "end"}`
            )}
          >
            <div className="d-flex align-items-center mb-2">
              {fromUser ? (
                <>
                  <Avatar c={conversation} fromUser={fromUser} />
                  <div className="ms-3">
                    <a
                      href="#"
                      className="fs-5 fw-bolder text-gray-900 text-hover-primary me-1"
                    >
                      {conversation?.firstName}
                    </a>
                    <span className="text-muted fs-7 mb-1">
                      {Utils.formatDate(message.date)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="me-3">
                    <span className="text-muted fs-7 mb-1">
                      {Utils.formatDate(message.date)}
                    </span>
                    <a
                      href="#"
                      className="fs-5 fw-bolder text-gray-900 text-hover-primary ms-1"
                    >
                      You
                    </a>
                  </div>
                  <Avatar c={conversation} fromUser={fromUser} />
                </>
              )}
            </div>

            <div
              className={clsx(
                "p-5 rounded",
                `bg-light-${state}`,
                "text-gray-900 fw-bold mw-lg-400px",
                `text-${fromUser ? "start" : "end"}`
              )}
              data-kt-element="message-text"
              dangerouslySetInnerHTML={{
                __html: message.text ? reformatMessage(message.text) : "",
              }}
            ></div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className="card-body"
      id={isDrawer ? "kt_drawer_chat_messenger_body" : "kt_chat_messenger_body"}
    >
      <div
        className={clsx("scroll-y me-n5 pe-5", { "h-300px": !isDrawer })}
        data-kt-element="messages"
        data-kt-scroll="true"
        data-kt-scroll-activate="{default: false, lg: true}"
        data-kt-scroll-max-height="auto"
        data-kt-scroll-dependencies={
          isDrawer
            ? "#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer"
            : "#kt_header, #kt_app_header, #kt_app_toolbar, #kt_toolbar, #kt_footer, #kt_app_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer"
        }
        data-kt-scroll-wrappers={
          isDrawer
            ? "#kt_drawer_chat_messenger_body"
            : "#kt_content, #kt_app_content, #kt_chat_messenger_body"
        }
        data-kt-scroll-offset={isDrawer ? "0px" : "-2px"}
      >
        <ScrollToBottom
          className={clsx("h-300px")}
          followButtonClassName={"fa-solid fa-angles-down fa-bounce"}
        >
          <Messages />
        </ScrollToBottom>
      </div>

      <div
        className="card-footer pt-4"
        id={
          isDrawer
            ? "kt_drawer_chat_messenger_footer"
            : "kt_chat_messenger_footer"
        }
      >
        <textarea
          className="form-control form-control-flush mb-3"
          rows={1}
          data-kt-element="input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onEnterPress}
        ></textarea>

        <div className="d-flex flex-stack">
          <div className="d-flex align-items-center me-2">
            <button
              className="btn btn-sm btn-icon btn-active-light-primary me-1"
              type="button"
              data-bs-toggle="tooltip"
              title="Coming soon"
            >
              <i className="bi bi-paperclip fs-3"></i>
            </button>
            <button
              className="btn btn-sm btn-icon btn-active-light-primary me-1"
              type="button"
              data-bs-toggle="tooltip"
              title="Coming soon"
            >
              <i className="bi bi-upload fs-3"></i>
            </button>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            data-kt-element="send"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export { ChatInner };
