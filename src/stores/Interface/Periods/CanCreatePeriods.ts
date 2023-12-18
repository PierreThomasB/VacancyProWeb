import Place from "../../../models/Place.ts";

export interface CanCreatePeriods  {


    get mode() : string;
    get severity() : string;
    get errorMsg() : string;
    get open() : boolean;
    handleNewPeriod(name: string, description: string, place : Place , startDate: Date, endDate: Date): Promise<boolean>;
}

