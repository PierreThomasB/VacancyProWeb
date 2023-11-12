import User from "./User";
import Activity from "./Activity";

export default class Place {
    Name: string
    PlaceId : string

    constructor(Name: string, PlaceId: string) {
        this.Name = Name;
        this.PlaceId = PlaceId;
    }
}