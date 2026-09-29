import md5 from "blueimp-md5";
import Constants from "./Constants.tsx";

export default class Utils {
    private static chatHelperWorker: Worker;

    public static hashPassword(password: string) {
        return md5(password, import.meta.env.VITE_APP_PASS_SALT);
    }

    public static formatDate(date?: string, format?: Intl.DateTimeFormatOptions) {
        if (!date) return '';
        const options: Intl.DateTimeFormatOptions = format ? format : {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Asia/Ho_Chi_Minh', // Assuming your input string is in UTC
        };

        return new Date(date).toLocaleString('en-US', options);
    }

    public static getTimeAgo(timestamp: string, t: Function, currentDate?: Date): string {
        const messageDate = new Date(Date.parse(timestamp));
        currentDate = !currentDate ? new Date() : currentDate;

        const timeDifference = currentDate.getTime() - messageDate.getTime();

        // Convert milliseconds to seconds
        const seconds = Math.floor(timeDifference / 1000);

        if (seconds < 60) {
            return t('CHAT.LAST_MSG_JUST_NOW');
        }

        const minutes = Math.floor(seconds / 60);

        if (minutes < 60) {
            return t('CHAT.LAST_MSG_MINUTE', { number: minutes} );
        }

        const hours = Math.floor(minutes / 60);

        if (hours < 24) {
            return t('CHAT.LAST_MSG_HOUR', { number: hours} );
        }

        const days = Math.floor(hours / 24);
        return t('CHAT.LAST_MSG_DAY', { number: days} );
    }

    public static getColorClassByString(input: string): string {
        // Simple hash function to generate a numeric hash value
        const hash = input.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

        // Map the hash value to an index in the colorClasses array
        const index = hash % Constants.COLOR_CLASSES.length;

        return Constants.COLOR_CLASSES[index];
    }

    public static truncateText(text: string, maxLength: number): string {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.slice(0, maxLength) + '...';
        }
    }

    public static regSW(url: string) {
        if (!Utils.chatHelperWorker) {
            Utils.chatHelperWorker = new Worker(url);
        }
    }

    public static sendMsgToSW(swUrl: string, type: string, message: any) {
        if (Utils.chatHelperWorker) {
            Utils.chatHelperWorker.postMessage({ type, message });
        }
    }

    public static subscribeSW(type: string, callback: Function) {
        if (Utils.chatHelperWorker) {
            Utils.chatHelperWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === type) {
                    callback(event.data.message);
                }
            });
        }
    }

    public static unsubscribeSW(type: string, callback: Function) {
        if (Utils.chatHelperWorker) {
            Utils.chatHelperWorker.removeEventListener('message', (event) => {
                if (event.data && event.data.type === type) {
                    callback(event.data.message);
                }
            });
        }
    }
}
