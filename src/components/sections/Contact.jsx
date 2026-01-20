import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPaperPlane, FaFacebook } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset status after 3 seconds
            setTimeout(() => setSubmitStatus(null), 3000);
        }, 1500);
    };

    return (
        <section className="contact" id="contact">
            <div className="contact-container container">
                {/* Section Header */}
                <div className="section-header" data-aos="fade-up">
                    <span className="code-comment">// Let's Connect</span>
                    <h2 className="section-title">
                        <span className="code-keyword">async function</span>{' '}
                        <span className="code-function">sendMsg</span>
                        <span className="code-bracket">(</span>
                        <span className="code-variable">data</span>
                        <span className="code-bracket">) {'{'}</span>
                    </h2>
                </div>

                <div className="contact-content">
                    {/* Contact Info (Left) */}
                    <div className="contact-info" data-aos="fade-right">
                        <h3 className="info-title">
                            <span className="code-keyword">const</span>{' '}
                            <span className="code-variable">socials</span>{' '}
                            <span className="code-bracket">= {'{'}</span>
                        </h3>

                        <div className="social-links">
                            <a href="https://github.com/3bdoKH" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaGithub className="social-icon" />
                                <span className="social-text">github.com/3bdoKH</span>
                            </a>
                            <a href="https://www.linkedin.com/in/abdo-khairy-391801305/" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaLinkedin className="social-icon" />
                                <span className="social-text">linkedin.com/abdo-khairy</span>
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=100022343641360" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaFacebook className="social-icon" />
                                <span className="social-text">facebook.com/abdo-khairy</span>
                            </a>
                            <a href="mailto:the.abdo.kh@gmail.com" className="social-link">
                                <FaEnvelope className="social-icon" />
                                <span className="social-text">the.abdo.kh@gmail.com</span>
                            </a>
                        </div>

                        <div className="info-footer">
                            <span className="code-bracket">{'}'}</span>;
                        </div>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="contact-form-wrapper" data-aos="fade-left">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">
                                    <span className="code-variable">name</span>: <span className="code-string">"</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="code-string">"</span>,
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <span className="code-variable">email</span>: <span className="code-string">"</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="code-string">"</span>,
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <span className="code-variable">message</span>: <span className="code-string">"</span>
                                </label>
                                <textarea
                                    name="message"
                                    className="form-textarea"
                                    placeholder="Hello, I'd like to work with you..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <span className="code-string">"</span>
                            </div>

                            <button
                                type="submit"
                                className={`submit-btn ${isSubmitting ? 'loading' : ''} ${submitStatus === 'success' ? 'success' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="btn-text">await sending...</span>
                                ) : submitStatus === 'success' ? (
                                    <span className="btn-text">msg.sent()</span>
                                ) : (
                                    <>
                                        <span className="btn-text">await response</span>
                                        <FaPaperPlane className="btn-icon" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Section Footer */}
                <div className="section-footer" data-aos="fade-up">
                    <span className="code-bracket">{'}'}</span>
                </div>
            </div>

            {/* Footer / Copyright */}
            <footer className="footer">
                <div className="footer-content container">
                    <p className="copyright">
                        <span className="code-comment">// Designed & Built by Your Name</span>
                    </p>
                    <p className="year">
                        <span className="code-keyword">const</span> <span className="code-variable">YEAR</span> = <span className="code-number">{new Date().getFullYear()}</span>;
                    </p>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
