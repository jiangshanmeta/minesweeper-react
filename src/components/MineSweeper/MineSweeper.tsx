import React from 'react';
import './MineSweeper.css';
import {
    shuffle, 
} from '../../utility';

export interface MineSweeperProps{
    selectDifficulty:()=>void;
    play:boolean;
    width:number;
    height:number;
    mineCount:number;
}

interface MineSweeperState{
    isEnd:boolean;
    mines:Array<number>;
    openStatus:Array<number>;
    markStatus:Array<number>;
    neighbourMineCount:Array<number>;
    selectedMineCount:number;
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

export class MineSweeper extends React.PureComponent<MineSweeperProps,MineSweeperState>{
    constructor(props:MineSweeperProps){
        super(props);
        this.state = {
            isEnd: true,
            mines: [],
            openStatus: [],
            markStatus: [],
            neighbourMineCount:[],
            selectedMineCount:0,
        };
    }

    componentDidUpdate(prevProps:MineSweeperProps, prevState:MineSweeperState){
        if(this.props.play && !prevProps.play){
            this.init(this.props.width,this.props.height,this.props.mineCount);
        }


        if(this.state.selectedMineCount !== prevState.selectedMineCount && this.state.selectedMineCount === this.props.mineCount){
            const match = this.state.mines.every((isMine, index) => {
                if ((isMine && this.state.markStatus[index] === 1) || (!isMine && this.state.markStatus[index] !== 1)) {
                    return true;
                }
                return false;
            });
            if (match) {
                this.setState({
                    isEnd:true,
                },()=>{
                    alert('win');
                });

            }
        }
    }

    reStart = ()=>{
        const {
            width,
            height,
            mineCount,
        } = this.props;

        this.init(width,height,mineCount);
    };

    selectDifficulty = ()=>{
        this.props.selectDifficulty();
    };

    init(width:number,height:number,mineCount:number):void{
        const total = width * height;
        const mines = new Array(total).fill(0);
        for (let i = 0; i < mineCount; i++) {
            mines[i] = 1;
        }
        shuffle<number>(mines,mineCount);
        const neighbourMineCount = calcNeighbourMineCount(width,height,mines);
        this.setState({
            isEnd:false,
            mines,
            openStatus:new Array(total).fill(0),
            markStatus:new Array(total).fill(0),
            neighbourMineCount,
            selectedMineCount:0,
        });
    }

    handleClickLeft(x:number,y:number):void{
        if(this.state.isEnd){
            return;
        }
        const index = x*this.props.width+y;
        if(this.state.openStatus[index] === 1 || this.state.markStatus[index] === 1){
            return;
        }
        if(this.state.mines[index]){
            const openStatus = this.state.openStatus.slice(0);
            openStatus[index] = 1;
            this.setState({
                isEnd:true,
                openStatus,
            },()=>{
                alert('mine');
            });

            return;
        }

        if(this.state.neighbourMineCount[index]>0){
            const openStatus = this.state.openStatus.slice(0);
            openStatus[index] = 1;
            this.setState({
                openStatus,
            });
            return;
        }

        const openStatus = this.state.openStatus.slice(0);
        floodfill(x,y,openStatus,this.props.width,this.props.height,this.state.neighbourMineCount);
        this.setState({
            openStatus,
        });
    }

    handleClickRight = (x:number,y:number)=>{
        if(this.state.isEnd){
            return;
        }
        const index = x*this.props.width+y;
        if(this.state.openStatus[index] === 1){
            return;
        }


        this.setState((oldState)=>{
            const markStatus = [
                ...oldState.markStatus,
            ];
            markStatus[index] = (markStatus[index]+1)%3;

            let selectedMineCount = oldState.selectedMineCount;
            if(markStatus[index] === 2){
                selectedMineCount--;
            }else if(markStatus[index] === 1){
                selectedMineCount++;
            }

            return {
                ...oldState,
                markStatus,
                selectedMineCount,
            };
        });
        
    };

    handleContextMenu = (event:React.MouseEvent)=>{
        event.preventDefault();
    };

    renderMines(){
        const mines = [];
        for(let i=0;i<this.props.height;i++){
            const row = [];
            for(let j=0;j<this.props.width;j++){
                const index = i*this.props.width+j;
                let icon = null;
                if(this.state.markStatus[index] === 1){
                    icon = (
                        <span className="iconfont">&#xe778;</span>
                    );
                }else if(this.state.markStatus[index] === 2){
                    icon = (
                        <span className="iconfont">&#xe720;</span>
                    );
                }else if(this.state.openStatus[index] === 1){
                    if(this.state.mines[index]){
                        icon = (
                            <span className="iconfont">&#xe63a;</span>
                        );
                    }else if(this.state.neighbourMineCount[index]>0){
                        icon = (
                            <span>
                                {this.state.neighbourMineCount[index]}    
                            </span>
                        );
                    }
                }

                row.push(
                    <div 
                        className={`mine-sweeper-item ${this.state.openStatus[index]?'is-open':''}`}
                        key={j}
                        onClick={()=>this.handleClickLeft(i,j)}
                        onContextMenu={(e)=>this.handleClickRight(i,j)}
                    >
                        {icon}
                    </div>
                );
            }
            mines.push(
                <div className="mine-sweeper-row" key={i}>
                    {row}
                </div>
            );
        }


        return (
            <div 
                className="mine-sweeper-container"
                onContextMenu={this.handleContextMenu}
            >
                {mines}
            </div>
        );
    }

    render(){
        return (
            <div className="app-section game-container" >
                {this.renderMines()}
                <div className="panel-container">
                    <div className="panel-data-container">
                        <span
                            className="iconfont"
                            style={panelFlagStyle}
                        >&#xe778;</span>
                        <div>
                            <span data-testid="selectedMineCount">{this.state.selectedMineCount}</span> 
                            / 
                            <span data-testid="mineCount">{ this.props.mineCount }</span>
                        </div>
                    </div>
                    <div>
                        <button
                            className="mine-sweeper-button"
                            onClick={this.reStart}
                            data-testid="restart"
                        >
                            重开一局
                        </button>

                        <button
                            className="mine-sweeper-button"
                            style= {panelButton2Style}
                            onClick={this.selectDifficulty}
                            data-testid="change-difficulty"
                        >
                            改变难度
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}