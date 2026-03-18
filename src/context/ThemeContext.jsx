import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { themes } from '../styles/themes';
import { applyTheme, getStoredTheme, setStoredTheme } from '../utils/applyTheme';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(getStoredTheme());

    useEffect(() => {
        const theme = themes[currentTheme];
        if (theme) {
            applyTheme(theme);
            setStoredTheme(currentTheme);
        }
    }, [currentTheme]);

    const changeTheme = useCallback((themeId) => {
        if (themes[themeId]) {
            setCurrentTheme(themeId);
        }
    }, []);

    const value = useMemo(() => ({
        currentTheme,
        changeTheme,
        themes,
    }), [currentTheme, changeTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
