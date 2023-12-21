import Place from "./Place.ts";
import Period from "./Period.ts";
import {override} from "mobx";
import HasRangeDates from "./HasRangeDates.ts";
import * as dayjs from "dayjs";
import {Dayjs} from "dayjs";

export default class Activity extends HasRangeDates{

    private readonly _id:number
    private readonly _name: string
    private readonly _description: string
    private readonly _place: Place
    private readonly _period:Period


    constructor(id:number,name: string, desc:string, beginDate:Date,endDate:Date, place:Place , period:Period) {
        super(new Date(beginDate) , new Date(endDate));
        this._id = id;
        this._name = name
        this._description = desc
        this._place = place
        this._period = period;
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
        return super.beginDate;
    }

    get endDate(): Date {
        return super.endDate;
    }

    get place(): Place {
        return this._place;
    }

    get period(): Period {
        return this._period;
    }
    dateFromCalendar(begin:boolean ) : Dayjs {
        switch (begin) {
            case false:
                return this.dateBeginFormCalendar(this.beginDate);
            case true:
                return this.dateBeginFormCalendar(this.endDate)

        }

    }
    private dateBeginFormCalendar(date : Date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois commence à 0
        const day = date.getDate().toString().padStart(2, '0');
        return dayjs(year + '-' + month + '-' + day);
    }
   
}