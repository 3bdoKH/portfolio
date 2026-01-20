import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCode, FaLaptopCode, FaCoffee, FaProjectDiagram } from 'react-icons/fa';
import './About.css';

const About = () => {
    const [stats, setStats] = useState({
        experience: 0,
        projects: 0,
        clients: 0,
        coffee: 0
    });

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });

        // Animate counters
        const targetStats = {
            experience: 5,
            projects: 50,
            clients: 30,
            coffee: 1000
        };

        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setStats({
                experience: Math.floor(targetStats.experience * progress),
                projects: Math.floor(targetStats.projects * progress),
                clients: Math.floor(targetStats.clients * progress),
                coffee: Math.floor(targetStats.coffee * progress)
            });

            if (currentStep >= steps) {
                setStats(targetStats);
                clearInterval(timer);
            }
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="about" id="about">
            <div className="about-container container">
                {/* Section Header */}
                <div className="section-header" data-aos="fade-up">
                    <span className="code-comment">// About Me</span>
                    <h2 className="section-title">
                        <span className="code-keyword">const</span>{' '}
                        <span className="code-variable">developer</span>{' '}
                        <span className="code-bracket">= {'{'}</span>
                    </h2>
                </div>

                {/* About Content */}
                <div className="about-content">
                    {/* Left Side - Info */}
                    <div className="about-info" data-aos="fade-right">
                        <div className="info-block">
                            <div className="code-line">
                                <span className="code-property">name</span>
                                <span className="code-bracket">: </span>
                                <span className="code-string">"Your Name"</span>
                                <span className="code-bracket">,</span>
                            </div>

                            <div className="code-line">
                                <span className="code-property">role</span>
                                <span className="code-bracket">: </span>
                                <span className="code-string">"Full-Stack Developer"</span>
                                <span className="code-bracket">,</span>
                            </div>

                            <div className="code-line">
                                <span className="code-property">location</span>
                                <span className="code-bracket">: </span>
                                <span className="code-string">"Your Location"</span>
                                <span className="code-bracket">,</span>
                            </div>

                            <div className="code-line">
                                <span className="code-property">email</span>
                                <span className="code-bracket">: </span>
                                <span className="code-string">"your.email@example.com"</span>
                                <span className="code-bracket">,</span>
                            </div>

                            <div className="code-line">
                                <span className="code-property">available</span>
                                <span className="code-bracket">: </span>
                                <span className="code-boolean">true</span>
                                <span className="code-bracket">,</span>
                            </div>

                            <div className="code-line">
                                <span className="code-property">bio</span>
                                <span className="code-bracket">: </span>
                                <span className="code-string">"</span>
                            </div>

                            <div className="bio-text">
                                <p>
                                    Passionate web developer with expertise in building modern,
                                    scalable applications. I love turning complex problems into
                                    simple, beautiful, and intuitive solutions.
                                </p>
                                <p>
                                    When I'm not coding, you'll find me exploring new technologies,
                                    contributing to open-source projects, or sharing knowledge with
                                    the developer community.
                                </p>
                            </div>

                            <div className="code-line">
                                <span className="code-string">"</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Stats */}
                    <div className="about-stats" data-aos="fade-left">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <FaCode />
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-number">{stats.experience}+</h3>
                                <p className="stat-label">Years Experience</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <FaProjectDiagram />
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-number">{stats.projects}+</h3>
                                <p className="stat-label">Projects Completed</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <FaLaptopCode />
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-number">{stats.clients}+</h3>
                                <p className="stat-label">Happy Clients</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon">
                                <FaCoffee />
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-number">{stats.coffee}+</h3>
                                <p className="stat-label">Cups of Coffee</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Footer */}
                <div className="section-footer" data-aos="fade-up">
                    <span className="code-bracket">{'}'}</span>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="about-decoration">
                <div className="decoration-circle circle-1"></div>
                <div className="decoration-circle circle-2"></div>
                <div className="decoration-circle circle-3"></div>
            </div>
        </section>
    );
};

export default About;
