import {api} from "../repositories/Api.ts";
import {makeAutoObservable} from "mobx";
import Period from "../models/Period.ts";
import Place from "../models/Place.ts";
import {sessionStore} from "./SessionStore.ts";
import User from "../models/User.ts";
import {List} from "@mui/material";
import Periods from "../models/Periods.ts";


class PeriodStore{
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





    handleNewPeriod = async (name:string , description:string , place:Place,startDate:Date,endDate:Date )  => {


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
        if(startDate === undefined || startDate === new Date() ){
            this.handleErrorMessage('Le champ "Date de debut" est obligatoire');
            return false ;
        }
        if(endDate === undefined || endDate === new Date() ){
            this.handleErrorMessage('Le champ "Date de Fin" est obligatoire');
            return false ;

        }
        if(startDate >= endDate){
            this.handleErrorMessage('La date de debut doit etre plus récente que la date de fin');
            return false ;

        }

        let user = sessionStore.user;
        let period:Period = new Period(-1,name,description,place,startDate,endDate,null , new Array<User>(user));



        try {
            await api.newPeriod(period);
        } catch (error ){
            this.handleErrorMessage(error.message);
            return ;
        }
        this.handleGoodMessage("Vacances crée avec succès");
        return true;
    }


    handleDeletePeriod = async  (periodId:number) => {
        await api.deletePeriod(periodId);
        this.handleGoodMessage("Voyage supprimé avec succès")
    }



     handleGetAllUser = async (periodId:number) => {
        let data =  await api.getUserNotInPeriod(periodId);
        let result = [];
        data.forEach(res => {
            result.push({ label: res.username ,id : res.id});
        })
         return result;
}

    handleNewUserToPeriod = async (userId:string , periodId:number )=>{
        try {
            await api.addUserToPeriod(userId, periodId);
        }catch (error){
            this.handleErrorMessage(error.message);
            return false;
        }
        this.handleGoodMessage("Utilisateurs ajouté avec succès");
        return true;
    }


    handleGetAllPeriod = async () => {
        if(sessionStore.user != undefined) {
            let result = new Array<Period>();
            try {
                let tabResult = await api.getPeriodByUser();
                tabResult.forEach(period => {
                    let place:Place = new Place(period.place.name,period.place.id,period.place.urlPhoto);
                    let peoples: [User] = period.listUser.map((user) => new User(user["id"],user["userName"],user["email"],null,false,null))
                    result.push(new Period(period.id,period.name , period.description , place,period.beginDate,period.endDate , null , peoples))
                })
                return new Periods(result)
            }catch (error){
                this.handleErrorMessage(error.message);
                return;
            }
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