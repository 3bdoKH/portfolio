import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { themeList } from '../../styles/themes';
import './ThemeSwitch.css';

const ThemeSwitch = () => {
    const { currentTheme, changeTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleThemeChange = (themeId) => {
        changeTheme(themeId);
        setIsOpen(false);
    };

    return (
        <div className="theme-switch" ref={dropdownRef}>
            <button
                className="theme-switch-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Change theme"
                title="Change color theme"
            >
                <span className="code-function">T</span>
                <span className="code-bracket">{'()'}</span>
            </button>

            {isOpen && (
                <div className="theme-dropdown">
                    <div className="theme-dropdown-header">
                        <span className="code-comment">{'// Select Theme'}</span>
                    </div>
                    <ul className="theme-list">
                        {themeList.map((theme, index) => (
                            <li key={theme.id} style={{ animationDelay: `${index * 0.05}s` }}>
                                <button
                                    className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                                    onClick={() => handleThemeChange(theme.id)}
                                >
                                    <span className="theme-option-icon">{theme.icon}</span>
                                    <span className="code-keyword">const</span>
                                    {' '}
                                    <span className="code-variable">theme</span>
                                    {' '}
                                    <span className="code-bracket">=</span>
                                    {' '}
                                    <span className="code-string">"{theme.name}"</span>
                                    <span className="code-bracket">;</span>

                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ThemeSwitch;
