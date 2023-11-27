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


    handleNewActivity(name: string, description: string, startDate: Date, endDate: Date, place: Place, period: Period) : boolean {

        if (name === '') {
            this.handleErrorMessage('Le champ "nom" est obligatoire')
            return false;
        }

        if (description === '') {
            this.handleErrorMessage('Le champ description est obligatoire')
            return false;
        }
        if(startDate == null || startDate == new Date()){
            this.handleErrorMessage('Le champ "Date de debut" est obligatoire');
            return false;
        }
        if(endDate == null || endDate == new Date() ){
            this.handleErrorMessage('Le champ "Date de Fin" est obligatoire');
            return false;
        }
        if(startDate > endDate){
            this.handleErrorMessage('La date de debut doit etre plus récente que la date de fin');
            return false;
        }
        if (place === null) {
            this.handleErrorMessage('Veuillez encoder un lieu valide')
            return false;
        }
        if (period === null) {
            this.handleErrorMessage('Veuillez encoder une période valide')
            return false;
        }

        let activity: Activity = new Activity(-1, name, description, startDate, endDate, place, period);


        api.newActivity(activity);
        this.handleGoodMessage("Activitée crée avec succès");

        return true;
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