import {makeAutoObservable} from "mobx";
import {api} from "../repositories/Api.ts";
import Notification from "../models/Notification.ts";
import {sessionStore} from "./SessionStore.ts";

class NotificationStore {

    private _mode = 'signin'
    private _errorMsg = undefined
    private _severity = 'error'
    private _open = false


    constructor() {

        makeAutoObservable(this)
    }


    get mode(): string {
        return this._mode;
    }

    set mode(value: string) {
        this._mode = value;
    }


    get errorMsg(): any {
        return this._errorMsg;
    }

    set errorMsg(value: any) {
        this._errorMsg = value;
    }

    get severity(): string {
        return this._severity;
    }

    set severity(value: string) {
        this._severity = value;
    }

    get open(): boolean {
        return this._open;
    }

    set open(value: boolean) {
        this._open = value;
    }

    onModeChange(mode: string) {
        this.mode = mode
    }



    async handleGetNotifications(){

        let result = [Notification];
        try {

            let res = await api.getNotificationFromUser();
            result = res.map( notif => {
                return new Notification(notif["id"],notif["contenu"] , notif["date"]);
            })
            return result;
        }catch (error){
            this.handleErrorMessage(error.message);
        }

    }




    private handleErrorMessage(message: string) {
        this.open = true
        this.errorMsg = message

        setTimeout(() => {
            this.open = false
        }, 2500)

    }


    private handleGoodMessage(message: string){
        this.open = true
        this.errorMsg = message
        this.severity = "info";

        setTimeout(() => {
            this.open = false
            this.severity = "error";
        }, 3000)
    }

}

export  const notificationStore = new NotificationStore();