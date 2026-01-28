import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import ParticlesBg from 'particles-bg';
import { useAnalytics } from '../../context/AnalyticsContext';
import profile from '../../images/profile.jpg';
import './Hero.css';

const Hero = () => {
    const [showCursor, setShowCursor] = useState(true);
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
                            onClick={() => scrollToSection('projects')}
                        >
                            <span className="code-function">viewProjects</span>
                            <span className="code-bracket">()</span>
                        </button>

                        <button
                            className="btn btn-secondary"
                            onClick={() => scrollToSection('contact')}
                        >
                            <span className="code-function">contactMe</span>
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
        </section>
    );
};

export default Hero;
