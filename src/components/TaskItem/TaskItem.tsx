import * as React from 'react'
import style from './style.less'

import { ITaskItem } from 'src/models/TaskItemModel'
import { TasksStore } from 'src/stores/TasksStore'
import { ModalStore } from 'src/stores/ModalStore';
import { observer, inject } from 'mobx-react'

import TaskItemComponent from 'src/components/TaskItem/TaskItem'

interface ITaskItemProps extends ITaskItem {
    tasks?: TasksStore;
    modal?: ModalStore;
    onClick?: (handle: any) => void;
}
@inject('tasks', 'modal') @observer
export default class TaskItem extends React.Component<ITaskItemProps> {
    public state = {
        containerClasses: []
    }
    public componentDidMount(){
        this.termWarningCheck();
    }
    public termWarningCheck = () => {
        const deadlineDate : any = new Date(this.props.deadline);
        const currentDate : any = new Date();
        deadlineDate.setDate(deadlineDate.getDate() - 3);
        this.setState({
            isTermWarning: deadlineDate <= currentDate
        });
    }
    public handleRemoveTask = () => {
        const tasks = this.props.tasks!;
        tasks.removeTask(this.props.id);
    }
    public handleOpenTask = () => {
        const modal = this.props.modal!;
        modal.showModal(<TaskItemComponent {...this.props} />)
    }
    public render() {
        const date = new Date(this.props.deadline);
        return (
            <div className={style.TaskItem} onClick={this.props.onClick}>
                <div className={[style.Container, (this.props.overdue ? style.IsOverdue : '')].join(' ')}>
                    <div className={style.Header}>
                        <div className={[style.HeaderTitle, (this.props.warning && !this.props.overdue ? style.HeaderTitleWarning : '')].join(' ')} onClick={this.handleOpenTask}>
                            {this.props.title}
                        </div>
                        <div className={style.HeaderActions}>
                            <div className={style.Meta}>
                                <div className={style.MetaDeadline}>
                                    {`
                                        ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}
                                    `}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}