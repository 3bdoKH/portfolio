import { useEffect } from 'react';
import { FaExternalLinkAlt, FaGithub, FaTimes, FaFolder } from 'react-icons/fa';
import './Projects.css';

const ProjectModal = ({ isOpen, project, onClose, onProjectClick }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !project) return null;

    const tags = project.tags || [];

    return (
        <div className="project-modal-overlay" onClick={onClose} role="presentation">
            <div className="project-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
                <div className="project-modal-header">
                    <div className="project-modal-heading">
                        <FaFolder className="folder-icon" />
                        <span className="code-comment">{'// '}</span>
                        <span className="project-modal-file">{project.title}.js</span>
                    </div>
                    <button type="button" className="project-modal-close" onClick={onClose} aria-label="Close project details">
                        <FaTimes />
                    </button>
                </div>

                <div className="project-modal-body">
                    <div className="project-modal-media">
                        <img src={project.image} alt={project.displayTitle} className="project-modal-image" />
                    </div>

                    <div className="project-modal-content">
                        <h3 id="project-modal-title" className="project-modal-title">
                            <span className="code-keyword">const</span> <span className="code-variable">project</span> <span className="code-bracket">=</span> <span className="code-string">&quot;{project.displayTitle}&quot;</span>
                        </h3>

                        <p className="project-modal-description">{project.description}</p>

                        {tags.length > 0 && (
                            <div className="project-modal-tags">
                                {tags.map((tag) => (
                                    <span key={tag} className="project-modal-tag">{tag}</span>
                                ))}
                            </div>
                        )}

                        <div className="project-modal-actions">
                            {project.links?.live && (
                                <a
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-modal-link"
                                    onClick={() => onProjectClick(project)}
                                >
                                    <FaExternalLinkAlt />
                                    <span>Live Demo</span>
                                </a>
                            )}
                            {project.links?.github && (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-modal-link"
                                >
                                    <FaGithub />
                                    <span>Source Code</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;