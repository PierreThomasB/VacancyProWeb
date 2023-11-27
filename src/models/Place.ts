import User from "./User";
import Activity from "./Activity";

export default class Place {
    _name: string
    _id : string
    _urlPhoto : string

    constructor(Name: string, PlaceId: string, PhotoUrl : string = "") {
        this._name = Name;
        this._id = PlaceId;
        this._urlPhoto = PhotoUrl
    }

    get nomPrincipal(){

        return this._name.split(',')[0];

    }




}