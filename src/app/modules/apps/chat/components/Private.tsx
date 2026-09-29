import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { ChatInner, Dropdown1 } from "../../../../../_metronic/partials";
import { useStompClient } from "react-stomp-hooks";
import Topic from "../../../common/Topic.tsx";
import { useAuth } from "../../../auth";
import { UsersListLoading } from "../../user-management/users-list/components/loading/UsersListLoading.tsx";
import { useChatContext } from "../core/ChatProvider.tsx";
import { Avatar } from "./Avatar.tsx";
import { ConversationModel } from "../core/_models.ts";
import Utils from "../../../common/Utils.tsx";
import Constants from "../../../common/Constants.tsx";
import { Conversation } from "./Conversation.tsx";

type Props = {
  botId: string;
};

const Private: FC<Props> = ({ botId }) => {
  const client = useStompClient();
  const { currentUser } = useAuth();
  const { loading, setLoading, conversation, setListMessage } =
    useChatContext();
  const [listConversation, setListConversation] = useState<ConversationModel[]>(
    []
  );
  const localListConversation = useMemo(() => {
    console.log("Update listConversation 1", listConversation);
    const getTime = (tmp: ConversationModel) => {
      if (!tmp.messageList || tmp.messageList.length <= 0)
        return new Date(0).getTime();
      return new Date(
        tmp.messageList[tmp.messageList.length - 1].date || 0
      ).getTime();
    };
    return listConversation?.slice().sort((c1, c2) => {
      return getTime(c2) - getTime(c1);
    });
  }, [listConversation]);

  useEffect(() => {
    setLoading(true);
    if (client) {
      // Listen list conversation
      client.subscribe(
        Topic.userTopic(Topic.RES_LIST_CONVERSATION, currentUser),
        (message) => {
          const conversationData = JSON.parse(message.body);
          if (conversationData.content && conversationData.content.length > 0) {
            if (setListConversation) {
              setListConversation(conversationData.content);
            }
            setLoading(false);
          }
        }
      );
      // Listen for chat message history
      client.subscribe(
        Topic.userTopic(Topic.RES_CHAT_HIS, currentUser),
        (message) => {
          const historyData = JSON.parse(message.body);
          if (historyData.content && historyData.content.length > 0) {
            setListMessage([...historyData.content]);
          }
        }
      );
      // Listen for new message
      client.subscribe(
        Topic.userTopic(Topic.RES_CHAT_MSG, currentUser),
        (message) => {
          const chatData = JSON.parse(message.body);
          if (chatData.messageList && chatData.messageList.length > 0) {
            // Use service worker instead of state for prevent re-render elements
            Utils.sendMsgToSW(
              Constants.SW_CHAT_HELPER,
              Constants.SW_TYPE_NEW_MSG,
              chatData.messageList
            );

            // Update listConversation for auto sort by timestamp
            // setListConversation((prev) => {
            //   chatData.messageList.forEach((msg: MessageModel) => {
            //     prev.filter(c => c.id === msg.chatId).forEach(c => {
            //       c.messageList?.push(msg)
            //     })
            //   })
            //   return [...prev]
            // })
          }
        }
      );
      // Register service worker
      Utils.regSW(toAbsoluteUrl(Constants.SW_CHAT_HELPER));
    }

    client?.publish({
      destination: Topic.REQ_LIST_CONVERSATION,
      body: JSON.stringify({ botId }),
    });
  }, [client]);

  const ConversationList: FC = () => {
    return localListConversation?.map((c: any, i: number) => {
      // Default read status at init state is read
      c.messageList?.forEach((m: any) => (m.read = true));
      return (
        <Conversation
          key={c.id}
          c={c}
          isLast={i >= localListConversation.length - 1}
        />
      );
    });
  };

  const ConversationPanel: FC = () => {
    return (
      <div className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0">
        <div className="card card-flush">
          <div className="card-header pt-7" id="kt_chat_contacts_header">
            <form className="w-100 position-relative" autoComplete="off">
              <KTIcon
                iconName="magnifier"
                className="fs-2 text-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y"
              />

              <input
                type="text"
                className="form-control form-control-solid px-15"
                name="search"
                placeholder="Search by username or email..."
              />
            </form>
          </div>

          <div className="card-body pt-5" id="kt_chat_contacts_body">
            <div
              className="scroll-y me-n5 pe-5 h-200px h-lg-auto"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header"
              data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body"
              data-kt-scroll-offset="0px"
            >
              <ConversationList />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChatPanel: FC<any> = React.memo(() => {
    console.log("Render ChatPanel");
    return (
      <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10">
        <div className="card" id="kt_chat_messenger">
          <div className="card-header" id="kt_chat_messenger_header">
            <div className="card-title">
              <div className="symbol-group symbol-hover me-5">
                <Avatar fromUser={true} c={conversation} />
              </div>
              <div className="d-flex justify-content-center flex-column me-3">
                <a className="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1">
                  {(conversation?.firstName ? conversation.firstName : "") +
                    (conversation?.lastName ? " " + conversation.lastName : "")}
                </a>

                <div className="mb-0 lh-1">
                  <span className="badge badge-success badge-circle w-10px h-10px me-1"></span>
                  <span className="fs-7 fw-bold text-gray-500">Active</span>
                </div>
              </div>
            </div>

            <div className="card-toolbar">
              <div className="me-n3">
                <button
                  className="btn btn-sm btn-icon btn-active-light-primary"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                  data-kt-menu-flip="top-end"
                >
                  <i className="bi bi-three-dots fs-2"></i>
                </button>
                <Dropdown1 />
              </div>
            </div>
          </div>
          <ChatInner client={client} />
        </div>
      </div>
    );
  });

  return loading ? (
    <UsersListLoading />
  ) : (
    <div className="d-flex flex-column flex-lg-row">
      <ConversationPanel />

      {conversation ? <ChatPanel /> : <></>}
    </div>
  );
};

export { Private };
