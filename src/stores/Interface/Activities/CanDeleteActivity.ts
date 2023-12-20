export interface CanDeleteActivity{
    handleDeleteActivity(id: number): Promise<boolean>;
    errorMsg: any;
    severity: string;
    open: boolean;


}