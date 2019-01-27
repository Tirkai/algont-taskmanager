import * as React from 'react'
import style from './style.less'
interface IButtonProps {
    children: any;
    color?: string;
    onClick: (handle : any) => void
}
export default class Button extends React.Component<IButtonProps>{
    public render() {
        return (
            <div className={[style.Button, this.buttonColor()].join(' ')} onClick={this.props.onClick}>
                {this.props.children}
            </div>
        )
    }
    private buttonColor = () => {
        switch(this.props.color){
            case "blue":
                return style.ButtonBlue;
            case "green":
                return style.ButtonGreen;
            case "red":
                return style.ButtonRed;
        }
    }
}