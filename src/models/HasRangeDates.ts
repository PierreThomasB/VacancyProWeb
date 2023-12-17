
 export default abstract class HasRangeDates {

    protected constructor(beginDate: Date, endDate: Date) {
        this._beginDate = beginDate;
        this._endDate = endDate;  }

    private readonly _beginDate : Date ;
    private readonly _endDate : Date ;

    getdateFormat() : String {
        return "Du "+this.showDateFormatBegin()+' au '+this.showDateFormatEnd();
    }


   private showDateFormatBegin(){
    let month : number = this._beginDate.getMonth()+1
    return this._beginDate.getDate()+"/"+month+"/"+this._beginDate.getFullYear();

}
    get beginDate(): Date {
        return this._beginDate;
    }
    get endDate(): Date {
        return this._endDate;
    }

private showDateFormatEnd(){
    let month : number = this._endDate.getMonth()+1
    return this._endDate.getDate()+"/"+month+"/"+this._endDate.getFullYear();
}

}