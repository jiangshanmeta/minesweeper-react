import {
    useEffect,useRef,
} from 'react';

export const useUpdateEffect:typeof useEffect = (effect,deps)=>{
    const isMounted = useRef(false);
    useEffect(()=>{
        if(!isMounted.current){
            isMounted.current = true;
        }else{
            return effect();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },deps);

};