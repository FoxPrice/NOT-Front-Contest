import { useEffect, useState } from 'react';

type UseTransitionStateReturn<T> = {
    currentValue: T;
    opacity: number;
};

const useTransitionState = <T>(value: T, duration: number = 300): UseTransitionStateReturn<T> => {
    const [currentValue, setCurrentValue] = useState<T>(value);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        if (value === currentValue) return;

        setOpacity(0);

        const timeout = setTimeout(() => {
            setCurrentValue(value);
            setOpacity(1);
        }, duration);

        return () => clearTimeout(timeout);
    }, [currentValue, value, duration]);

    return { currentValue, opacity };
};

export default useTransitionState;
