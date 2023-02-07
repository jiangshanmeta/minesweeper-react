import React, {
    useState, 
} from 'react';
import './SelectDifficulty.css';
import {
    MineSweeperInputNumber,
} from '../MineSweeperInputNumber/MineSweeperInputNumber';

export interface SelectDifficultyProps{
    showGame:(width:number,height:number,mineCount:number)=>void;
}

export  function SelectDifficulty(props:SelectDifficultyProps){
    const [
        isShowCustomize,setIsShowCustomize,
    ] = useState(false);
    const [
        width,setWidth,
    ] = useState(30);
    const [
        height,setHeight,
    ] = useState(16);
    const [
        mineCount,setMineCount,
    ] = useState(99);

    return (
        <div className="app-section select-difficulty">
            <div className={`select-difficulty-container ${isShowCustomize?'show-customize':''}`}>
                <div className="select-difficulty-section">
                    <div className="select-difficulty-row">
                        <div
                            className="select-difficulty-item"
                            onClick={()=>props.showGame(8,8,10)}
                            data-testid="defaultconfig8810"
                        >
                            <div>8 x 8</div>
                            <div>10 个雷</div>
                        </div>
                        <div
                            className="select-difficulty-item"
                            onClick={()=>props.showGame(16,16,40)}
                            data-testid="defaultconfig161640"
                        >
                            <div>16 x 16</div>
                            <div>40 个雷</div>
                        </div>
                    </div>
                    <div className="select-difficulty-row">
                        <div
                            className="select-difficulty-item"
                            onClick={()=>props.showGame(30,16,99)}
                            data-testid="defaultconfig301699"
                        >
                            <div>30 x 16</div>
                            <div>99 个雷</div>
                        </div>
                        <div
                            className="select-difficulty-item"
                            onClick={()=>setIsShowCustomize(true)}
                            data-testid="custom-trigger"
                        >
                            <div>?</div>
                            <div>自定义</div>
                        </div>
                    </div>
                </div>
                <div className="select-difficulty-section">
                    <div>
                        <div className="form-group" >
                            <label className="form-label">
                                宽度
                            </label>
                            <MineSweeperInputNumber
                                value={width}
                                setValue={setWidth}
                                max={50}
                                min={1}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                高度
                            </label>
                            <MineSweeperInputNumber
                                value={height}
                                setValue={setHeight}
                                max={50}
                                min={1}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                雷数
                            </label>
                            <MineSweeperInputNumber
                                value={mineCount}
                                setValue={setMineCount}
                                max={width*height}
                                min={1}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="mine-sweeper-button"
                                onClick={()=>props.showGame(width,height,mineCount)}
                                data-testid="play-btn"
                            >
                                玩游戏
                            </button>
                        </div>

                        <div className="form-group">
                            <button
                                className="mine-sweeper-button"
                                onClick={()=>setIsShowCustomize(false)}
                                data-testid="cancel-btn"
                            >
                                取消
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
