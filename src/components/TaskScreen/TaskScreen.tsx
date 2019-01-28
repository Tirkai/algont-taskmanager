import * as React from 'react'
import style from './style.less'

import { ITaskItem } from 'src/models/TaskItemModel'
import { TasksStore } from 'src/stores/TasksStore'
import { ModalStore } from 'src/stores/ModalStore'
import { observer, inject } from 'mobx-react'

import { taskDeadlineCheck } from 'src/utils/taskDeadlineCheck'

import Button from 'src/components/Button/Button'

interface ITaskScreenProps extends ITaskItem {
    tasks?: TasksStore;
    modal?: ModalStore;
}
interface ITaskScreenState {
    isEditEnabled: boolean;
    taskTitle: string;
    taskContent: string;
    taskDate: number;
    [x: string]: any;
}
@inject('tasks', 'modal') @observer
export default class TaskScreen extends React.Component<ITaskScreenProps, ITaskScreenState> {
    public state = {
        isEditEnabled: false,
        taskTitle: "",
        taskContent: "",
        taskDate: 0
    }
    public handleRemoveTask = () => {
        const tasks = this.props.tasks!;
        const modal = this.props.modal!;
        tasks.removeTask(this.props.id);
        modal.hideModal();
    }
    public handleChangeTask = () => {
        this.setState(prevState => ({
            isEditEnabled: !prevState.isEditEnabled
        }));
    }
    public handleUpdateTask = () => {
        const tasks = this.props.tasks!;
        const status = taskDeadlineCheck(this.state.taskDate);
        tasks.updateTask(this.props.id, {
            title: this.state.taskTitle,
            content: this.state.taskContent,
            deadline: this.state.taskDate,
            ...status
        });
        this.setState({
            isEditEnabled: false
        });
    };
    public handleInput = (e: any) => {
        console.log(e);
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    public componentDidMount() {
        this.setState({
            taskTitle: this.props.title,
            taskContent: this.props.content,
            taskDate: this.props.deadline
        });
    }
    public render() {
        return (
            <div className={style.TaskScreen}>
                <div className={style.Container}>
                    <div className={style.Title}>
                        {this.editableTitle()}
                    </div>
                    <div className={style.Content}>
                        {this.editableContent()}
                    </div>
                    <div className={style.Meta}>
                        <div className={[style.Deadline, this.props.overdue ? style.IsOverdue : ''].join(' ')}>
                            Крайний срок: {this.editableDate()}
                        </div>
                        <div className={style.Actions}>
                            {!this.state.isEditEnabled ? (
                                <Button onClick={this.handleChangeTask}>
                                    Изменить
                                </Button>
                            ) : (
                                <Button onClick={this.handleUpdateTask} color="green">
                                    Сохранить
                                </Button>
                                )
                            }
                            <Button onClick={this.handleRemoveTask} color="red">
                                Удалить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    private editableTitle = () => {
        return this.state.isEditEnabled ? (
            <input
                type="text"
                name="taskTitle"
                className={[style.EditableInput, style.EditableInputTitle].join(' ')}
                onChange={this.handleInput}
                value={this.state.taskTitle} />
        ) : (this.state.taskTitle)
    }
    private editableContent = () => {
        return this.state.isEditEnabled ? (
            <textarea
                name="taskContent"
                className={[style.EditableInput, style.EditableInputContent].join(' ')}
                onChange={this.handleInput}
                value={this.state.taskContent} />
        ) : (this.state.taskContent)
    }
    private editableDate = () => {
        const date = new Date(this.state.taskDate);
        return this.state.isEditEnabled ? (
            <input
            type="date"
            name="taskDate"
            min="2019-1-1"
            max="2030-1-1"
            className={[style.EditableInput, style.EditableInputDate].join(' ')}
            onChange={this.handleInput}
            value={this.state.taskDate}/>
        ) : `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    }
}