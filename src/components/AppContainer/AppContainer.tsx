import * as React from 'react'
import { observer, inject } from 'mobx-react'
import style from './style.less'

import { ModalStore } from 'src/stores/ModalStore'

import TaskManager from 'src/components/TaskManager/TaskManager'
import Modal from 'src/components/Modal/Modal'



interface IAppContainerProps{
    modal?: ModalStore
}
@inject('modal') @observer
class AppContainer extends React.Component<IAppContainerProps> {
    public render() {
        const modal = this.props.modal!;
        return (
            <div className={style.App}>
                <TaskManager/>
                <Modal {...modal} />
            </div>
        );
    }
}
export default AppContainer;
