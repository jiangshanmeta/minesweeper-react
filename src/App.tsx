import React from 'react';
import SelectDifficulty from 'components/SelectDifficulty';
import MineSweeper from 'components/MineSweeper';
import './App.css';

interface AppState{
    isShowGame:boolean;
}

export default class App extends React.Component<object,AppState>{
    mineSweeperRef: React.RefObject<MineSweeper>;
    constructor(props:object){
        super(props);
        this.state = {
            isShowGame:false,
        };
        this.mineSweeperRef = React.createRef();
    }

    showGame = (width:number,height:number,mineCount:number)=>{
        (this.mineSweeperRef.current as MineSweeper).init(width,height,mineCount);
        this.setState({
            isShowGame:true,
        });
    
    }

    selectDifficulty = ()=>{
        this.setState({
            isShowGame:false,
        });
    }

    render(){
        return (
            <div className="app">
                <div className={`app-main ${this.state.isShowGame?'show-game':''}`}>
                    <SelectDifficulty 
                        showGame={this.showGame}
                    />
                    <MineSweeper
                        selectDifficulty={this.selectDifficulty}
                        ref={this.mineSweeperRef}
                    />
                </div>
            </div>
        );
    }
}
