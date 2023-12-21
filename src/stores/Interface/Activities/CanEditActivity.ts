import Activity from "../../../models/Activity.ts";
import Place from "../../../models/Place.ts";
import Period from "../../../models/Period.ts";

export interface CanEditActivity{
    handleEditActivity(id:number , name:string , description:string , startDate:Date , endDate:Date ): Promise<boolean>;
    get open(): boolean
    get errorMsg(): string
    get severity(): string
}