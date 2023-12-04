

export default  class Notification {

    private readonly _id : number;
    private readonly _contenu : string ;
    private readonly _date : Date;


    constructor(id : number , contenu : string , date : Date ) {
        this._id = id;
        this._contenu = contenu;
        this._date = date;
    }


    get id(): number {
        return this._id;
    }

    get contenu(): string {
        return this._contenu;
    }

    get date(): Date {
        return this._date;
    }
}