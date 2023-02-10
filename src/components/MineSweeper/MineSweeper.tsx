import React, {
    useRef,
    useState, 
} from 'react';
import './MineSweeper.css';
import {
    shuffle, 
} from '../../utility';

import {
    useUpdateEffect, 
} from '../../hooks';



export interface MineSweeperProps{
    selectDifficulty:()=>void;
    play:boolean;
    width:number;
    height:number;
    mineCount:number;
}

function floodfill(
    x:number,
    y:number,
    openStatus:Array<number>,
    width:number,
    height:number,
    neighbourMineCount:Array<number>
):void{
    if (x < 0 || y < 0 || x === height || y === width) {
        return;
    }
    const index = x * width + y;
    if (openStatus[index] === 1) {
        return;
    }
    openStatus[index] = 1;
    if (neighbourMineCount[index] > 0) {
        return;
    }
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            floodfill(x + i, y + j,openStatus,width,height,neighbourMineCount);
        }
    }
}

function calcNeighbourMineCount(width:number,height:number,mines:Array<number>):Array<number>{
    const result = new Array(mines.length).fill(0);
    for (let i = 0; i < result.length; i++) {
        if (!mines[i]) {
            continue;
        }
        const y = i % width;
        const x = (i - y) / width;
        for (let j = -1; j < 2; j++) {
            const newX = x + j;
            if (newX < 0 || newX === height) {
                continue;
            }
            for (let k = -1; k < 2; k++) {
                const newY = y + k;
                if (newY < 0 || newY ===width) {
                    continue;
                }
                result[newX * width + newY]++;
            }
        }
    }
    return result;
}

const panelFlagStyle = {
    'fontSize':60,
};
const panelButton2Style = {
    'marginTop':'15px',
};

export const MineSweeper:React.FC<MineSweeperProps> = (props)=>{
    const {
        selectDifficulty,
        play,
        width,
        height,
        mineCount,
    } = props;

    const [
        isEnd,setIsEnd,
    ] = useState(true);
    const [
        mines,setMines,
    ] = useState<number[]>([]);
    const [
        openStatus,setOpenStatus,
    ] = useState<Array<0 | 1>>([]);
    const [
        markStatus,setMarkStatus,
    ] = useState<Array<0 | 1 | 2>>([]);
    const [
        neighbourMineCount,setNeighbourMineCount,
    ] = useState<number[]>([]);
    const [
        selectedMineCount,setSelectedMineCount,
    ] = useState(0);

    const init = ()=>{
        const total = width * height;
        const newMines = new Array(total).fill(0);
        for (let i = 0; i < mineCount; i++) {
            newMines[i] = 1;
        }
        shuffle<number>(newMines,mineCount);

        setIsEnd(false);
        setMines(newMines);
        setOpenStatus(new Array(total).fill(0));
        setMarkStatus(new Array(total).fill(0));
        setNeighbourMineCount(calcNeighbourMineCount(width,height,newMines));
        setSelectedMineCount(0);

    };

    const handleClickLeft = (x:number,y:number)=>{
        if(isEnd){
            return;
        }
        const index = x*width+y;
        if(openStatus[index] === 1 || markStatus[index] === 1){
            return;
        }
        if(mines[index]){
            const newOpenStatus = openStatus.slice(0);
            newOpenStatus[index] = 1;
            setIsEnd(true);
            setOpenStatus(newOpenStatus);
            alert('mine');

            return;
        }

        if(neighbourMineCount[index]>0){
            const newOpenStatus = openStatus.slice(0);
            newOpenStatus[index] = 1;
            setOpenStatus(newOpenStatus);
            return;
        }

        const newOpenStatus = openStatus.slice(0);
        floodfill(x,y,newOpenStatus,width,height,neighbourMineCount);
        setOpenStatus(newOpenStatus);
    };

    const handleClickRight = (x:number,y:number)=>{
        if(isEnd){
            return;
        }
        const index = x*width+y;
        if(openStatus[index] === 1){
            return;
        }

        const newMarkStatus = [
            ...markStatus,
        ];
        newMarkStatus[index] = ((newMarkStatus[index]+1)%3) as (0 | 1 | 2);
        let newSelectedMineCount = selectedMineCount;
        if(newMarkStatus[index] === 2){
            newSelectedMineCount--;
        }else if(newMarkStatus[index] === 1){
            newSelectedMineCount++;
        }
        setMarkStatus(newMarkStatus);
        setSelectedMineCount(newSelectedMineCount);
    };

    const mineCountRef = useRef(mineCount);
    mineCountRef.current = mineCount;

    
    useUpdateEffect(()=>{
        if(play){
            init();
        }
    
    },[
        play,
    ]);


    useUpdateEffect(()=>{
        if(selectedMineCount !== mineCount){
            return;
        }
        
        const match = mines.every((isMine, index) => {
            if ((isMine && markStatus[index] === 1) || (!isMine && markStatus[index] !== 1)) {
                return true;
            }
            return false;
        });
        if(match){
            setIsEnd(true);
            alert('win');
        }
    },[
        selectedMineCount,
    ]);




    return (
        <div className="app-section game-container" >
            <div 
                className="mine-sweeper-container"
                onContextMenu={(e)=>e.preventDefault()}
            >
                {new Array(height).fill(0).map((_,i)=>{
                    return (
                        <div className="mine-sweeper-row" key={i}>
                            {new Array(width).fill(0).map((__,j)=>{
                                const index = i*width+j;
                                let icon:React.ReactNode = null;
                                if(markStatus[index] === 1){
                                    icon = (
                                        <span className="iconfont">&#xe778;</span>
                                    );
                                }else if(markStatus[index] === 2){
                                    icon = (
                                        <span className="iconfont">&#xe720;</span>
                                    );
                                }else if(openStatus[index] === 1){
                                    if(mines[index]){
                                        icon = (
                                            <span className="iconfont">&#xe63a;</span>
                                        );
                                    }else if(neighbourMineCount[index]>0){
                                        icon = (
                                            <span>
                                                {neighbourMineCount[index]}    
                                            </span>
                                        );
                                    }
                                }

                                return (
                                    <div 
                                        className={`mine-sweeper-item ${openStatus[index]?'is-open':''}`}
                                        key={j}
                                        onClick={()=>handleClickLeft(i,j)}
                                        onContextMenu={()=>handleClickRight(i,j)}
                                    >
                                        {icon}
                                    </div>
                                );
                                    
                            })}
                        </div>
                    );



                })}
            </div>
            <div className="panel-container">
                <div className="panel-data-container">
                    <span
                        className="iconfont"
                        style={panelFlagStyle}
                    >&#xe778;</span>
                    <div>
                        <span data-testid="selectedMineCount">{selectedMineCount}</span> 
                        / 
                        <span data-testid="mineCount">{ mineCount }</span>
                    </div>
                </div>
                <div>
                    <button
                        className="mine-sweeper-button"
                        onClick={()=>init()}
                        data-testid="restart"
                    >
                        重开一局
                    </button>

                    <button
                        className="mine-sweeper-button"
                        style= {panelButton2Style}
                        onClick={()=>selectDifficulty()}
                        data-testid="change-difficulty"
                    >
                        改变难度
                    </button>
                </div>
            </div>
        </div>
    );
};