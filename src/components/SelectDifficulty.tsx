import React from 'react';
import './SelectDifficulty.css';
import MineSweeperInputNumber from './MineSweeperInputNumber';

interface SelectDifficultyProps{
    showGame:(width:number,height:number,mineCount:number)=>void;
}

interface SelectDifficultyState{
    isShowCustomize:boolean;
    width:number;
    height:number;
    mineCount:number;
}

export default class SelectDifficulty extends React.Component<SelectDifficultyProps,SelectDifficultyState>{
    constructor(props:SelectDifficultyProps){
        super(props);
        this.state = {
            isShowCustomize: false,
            width: 30,
            height: 16,
            mineCount: 99,
        };
    }

    showCustomize = ()=>{
        this.setState({
            isShowCustomize:true,
        });
    }

    hideCustomise =()=>{
        this.setState({
            isShowCustomize:false,
        });
    }

    doPlayGame = ()=>{
        const {
            width,
            height,
            mineCount,
        } = this.state;
        this.props.showGame(width,height,mineCount);
    }

    renderSelectBox(){
        return (
            <React.Fragment>
                <div className="select-difficulty-row">
                    <div
                        className="select-difficulty-item"
                        onClick={()=>this.props.showGame(8,8,10)}
                    >
                        <div>8 x 8</div>
                        <div>10 个雷</div>
                    </div>
                    <div
                        className="select-difficulty-item"
                        onClick={()=>this.props.showGame(16,16,40)}
                    >
                        <div>16 x 16</div>
                        <div>40 个雷</div>
                    </div>
                </div>
                <div className="select-difficulty-row">
                    <div
                        className="select-difficulty-item"
                        onClick={()=>this.props.showGame(30,16,99)}
                    >
                        <div>30 x 16</div>
                        <div>99 个雷</div>
                    </div>
                    <div
                        className="select-difficulty-item"
                        onClick={this.showCustomize}
                    >
                        <div>?</div>
                        <div>自定义</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    renderForm(){
        return (
            <div>
                <div className="form-group">
                    <label className="form-label">
                        宽度
                    </label>
                    <MineSweeperInputNumber
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">
                        高度
                    </label>
                    <MineSweeperInputNumber

                    />
                </div>

                <div className="form-group">
                    <label className="form-label">
                        雷数
                    </label>
                    <MineSweeperInputNumber
                    />
                </div>

                <div className="form-group">
                    <button
                        className="mine-sweeper-button"
                        onClick={this.doPlayGame}
                    >
                        玩游戏
                    </button>
                </div>

                <div className="form-group">
                    <button
                        className="mine-sweeper-button"
                        onClick={this.hideCustomise}
                    >
                        取消
                    </button>
                </div>
            </div>
        );
    }

    render(){
        return (
            <div className="app-section select-difficulty">
                <div className={`select-difficulty-container ${this.state.isShowCustomize?'show-customize':''}`}>
                    <div className="select-difficulty-section">
                        {this.renderSelectBox()}
                    </div>
                    <div className="select-difficulty-section">
                        {this.renderForm()}
                    </div>
                </div>
            </div>
        );
    }
}