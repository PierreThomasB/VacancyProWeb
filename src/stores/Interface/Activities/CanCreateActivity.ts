import Period from "../../../models/Period.ts";
import Place from "../../../models/Place.ts";

export interface CanCreateActivity {
    handleNewActivity(name: string, description: string, startDate: Date, endDate: Date, place: Place, period: Period): Promise<boolean>;
    get open(): boolean
    get errorMsg(): string
    get severity(): string

}