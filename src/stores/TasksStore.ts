import { observable, action } from 'mobx';
import { ITaskItem } from 'src/models/TaskItemModel'
export class TasksStore{
    @observable public list : ITaskItem[] = [];
    public constructor(){
        const storageTasks = localStorage.getItem('tasks');
        if(storageTasks !== null){
            this.list = JSON.parse(storageTasks);
        }
    }
    @action public updateStorage(){
        console.log('UPDATE');
        localStorage.setItem('tasks', JSON.stringify(this.list));
    }
    @action public updateTask(id: number, newState: object){
        const index = this.list.findIndex(object => object.id === id);
        this.list[index] = {...this.list[index], ...newState};
        this.updateStorage();
    }
    @action public addTask(task: ITaskItem){
        this.list.unshift(task);
        this.updateStorage();
    }
    @action public removeTask(id: number){
        const index = this.list.findIndex(object => object.id === id);
        this.list.splice(index, 1);
        this.updateStorage();
    }
    @action public moveTask(targetId : number, task : ITaskItem){
        const sourceIndex = this.list.findIndex(object => object.id === task.id);
        const targetIndex = this.list.findIndex(object => object.id === targetId);
        this.list.splice(sourceIndex, 1);
        this.list.splice(targetIndex, 0, task); 
        this.updateStorage();
    }
}
export default new TasksStore();