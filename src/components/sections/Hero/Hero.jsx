import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import ParticlesBg from 'particles-bg';
import { useAnalytics } from '../../../context/AnalyticsContext';
import CVViewer from '../../ui/CV/CVViewer';
import Terminal from '../../cli/Terminal';
import ThemeSwitch from '../../ui/ThemeSwitch/ThemeSwitch';
import MatrixRain from '../../ui/MatrixRain/MatrixRain';
import RunawayButton from '../../ui/RunawayButton/RunawayButton';
import profile from '../../../images/profile.jpg';
import { socials } from '../../../data/socials';
import './Hero.css';

const Hero = () => {
    const [isCVViewerOpen, setIsCVViewerOpen] = useState(false);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isMatrixOpen, setIsMatrixOpen] = useState(false);
    const { trackPageView } = useAnalytics();
    const { trackSocialLinksClick } = useAnalytics();

    useEffect(() => {
        trackPageView('/');
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
            <ParticlesBg type="cobweb" bg={{ position: 'absolute', zIndex: 0, width: '100%', height: '100%' }} color="#00ff88" num={80} />
            <div className="hero-container container">
                <div className="hero-content">
                    <div className='profile-wrapper'>
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
                                        <span className="hero-status-text">Available</span>
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
                            {socials.slice(0, 4).map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link-hero"
                                    title={link.name}
                                    onClick={() => trackSocialLinksClick(link.name)}
                                >
                                    {link.icon}
                                </a>
                            ))}
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

                        <RunawayButton scrollToSection={scrollToSection} />
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
            <CVViewer isOpen={isCVViewerOpen} onClose={() => setIsCVViewerOpen(false)} />
            <Terminal
                isOpen={isTerminalOpen}
                onClose={() => setIsTerminalOpen(false)}
                openCVViewer={() => setIsCVViewerOpen(true)}
                scrollToSection={scrollToSection}
                triggerMatrix={() => setIsMatrixOpen(true)}
            />
            <MatrixRain isOpen={isMatrixOpen} onClose={() => setIsMatrixOpen(false)} />
            <ThemeSwitch />
            {/* <button
                className="terminal-toggle-btn"
                onClick={() => setIsTerminalOpen(true)}
                title="Open Terminal (Press ~ key)"
            >
                <span className="terminal-toggle-icon">&gt;_</span>
            </button> */}
        </section>
    );
};

export default Hero;
