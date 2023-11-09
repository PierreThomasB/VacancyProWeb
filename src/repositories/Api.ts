import Place from "../models/Place"
import Period from "../models/Period.ts";

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


    newPeriod(period: Period){
        let data = JSON.stringify(period);
        return fetch(`${this._base}`+"api/Period/NewVacances",{
            method: 'POST',
            body: data,
            headers: {
                'Content-Type':'application/json'
            }
        }).then(re => re.json())
    }


    getPeriodByUser(){
        return fetch(`${this._base}`,{
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        }).then(re => re.json())

    }

    











    signIn(email: string, password: string) {
        let data = JSON.stringify({
            email: email,
            password: password
        })
        return fetch(`${this._base}/User/SignIn`,{
            method: 'POST',
            body: data,
            headers: {
                'Content-Type':'application/json'
            }
        }).then(re => re.json())
    }

    fetchUser(token: string) {
        return fetch(`${this.base}/User`, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
            .then(resp => resp.status === 401 ? ({error: true, unauthorized: true}) : resp.json())
    }
}
export const api = new Api()