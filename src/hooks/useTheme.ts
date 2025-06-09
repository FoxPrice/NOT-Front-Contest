import { useEffect, useState } from 'react';

interface UseThemeReturn {
    isDark: boolean;
    setIsDark: (boolean: boolean) => void;
}

const useTheme = (): UseThemeReturn => {
    const [isDark, setIsDark] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return { isDark, setIsDark };
};

export default useTheme;
