import User from "./User.ts";

export default class Message {

    private readonly _channel:string;
    private readonly _message:string;
    private readonly _date:Date;
    private readonly _user:User


    constructor(channel: string, message: string , date:Date , user:User) {
        this._channel = channel;
        this._message = message;
        this._date = date;
        this._user = user;
    }


    get user(): User {
        return this._user;
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
        console.log(this._user._username);
        return this._user._username;
    }

     stringToColor() {
        let hash = 0;
        let i;
        let userName = this.user.username
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