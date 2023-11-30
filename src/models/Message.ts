import User from "./User.ts";

export default class Message {

    channel:string;
    message:string;
    date:Date;
    user:User


    constructor(channel: string, message: string , date:Date , user:User) {
        this.channel = channel;
        this.message = message;
        this.date = date;
        this.user = user;
    }


}