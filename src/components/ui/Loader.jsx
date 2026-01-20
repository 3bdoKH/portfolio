import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import './Loader.css';

const Loader = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => onFinish(), 800); // Wait a bit before finishing
                    return 100;
                }
                // Random increment for realistic feel
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 100);
            });
        }, 200);

        return () => clearInterval(timer);
    }, [onFinish]);

    return (
        <div className="loader-container">
            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="terminal-buttons">
                        <span className="terminal-dot red"></span>
                        <span className="terminal-dot yellow"></span>
                        <span className="terminal-dot green"></span>
                    </div>
                    <div className="terminal-title">bash -- portfolio-init</div>
                </div>

                <div className="terminal-content">
                    <div className="command-line">
                        <span className="prompt">$</span>
                        <TypeAnimation
                            sequence={[
                                'npm install portfolio-assets',
                                1000,
                                'npm start',
                                1000,
                            ]}
                            wrapper="span"
                            speed={70}
                            className="typing-text"
                            cursor={false}
                        />
                    </div>

                    <div className="loading-status">
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>

                        <div className="status-text">
                            {progress < 30 && <span>Displaying modules...</span>}
                            {progress >= 30 && progress < 70 && <span>Compiling assets...</span>}
                            {progress >= 70 && progress < 100 && <span>Optimizing build...</span>}
                            {progress === 100 && <span className="success-text">Build Successful! Launching...</span>}
                        </div>

                        <div className="percentage">{Math.round(progress)}%</div>
                    </div>

                    <div className="matrix-bg"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
