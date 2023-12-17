import Periods from "../../../models/Periods.ts";

export interface CanGetAllPeriods {
    handleGetAllPeriod(): Promise<Periods>;

}