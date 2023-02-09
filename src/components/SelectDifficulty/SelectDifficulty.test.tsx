import React from 'react';
import {
    render, 
    screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import {
    SelectDifficulty,
} from './SelectDifficulty';
import {
    MineSweeperInputNumberProps, 
} from '../MineSweeperInputNumber/MineSweeperInputNumber';

jest.mock('../MineSweeperInputNumber/MineSweeperInputNumber',()=>{
    return {
        MineSweeperInputNumber:function DummyMineSweeperInputNumber(props:MineSweeperInputNumberProps){
            return <div onClick={()=>props.setValue(props.value+6)} data-testid="dummy-mine-sweeper-input-number">{props.value}</div>;
        },
    };

});


let showGame: jest.Mock<any, any>;

beforeEach(()=>{
    showGame = jest.fn();
});

afterEach(()=>{
    showGame.mockRestore();
});


test('snapshot',()=>{

    const {
        container,
    } = render(<SelectDifficulty showGame={showGame} />);
    expect(container.innerHTML).toMatchSnapshot();
});

test('default config 8 8 10 should work',()=>{
    
    render(<SelectDifficulty showGame={showGame} />);

    userEvent.click(screen.getByTestId('defaultconfig8810'));

    expect(showGame.mock.calls[0]).toEqual([
        8,8,10,
    ]);
});

test('default config 16 16 40 should work',()=>{
    
    render(<SelectDifficulty showGame={showGame} />);

    userEvent.click(screen.getByTestId('defaultconfig161640'));

    expect(showGame.mock.calls[0]).toEqual([
        16,16,40,
    ]);
});

test('default config 30 16 99 should work',()=>{
    
    render(<SelectDifficulty showGame={showGame} />);

    userEvent.click(screen.getByTestId('defaultconfig301699'));

    expect(showGame.mock.calls[0]).toEqual([
        30,16,99,
    ]);
});


test('select-difficulty-container should not has class show-customize by default',()=>{
    
    const {
        container,
    } = render(<SelectDifficulty showGame={showGame} />);

    expect(container.querySelector('.select-difficulty-container')?.classList.contains('show-customize') ).toBe(false);
});

test('select-difficulty-container should has class show-customize when click the custom btn',()=>{
    
    const {
        container,
    } = render(<SelectDifficulty showGame={showGame} />);
    userEvent.click(screen.getByTestId('custom-trigger'));

    expect(container.querySelector('.select-difficulty-container')?.classList.contains('show-customize') ).toBe(true);
});

test('should remove class show-customize when click cancel btn',()=>{
    
    const {
        container,
    } = render(<SelectDifficulty showGame={showGame} />);
    userEvent.click(screen.getByTestId('custom-trigger'));

    userEvent.click(screen.getByTestId('cancel-btn'));

    expect(container.querySelector('.select-difficulty-container')?.classList.contains('show-customize') ).toBe(false);
});

test('should call prop showGame with default config when click play-btn',()=>{
    
    render(<SelectDifficulty showGame={showGame} />);

    userEvent.click(screen.getByTestId('play-btn'));


    expect(showGame.mock.calls[0]).toEqual([
        30,16,99,
    ]);
});

test('default width should be 30',()=>{
    
    const { 
        container,
    } = render(<SelectDifficulty showGame={showGame} />);

    const mineSweeperInputNumbers = container.querySelectorAll("[data-testid='dummy-mine-sweeper-input-number']");
    expect(mineSweeperInputNumbers[0].textContent).toBe('30');
});

test('setWidth works',()=>{
    
    const { 
        container,
    } = render(<SelectDifficulty showGame={showGame} />);

    const mineSweeperInputNumbers = container.querySelectorAll("[data-testid='dummy-mine-sweeper-input-number']");
    
    userEvent.click(mineSweeperInputNumbers[0]);
    userEvent.click(screen.getByTestId('play-btn'));
    
    expect(showGame.mock.calls[0]).toEqual([
        36,16,99,
    ]);
});

test('default height should be 16',()=>{
    
    const { 
        container,
    } = render(<SelectDifficulty showGame={showGame} />);

    const mineSweeperInputNumbers = container.querySelectorAll("[data-testid='dummy-mine-sweeper-input-number']");
    expect(mineSweeperInputNumbers[1].textContent).toBe('16');
});

test('setHeight works',()=>{
    
    const { 
        container,
    } = render(<SelectDifficulty showGame={showGame} />);

    const mineSweeperInputNumbers = container.querySelectorAll("[data-testid='dummy-mine-sweeper-input-number']");
    
    userEvent.click(mineSweeperInputNumbers[1]);
    userEvent.click(mineSweeperInputNumbers[1]);

    userEvent.click(screen.getByTestId('play-btn'));

    expect(showGame.mock.calls[0]).toEqual([
        30,28,99,
    ]);
});

test('default mineCount should be 99',()=>{
    
    const { 
        container,
    } = render(<SelectDifficulty showGame={showGame} />);

    const mineSweeperInputNumbers = container.querySelectorAll("[data-testid='dummy-mine-sweeper-input-number']");
    expect(mineSweeperInputNumbers[2].textContent).toBe('99');
});

test('setMineCount works',()=>{
    
    const { 
        container,
    } = render(<SelectDifficulty showGame={showGame} />);

    const mineSweeperInputNumbers = container.querySelectorAll("[data-testid='dummy-mine-sweeper-input-number']");
    
    userEvent.click(mineSweeperInputNumbers[2]);

    userEvent.click(screen.getByTestId('play-btn'));
    expect(showGame.mock.calls[0]).toEqual([
        30,16,105,
    ]);
});