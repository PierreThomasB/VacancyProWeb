export interface CanDeleteActivity{
    handleDeleteActivity(id: number): Promise<boolean>;
}