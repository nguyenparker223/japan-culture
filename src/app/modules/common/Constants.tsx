export default class Constants {
    static PHONE_NUMBER_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    static ROLE_ADMIN = 'ADMIN';
    static ROLE_USER = 'USER';

    static BOT_TYPES = [
        'BOT.TYPE.CC',
        'BOT.TYPE.SALE',
        'BOT.TYPE.MKT',
        'BOT.TYPE.DYNAMIC'
    ];
    static BOT_PLATFORMS = [
        'BOT.PLATFORM.TELEGRAM',
        'BOT.PLATFORM.MESSENGER'
    ];

    static COLOR_CLASSES = [
        'text-light-primary',
        'text-light-success',
        'text-light-info',
        'text-light-warning',
        'text-light-danger',
    ];

    static SW_CHAT_HELPER = '/sw/chat-helper.js'

    static SW_TYPE_NEW_MSG = 'chat-new-message'
}
