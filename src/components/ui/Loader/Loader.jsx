import { useState, useEffect } from 'react';
import {
    FaReact, FaNodeJs, FaCoffee, FaBrain,
    FaCheck, FaSpinner, FaClock, FaRocket
} from 'react-icons/fa';
import { SiMongodb, SiExpress } from 'react-icons/si';
import './Loader.css';

const PACKAGES = [
    { name: 'creativity', version: '3.2.1', icon: FaBrain, duration: 900 },
    { name: 'react-skills', version: '18.0.0', icon: FaReact, duration: 1100 },
    { name: 'node-expertise', version: '20.0.0', icon: FaNodeJs, duration: 850 },
    { name: 'mongodb-mastery', version: '7.0.0', icon: SiMongodb, duration: 700 },
    { name: 'express-knowledge', version: '4.18.0', icon: SiExpress, duration: 750 },
    { name: 'caffeine-dependency', version: '∞.0.0', icon: FaCoffee, duration: 300 }, // fastest
    { name: 'over-engineering', version: '1.0.0', icon: FaRocket, duration: 1200 }, // slowest
];

const Loader = ({ onFinish }) => {
    const [installedCount, setInstalledCount] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        let elapsed = 0;
        const timers = [];

        PACKAGES.forEach((pkg, i) => {
            elapsed += pkg.duration;
            const t = setTimeout(() => {
                setInstalledCount(i + 1);
            }, elapsed);
            timers.push(t);
        });

        // All done → show success then call onFinish
        const finishTimer = setTimeout(() => {
            setDone(true);
            setTimeout(() => onFinish(), 900);
        }, elapsed + 500);
        timers.push(finishTimer);

        return () => timers.forEach(clearTimeout);
    }, [onFinish]);

    const progress = Math.round((installedCount / PACKAGES.length) * 100);

    return (
        <div className="loader-container">
            <div className="terminal-window">
                {/* macOS-style header */}
                <div className="terminal-header">
                    <div className="terminal-buttons">
                        <span className="terminal-dot red"></span>
                        <span className="terminal-dot yellow"></span>
                        <span className="terminal-dot green"></span>
                    </div>
                    <div className="terminal-title">npm — portfolio-init</div>
                </div>

                <div className="terminal-content">
                    {/* Command line */}
                    <div className="command-line">
                        <span className="prompt">$</span>
                        <span className="typing-text">npm install abdulrahman@latest</span>
                    </div>

                    {/* Package list */}
                    <div className="npm-package-list">
                        {PACKAGES.map((pkg, i) => {
                            const Icon = pkg.icon;
                            const installed = i < installedCount;
                            const installing = i === installedCount;
                            return (
                                <div
                                    key={pkg.name}
                                    className={`npm-pkg-row ${installed ? 'pkg-done' : installing ? 'pkg-active' : 'pkg-pending'}`}
                                >
                                    <span className="pkg-status-icon">
                                        {installed
                                            ? <FaCheck className="icon-check" />
                                            : installing
                                                ? <FaSpinner className="icon-spin" />
                                                : <FaClock className="icon-pending" />
                                        }
                                    </span>
                                    <Icon className="pkg-tech-icon" />
                                    <span className="pkg-name">{pkg.name}</span>
                                    <span className="pkg-version">@{pkg.version}</span>
                                    {pkg.name === 'caffeine-dependency' && installed && (
                                        <span className="pkg-note">← fastest install</span>
                                    )}
                                    {pkg.name === 'over-engineering' && installed && (
                                        <span className="pkg-note">← still running</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Progress bar */}
                    <div className="loading-status">
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="npm-footer">
                            {done
                                ? <span className="success-text">added {PACKAGES.length} packages — launching portfolio</span>
                                : <span className="status-text">installing {installedCount}/{PACKAGES.length} packages...</span>
                            }
                            <span className="percentage">{progress}%</span>
                        </div>
                    </div>

                    <div className="matrix-bg"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
