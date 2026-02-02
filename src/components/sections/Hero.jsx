import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import ParticlesBg from 'particles-bg';
import { useAnalytics } from '../../context/AnalyticsContext';
import CVViewer from '../ui/CVViewer';
import profile from '../../images/profile.jpg';
import './Hero.css';

const Hero = () => {
    const [showCursor, setShowCursor] = useState(true);
    const [isCVViewerOpen, setIsCVViewerOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
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

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(progress, 100));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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

            {/* Scroll Indicator - Circular Progress */}
            <div className="scroll-indicator">
                <svg className="scroll-progress-ring" width="80" height="80">
                    <circle
                        className="scroll-progress-ring-circle-bg"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="4"
                        fill="transparent"
                        r="36"
                        cx="40"
                        cy="40"
                    />
                    <circle
                        className="scroll-progress-ring-circle"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        fill="transparent"
                        r="36"
                        cx="40"
                        cy="40"
                        style={{
                            strokeDasharray: `${2 * Math.PI * 36}`,
                            strokeDashoffset: `${2 * Math.PI * 36 * (1 - scrollProgress / 100)}`
                        }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="var(--accent-secondary)" />
                            <stop offset="100%" stopColor="var(--accent-primary)" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="scroll-percentage">top({`${Math.round(scrollProgress)}%`})</div>
            </div>
        </section>
    );
};

export default Hero;
