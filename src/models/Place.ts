import User from "./User";
import Activity from "./Activity";

export default class Place {
    name: string
    id : string
    urlPhoto : string

    constructor(Name: string, PlaceId: string, PhotoUrl : string = "") {
        this.name = Name;
        this.id = PlaceId;
        this.urlPhoto = PhotoUrl
    }

    get nomPrincipal(){

        return this.name.split(',')[0];

    }




}