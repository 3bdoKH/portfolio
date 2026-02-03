import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import ParticlesBg from 'particles-bg';
import { useAnalytics } from '../../context/AnalyticsContext';
import CVViewer from '../ui/CVViewer';
import Terminal from '../cli/Terminal';
import profile from '../../images/profile.jpg';
import './Hero.css';

const Hero = () => {
    const [showCursor, setShowCursor] = useState(true);
    const [isCVViewerOpen, setIsCVViewerOpen] = useState(false);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const { trackPageView } = useAnalytics();

    useEffect(() => {
        // Track page view when component mounts
        trackPageView('/');

        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        console.log(showCursor)
        return () => clearInterval(cursorInterval);
        // eslint-disable-next-line
    }, []);

    // Keyboard shortcut to toggle terminal (~  key)
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === '~' || e.key === '`') {
                setIsTerminalOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero" id="home">
            <ParticlesBg type="cobweb" bg={true} color="#00ff88" num={80} />

            <div className="hero-container container">
                <div className="hero-content">
                    <div>
                        {/* Profile Image Section */}
                        <div className="profile-section">
                            <div className="profile-frame">
                                <div className="frame-header">
                                    <span className="code-comment">{'// me.jpg'}</span>
                                    <div className="frame-dots">
                                        <span className="dot dot-close"></span>
                                        <span className="dot dot-minimize"></span>
                                        <span className="dot dot-maximize"></span>
                                    </div>
                                </div>
                                <div className="profile-image-wrapper">
                                    <div className="status-indicator">
                                        <span className="status-dot"></span>
                                        <span className="status-text">Available</span>
                                    </div>
                                    <img
                                        src={profile}
                                        alt="Profile"
                                        className="profile-image"
                                    />
                                    <div className="image-overlay">
                                        <span className="code-bracket">{'<'}</span>
                                        <span className="code-function">img</span>
                                        <span className="code-bracket">{' />'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="social-links-hero">
                            <a href="https://github.com/3bdoKH" target="_blank" rel="noopener noreferrer" className="social-link-hero" title="GitHub">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="mailto:the.abdo.kh@gmail.com" className="social-link-hero" title="Email">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Code Line Numbers */}
                    <div className="line-numbers">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                    </div>

                    {/* Code Content */}
                    <div className="code-block">
                        <div className="code-line">
                            <span className="code-comment">{'// Welcome to my portfolio'}</span>
                        </div>

                        <div className="code-line">
                            <span className="code-keyword">class</span>{' '}
                            <span className="code-function">Developer</span>{' '}
                            <span className="code-bracket">{'{'}</span>
                        </div>

                        <div className="code-line indent-1">
                            <span className="code-keyword">constructor</span>
                            <span className="code-bracket">{'() {'}</span>
                        </div>

                        <div className="code-line indent-2">
                            <span className="code-keyword">this</span>
                            <span className="code-bracket">.</span>
                            <span className="code-variable">name</span>
                            <span className="code-bracket"> = </span>
                            <span className="code-string">"Abdulrahman"</span>
                            <span className="code-bracket">;</span>
                        </div>

                        <div className="code-line indent-2">
                            <span className="code-keyword">this</span>
                            <span className="code-bracket">.</span>
                            <span className="code-variable">role</span>
                            <span className="code-bracket"> = </span>
                            <TypeAnimation
                                sequence={[
                                    '"Full Stack Developer"',
                                    2000,
                                    '"Frontend Engineer"',
                                    2000,
                                    '"UI/UX Designer"',
                                    2000,
                                    '"Problem Solver"',
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                className="code-string typing-text"
                                repeat={Infinity}
                            />
                            <span className="code-bracket">;</span>
                        </div>

                        <div className="code-line indent-2">
                            <span className="code-keyword">this</span>
                            <span className="code-bracket">.</span>
                            <span className="code-variable">passion</span>
                            <span className="code-bracket"> = </span>
                            <span className="code-string">"Building amazing web experiences"</span>
                            <span className="code-bracket">;</span>
                        </div>

                        <div className="code-line indent-2">
                            <span className="code-keyword">this</span>
                            <span className="code-bracket">.</span>
                            <span className="code-variable">location</span>
                            <span className="code-bracket"> = </span>
                            <span className="code-string">"Cairo, Egypt"</span>
                            <span className="code-bracket">;</span>
                        </div>

                        <div className="code-line indent-2">
                            <span className="code-keyword">this</span>
                            <span className="code-bracket">.</span>
                            <span className="code-variable">experience</span>
                            <span className="code-bracket"> = </span>
                            <span className="code-string">"2+ years"</span>
                            <span className="code-bracket">;</span>
                        </div>

                        <div className="code-line indent-1">
                            <span className="code-bracket">{'}'}</span>
                        </div>

                        <div className="code-line">
                            <span className="code-bracket">{'}'}</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="hero-cta">
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsCVViewerOpen(true)}
                        >
                            <span className="">viewCV</span>
                            <span className="code-bracket">()</span>
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => scrollToSection('projects')}
                        >
                            <span className="code-function">viewProjects</span>
                            <span className="code-bracket">()</span>
                        </button>
                    </div>

                </div>

                {/* Decorative Elements */}
                <div className="hero-decoration">
                    <div className="code-snippet snippet-1">
                        <span className="code-comment">{'// Crafting digital solutions'}</span>
                    </div>

                    <div className="code-snippet snippet-3">
                        <span className="code-function">console</span>
                        <span className="code-bracket">.</span>
                        <span className="code-function">log</span>
                        <span className="code-bracket">(</span>
                        <span className="code-string">"Hello, World!"</span>
                        <span className="code-bracket">);</span>
                    </div>
                </div>
            </div>

            {/* CV Viewer Modal */}
            <CVViewer isOpen={isCVViewerOpen} onClose={() => setIsCVViewerOpen(false)} />

            {/* Terminal */}
            <Terminal
                isOpen={isTerminalOpen}
                onClose={() => setIsTerminalOpen(false)}
                openCVViewer={() => setIsCVViewerOpen(true)}
                scrollToSection={scrollToSection}
            />


            {/* Terminal Toggle Button */}
            <button
                className="terminal-toggle-btn"
                onClick={() => setIsTerminalOpen(true)}
                title="Open Terminal (Press ~ key)"
            >
                <span className="terminal-toggle-icon">&gt;_</span>
            </button>
        </section>
    );
};

export default Hero;
