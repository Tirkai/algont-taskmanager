import * as React from 'react'
import { observer, inject } from 'mobx-react'
import style from './style.less'

import { TasksStore } from 'src/stores/TasksStore'
import { ModalStore } from 'src/stores/ModalStore'

import TaskItem from 'src/components/TaskItem/TaskItem'
import TaskCreator from 'src/components/TaskCreator/TaskCreator'
import TaskScreen from 'src/components/TaskScreen/TaskScreen'
import Button from 'src/components/Button/Button'


import taskIcon from 'src/assets/icons/task.svg'
import { ITaskItem } from 'src/models/TaskItemModel';

interface ITaskManagerProps {
    tasks?: TasksStore;
    modal?: ModalStore;
}
interface ITaskMangerState {
    isShowTaskCreator: boolean;
}

@inject('tasks', 'modal') @observer
export default class TaskManager extends React.Component<ITaskManagerProps, ITaskMangerState>{
    public state = {
        isShowTaskCreator: false
    }
    public handleShowTaskCreator = () => {
        const modal = this.props.modal!;
        modal.showModal(<TaskCreator />)
        /*
        this.setState((prevState) => ({
            isShowTaskCreator: !prevState.isShowTaskCreator
        }));
        */
    }
    public handleOpenTask = (taskProps : ITaskItem) => {
        const modal = this.props.modal!;
        modal.showModal(<TaskScreen {...taskProps}/>);
    }
    public handleDrop = (targetId: any, sourceTask : ITaskItem) => {
        const tasks = this.props.tasks!;
        tasks.moveTask(targetId, sourceTask);
        // alert(targetId);
    }
    public render() {
        const tasks: TasksStore = this.props.tasks!;
        return (
            <div className={style.TaskManager}>
                <div className={style.Container}>
                    <div className={style.Header}>
                        <div className={style.HeaderTitle}>
                            Задачи ({tasks.list.length})
                        </div>

                        <div className={style.HeaderActions}>
                            <div className={style.HeaderActionsItem}>
                                <Button onClick={this.handleShowTaskCreator}>
                                    Новая задача
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={style.TaskCreator} style={{ display: this.state.isShowTaskCreator ? "block" : "none" }}>
                        <TaskCreator />
                    </div>
                    <div className={style.Content}>
                    {tasks.list.length ? (
                        tasks.list.map((item) => (
                            <TaskItem key={item.id}
                            {...item}
                            onClick={() => this.handleOpenTask(item)}
                            handleDrop={this.handleDrop}
                            />
                        ))
                    ) : (
                        <div className={style.ContentEmpty}>
                            <div className={style.ContentEmptyIcon}>
                                <img src={taskIcon} className={style.ContentEmptyIconSvg}/>
                            </div>
                            <div className={style.ContentEmptyText}>
                                Нет активных задач!
                            </div>
                            <div className={style.ContentEmptyText}>
                                <Button onClick={this.handleShowTaskCreator}>
                                    Добавить
                                </Button>
                            </div>
                        </div>
                    )}
                        
                    </div>
                </div>
            </div>
        )
    }
}