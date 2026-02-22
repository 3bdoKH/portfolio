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
            experience: 2,
            projects: 10,
            clients: 10,
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

    const statItems = [
        { icon: FaCode, value: stats.experience, suffix: '+', label: 'years_experience' },
        { icon: FaProjectDiagram, value: stats.projects, suffix: '+', label: 'projects_completed' },
        { icon: FaLaptopCode, value: stats.clients, suffix: '+', label: 'happy_clients' },
        { icon: FaCoffee, value: stats.coffee, suffix: '+', label: 'cups_of_coffee' },
    ];

    return (
        <section className="about" id="about">
            <div className="about-container container">
                {/* Section Header */}
                <div className="section-header" data-aos="fade-up">
                    <span className="code-comment">{'// About Me'}</span>
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
                        <div className="about-file-header">
                            <span className="code-comment">{'// about.js'}</span>
                            <div className="about-file-dots">
                                <span className="dot dot-close"></span>
                                <span className="dot dot-minimize"></span>
                                <span className="dot dot-maximize"></span>
                            </div>
                        </div>

                        <div className="info-block">
                            <div className="code-line">
                                <span className="code-property">name</span>
                                <span className="code-bracket">: </span>
                                <span className="code-string">"Abdulrahman Khairy"</span>
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
                                <span className="code-string">"Egypt"</span>
                                <span className="code-bracket">,</span>
                            </div>

                            <div className="code-line">
                                <span className="code-property">email</span>
                                <span className="code-bracket">: </span>
                                <span className="code-string">"the.abdo.kh@gmail.com"</span>
                                <span className="code-bracket">,</span>
                            </div>

                            <div className="code-line">
                                <span className="code-property">available</span>
                                <span className="code-bracket">: </span>
                                <span className="code-boolean">true</span>
                                <span className="code-bracket">,</span>
                            </div>

                            {/* JSDoc-style bio block */}
                            <div className="about-jsdoc">
                                <div className="jsdoc-open">
                                    <span className="code-comment">{'/**'}</span>
                                </div>
                                <div className="jsdoc-line">
                                    <span className="code-comment">{' * '}</span>
                                    <span className="jsdoc-text">
                                        Passionate web developer with expertise in building modern,
                                        scalable applications. I love turning complex problems into
                                        simple, beautiful, and intuitive solutions.
                                    </span>
                                </div>
                                <div className="jsdoc-line">
                                    <span className="code-comment">{' * '}</span>
                                    <span className="jsdoc-text">
                                        When I'm not coding, you'll find me exploring new technologies,
                                        contributing to open-source projects, or sharing knowledge with
                                        the developer community.
                                    </span>
                                </div>
                                <div className="jsdoc-close">
                                    <span className="code-comment">{' */'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Stats & Timeline */}
                    <div className="about-right" data-aos="fade-left">
                        {/* Stats Grid */}
                        <div className="about-stats">
                            {statItems.map((item, index) => {
                                const IconComp = item.icon;
                                return (
                                    <div className="stat-card" key={index}>
                                        <div className="stat-card-inner">
                                            <div className="stat-card-header">
                                                <IconComp className="stat-card-icon" />
                                                <span className="code-comment">{'// ' + item.label}</span>
                                            </div>
                                            <div className="stat-number-line">
                                                <span className="code-keyword">return</span>{' '}
                                                <span className="code-number">{item.value}{item.suffix}</span>
                                                <span className="code-bracket">;</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Timeline Section */}
                        <div className="timeline-section-about">
                            <div className="timeline-header-about">
                                <span className="code-comment">{"// Journey Highlights"}</span>
                            </div>
                            <div className="timeline-about">
                                <div className="timeline-item-about">
                                    <div className="timeline-dot-about"></div>
                                    <div className="timeline-content-about">
                                        <div className="timeline-year-about">2025</div>
                                        <div className="timeline-title-about">
                                            <span className="code-keyword">const </span>
                                            <span className="code-function">fullStackMastery</span>
                                            <span className="code-bracket"> = </span>
                                            <span className="code-string">"achieved"</span>
                                            <span className="code-bracket">;</span>
                                        </div>
                                        <div className="timeline-desc-about">
                                            Specialized in MERN stack development, building scalable web applications
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-item-about">
                                    <div className="timeline-dot-about"></div>
                                    <div className="timeline-content-about">
                                        <div className="timeline-year-about">2024</div>
                                        <div className="timeline-title-about">
                                            <span className="code-keyword">const </span>
                                            <span className="code-function">professionalDev</span>
                                            <span className="code-bracket"> = </span>
                                            <span className="code-string">"started"</span>
                                            <span className="code-bracket">;</span>
                                        </div>
                                        <div className="timeline-desc-about">
                                            Started working on real-world projects and client solutions
                                        </div>
                                    </div>
                                </div>

                                <div className="timeline-item-about">
                                    <div className="timeline-dot-about"></div>
                                    <div className="timeline-content-about">
                                        <div className="timeline-year-about">2023</div>
                                        <div className="timeline-title-about">
                                            <span className="code-keyword">const </span>
                                            <span className="code-function">codingJourney</span>
                                            <span className="code-bracket"> = </span>
                                            <span className="code-string">"begin()"</span>
                                            <span className="code-bracket">;</span>
                                        </div>
                                        <div className="timeline-desc-about">
                                            Discovered passion for web development and started learning
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Footer */}
                <div className="section-footer" data-aos="fade-up">
                    <span className="code-bracket">{'}'}</span>
                </div>
            </div>

            {/* Background Decoration — floating code snippets */}
            <div className="about-decoration">
                <div className="about-code-snippet snippet-a">
                    <span className="code-comment">{'// name: "Abdulrahman"'}</span>
                </div>
                <div className="about-code-snippet snippet-b">
                    <span className="code-keyword">import</span>
                    <span className="code-function"> passion </span>
                    <span className="code-keyword">from</span>
                    <span className="code-string"> 'life'</span>
                    <span className="code-bracket">;</span>
                </div>
                <div className="about-code-snippet snippet-c">
                    <span className="code-comment">{'// location: "Egypt"'}</span>
                </div>
            </div>
        </section>
    );
};

export default About;
