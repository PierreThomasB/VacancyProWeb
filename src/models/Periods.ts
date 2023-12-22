import Period from "./Period.ts";

export default class Periods{
    private readonly _periods: Array<Period>;

    constructor(periods : Array<Period>){
        this._periods = periods;
    }

    get periods(): Array<Period> {
        return this._periods;
    }

    get showOnlyPastedPeriods() : Period[]{
        return this._periods.filter(period => period.endDate.getTime() < new Date().getTime());
    }
    get showOnlyFuturePeriods(){
        return this._periods.filter(period => period.beginDate.getTime() > new Date().getTime() );
    }

    get defaultSort(){
        return this.sortByPeriodsDateDesc(this._periods);
    }
    sortByPeriodsDateAsc(periods : Period[]){
      let res = periods.sort((a,b) => a.beginDate.getTime() - b.beginDate.getTime());

      return res ;
    }
    sortByPeriodsDateDesc(periods : Period[]){
           let res =  periods.sort((a,b) => b.beginDate.getTime() - a.beginDate.getTime());


    return res; }

}