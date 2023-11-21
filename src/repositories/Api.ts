import Period from "../models/Period.ts";
import Activity from "../models/Activity.ts";

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






    /** PERIODS **/

    async newPeriod(period: Period){
        let data = JSON.stringify(period);

        return fetch(`${this._base}`+"/api/Period/NewVacances",{
            method: 'POST',
            body: data,
            headers: {
                'Content-Type':'application/json'
            }
        }).then(re =>
            re.json())
    }


    async getPeriodByUser() {
        return fetch(`${this._base}`+"/api/Period/AllPeriods",{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }).then(re => {
                if (!re.ok) {
                    throw Error("Erreur dans la requetes ");
                }
                return re.json();
            }).then((json) => {
            // @ts-ignore
            let result : [Period] = [];
            json.forEach(objJson => {
                let obj : Period = new Period(objJson.Id,objJson.Name , objJson.Description , objJson.Place , objJson.BeginDate , objJson.EndDate , objJson.EndDate);
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
                'Content-Type':'application/json'
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
                'Content-Type':'application/json'
            }
        }).then(re =>
            re.json())
    }



    async getActivityByPeriod(id:number)  {
         return fetch(`${this._base}`+"/api/Activity/ActivityByPeriod?id="+id,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }).then(re =>
            re.json()).then(


                activities => {
                    console.log(activities);
                    let tempActivities = [];
                    activities.forEach((activity) => {
                        tempActivities.push(new Activity(activity.Id,activity.Name,activity.Description , activity.BeginDate , activity.EndDate , activity.Place , activity.Period))
                    })
                    return tempActivities;
                }

        )
    }






    /** METEO **/


    async getMeteo(lieux : string ){

        return fetch(`${this._base}`+"/api/Meteo/GetMeteo?lieu="+lieux,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
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
                'Content-Type': 'application/json'
            }
        })
        return await re.json()
    }

    async fetchUsersCount() {
        let re = await fetch(`${this._base}/api/User/Count`);
        return await re.json();
    }

    async handleProvider(credentials: any) {
        let data = JSON.stringify({
            credentials: credentials
        })
        let resp = await fetch(`${this.base}/api/User/Google`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await resp.json();
    }
}
export const api = new Api()