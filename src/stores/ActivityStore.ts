import {makeAutoObservable} from "mobx";
import {sessionStore} from "./SessionStore.ts";
import {api} from '../repositories/Api.ts'
import Period from "../models/Period.ts";
import Place from "../models/Place.ts";
import Activity from "../models/Activity.ts";

class ActivityStore {
    private _mode = 'signin'
    private _errorMsg = undefined
    private _severity = 'error'
    private _open = false

    constructor() {
        makeAutoObservable(this)
    }


    get mode(): string {
        return this._mode;
    }

    set mode(value: string) {
        this._mode = value;
    }


    get errorMsg(): any {
        return this._errorMsg;
    }

    set errorMsg(value: any) {
        this._errorMsg = value;
    }

    get severity(): string {
        return this._severity;
    }

    set severity(value: string) {
        this._severity = value;
    }

    get open(): boolean {
        return this._open;
    }

    set open(value: boolean) {
        this._open = value;
    }

    onModeChange(mode: string) {
        this.mode = mode
    }


    async handleNewActivity(name: string, description: string, startDate: Date, endDate: Date, place: Place, period: Period)  {

        if (name === '' || name.length < 2) {
            this.handleErrorMessage('Le champ "nom" est obligatoire')
            return false;
        }

        if (description === '' || description.length < 2) {
            this.handleErrorMessage('Le champ description est obligatoire')
            return false;
        }
        if(startDate == null){
            this.handleErrorMessage('Le champ "Date de debut" est obligatoire');
            return false;
        }
        if(period.beginDate > startDate){
            this.handleErrorMessage('Le champ "Date de début" doit etre compris dans la période');
            return false;
        }

        if(period.endDate < endDate){
            this.handleErrorMessage('Le champ "Date de Fin" doit etre compris dans la période ');
            return false;
        }
        if(endDate == null  ){
            this.handleErrorMessage('Le champ "Date de Fin" est obligatoire');
            return false;
        }
        if(startDate > endDate){
            this.handleErrorMessage('La date de debut doit etre plus récente que la date de fin');
            return false;
        }
        if(place == null){
            this.handleErrorMessage('Le champ "Lieu" est obligatoire');
            return false;
        }

        let activity: Activity = new Activity(-1, name, description, startDate, endDate, place, period as Period);


        try{
            await api.newActivity(activity)
            this.handleGoodMessage("Activitée crée avec succès");
            return true;
        }catch (error){
            this.handleErrorMessage(error.message);
            return false;
        }
    }




    handleGetActivite =  async (periodId:number) => {

         try {
             let tempObj =  await api.getActivityByPeriod(periodId);

             let activities = tempObj.map((obj) => {
                 console.log(obj)
                 let place = new Place(obj.place["name"] , obj.place["id"],obj.place["urlPhoto"]);
                 return new Activity(obj["id"] , obj["name"] , obj["description"] , obj["beginDate"] , obj["endDate"],place , null);
             });



             return activities;

         }catch (error){
             this.handleErrorMessage(error.message);
         }
    }



    handleErrorMessage(message: string) {
        this.open = true
        this.errorMsg = message

        setTimeout(() => {
            this.open = false
        }, 2500)

    }


    private handleGoodMessage(message: string){
        this.open = true
        this.errorMsg = message
        this.severity = "info";

        setTimeout(() => {
            this.open = false
            this.severity = "error";
        }, 3000)
    }

}

export const activityStore = new ActivityStore()