import {AxiosError} from "axios";

export function parseError(e: any): string {
    if (e instanceof AxiosError) {
        if (e.response?.status !== 200 && e.response?.data && e.response?.data.errorKey) {
            return 'ERROR.' + e.response.data.errorKey.toUpperCase();
        }
    }
    return 'ERROR.UNKNOWN_ERROR';
}
