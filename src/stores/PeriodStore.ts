import {api} from "../repositories/Api.ts";
import {action, computed, makeAutoObservable, makeObservable, override} from "mobx";
import Period from "../models/Period.ts";
import Place from "../models/Place.ts";
import {sessionStore} from "./SessionStore.ts";
import User from "../models/User.ts";
import {List} from "@mui/material";
import Periods from "../models/Periods.ts";
import {HasToasts} from "./Interface/HasToasts.ts";
import {CanCreatePeriods} from "./Interface/Periods/CanCreatePeriods.ts";
import {CanGetAllPeriods} from "./Interface/Periods/CanGetAllPeriods.ts";




class PeriodStore extends HasToasts implements CanCreatePeriods , CanDeletePeriods, CanInsertUserToPeriod , CanGetAllUserNotInPeriod , CanGetAllPeriods{


    constructor() {
        super();
        makeObservable(this , {
            handleNewPeriod : action,
            handleDeletePeriod : action,
            handleGetAllUser : action,
            handleNewUserToPeriod : action,
            handleGetAllPeriod : action,

        })
        }


      errorMsgToast(): string {
        return super.errorMsg;
    }


      openToast(): boolean {
        return super.open;
    }

      severityToast(): string {
        return super.severity;
    }

    handleNewPeriod = async (name:string , description:string , place:Place,startDate:Date,endDate:Date ): Promise<boolean>  => {
        if(name === '' || name.length <= 3){
            super.handleErrorMessage('Le champ "Nom" est obligatoire')
            return false;
        }
        if(description === '' || description.length <= 3){
            this.handleErrorMessage('Le champ "Description" est obligatoire')
            return false;
        }
        if(place === null ){
            super.handleErrorMessage('Veillez renseigner un lieux de vacances');

            return false;
        }
        if(startDate === undefined || startDate === new Date() ){
            super.handleErrorMessage('Le champ "Date de debut" est obligatoire');

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
        let resp = await api.deletePeriod(periodId);

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
}



const periodStore = new PeriodStore()
export const canCreatePeriods: CanCreatePeriods = periodStore;
export const canGetAllPeriods : CanGetAllPeriods = periodStore;
export const canDeletePeriods : CanDeletePeriods = periodStore;
export const canInsertUserToPeriod : CanInsertUserToPeriod = periodStore;
export const canGetAllUserNotInPeriod : CanGetAllUserNotInPeriod = periodStore;