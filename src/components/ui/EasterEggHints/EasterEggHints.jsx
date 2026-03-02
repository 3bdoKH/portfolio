import { useState } from 'react';
import { FaQuestion, FaTimes, FaLock, FaTerminal, FaKeyboard, FaMousePointer, FaGamepad } from 'react-icons/fa';
import './EasterEggHints.css';

const HINTS = [
    { icon: FaTerminal, text: 'try pressing ~ on your keyboard' },
    { icon: FaKeyboard, text: 'type "matrix" somewhere...' },
    { icon: FaGamepad, text: '↑↑↓↓←→←→ ... you know what to do' },
    { icon: FaMousePointer, text: 'that hireMe() button looks suspicious' },
    { icon: FaLock, text: '5 clicks on the logo.....' },
];

const EasterEggHints = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className={`egg-hints-wrapper ${open ? 'is-open' : ''}`}>
            {/* Panel */}
            {open && (
                <div className="egg-hints-panel">
                    <div className="egg-hints-header">
                        <span className="code-comment">{'// secrets.js'}</span>
                        <button className="egg-hints-close" onClick={() => {
                            setOpen(false)
                        }}>
                            <FaTimes />
                        </button>
                    </div>
                    <ul className="egg-hints-list">
                        {HINTS.map((h, i) => {
                            const Icon = h.icon;
                            return (
                                <li key={i} className="egg-hint-item">
                                    <Icon className="egg-hint-icon" />
                                    <span>{h.text}</span>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="egg-hints-footer">
                        <span className="code-comment">{'// good luck '}</span>
                    </div>
                </div>
            )}

            {/* Trigger button */}
            <button
                className="egg-hints-btn"
                onClick={() => setOpen(prev => !prev)}
                title="Secrets"
                aria-label="Show Easter Egg Hints"
            >
                <FaQuestion />
            </button>
        </div>
    );
};

export default EasterEggHints;
