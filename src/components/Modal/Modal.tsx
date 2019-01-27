import * as React from 'react'
import { observer, inject } from 'mobx-react'
import style from './style.less'

import { ModalStore } from 'src/stores/ModalStore'

interface IModalProps {
    modal?: ModalStore;
    isShow: boolean;
}

@inject('modal') @observer
export default class Modal extends React.Component<IModalProps>{    
    public state = {
        isShow: false
    }
    public componentDidMount(){
        this.setState({
            isShow: this.props.isShow
        });
    }
    public handleClose = (e: any) => {
        console.log(e.target, e.currentTarget);
        if(e.target !== e.currentTarget){
            return;
        }
        const modal = this.props.modal!;
        modal.hideModal();
    }
    public render() {
        const modal = this.props.modal!;
        console.log(modal);
        return (
            <div className={style.Modal} style={{display: modal.isShow ? "block" : "none"}}>
                <div className={style.Overlay}>
                    <div className={style.Wrapper} onClick={this.handleClose}>
                        <div className={style.Container}>
                            <div className={style.Content}>
                                {modal.element}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}