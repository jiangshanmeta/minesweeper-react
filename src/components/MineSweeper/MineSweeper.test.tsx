import React from 'react';
import {
    render,
    screen, 
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
    MineSweeper,
} from './MineSweeper';

const ICON_FLAG_UNICODE = 59256;
const ICON_QUESTION_UNICODE = 59168;
const ICON_BOOM_UNICODE = 58938;


jest.mock('../../utility',()=>{
    return {
        shuffle(_array:number[]){
            
        },
    };
});

let selectDifficulty:jest.Mock<any, any>;
let spyAlert:jest.SpyInstance<void, [message?: any]>;

beforeEach(()=>{
    selectDifficulty = jest.fn();
    spyAlert = jest.spyOn(window,'alert').mockImplementation(()=>{});
});

afterEach(()=>{
    selectDifficulty.mockRestore();
    spyAlert.mockRestore();
});



test('snapshot',()=>{
    const {
        container,
    } =  render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

    expect(container.innerHTML).toMatchSnapshot();
});

test('change-difficulty should work',()=>{
    render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

    userEvent.click(screen.getByTestId('change-difficulty'));

    expect(selectDifficulty).toBeCalledTimes(1);
});

test('mineCount should show correctly',()=>{
    render(<MineSweeper selectDifficulty={selectDifficulty} width={8} height={8} play={true} mineCount={10} />);

    expect(screen.getByTestId('mineCount').textContent).toBe('10');
});



describe('test right click',()=>{

    test('should show flag icon when right click once',()=>{
        const {
            container,
            rerender,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');

        // right click
        userEvent.click(mineSweeperItem[1],{
            button:2,
        });

        // take care of the icon unicode
        expect(mineSweeperItem[1].getElementsByTagName('span')[0].textContent?.codePointAt(0)).toBe(ICON_FLAG_UNICODE);
    });

    test('should show question icon when right click twice',()=>{
        const {
            container,
            rerender,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');

        userEvent.click(mineSweeperItem[1],{
            button:2,
        });

        userEvent.click(mineSweeperItem[1],{
            button:2,
        });

        expect(mineSweeperItem[1].getElementsByTagName('span')[0].textContent?.codePointAt(0)).toBe(ICON_QUESTION_UNICODE);
    });

    test('should not show icon when right click third times',()=>{
        const {
            container,
            rerender,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');

        userEvent.click(mineSweeperItem[1],{
            button:2,
        });

        userEvent.click(mineSweeperItem[1],{
            button:2,
        });

        userEvent.click(mineSweeperItem[1],{
            button:2,
        });

        expect(mineSweeperItem[1].innerHTML).toBe('');
    });

    test('selectedMineCount should show correctly',()=>{
        const {
            container,
            rerender,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');

        userEvent.click(mineSweeperItem[1],{
            button:2,
        });

        expect(screen.getByTestId('selectedMineCount').textContent).toBe('1');

        userEvent.click(mineSweeperItem[1],{
            button:2,
        });

        expect(screen.getByTestId('selectedMineCount').textContent).toBe('0');
    });

    test('should do nothing when right click if cell is open',()=>{
        const {
            container,
            rerender,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');
        userEvent.click(mineSweeperItem[1]);

        userEvent.click(mineSweeperItem[1],{
            button:2,
        });

        expect(mineSweeperItem[1].getElementsByTagName('span')[0].textContent).toBe('1');
    });

    test('should do nothing if game is end when click',()=>{
        

        const {
            container,
            rerender,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');
        userEvent.click(mineSweeperItem[0]);

        userEvent.click(mineSweeperItem[1],{
            button:2,
        });

        expect(mineSweeperItem[1].innerHTML).toBe('');

        spyAlert.mockRestore();
    });

    test('should call alert when mark all the mine correctly',()=>{
        const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
        const {
            container,
            rerender,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');

        userEvent.click(mineSweeperItem[0],{
            button:2,
        });

        expect(spyAlert).toBeCalledTimes(1);
        expect(spyAlert.mock.calls[0][0]).toBe('win');
    });

});


describe('test left click',()=>{

    test('should alert mine when left click the mine',()=>{
        const {
            container,
            rerender,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');
        userEvent.click(mineSweeperItem[0]);

        expect(spyAlert).toBeCalledTimes(1);
        expect(spyAlert.mock.calls[0][0]).toBe('mine');
    });


    test('should show mine icon when left click the mine',()=>{
        const {
            container,
            rerender,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');
        userEvent.click(mineSweeperItem[0]);

        expect(mineSweeperItem[0].getElementsByTagName('span')[0].textContent?.codePointAt(0)).toBe(ICON_BOOM_UNICODE);
    });


    test('should show neighbour mineCount when click the box who has mine neighbour',()=>{
        const {
            container,
            rerender,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');
        userEvent.click(mineSweeperItem[1]);

        expect(mineSweeperItem[1].getElementsByTagName('span')[0].textContent).toBe('1');
    });


    test('should floodfill when click the box who has no mine as neighbour',()=>{
        const {
            container,
            rerender,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={3} height={3} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={3} height={3} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');
        userEvent.click(mineSweeperItem[2]);

        expect(mineSweeperItem[1].getElementsByTagName('span')[0].textContent).toBe('1');
        expect(mineSweeperItem[2].innerHTML).toBe('');

        expect(mineSweeperItem[3].getElementsByTagName('span')[0].textContent).toBe('1');
        expect(mineSweeperItem[4].getElementsByTagName('span')[0].textContent).toBe('1');
        expect(mineSweeperItem[5].innerHTML).toBe('');

        expect(mineSweeperItem[6].innerHTML).toBe('');
        expect(mineSweeperItem[7].innerHTML).toBe('');
        expect(mineSweeperItem[8].innerHTML).toBe('');
    });


    test('should do nothing if isEnd when click left',()=>{
        const {
            container,
            rerender,
            asFragment,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={3} height={3} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={3} height={3} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');
        userEvent.click(mineSweeperItem[0]);

        const firstRender = asFragment();

        userEvent.click(mineSweeperItem[1]);

        expect(asFragment()).toEqual(firstRender);
    });


    test('should do nothing if cell is open',()=>{
        const {
            container,
            rerender,
            asFragment,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={3} height={3} play={false} mineCount={1} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={3} height={3} play={true} mineCount={1} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');
        userEvent.click(mineSweeperItem[2]);

        const firstRender = asFragment();

        userEvent.click(mineSweeperItem[1]);

        expect(asFragment()).toEqual(firstRender);
    });

    test('should do nothing if cell is marked as mine',()=>{
        const {
            container,
            rerender,
            asFragment,
        } = render(<MineSweeper selectDifficulty={selectDifficulty} width={3} height={3} play={false} mineCount={2} />);

        rerender(<MineSweeper selectDifficulty={selectDifficulty} width={3} height={3} play={true} mineCount={2} />);

        const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');
        userEvent.click(mineSweeperItem[1],{
            button:2,
        });

        const firstRender = asFragment();

        userEvent.click(mineSweeperItem[1]);


        expect(asFragment()).toEqual(firstRender);
    });

});


test('restart should work',()=>{
    const {
        container,
        rerender,
        asFragment,
    } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

    rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

    const firstRender = asFragment();
    const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');

    userEvent.click(mineSweeperItem[1],{
        button:2,
    });

    expect(asFragment()).not.toEqual(firstRender);

    userEvent.click(screen.getByTestId('restart'));

    expect(asFragment()).toEqual(firstRender);
});

test('only init when play from false to true',()=>{
    const {
        container,
        rerender,
        asFragment,
    } = render(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);
    rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={true} mineCount={1} />);

    const mineSweeperItem = container.querySelectorAll('.mine-sweeper-item');

    userEvent.click(mineSweeperItem[1],{
        button:2,
    });

    const firstRender = asFragment();

    rerender(<MineSweeper selectDifficulty={selectDifficulty} width={2} height={2} play={false} mineCount={1} />);

    expect(asFragment()).toEqual(firstRender);
});