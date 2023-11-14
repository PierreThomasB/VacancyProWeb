import {api} from "../repositories/Api.ts";
import {makeAutoObservable} from "mobx";


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





    handleNewPeriod = () => {}


    handleGetAllPeriod = async () => {

        try {
            let res = await api.getPeriodByUser();
            return res;


        }catch (error){

        }




    }


}

export const periodStore = new PeriodStore()