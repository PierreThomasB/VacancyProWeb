import {makeAutoObservable} from "mobx";
import {api} from "../repositories/Api.ts";
import Message from "../models/Message.ts";

class ChatStore {
    private _mode = 'signin'
    private _errorMsg = undefined
    private _severity = 'error'
    private _open = false

    constructor() {
        makeAutoObservable(this)
    }




    async handleGetAllMessage(channel : string ){
        let result =  await api.AllMessage(channel);
        let tempMessage = [];
        result.forEach(message => {
            let messageObj: Message = new Message(message.channel , message.message,message.date);
            tempMessage.push(messageObj);
        });
        return result ;

    }



    async handleSendMessage(channel:string , message:string){
        let messageObj = new Message(channel,message , new Date());
        await api.newMessage(messageObj);
    }


}

export const chatStore = new ChatStore()
