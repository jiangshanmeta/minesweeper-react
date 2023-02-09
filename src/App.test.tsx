import React from 'react';
import {
    render, screen, 
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import {
    SelectDifficultyProps,
    MineSweeperProps,
} from './components';

jest.mock('./components',()=>{
    return {
        SelectDifficulty:function DummySelectDifficulty(props:SelectDifficultyProps){
            return <div data-testid="dummy-select-difficulty" onClick={()=>props.showGame(8,8,6)}></div>;
        },
        MineSweeper:function DummyMineSweeper(props:MineSweeperProps){
            return <div data-testid="dummy-mine-sweeper" onClick={()=>props.selectDifficulty()}>{props.width}:{props.height}:{props.mineCount}</div>;
        },
    };
});


test('app-main have class show-game when SelectDifficulty involke showGame', () => {
    const {
        container,
    } = render(<App />);

    userEvent.click(screen.getByTestId('dummy-select-difficulty'));

    expect(container.querySelector('.app-main')?.classList.contains('show-game')).toBe(true);
});

test('app-main should not have class show-game when MineSweeper involke selectDifficulty',()=>{
    const {
        container,
    } = render(<App />);

    userEvent.click(screen.getByTestId('dummy-select-difficulty'));
    userEvent.click(screen.getByTestId('dummy-mine-sweeper'));

    expect(container.querySelector('.app-main')?.classList.contains('show-game')).toBe(false);
});


test('should prop currect width height mineCount to MineSweeper',()=>{

    render(<App />);

    userEvent.click(screen.getByTestId('dummy-select-difficulty'));

    expect(screen.queryByTestId('dummy-mine-sweeper')?.textContent).toBe('8:8:6');
});