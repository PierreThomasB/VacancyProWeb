import User from "./User.ts";

export default class Message {

    private readonly _channel:string;
    private readonly _message:string;
    private readonly _date:Date;
    private readonly _userName:string


    constructor(channel: string, message: string , date:Date , userName:string) {
        this._channel = channel;
        this._message = message;
        this._date = date;
        this._userName = userName;
    }


    get userName(): string {
        return this._userName;
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


     stringToColor() {
        let hash = 0;
        let i;
        let userName = this.userName
        for (i = 0; i < userName; i += 1) {
            hash = userName.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }
}