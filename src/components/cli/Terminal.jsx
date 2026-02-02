import { useState, useEffect, useRef } from 'react';
import CommandProcessor from './CommandProcessor';
import './Terminal.css';

const Terminal = ({ isOpen, onClose, openCVViewer, scrollToSection }) => {
    const [history, setHistory] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [processor] = useState(() => new CommandProcessor());

    const inputRef = useRef(null);
    const terminalRef = useRef(null);
    const outputEndRef = useRef(null);

    // Initialize terminal with welcome message
    useEffect(() => {
        if (isOpen && history.length === 0) {
            const welcome = processor.getWelcomeMessage();
            setHistory([welcome]);
        }
    }, [isOpen, history.length, processor]);

    // Update processor context
    useEffect(() => {
        processor.updateContext({
            openCVViewer,
            scrollToSection,
            clearTerminal: handleClear,
            closeTerminal: onClose
        });
    }, [openCVViewer, scrollToSection, onClose, processor]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (outputEndRef.current) {
            outputEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    // Focus input when terminal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Handle command submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentInput.trim()) return;

        // Add to command history
        setCommandHistory(prev => [...prev, currentInput]);
        setHistoryIndex(-1);

        // Add input to display history
        setHistory(prev => [...prev, {
            type: 'input',
            content: currentInput
        }]);

        // Clear input immediately
        const command = currentInput;
        setCurrentInput('');

        // Process command (async)
        try {
            const result = await processor.processCommand(command);

            if (result) {
                setHistory(prev => [...prev, result]);
            }
        } catch (error) {
            setHistory(prev => [...prev, {
                type: 'error',
                content: `Error: ${error.message} `
            }]);
        }
    };

    // Handle keyboard shortcuts
    const handleKeyDown = (e) => {
        // Tab for auto-complete
        if (e.key === 'Tab') {
            e.preventDefault();
            const completed = processor.getAutoComplete(currentInput);
            setCurrentInput(completed);
            return;
        }

        // Up arrow - previous command
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length === 0) return;

            const newIndex = historyIndex === -1
                ? commandHistory.length - 1
                : Math.max(0, historyIndex - 1);

            setHistoryIndex(newIndex);
            setCurrentInput(commandHistory[newIndex]);
            return;
        }

        // Down arrow - next command
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex === -1) return;

            const newIndex = historyIndex + 1;

            if (newIndex >= commandHistory.length) {
                setHistoryIndex(-1);
                setCurrentInput('');
            } else {
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistory[newIndex]);
            }
            return;
        }

        // Ctrl+L - clear terminal
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            handleClear();
            return;
        }

        // Ctrl+C - clear current input
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            setCurrentInput('');
            return;
        }
    };

    // Clear terminal
    const handleClear = () => {
        setHistory([]);
        setCurrentInput('');
    };

    // Render output based on type
    const renderOutput = (item, index) => {
        const typeClass = `terminal-output-${item.type || 'text'}`;

        if (item.type === 'input') {
            return (
                <div key={index} className="terminal-input-line">
                    <span className="terminal-prompt">visitor@portfolio:~$</span>
                    <span className="terminal-command">{item.content}</span>
                </div>
            );
        }

        return (
            <div key={index} className={`terminal-output ${typeClass}`}>
                <pre>{item.content}</pre>
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="terminal-overlay" onClick={onClose}>
            <div
                className="terminal-container"
                onClick={(e) => e.stopPropagation()}
                ref={terminalRef}
            >
                {/* Terminal Header */}
                <div className="terminal-header-cli">
                    <div className="terminal-title-cli">
                        <span className="terminal-icon">~</span>
                        <span>portfolio-terminal</span>
                    </div>
                    <div className="terminal-controls">
                        <button className="terminal-btn minimize"></button>
                        <button className="terminal-btn maximize"></button>
                        <button className="terminal-btn close" onClick={onClose}>X</button>
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="terminal-body">
                    {history.map((item, index) => renderOutput(item, index))}

                    {/* Current Input Line */}
                    <form onSubmit={handleSubmit} className="terminal-input-form">
                        <span className="terminal-prompt">visitor@portfolio:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="terminal-input"
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </form>

                    <div ref={outputEndRef} />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
