import Period from "./Period.ts";

export default class Periods{

    private readonly _periods: Array<Period>;

    constructor(periods : Array<Period>){
        this._periods = periods;
    }

    get periods(): Array<Period> {
        return this._periods;
    }

    get showOnlyPastedPeriods(){
        return this._periods.filter(period => period.endDate.getTime() < new Date().getTime());
    }
    get showOnlyFuturePeriods(){
        return this._periods.filter(period => period.endDate.getTime() > new Date().getTime());
    }
    get sortByPeriodsName(){
        return this._periods.sort((a,b) => a.name.localeCompare(b.name));
    }
    get sortByPeriodsDate(){
        let res =  this._periods.sort((a,b) => a.beginDate.getTime() - b.beginDate.getTime());
        console.log(res)
        return res;
    }
}