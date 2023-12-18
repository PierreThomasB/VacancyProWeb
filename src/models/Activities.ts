import Activity from "./Activity.ts";

export default class Activities {
    private readonly _activities: Array<Activity>;

    constructor(activities: Array<Activity>) {
        this._activities = activities;
    }

    get activities(): Activity[] {
        return this._activities;
    }


    get sortByActivitiesDateDes() {
        return this._activities.sort((a, b) => b.beginDate.getTime() - a.beginDate.getTime());
    }
    get sortByActivitiesDateAsc() {
        return this._activities.sort((a, b) => a.beginDate.getTime() - b.beginDate.getTime());
    }
}