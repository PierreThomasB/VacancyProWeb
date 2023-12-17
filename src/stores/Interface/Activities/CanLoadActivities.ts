import Activities from "../../../models/Activities.ts";

export interface CanLoadActivities {

    handleGetAllActivities(periodId:number): Promise<Activities>;
}