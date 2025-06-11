import { useEffect, useState } from 'react';

interface UseThemeReturn {
    isDark: boolean;
    setIsDark: (value: boolean) => void;
}

const useTheme = (): UseThemeReturn => {
    const [isDark, setIsDark] = useState<boolean>(() =>
        document.documentElement.classList.contains('dark'),
    );

    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [isDark]);

    return { isDark, setIsDark };
};

export default useTheme;
