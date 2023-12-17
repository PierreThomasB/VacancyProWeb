import {makeAutoObservable, makeObservable} from "mobx";
import {sessionStore} from "./SessionStore.ts";
import {api} from '../repositories/Api.ts'
import Period from "../models/Period.ts";
import Place from "../models/Place.ts";
import Activity from "../models/Activity.ts";
import Activities from "../models/Activities.ts";
import {CanLoadActivities} from "./Interface/Activities/CanLoadActivities.ts";
import {CanCreateActivity} from "./Interface/Activities/CanCreateActivity.ts";
import {HasToasts} from "./Interface/HasToasts.ts";

class ActivityStore extends HasToasts implements CanLoadActivities , CanCreateActivity {
    private _mode = 'signin'


    constructor() {
        super();
        makeObservable(this , {
            handleNewActivity : false
        })
    }

    async handleNewActivity(name: string, description: string, startDate: Date, endDate: Date, place: Place, period: Period)  {

        if (name === '' || name.length < 2) {
            super.handleErrorMessage('Le champ "nom" est obligatoire')
            return false;
        }

        if (description === '' || description.length < 2) {
            super.handleErrorMessage('Le champ description est obligatoire')
            return false;
        }
        if(startDate == null){
            super.handleErrorMessage('Le champ "Date de debut" est obligatoire');
            return false;
        }
        if(period.beginDate > startDate){
            super.handleErrorMessage('Le champ "Date de début" doit etre compris dans la période');
            return false;
        }

        if(period.endDate < endDate){
            super.handleErrorMessage('Le champ "Date de Fin" doit etre compris dans la période ');
            return false;
        }
        if(endDate == null  ){
            super.handleErrorMessage('Le champ "Date de Fin" est obligatoire');
            return false;
        }
        if(startDate > endDate){
            super.handleErrorMessage('La date de debut doit etre plus récente que la date de fin');
            return false;
        }
        if(place == null){
            super.handleErrorMessage('Le champ "Lieu" est obligatoire');
            return false;
        }

        let activity: Activity = new Activity(-1, name, description, startDate, endDate, place, period as Period);


        try{
            await api.newActivity(activity)
            super.handleGoodMessage("Activitée crée avec succès");
            return true;
        }catch (error){
            super.handleErrorMessage(error.message);
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
}

const activityStore = new ActivityStore()
export const canLoadActivities : CanLoadActivities = activityStore
export const canCreateActivity : CanCreateActivity = activityStore