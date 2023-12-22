import {makeAutoObservable} from "mobx";
import {api} from "../repositories/Api.ts";
import Notification from "../models/Notification.ts";
import {sessionStore} from "./SessionStore.ts";
import {CanDeleteNotifications} from "./Interface/Notifications/CanDeleteNotifications.ts";
import {Notifications} from "../models/Notifications.ts";
import {CanGetNotifications} from "./Interface/Notifications/CanGetNotifications.ts";

class NotificationStore implements CanDeleteNotifications , CanGetNotifications{

    private _mode = 'signin'
    private _errorMsg = undefined
    private _severity = 'error'
    private _open = false

    private _notifications = new Notifications(new Array<Notification>());


    constructor() {

        makeAutoObservable(this)
    }


    get notifications(): Notifications {
        return this._notifications;
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
        let result = new Array<Notification>();
        try {
            let res = await api.getNotificationFromUser();
            result = res.map( notif => {
                return new Notification(notif["id"],notif["contenu"] , notif["date"]);
            })
            this._notifications = new Notifications(result);
            return this._notifications;
        }catch (error){
            this.handleErrorMessage(error.message);
        }

    }

    async handleDeleteNotification(notificationId: number) {
        try {
            let res = await api.deleteNotification(notificationId);
            this._notifications.deleteNotification(notificationId);
            return true;
        } catch (error) {
            this.handleErrorMessage(error.message);
            return false;
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

const notificationStore = new NotificationStore();
export const canGetNotifications: CanGetNotifications = notificationStore;
export const canDeleteNotifications: CanDeleteNotifications = notificationStore;