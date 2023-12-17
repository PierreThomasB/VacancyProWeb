import {makeAutoObservable} from "mobx";
import {api} from "../repositories/Api.ts";
import Message from "../models/Message.ts";
import {sessionStore} from "./SessionStore.ts";
import User from "../models/User.ts";

class ChatStore {
    private _mode = 'signin'
    private _errorMsg = undefined
    private _severity = 'error'
    private _open = false
    private _messages = new Map<number,Message>()

    constructor() {
        makeAutoObservable(this)
    }




    async handleGetAllMessage(channel : string ){
        let result =  await api.AllMessage(channel);
        let tempMessage = [];
        result.forEach(message => {
            let user = new User(message.user["id"],message.user["userName"] , null,null,false,null);
            let messageObj: Message = new Message(message.channel , message.message,message.date , user);
            tempMessage.push(messageObj);
            this._messages[message["id"]] = messageObj;
        });
        return tempMessage ;
    }



    async handleSendMessage(channel:string , message:string){
        const user = sessionStore.user;

        let messageObj = new Message(channel,message , new Date() , user);
        await api.newMessage(messageObj);
    }


}

export const chatStore = new ChatStore()
