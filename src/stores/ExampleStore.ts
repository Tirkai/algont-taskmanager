import { observable, autorun, action, computed } from 'mobx'

class ExampleStore{
    @observable public firstName : string = "Dmitry";
    @observable public lastName : string = "Tirkai";
    constructor(){
        autorun(() => {
            console.log(this);
        });
    }
    @computed public get fullName() : string {
        return this.firstName + ` aka ` + this.lastName;
    } 
    @action public setName = (name : string) => {
        this.firstName = name.length > 0 ? name : "You";
        this.lastName = "Pussy Slayer"
    }
}
export default new ExampleStore();