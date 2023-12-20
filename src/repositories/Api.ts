import Period from "../models/Period.ts";
import Activity from "../models/Activity.ts";
import Message from "../models/Message.ts";
import {Dayjs} from "dayjs";
import Notification from "../models/Notification.ts";

const config = require(`../config.json`)

class Api {
    _base: string

    constructor() {
        this._base = config.ApiUrl
    }

    get base() {
        return this._base
    }

    set base(base) {
        this._base = base
    }


    get token(){
        return JSON.parse(localStorage.getItem('VacancyProUser'));
    }


    /** CHATS **/

    async newMessage(message:Message) : Promise<any> {
        let data = JSON.stringify({
            Message:message.message,
            Channel:message.channel,
            Date:message.date,
            UserName:message.userName,

        });


        return fetch(`${this._base}`+"/Chat/NewMessage",{
            method: 'POST',
            body: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re => {
            if (re.ok) {
                return re.json();
            }
            throw new Error("Erreur dans la requète api " + re.statusText);
        })
    }

    async AllMessage(channel:string ) {
        return fetch(`${this._base}`+"/Chat/AllMessage?channel="+channel,{
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re =>{
            if(re.ok){
            return re.json();
            }
            throw new Error("Erreur dans la requète api pour les messages  "+re.statusText);
        })
    }


    /** PERIODS **/

    async newPeriod(period: Period){
        let data = JSON.stringify({
            Id:period.id,
            Name:period.name,
            Description: period.description,
            BeginDate: period.beginDate,
            EndDate: period.endDate,
            Place : {
                Id:period.place.id,
                Name:period.place.name,
                UrlPhoto: period.place.urlPhoto
            },
            ListUser : period.listUser
        });

        return fetch(`${this._base}`+"/Period/NewVacances",{
            method: 'POST',
            body: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then((re) => {
            if(re.ok){
                return re.json();
            }
            throw new Error("Erreur dans la requète api "+re.statusText);
        }


        )
    }


    async getPeriodByUser() {
        return fetch(`${this._base}`+"/Period/PeriodbyUser",{
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re => {
                if (!re.ok) {
                    throw Error("Erreur dans la requetes ");
                }
                return re.json();
            })
            }


    async deletePeriod( id:number ){
        return fetch(`${this._base}`+"/Period/Delete?id="+id,{
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re => {
                if (re.ok) {
                    return re.json()
                }
                throw new Error("Erreur dans la requetes ");
            }
            )
    }




    /** ACTIVITY **/

    async newActivity(activity: Activity) {
        let data = JSON.stringify({
            Id:activity.id,
            Name:activity.name,
            Description:activity.description,
            BeginDate : activity.beginDate,
            EndDate : activity.endDate,
            Place : {
                Id:activity.place.id,
                Name:activity.place.name,
                UrlPhoto: activity.place.urlPhoto
            },
            Period : {
                Id:activity.period.id,
                Description : activity.period.description,
                Name: activity.period.name,
                Place : {
                    Id:activity.period.place.id,
                    Name:activity.period.place.name,
                    UrlPhoto: activity.period.place.urlPhoto
                }}
        });

        return fetch(`${this._base}`+"/Activity/NewActivity",{
            method: 'POST',
            body: data,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re =>
            re.json())
    }



    async getActivityByPeriod(id:number)  {
         return fetch(`${this._base}`+"/Activity/ActivityByPeriod?id="+id,{
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re => {
            if(re.ok) {
                return re.json();
            }
            throw new Error("Erreur dans la requète");

         }
    )
    }

    async deleteActivity(id: number) {
        return fetch(`${this._base}`+"/Activity/"+id,{
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re => {
            if(re.ok) {
                return re.json();
            }
            throw new Error("Erreur dans la requète");
        })
    }






    /** METEO **/


    async getMeteo(lieux : string ){
        return fetch(`${this._base}`+"/Meteo/Meteo/?lieu="+lieux,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re =>{
            if(re.ok){
                return re.json();
            }
            throw new Error("Erreur dans la requète api pour les messages  "+re.statusText);
        })
    }





    /** USER **/

    

    async signIn(email: string, password: string): Promise<any> {
        let data = JSON.stringify({
            email: email,
            password: password
        })
        return fetch(`${this._base}/User/SignIn`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re => {
                if (re.ok) {
                   return re.json()
                }
                throw new Error("Erreur dans la requête sing in ");
            }
            )
    }

    async signUp(firstname:string, lastname:string, email: string, password:string) {
        let data = JSON.stringify({
            LastName: lastname,
            FirstName: firstname,
            Email: email,
            Password: password
        })
        const re = await fetch(`${this._base}/User/SignUp`, {
            method: 'POST',
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            },
            body: data
        })
        return await re.json();
    }

    async fetchUser(token: string): Promise<any> {
        return fetch(`${this._base}/User`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        }).then(re => {
            if (re.ok) {
                return re.json()
            }
            throw new Error("Erreur dans la requète vers l'api");

        })
    }

    async sendContactForm(lastname: string, firstname: string, email: string, subject: string, message: string): Promise<any> {
        let data = JSON.stringify({
            lastname: lastname,
            firstname: firstname,
            email: email,
            subject: subject,
            message: message
        })
        const re = await fetch(`${this._base}/Contact`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`
            }
        })
        return await re.json()
    }

    async handleProvider(credentials: any) {
        let data = JSON.stringify({
            credentials: credentials
        })
        let resp = await fetch(`${this.base}/User/Google`, {
            method: 'POST',
            body: data,
            headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${this.token}`
            }
        });
        return await resp.json();
    }

    async signUpProvider(firstname: string, lastname: string, email: string) {
        let data = JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email
        })
        const re = await fetch(`${this.base}/User/SignUp`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`
            }
        });
        return await re.json();
    }

    async signInProvider(email: string) {
        let data = JSON.stringify({
            email: email
        })
        const re = await fetch(`${this.base}/User/SignIn`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`
            }
        })
        return await re.json()
    }


    async addUserToPeriod(userId:string , periodId:number){
        return fetch(`${this.base}/Period/AddUser?userId=`+userId+"&period="+periodId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`
            }
        }).then((re) => {
            if(re.ok){
                return re.json();
            }
            throw new Error("Erreur dans la requète api "+re.statusText);
            }

        )


    }


    async getUserNotInPeriod(perioId:number) {
        const re = await fetch(`${this.base}/User/ListUser?periodId=`+perioId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`
            }
        })
        return await re.json()
    }

    async fetchUsersCount() {
        return  fetch(`${this._base}/User/Count`).then((re ) => {
            if(re.ok){
                    return re.json();
                }
                throw new Error("Erreur dans la requète api "+re.statusText);
            }

        );

    }

    async fetchUsersCountInVacation(date: string) {
        let data = JSON.stringify({
            date: date
        })
        return fetch(`${this._base}/User/InVacation`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(re => {
            if(re.ok){
                return re.json();
            }
            throw new Error("Erreur dans la requète api "+re.statusText);

        })
    }



    /** NOTIFICATION **/

    async getNotificationFromUser() {

        return await fetch(`${this._base}/Notification/NotificationFromUser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`
            }
        }).then((re) => {
            if(re.ok){
                return re.json();
            }
            throw new Error("Erreur dans la requête "+re.statusText);
            }

        )


    }
    async deleteNotification(notificationId: number) {
        return await fetch(`${this._base}/Notification/Notification/?id=`+notificationId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`
            }
        }).then((re) => {
            if(re.ok){
                return re.json();
            }
            throw new Error("Erreur dans la requête "+re.statusText);
            }

        )
    }




}
export const api: Api = new Api()