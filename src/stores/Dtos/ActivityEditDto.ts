export class ActivityEditDto {
    name : string ;
     description : string;
     startDate : Date;
     endDate : Date;


    constructor(name: string, description: string, startDate: Date, endDate: Date) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}