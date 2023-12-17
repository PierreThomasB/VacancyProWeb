interface CanInsertUserToPeriod {
    handleNewUserToPeriod(userId:string , periodId:number ):Promise<boolean>;
}