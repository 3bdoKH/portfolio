import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaExternalLinkAlt, FaFolder } from 'react-icons/fa';
import { projects } from '../../data/projects';
import './Projects.css';

const Projects = () => {

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }, []);

    return (
        <section className="projects" id="projects">
            <div className="projects-container container">
                {/* Section Header */}
                <div className="section-header" data-aos="fade-up">
                    <span className="code-comment">{'// Selected Projects'}</span>
                    <h2 className="section-title">
                        <span className="code-keyword">function</span>{' '}
                        <span className="code-function">viewProjects</span>
                        <span className="code-bracket">() {'{'}</span>
                    </h2>
                </div>

                {/* Projects Grid */}
                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="project-card-inner">
                                {/* Visual Header / Image */}
                                <div className="project-image-wrapper">
                                    <div className="project-folder-tab">
                                        <FaFolder className="folder-icon" />
                                        <span className="folder-name">{project.title}.js</span>
                                    </div>
                                    <img src={project.image} alt={project.displayTitle} className="project-image" />
                                    <div className="project-overlay">
                                        <div className="project-links">

                                            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="project-link">
                                                <FaExternalLinkAlt /> <span className="link-text">Demo</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="project-content">
                                    <h3 className="project-title">
                                        <span className="code-keyword">const</span>{' '}
                                        <span className="code-variable">project</span>{' '}
                                        <span className="code-bracket">=</span>{' '}
                                        <span className="code-string">"{project.displayTitle}"</span>
                                    </h3>

                                    <div className="project-description">
                                        <span className="code-comment">{'/**'}</span>
                                        <p className="desc-text"> * {project.description}</p>
                                        <span className="code-comment">{' */'}</span>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="project-tech">
                                        <span className="code-bracket">[</span>
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="tech-tag">
                                                <span className="code-string">'{tag}'</span>
                                                {i < project.tags.length - 1 && <span className="code-bracket">, </span>}
                                            </span>
                                        ))}
                                        <span className="code-bracket">]</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section Footer */}
                <div className="section-footer" data-aos="fade-up">
                    <span className="code-bracket">{'}'}</span>
                </div>
            </div>

            {/* Decoration */}
            <div className="projects-decoration">
                <div className="code-bg-text">return projects;</div>
            </div>
        </section>
    );
};

export default Projects;
