import User from "./User";
import Activity from "./Activity";

export default class Place {
    private readonly _name: string
    private readonly _id : string
    private readonly _urlPhoto : string

    constructor(Name: string, PlaceId: string, PhotoUrl : string = "") {
        this._name = Name;
        this._id = PlaceId;
        this._urlPhoto = PhotoUrl
    }


    get name(): string {
        return this._name;
    }

    get id(): string {
        return this._id;
    }

    get urlPhoto(): string {
        return this._urlPhoto;
    }

    get nomPrincipal(){

        return this._name.split(' , ')[0];
    }






}