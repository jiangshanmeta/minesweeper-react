import React from 'react';
import {
    render, screen,fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import MineSweeperInputNumber from './MineSweeperInputNumber';

test('test snapshot',()=>{
    const setValue = jest.fn();
    const {
        container,
    } = render(<MineSweeperInputNumber value={1} setValue={setValue} />);
    expect(container.innerHTML).toMatchSnapshot();
});

test('component should be rendered',()=>{
    const setValue = jest.fn();
    render(<MineSweeperInputNumber value={1} setValue={setValue} />);

    expect(screen.getByTestId('minus')).toBeInTheDocument();
    expect(screen.getByTestId('form-input')).toBeInTheDocument();
    expect( (screen.getByTestId('form-input') as HTMLInputElement ).value ).toBe('1');
    expect(screen.getByTestId('plus')).toBeInTheDocument();

});

test('plus addon should works with default step',()=>{
    const setValue = jest.fn();
    render(<MineSweeperInputNumber value={1} setValue={setValue}/>);

    const plusAddon = screen.getByTestId('plus');
    userEvent.click(plusAddon);

    expect(setValue).toBeCalledTimes(1);
    expect(setValue.mock.calls[0][0]).toBe(2);

});

test('plus addon should works with custom step',()=>{
    const setValue = jest.fn();
    render(<MineSweeperInputNumber value={1} setValue={setValue} step={5}/>);

    const plusAddon = screen.getByTestId('plus');
    userEvent.click(plusAddon);

    expect(setValue).toBeCalledTimes(1);
    expect(setValue.mock.calls[0][0]).toBe(6);
});


test('minus addon should works with default step',()=>{
    const setValue = jest.fn();
    render(<MineSweeperInputNumber value={5} setValue={setValue}/>);

    const minusAddon = screen.getByTestId('minus');
    userEvent.click(minusAddon);

    expect(setValue).toBeCalledTimes(1);
    expect(setValue.mock.calls[0][0]).toBe(4);

});

test('minus addon should works with custom step',()=>{
    const setValue = jest.fn();
    render(<MineSweeperInputNumber value={13} setValue={setValue} step={5}/>);

    const minusAddon = screen.getByTestId('minus');
    userEvent.click(minusAddon);

    expect(setValue).toBeCalledTimes(1);
    expect(setValue.mock.calls[0][0]).toBe(8);
});

test('input form-control should work',()=>{
    const setValue = jest.fn();
    render(<MineSweeperInputNumber value={1} setValue={setValue} />);

    const formInput = screen.getByTestId('form-input');

    // 因为是受控组件，所以input的值是不变的(写死的prop value值)，这里如果使用 userEvent.type 则 每次调用 setValue穿的值 是 12 13 14
    // 干脆直接用fireEvent吧
    fireEvent.change(formInput, {
        target: {
            value: '234',
        },
    });

    expect(setValue).toBeCalledTimes(1);
    expect(setValue.mock.calls[0][0]).toBe(234);
});

test('input form-control should handle invalid value',()=>{
    const setValue = jest.fn();
    render(<MineSweeperInputNumber value={1} setValue={setValue} />);

    const formInput = screen.getByTestId('form-input');

    fireEvent.change(formInput, {
        target: {
            value: 'a',
        },
    });

    expect(setValue).not.toBeCalled();
});

test('should handle max value',()=>{
    const setValue = jest.fn();
    render(<MineSweeperInputNumber value={1} setValue={setValue} step={100} max={10} />);
    const plusAddon = screen.getByTestId('plus');
    userEvent.click(plusAddon);

    expect(setValue).not.toBeCalled();

    const formInput = screen.getByTestId('form-input');
    fireEvent.change(formInput, {
        target: {
            value: '234',
        },
    });

    expect(setValue).not.toBeCalled();
});

test('should handle min value',()=>{
    const setValue = jest.fn();
    render(<MineSweeperInputNumber value={10} setValue={setValue} step={100} min={5} />);
    const minusAddon = screen.getByTestId('minus');
    userEvent.click(minusAddon);

    expect(setValue).not.toBeCalled();

    const formInput = screen.getByTestId('form-input');
    fireEvent.change(formInput, {
        target: {
            value: '2',
        },
    });

    expect(setValue).not.toBeCalled();
});