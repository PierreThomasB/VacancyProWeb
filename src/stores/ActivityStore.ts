import {makeAutoObservable, makeObservable} from "mobx";
import {api} from '../repositories/Api.ts'
import Period from "../models/Period.ts";
import Place from "../models/Place.ts";
import Activity from "../models/Activity.ts";
import Activities from "../models/Activities.ts";
import {CanLoadActivities} from "./Interface/Activities/CanLoadActivities.ts";
import {CanCreateActivity} from "./Interface/Activities/CanCreateActivity.ts";
import {CanDeleteActivity} from "./Interface/Activities/CanDeleteActivity.ts";
import {CanEditActivity} from "./Interface/Activities/CanEditActivity.ts";
import {ActivityEditDto} from "./Dtos/ActivityEditDto.ts";

class ActivityStore  implements CanLoadActivities , CanCreateActivity , CanDeleteActivity , CanEditActivity {
    private _mode = 'signin'
    private _errorMsg = undefined
    private _severity = 'error'
    private _open = false
    private _period: Period = null;

    constructor() {
        makeAutoObservable(this)
    }


    get period(): Period {
        return this._period;
    }

    set period(value: Period) {
        this._period = value;
    }

    get mode(): string {
        return this._mode;
    }

   private set mode(value: string) {
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

    async handleDeleteActivity(id: number): Promise<boolean> {

        try{
            await api.deleteActivity(id)
            this.handleGoodMessage("Activitée supprimée avec succès");
            return true;
        }catch (error){
            this.handleErrorMessage(error.message);
            return false;
        }
    }


    async handleEditActivity(id:number , name:string , description:string , startDate:Date , endDate:Date ): Promise<boolean> {
        if (name === '' || name.length < 2) {
            this.handleErrorMessage('Le champ "nom" est obligatoire')
            return false;
        }

        if (description === '' || description.length < 2) {
            this.handleErrorMessage('Le champ description est obligatoire')
            return false;
        }
        if(endDate == null){
            this.handleErrorMessage('Le champ "Date de debut" est obligatoire');
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
        try{
            console.log(new ActivityEditDto(name,description,startDate,endDate));
            await api.editActivity(id , new ActivityEditDto(name,description,startDate,endDate)  );
            this.handleGoodMessage("Activitée modifiée avec succès");
            return true;
        }catch (error){
            this.handleErrorMessage(error.message);
            return false;
        }
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
        if(place.name === ''){
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

    async handleGetAllActivities (periodId:number): Promise<Activities>  {
         try {
             let tempObj =  await api.getActivityByPeriod(periodId);
             let activities = Array<Activity>();

             tempObj.forEach((obj) => {
                 let place = new Place(obj.place["name"] , obj.place["id"],obj.place["urlPhoto"]);
                 activities.push( new Activity(obj["id"] , obj["name"] , obj["description"] , obj["beginDate"] , obj["endDate"],place , null));
             });
             return new Activities(activities);
         }catch (error){
             this.handleErrorMessage(error.message);
         }
    }


    private handleErrorMessage(error: string){
        this.open = true
        this.errorMsg = error

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

const activityStore = new ActivityStore()
export const canLoadActivities : CanLoadActivities = activityStore
export const canCreateActivity : CanCreateActivity = activityStore
export const canDeleteActivity : CanDeleteActivity = activityStore
export const canEditActivity : CanEditActivity = activityStore