import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPaperPlane } from 'react-icons/fa';
import './Contact.css';
import { socials } from '../../data/socials';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Import API service and analytics
            const { submitContactForm, trackEvent } = await import('../../services/api');

            // Submit to backend
            await submitContactForm(formData);

            // Track successful submission
            trackEvent('contact_submit', {
                success: true,
                timestamp: new Date().toISOString()
            });

            // Success
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error('Contact form error:', error);

            // Track failed submission
            const { trackEvent } = await import('../../services/api');
            trackEvent('contact_submit', {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            });

            setSubmitStatus('error');

            // Reset error status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact" id="contact">
            <div className="contact-container container">
                {/* Section Header */}
                <div className="section-header" data-aos="fade-up">
                    <span className="code-comment">{'// Let\'s Connect'}</span>
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
                            {socials.map((social) => (
                                <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="social-link">
                                    {social.icon}
                                    <span className="social-text">{social.name}</span>
                                </a>
                            ))}
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
                                    className="form-input-contact"
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
                                    className="form-input-contact"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="code-string">"</span>,
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <span className="code-variable">msg</span> : <span className="code-string">"</span>
                                </label>
                                <textarea
                                    name="message"
                                    className="form-textarea-contact"
                                    placeholder="Hello, I'd like to work with you..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <span className="code-string">"</span>
                            </div>

                            <button
                                type="submit"
                                className={`submit-btn ${isSubmitting ? 'loading' : ''} ${submitStatus === 'success' ? 'success' : ''} ${submitStatus === 'error' ? 'error' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="btn-text">await sending...</span>
                                ) : submitStatus === 'success' ? (
                                    <span className="btn-text">✓ msg.sent()</span>
                                ) : submitStatus === 'error' ? (
                                    <span className="btn-text">✗ Error! Try again</span>
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
                        <span className="code-comment">{'// Designed & Built by Abdulrahman Khairy'}</span>
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
