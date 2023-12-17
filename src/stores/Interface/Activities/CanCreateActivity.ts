import Period from "../../../models/Period.ts";
import Place from "../../../models/Place.ts";
import {HasToasts} from "../HasToasts.ts";

export interface CanCreateActivity {
    handleNewActivity(name: string, description: string, startDate: Date, endDate: Date, place: Place, period: Period): Promise<boolean>;
}