import React from 'react';
import './MineSweeperInputNumber.css';

interface MineSweeperInputNumberProps{
    value:number;
    setValue:(val:number)=>void;
    min?:number;
    max?:number;
    step?:number;
}

export default class MineSweeperInputNumber extends React.PureComponent<MineSweeperInputNumberProps,object>{
    componentDidUpdate(prevProps:MineSweeperInputNumberProps){
        if(this.props.min !== prevProps.min || this.props.max !== prevProps.max){
            const {
                value,
                min = -Infinity,
                max = Infinity,
            } = this.props;

            if(value>max){
                this.updateValue(max);
            }

            if(value<min){
                this.updateValue(min);
            }
        }
    }

    doMinus = ()=>{
        const {
            value,
            step = 1,
        } = this.props;

        this.updateValue(value-step);
    }

    doPlus = ()=>{
        const {
            value,
            step = 1,
        } = this.props;

        this.updateValue(value+step);
    }

    updateValue(value:number):void{
        const {
            max = Infinity,
            min = -Infinity,
        } = this.props;

        if(value>max || value<min){
            return;
        }
        this.props.setValue(value);
    }

    handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const numberVal = Number(e.target.value);

        if(Number.isNaN(numberVal) || !Number.isInteger(numberVal)){
            return;
        }

        this.updateValue(numberVal);
    }

    render(){
        return (
            <div className="input-group">
                <div
                    className="input-group-addon"
                    onClick={this.doMinus}
                >
                    -
                </div>
                <input
                    className="form-control"
                    value={this.props.value}
                    onChange={this.handleChange}
                />
                <div
                    className="input-group-addon"
                    onClick={this.doPlus}
                >
                    +
                </div>
            </div>
        );
    }
}