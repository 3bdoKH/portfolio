export const applyTheme = (theme) => {
    const root = document.documentElement;

    Object.keys(theme).forEach((property) => {
        if (property.startsWith('--')) {
            root.style.setProperty(property, theme[property]);
        }
    });
};

export const getStoredTheme = () => {
    return localStorage.getItem('portfolio-theme') || 'nightOwl';
};

export const setStoredTheme = (themeId) => {
    localStorage.setItem('portfolio-theme', themeId);
};
