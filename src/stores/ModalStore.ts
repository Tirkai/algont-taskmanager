import { observable, action } from 'mobx';

export class ModalStore{
    @observable public isShow : boolean = false;
    @observable public element : JSX.Element | null;
    @action public showModal(element: JSX.Element){
        this.isShow = true;
        this.element = element;
    }
    @action public hideModal(){
        this.isShow = false;
        this.element = null;
    }
}
export default new ModalStore();