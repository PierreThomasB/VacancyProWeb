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

    deleteNotification(notificationId: number): boolean {
        const index = this._notifications.findIndex((notification) => notification.id === notificationId);
        if (index !== -1) {
            this._notifications.splice(index, 1);
            return true;
        }
        return false;
    }
}