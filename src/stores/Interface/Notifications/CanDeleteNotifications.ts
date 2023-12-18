export interface CanDeleteNotifications {
    handleDeleteNotification(notificationId: number): Promise<boolean>;

}