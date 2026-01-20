import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { skills, technologies } from '../../data/skills';
import './Skills.css';

const Skills = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }, []);

    return (
        <section className="skills" id="skills">
            <div className="skills-container container">
                {/* Section Header */}
                <div className="section-header" data-aos="fade-up">
                    <span className="code-comment">// Web Development Expertise</span>
                    <h2 className="section-title">
                        <span className="code-keyword">const</span>{' '}
                        <span className="code-variable">skills</span>{' '}
                        <span className="code-bracket">= [</span>
                    </h2>
                </div>

                {/* Skills Grid */}
                <div className="skills-grid">
                    {skills.map((skill, index) => {
                        const IconComponent = skill.icon;
                        return (
                            <div
                                key={skill.id}
                                className="skill-card"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="skill-card-inner">
                                    {/* Card Header */}
                                    <div className="skill-header">
                                        <IconComponent className="skill-icon" />
                                    </div>

                                    {/* Card Content */}
                                    <div className="skill-content">
                                        <h3 className="skill-title">{skill.title}</h3>
                                        <div className="skill-description">
                                            {skill.description.map((line, idx) => (
                                                <p key={idx} className="skill-desc-line">
                                                    <span className="code-comment">//</span> {line}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hover Effect Overlay */}
                                    <div className="skill-overlay">
                                        <span className="overlay-text">{skill.displayTitle}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Section Footer */}
                <div className="section-footer" data-aos="fade-up">
                    <span className="code-bracket">];</span>
                </div>

                {/* Technologies Section */}
                <div className="technologies-section" data-aos="fade-up">
                    <div className="tech-header">
                        <span className="code-comment">// Technologies & Tools</span>
                        <h3 className="tech-title">
                            <span className="code-keyword">const</span>{' '}
                            <span className="code-variable">technologies</span>{' '}
                            <span className="code-bracket">= {'{'}</span>
                        </h3>
                    </div>

                    {/* Technology Sliders */}
                    <div className="tech-sliders">
                        {Object.entries(technologies).map(([category, techs], index) => (
                            <div key={category} className="tech-slider-wrapper" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="tech-category">
                                    <span className="code-variable">{category}</span>
                                    <span className="code-bracket">: [</span>
                                </div>
                                <div className="tech-slider">
                                    <div className="tech-track">
                                        {/* Duplicate items for infinite scroll effect */}
                                        {[...techs, ...techs].map((tech, idx) => {
                                            const TechIcon = tech.icon;
                                            return (
                                                <div key={idx} className="tech-item">
                                                    <div className="tech-icon-wrapper">
                                                        <TechIcon className="tech-icon" style={{ color: tech.color }} />
                                                    </div>
                                                    <span className="tech-name">{tech.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="tech-footer">
                        <span className="code-bracket">{'}'}</span>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="skills-decoration">
                <div className="decoration-line line-1"></div>
                <div className="decoration-line line-2"></div>
                <div className="decoration-line line-3"></div>
            </div>
        </section>
    );
};

export default Skills;
