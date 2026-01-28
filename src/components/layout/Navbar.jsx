import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [logoClickCount, setLogoClickCount] = useState(0);
    const clickTimeoutRef = useRef(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position
            const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const handleLogoClick = () => {
        const newCount = logoClickCount + 1;
        setLogoClickCount(newCount);

        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
        }

        clickTimeoutRef.current = setTimeout(() => {
            setLogoClickCount(0);
        }, 1000);

        if (newCount >= 5) {
            setLogoClickCount(0);
            navigate('/admin/dashboard');
        } else {
            scrollToSection('home');
        }
    };

    const navItems = [
        { id: 'home', label: 'Home', tag: 'home' },
        { id: 'about', label: 'About', tag: 'about' },
        { id: 'skills', label: 'Skills', tag: 'skills' },
        { id: 'projects', label: 'Projects', tag: 'projects' },
        { id: 'experience', label: 'Experience', tag: 'experience' },
        { id: 'contact', label: 'Contact', tag: 'contact' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container container">
                {/* Logo */}
                <div className="navbar-logo" onClick={handleLogoClick}>
                    <span className="code-bracket">{'<'}</span>
                    <span className="logo-text">Abdo</span>
                    <span className="code-bracket">{' />'}</span>
                    <span className="cursor-blink">_</span>
                </div>

                {/* Desktop Navigation */}
                <ul className="nav-menu">
                    {navItems.map((item, index) => (
                        <li key={item.id} className="nav-item" style={{ animationDelay: `${index * 0.1}s` }}>
                            <button
                                onClick={() => scrollToSection(item.id)}
                                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                            >
                                <span className="code-bracket">{'<'}</span>
                                <span className="nav-text">{item.label}</span>
                                <span className="code-bracket">{' />'}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <div
                    className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="line line1"></span>
                    <span className="line line2"></span>
                    <span className="line line3"></span>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-header">
                    <span className="code-comment">{'// Navigation Menu'}</span>
                </div>
                <ul className="mobile-nav-list">
                    {navItems.map((item, index) => (
                        <li key={item.id} className="mobile-nav-item" style={{ animationDelay: `${index * 0.05}s` }}>
                            <button
                                onClick={() => scrollToSection(item.id)}
                                className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                            >
                                <span className="line-number">{String(index + 1).padStart(2, '0')}</span>
                                <span className="code-keyword">const</span>
                                <span className="code-variable"> {item.tag}</span>
                                <span className="code-bracket"> = </span>
                                <span className="code-string">"{item.label}"</span>
                                <span className="code-bracket">;</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="mobile-menu-footer">
                    <span className="code-bracket">{'}'}</span>
                </div>
            </div>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="mobile-overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;
