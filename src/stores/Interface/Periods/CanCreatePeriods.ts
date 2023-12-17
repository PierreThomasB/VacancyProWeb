import Place from "../../../models/Place.ts";

export interface CanCreatePeriods  {

    errorMsgToast(): string;
    openToast(): boolean;
    severityToast():string;
    handleNewPeriod(name: string, description: string, place : Place , startDate: Date, endDate: Date): Promise<boolean>;
}

