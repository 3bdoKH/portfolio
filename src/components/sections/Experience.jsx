import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { experience } from '../../data/experience';
import './Experience.css';

const Experience = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }, []);

    return (
        <section className="experience" id="experience">
            <div className="experience-container container">
                {/* Section Header */}
                <div className="section-header" data-aos="fade-up">
                    <span className="code-comment">{'// Work History'}</span>
                    <h2 className="section-title">
                        <span className="code-keyword">const</span>{' '}
                        <span className="code-variable">experience</span>{' '}
                        <span className="code-bracket">= [</span>
                    </h2>
                </div>

                {/* Experience Timeline */}
                <div className="timeline">
                    {experience.map((job, index) => (
                        <div
                            key={job.id}
                            className="timeline-item"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Timeline Connector */}
                            <div className="timeline-connector">
                                <div className="timeline-dot"></div>
                                <div className="timeline-line"></div>
                            </div>

                            {/* Content Card */}
                            <div className="timeline-content">
                                <div className="job-card">
                                    <div className="job-header">
                                        <div className="job-title-wrapper">
                                            <span className="code-keyword">const</span>{' '}
                                            <span className="code-function">{job.company.replace(/\s/g, '')}</span>
                                            <span className="code-bracket"> = {'{'}</span>
                                        </div>
                                        <span className="job-period code-comment">{'// ' + job.period}</span>
                                    </div>

                                    <div className="job-body">
                                        <div className="code-line">
                                            <span className="code-property">role</span>: <span className="code-string">"{job.role}"</span>,
                                        </div>
                                        <div className="code-line">
                                            <span className="code-property">description</span>: <span className="code-bracket">[</span>
                                        </div>

                                        {job.description.map((desc, i) => (
                                            <div key={i} className="code-line indent">
                                                <span className="code-string">"{desc}"</span>,
                                            </div>
                                        ))}

                                        <div className="code-line">
                                            <span className="code-bracket">]</span>,
                                        </div>

                                        <div className="code-line">
                                            <span className="code-property">stack</span>: <span className="code-bracket">[</span>
                                            {job.tech.map((t, i) => (
                                                <span key={i}>
                                                    <span className="code-string">"{t}"</span>
                                                    {i < job.tech.length - 1 && <span className="code-bracket">, </span>}
                                                </span>
                                            ))}
                                            <span className="code-bracket">]</span>
                                        </div>
                                    </div>

                                    <div className="job-footer">
                                        <span className="code-bracket">{'}'}</span>;
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section Footer */}
                <div className="section-footer" data-aos="fade-up">
                    <span className="code-bracket">];</span>
                </div>
            </div>
        </section>
    );
};

export default Experience;
