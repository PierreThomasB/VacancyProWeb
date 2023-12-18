import {makeAutoObservable} from "mobx";
import {api} from "../repositories/Api.ts";
import Message from "../models/Message.ts";
import {sessionStore} from "./SessionStore.ts";
import User from "../models/User.ts";
import ChatStoreInterface from "./Interface/Chat/ChatStoreInterface.ts";
import {Messages} from "../models/Messages.ts";

class ChatStore implements ChatStoreInterface {
    private _mode = 'signin'
    private _errorMsg = undefined
    private _severity = 'error'
    private _open = false

    constructor() {
        makeAutoObservable(this)
    }


    async handleGetAllMessage(channel: string): Promise<Messages> {
        let result = await api.AllMessage(channel);
        let tempMessage = new Array<Message>();
        result.forEach(message => {
            let messageObj: Message = new Message(message.channel, message.message, message.date, message.userName);
            tempMessage.push(messageObj);
        });
        return new Messages(tempMessage);
    }


    async handleSendMessage(channel: string, message: string) {
        const user = sessionStore.user;
        let messageObj = new Message(channel, message, new Date(), user);
         await api.newMessage(messageObj)

    }

}

export const chatStore : ChatStoreInterface = new ChatStore()
