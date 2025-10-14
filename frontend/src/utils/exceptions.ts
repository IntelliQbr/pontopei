import { AxiosError } from "axios";

export function getMessageFromAxiosError(error: unknown | AxiosError) {
    if (error instanceof AxiosError) {
        return error.response?.data.message;
    }
    return String(error);
}
