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

        if(startDate == endDate){
            this.handleErrorMessage('La date de début et de fin doivent être différentes')
            return false;
        }

        if (startDate.getDate()) {
            this.handleErrorMessage('Veuillez encoder une Date de début valide')
            return false;
        }
        if (endDate.getDate()) {
            this.handleErrorMessage('Veuillez encoder une Date de début valide')
            return false;
        }
        if (place === undefined) {
            this.handleErrorMessage('Veuillez encoder un lieu valide')
            return false;
        }
        if (period === undefined) {
            this.handleErrorMessage('Veuillez encoder une période valide')
            return false;
        }

        let activity: Activity = new Activity(-1, name, description, startDate, endDate, place, period);


        api.newActivity(activity)
            .then(data => {
                if (data.error) {this.handleErrorMessage(data.message)
                return false;
                }
            })
        return true;
    }

    handleErrorMessage(message: string) {
        this.open = true
        this.errorMsg = message

        setTimeout(() => {
            this.open = false
        }, 2500)

    }

}

export const activityStore = new ActivityStore()