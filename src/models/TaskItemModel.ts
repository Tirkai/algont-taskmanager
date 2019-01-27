interface ITaskItem{
    id: number;
    title: string;
    content: string;
    deadline: number;
    warning: boolean;
    overdue: boolean;
}
class TaskItemModel implements ITaskItem{
    public id: number;
    public title: string;
    public content: string;
    public deadline: number;
    public warning: boolean;
    public overdue: boolean;
    constructor(options: ITaskItem){
        this.id = options.id;
        this.title = options.title;
        this.content = options.content;
        this.deadline = options.deadline;
        this.warning = options.warning;
        this.overdue = options.overdue;

    }
}
export { ITaskItem, TaskItemModel }