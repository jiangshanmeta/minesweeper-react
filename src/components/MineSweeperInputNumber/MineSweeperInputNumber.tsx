import React, {
    useEffect, 
} from 'react';
import './MineSweeperInputNumber.css';

export interface MineSweeperInputNumberProps{
    value:number;
    setValue:(val:number)=>void;
    min?:number;
    max?:number;
    step?:number;
}

export function MineSweeperInputNumber(props:MineSweeperInputNumberProps){
    const {
        value,
        setValue,
        min=-Infinity,
        max=Infinity,
        step=1,
    } = props;

    function updateValue(value:number){
        if(Number.isNaN(value) || value>max || value<min){
            return;
        }
        setValue(value);
    }


    useEffect(()=>{
        if(value>max){
            setValue(max);
        }

        if(value<min){
            setValue(min);
        }
    },[
        min,max,value,setValue,
    ]);


    return (
        <div className="input-group">
            <div
                className="input-group-addon"
                data-testid="minus"
                onClick={()=>updateValue(value-step)}
            >
            -
            </div>
            <input
                className="form-control"
                value={props.value}
                data-testid="form-input"
                onChange={(e)=>updateValue(Number(e.target.value))}
            />
            <div
                className="input-group-addon"
                data-testid="plus"
                onClick={()=>updateValue(value+step)}
            >
            +
            </div>
        </div>
    );
}