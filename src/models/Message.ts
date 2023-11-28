import User from "./User.ts";

export default class Message {

    channel:string;
    message:string;
    date:Date;


    constructor(channel: string, message: string) {
        this.channel = channel;
        this.message = message;
        this.date = new Date();
    }
}