import {action, computed, makeAutoObservable, makeObservable, observable} from "mobx";

export  class HasToasts {

    constructor() {
        makeObservable(this , {
            errorMsg : computed,
            open : computed,
            severity : computed,
            handleErrorMessage : action,
            handleGoodMessage : action,
        })
    }


    private  _open: boolean = false
    private _errorMsg: string = "AAAAAAA"
    private _severity: string = "error"


     get open(): boolean {
        return this._open;
    }

     get errorMsg(): string {
        return this._errorMsg;
    }

     get severity(): string {
        return this._severity;
    }

     handleErrorMessage(message: string) {
        this._open = true
        this._errorMsg = message

        setTimeout(() => {
            this._open = false
        }, 2500)

    }

     handleGoodMessage(message: string){
        this._open = true
        this._errorMsg = message
        this._severity = "info";

        setTimeout(() => {
            this._open = false
            this._severity = "error";
        }, 3000)
    }
}