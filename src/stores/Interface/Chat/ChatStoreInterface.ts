import {Messages} from "../../../models/Messages.ts";

export default interface ChatStoreInterface {
    handleSendMessage(channel: string, message: string): void;
    handleGetAllMessage(channel: string): Promise<Messages>;
}