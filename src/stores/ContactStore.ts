
class ContactStore {
    private _errorMsg = undefined
    private _severity = 'error'
    private _open = false


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

    handleSubmit(data: FormDataEntryValue[]) {
        this.handleContact(...data.values())
    }

    private handleContact(lastname, firstname, email, subject, message) {

    }
}
export const contactStore = new ContactStore()