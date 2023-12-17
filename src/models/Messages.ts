import Message from "./Message.ts";

export class Messages {

    private readonly _messages = new Array<Message>()

    constructor(messages: Array<Message>) {
        this._messages = messages
    }


    get messages(): Message[] {
        return this._messages;
    }

    addMessage(message: Message) : Messages {
        this._messages.push(message)
        return this;
    }



}