import * as React from 'react'
import style from './style.less'

import { ITaskItem } from 'src/models/TaskItemModel'
import { TasksStore } from 'src/stores/TasksStore'
import { ModalStore } from 'src/stores/ModalStore'
import { observer, inject } from 'mobx-react'
import { DragSource, DropTarget } from 'react-dnd'

import TaskItemComponent from 'src/components/TaskItem/TaskItem'
import { taskDeadlineCheck } from 'src/utils/taskDeadlineCheck';

interface ITaskItemProps extends ITaskItem {
    tasks?: TasksStore;
    modal?: ModalStore;
    connectDragSource?: any;
    connectDropTarget?: any;
    isDragging?: boolean;
    isOver?: boolean;
    onClick?: (handle: any) => void;
    handleDrop: (id: number, task: ITaskItem) => void;
}

const itemSource = {
    beginDrag: (props: any) => {
        return props;
    }
}
const itemTarget = {
    drop: (props: ITaskItemProps, monitor: any) => {
        return props.handleDrop(props.id, monitor.getItem());
    }
}

const collectSource = (connect: any, monitor: any) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

const collectTarget = (connect: any, monitor: any) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

@inject('tasks', 'modal') @observer
class TaskItem extends React.Component<ITaskItemProps> {
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
        const status = taskDeadlineCheck(this.props.deadline);
        const { connectDragSource, connectDropTarget } = this.props;
        return connectDropTarget(connectDragSource(
            <div className={style.TaskItem} onClick={this.props.onClick}>
                <div className={this.containerStyles(status)}>
                    <div className={style.Header}>
                        <div className={this.headerStyles(status)} onClick={this.handleOpenTask}>
                            {this.taskTitleTemplate(status)} 
                        </div>
                        <div className={style.HeaderActions}>
                            <div className={style.Meta}>
                                <div className={style.MetaDeadline}>
                                    {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    }
    private containerStyles(status : any) {
        const { isDragging, isOver } = this.props;
        return [
            style.Container,
            (status.overdue ? style.IsOverdue : ''),
            (isDragging ? style.IsDragging : ''),
            (isOver && !isDragging ? style.IsOverDrag : ''),
        ].join(' ');
    }
    private headerStyles(status : any){
        return [
            style.HeaderTitle,
            (status.warning && !status.overdue ? style.HeaderTitleWarning : '')
        ].join(' ');
    }
    private taskTitleTemplate(status: any){
        return (this.props.title + " " + (status.warning && !status.overdue ? "(срок на исходе)" : '') + (status.overdue ? "(просрочено)" : ''));
    }
}
export default DropTarget('item', itemTarget, collectTarget)(DragSource('item', itemSource, collectSource)(TaskItem));