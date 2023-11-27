import Period from "../models/Period.ts";
import Activity from "../models/Activity.ts";
import Message from "../models/Message.ts";
import {Dayjs} from "dayjs";

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

    async newMessage(message:Message) {
        let data = JSON.stringify(message);

        return fetch(`${this._base}`+"/NewMessage",{
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

    async AllMessage(channel:string ) {
        return fetch(`${this._base}`+"/AllMessage?channel="+channel,{
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re =>{
            console.log(re);
            return re.json();
        })
    }


    /** PERIODS **/

    async newPeriod(period: Period){
        let data = JSON.stringify(period);

        return fetch(`${this._base}`+"/api/Period/NewVacances",{
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


    async getPeriodByUser() {
        return fetch(`${this._base}`+"/api/Period/AllPeriods",{
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
            }).then((json) => {
                console.log(json);

            // @ts-ignore
            let result : [Period] = [];
            json.forEach(objJson => {
                let obj : Period = new Period(objJson.id,objJson.name , objJson.description , objJson.place , objJson.beginDate , objJson.endDate , objJson.endDate);
              result.push(obj)
            })
            return result;
            }
        )
    }


    async deletePeriod( id:number ){
        return fetch(`${this._base}`+"/api/Period/Delete?id="+id,{
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re => re.json())
    }




    /** ACTIVITY **/




    async newActivity(activity: Activity) {
        let data = JSON.stringify(activity);

        console.log(data);

        return fetch(`${this._base}`+"/api/Activity/NewActivity",{
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
         return fetch(`${this._base}`+"/api/Activity/ActivityByPeriod?id="+id,{
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re =>
             re.json()


    )
    }






    /** METEO **/


    async getMeteo(lieux : string ){

        return fetch(`${this._base}`+"/api/Meteo/GetMeteo?lieu="+lieux,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re =>
            re.json())

    }





    /** USER **/

    

    async signIn(email: string, password: string): Promise<any> {
        let data = JSON.stringify({
            email: email,
            password: password
        })
        return fetch(`${this._base}/api/User/SignIn`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`,
            }
        }).then(re => re.json())
    }

    async signUp(firstname:string, lastname:string, email: string, password:string) {
        let data = JSON.stringify({
            LastName: lastname,
            FirstName: firstname,
            Email: email,
            Password: password
        })
        const re = await fetch(`${this._base}/api/User/SignUp`, {
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
        const resp = await fetch(`${this._base}/api/User`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        return resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json()
    }

    async sendContactForm(lastname: string, firstname: string, email: string, subject: string, message: string): Promise<any> {
        let data = JSON.stringify({
            lastname: lastname,
            firstname: firstname,
            email: email,
            subject: subject,
            message: message
        })
        const re = await fetch(`${this._base}/api/Contact`, {
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
        let resp = await fetch(`${this.base}/api/User/Google`, {
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
        console.log(data)
        const re = await fetch(`${this.base}/api/User/SignUp`, {
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
        const re = await fetch(`${this.base}/api/User/SignIn`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`
            }
        })
        return await re.json()
    }


    async suggestUser(user: string) {
        const re = await fetch(`${this.base}/api/User/SuggestionUser?username=`+user, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${this.token}`
            }
        })
        return await re.json()
    }

    async fetchUsersCount() {
        const re = await fetch(`${this._base}/api/User/Count`);
        return await re.json();
    }

    async fetchUsersCountInVacation(date: string) {
        let data = JSON.stringify({
            date: date
        })
        const re = await fetch(`${this._base}/api/User/InVacation`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await re.json()
    }
}
export const api: Api = new Api()