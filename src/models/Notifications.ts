import Notification from "./Notification.ts";

export class Notifications{

    private readonly _notifications : Array<Notification>;


    constructor(notifications: Array<Notification>) {
        this._notifications = notifications;
    }

    get notifications(): Array<Notification> {
        return this._notifications;
    }

    get notificationsCount(): number {
        return this._notifications.length;
    }
}