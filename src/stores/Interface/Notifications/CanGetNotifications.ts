import {Notifications} from "../../../models/Notifications.ts";

export interface CanGetNotifications {
    handleGetNotifications(): Promise<Notifications>;
}