import User from "./User";
import Activity from "./Activity";

export default class Place {
    Name: string
    ID : string
    UrlPhoto : string

    constructor(Name: string, PlaceId: string, PhotoUrl : string = "") {
        this.Name = Name;
        this.ID = PlaceId;
        this.UrlPhoto = PhotoUrl
    }

    get nomPrincipal(){

        return this.Name.split(',')[0];

    }




}