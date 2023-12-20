interface CanDeletePeriods {
    severity: string;
    errorMsg: string;
    open: boolean;
    handleDeletePeriod(periodId: number): Promise<boolean>;
}