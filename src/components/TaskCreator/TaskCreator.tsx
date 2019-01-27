import * as React from 'react'
import { observer, inject } from 'mobx-react'
import style from './style.less'

import { TasksStore } from 'src/stores/TasksStore'
import { TaskItemModel } from 'src/models/TaskItemModel'

import Button from 'src/components/Button/Button'
import { ModalStore } from 'src/stores/ModalStore';

import { taskDeadlineCheck } from 'src/utils/taskDeadlineCheck'

interface ITaskCreatorProps {
    tasks?: TasksStore;
    modal?: ModalStore;
}

@inject('tasks', 'modal') @observer
export default class TaskManager extends React.Component<ITaskCreatorProps>{
    public state = {
        taskTitle: "",
        taskContent: "",
        taskDate: ""
    }
    public handleInputChange = (e: any) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    public handleAddTask = () => {
        const tasks = this.props.tasks!;
        const modal = this.props.modal!;
        if (this.state.taskTitle && this.state.taskContent && this.state.taskDate) {
            const date = this.state.taskDate.split("-");
            const year = Number.parseInt(date[0], 0);
            const month = Number.parseInt(date[1], 0);
            const day = Number.parseInt(date[2], 0);
            
            const deadline = new Date(year, month, day).getTime();

            const status = taskDeadlineCheck(deadline)

            tasks.addTask(new TaskItemModel({
                id: Math.random(),
                title: this.state.taskTitle,
                content: this.state.taskContent,
                deadline,
                ...status
            }));
            this.setState({
                taskTitle: "",
                taskContent: "",
                taskDate: ""
            });
            modal.hideModal();
        } else {
            alert("Некоторые поля не заполнены");
        }

    }
    public render() {
        // const tasks: TasksStore = this.props.tasks!;
        return (
            <div className={style.TaskCreator}>
                <div className={style.Container}>
                    <div>
                        <h2>Создание задачи</h2>
                    </div>
                    <div>
                        <input
                            type="text"
                            name="taskTitle"
                            required={true}
                            placeholder={"Название задачи"}
                            className={[style.Field, style.Input].join(' ')}
                            onChange={this.handleInputChange}
                            value={this.state.taskTitle} />
                        <textarea
                            name="taskContent"
                            placeholder={"Текст задачи"}
                            required={true}
                            className={[style.Field, style.Textarea].join(' ')}
                            onChange={this.handleInputChange}
                            value={this.state.taskContent} />
                        <input
                            type="date"
                            name="taskDate"
                            min="2019-1-1"
                            max="2030-1-1"
                            required={true}
                            className={[style.Field, style.Input].join(' ')}
                            onChange={this.handleInputChange}
                            value={this.state.taskDate} />
                    </div>

                    <div className={style.Actions}>
                        <Button onClick={this.handleAddTask}>
                            Добавить
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}