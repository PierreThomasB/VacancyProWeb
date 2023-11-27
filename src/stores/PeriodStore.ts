import {api} from "../repositories/Api.ts";
import {makeAutoObservable} from "mobx";
import Period from "../models/Period.ts";
import Place from "../models/Place.ts";
import {sessionStore} from "./SessionStore.ts";


class PeriodStore{
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





    handleNewPeriod = (name:string , description:string , place:Place,startDate:Date,endDate:Date ) : boolean => {


        if(name === '' || name.length <= 3){
            this.handleErrorMessage('Le champ "Nom" est obligatoire')
            return false;
        }
        if(description === '' || description.length <= 3){
            this.handleErrorMessage('Le champ "Description" est obligatoire')
            return false;
        }
        if(place === null ){
            this.handleErrorMessage('Veillez renseigner un lieux de vacances');
            return false;
        }
        if(startDate === null || startDate === new Date() ){
            this.handleErrorMessage('Le champ "Date de debut" est obligatoire');
            return false;
        }
        if(endDate === null || endDate === new Date() ){
            this.handleErrorMessage('Le champ "Date de Fin" est obligatoire');
            return false;

        }
        if(startDate >= endDate){
            this.handleErrorMessage('La date de debut doit etre plus récente que la date de fin');
            return false;

        }

        let user = sessionStore.user;
        console.log(user);
        let period:Period = new Period(-1,name,description,place,startDate,endDate,user);



        api.newPeriod(period);

        this.handleGoodMessage("Vacances crée avec succès");

        return true;




    }



     handleGetSuggestionUser = ( user : string = '') => {
        let result =api.suggestUser(user);



}


    handleGetAllPeriod = async () => {

        try {
            let res = await api.getPeriodByUser();
            return res;

        }catch (error){
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

export const periodStore = new PeriodStore()