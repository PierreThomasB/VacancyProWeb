import User from "./User.ts";

export default class Message {

    private readonly _channel:string;
    private readonly _message:string;
    private readonly _date:Date;
    private readonly _userName:string


    constructor(channel: string, message: string , date:Date , username:string) {
        this._channel = channel;
        this._message = message;
        this._date = date;
        this._userName = username;
    }


    get channel(): string {
        return this._channel;
    }

    get message(): string {
        return this._message;
    }

    get date(): Date {
        return this._date;
    }

    get userName(): string {
        return this._userName;
    }
}