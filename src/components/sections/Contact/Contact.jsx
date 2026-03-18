import { useState } from 'react';
import { FaPaperPlane, FaCheck, FaTimes } from 'react-icons/fa';
import { socials } from '../../../data/socials';
import LoveButton from '../../ui/LoveButton/LoveButton';
import { useAnalytics } from '../../../context/AnalyticsContext';
import './Contact.css';

const Contact = () => {
    const { trackContactFormSubmit } = useAnalytics();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [message, setMessage] = useState('');


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
            const { submitContactForm } = await import('../../../services/contactService');
            const res = await submitContactForm(formData);
            setMessage(res);

            // Track successful submission
            trackContactFormSubmit(true);

            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error('Contact form error:', error);

            // Track failed submission
            trackContactFormSubmit(false, error.message);

            setSubmitStatus('error');

            // Reset status after 5 seconds
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
                        {/* macOS-style file header */}
                        <div className="contact-file-header">
                            <div className="contact-file-dots">
                                <span className="dot dot-close"></span>
                                <span className="dot dot-minimize"></span>
                                <span className="dot dot-maximize"></span>
                            </div>
                            <span className="code-comment">{'// socials.js'}</span>
                        </div>
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
                        {/* macOS-style file header */}
                        <div className="contact-file-header">
                            <div className="contact-file-dots">
                                <span className="dot dot-close"></span>
                                <span className="dot dot-minimize"></span>
                                <span className="dot dot-maximize"></span>
                            </div>
                            <span className="code-comment">{'// message.js'}</span>
                        </div>
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

                            {submitStatus === 'success' ? (
                                <div className="success-message-contact">
                                    <span>{message.message}</span>
                                </div>
                            ) : submitStatus === 'error' ? (
                                <div className="error-message-contact">
                                    <span>"Only English, sorry for that still working on it..."</span>
                                </div>
                            ) : (
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
                            )}
                        </form>
                    </div>
                </div>

                {/* Section Footer */}
                <div className="section-footer" data-aos="fade-up">
                    <span className="code-bracket">{'}'}</span>
                </div>

                {/* Contact Me If... */}
                <div className="contact-me-if" data-aos="fade-up">
                    <div className="cmi-header">
                        <span className="code-comment">{'// contact me if...'}</span>
                    </div>
                    <div className="cmi-list">
                        <div className="cmi-item cmi-yes">
                            <FaCheck className="cmi-icon" />
                            <span>you need a full-stack app built by someone who will over-engineer it for free</span>
                        </div>
                        <div className="cmi-item cmi-yes">
                            <FaCheck className="cmi-icon" />
                            <span>you have a towing company that needs a website. I have experience. too much experience.</span>
                        </div>
                        <div className="cmi-item cmi-no">
                            <FaTimes className="cmi-icon" />
                            <span>you're a recruiter asking for "5 years experience" in a framework that's 2 years old .</span>
                        </div>
                        <div className="cmi-item cmi-no">
                            <FaTimes className="cmi-icon" />
                            <span>you want to tell me my code is "not scalable". it works. leave me alone.</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Copyright */}
            <footer className="footer">
                <div className="footer-content container">
                    <LoveButton />
                    <div>
                        <span className='syntax-bracket'>{'{ '}</span>
                        <span className='syntax-variable'>{'"developed_by"'}</span>
                        <span className='syntax-string'>{' : '}</span>
                        <span className='syntax-variable'>{'"Abdulrahman Khairy"'}</span>
                        <span className='syntax-bracket'>{' }'}</span>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
