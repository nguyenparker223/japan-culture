export default class Topic {
    static REQ_LIST_CONVERSATION = '/topic/list-conversation'
    static RES_LIST_CONVERSATION = '/list-conversation-tracker'
    static REQ_CHAT_HIS = '/topic/chat-history'
    static RES_CHAT_HIS = '/chat-history-tracker'
    static REQ_CHAT_MSG = '/topic/send-message'
    static RES_CHAT_MSG = '/new-message-tracker'

    static userTopic(topic: string, currentUser: any): string {
        if (!currentUser) return '';
        return `/user/${currentUser.userName}${topic}`
    }
}
