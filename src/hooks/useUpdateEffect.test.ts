import {
    renderHook,
} from '@testing-library/react';

import {
    useUpdateEffect,
} from './useUpdateEffect';

test('only call effect when updated when without deps',()=>{
    const effect = jest.fn();
    const {
        rerender,
    } = renderHook(()=>{
        useUpdateEffect(effect);
    });
    expect(effect).not.toBeCalled();

    rerender();

    expect(effect).toBeCalledTimes(1);
});

test('only call effect when updated when with deps',()=>{
    const effect = jest.fn();
    let dep = 1;
    const {
        rerender,
    } = renderHook(()=>{
        useUpdateEffect(effect,[
            dep,
        ]);
    });

    expect(effect).not.toBeCalled();

    rerender();
    expect(effect).not.toBeCalled();

    dep++;
    rerender();
    expect(effect).toBeCalledTimes(1);
});