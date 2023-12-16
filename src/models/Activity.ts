import Place from "./Place.ts";
import Period from "./Period.ts";
import {override} from "mobx";

export default class Activity implements HasPeriods{

    private readonly _id:number
    private readonly _name: string
    private readonly _description: string
    private readonly _beginDate: Date
    private readonly _endDate: Date
    private readonly _place: Place
    private readonly _period:Period


    constructor(id:number,name: string, desc:string, beginDate:Date,endDate:Date, place:Place , period:Period) {
        this._id = id;
        this._name = name
        this._description = desc
        this._beginDate = new Date(beginDate);
        this._endDate = new Date(endDate);
        this._place = place
        this._period = period;
    }

    getBeginDate(): String {
        return this.showDateFormatBegin()+'->'+this.showDateFormatEnd()
    }

    showDateFormatBegin(){
        let month : number = this._beginDate.getMonth()+1
        return this._beginDate.getDate()+"/"+month+"/"+this._beginDate.getFullYear();

    }

    showDateFormatEnd(){
        let month : number = this._endDate.getMonth()+1
        return this._endDate.getDate()+"/"+month+"/"+this._endDate.getFullYear();

    }



    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get beginDate(): Date {
        return this._beginDate;
    }

    get endDate(): Date {
        return this._endDate;
    }

    get place(): Place {
        return this._place;
    }

    get period(): Period {
        return this._period;
    }
}