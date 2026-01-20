import React, { useEffect, useState, useRef } from 'react';
import './Cursor.css';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        // Hide default cursor
        document.body.style.cursor = 'none';

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;

            // Move the main small dot instantly
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }

            // Move the follower ring with a slight delay (handled by CSS transition usually, or JS for better physics)
            // Here we use simple CSS transition on the class, but we update position instantly
            if (followerRef.current) {
                followerRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
            }
        };

        const onMouseEnter = () => setHovered(true);
        const onMouseLeave = () => setHovered(false);

        // Add event listeners for hover effects on clickable elements
        const clickableElements = document.querySelectorAll(
            'a, button, input, textarea, .project-card, .skill-card, .navbar-logo'
        );

        clickableElements.forEach((el) => {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
        });

        // Handle global mouse move
        document.addEventListener('mousemove', onMouseMove);

        // Cleanup
        return () => {
            document.body.style.cursor = 'auto';
            document.removeEventListener('mousemove', onMouseMove);
            clickableElements.forEach((el) => {
                el.removeEventListener('mouseenter', onMouseEnter);
                el.removeEventListener('mouseleave', onMouseLeave);
            });
        };
    }, []);

    // Re-run listener attachment when DOM updates (simple approach for this SPA)
    // In a real comprehensive app, you might use a MutationObserver or Context
    useEffect(() => {
        const handleHover = () => setHovered(true);
        const handleUnhover = () => setHovered(false);

        const attachListeners = () => {
            const clickables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .navbar-logo, .tech-item');
            clickables.forEach(el => {
                el.addEventListener('mouseenter', handleHover);
                el.addEventListener('mouseleave', handleUnhover);
            });
        };

        // Attach initially and maybe on scroll/click to catch new elements? 
        // For now, periodic check or just checking on mount is usually okay for static content
        // We'll set a timeout to attach after render
        const timer = setTimeout(attachListeners, 1000);
        return () => clearTimeout(timer);
    });

    return (
        <>
            <div
                ref={cursorRef}
                className={`custom-cursor-dot ${hovered ? 'hovered' : ''}`}
            />
            <div
                ref={followerRef}
                className={`custom-cursor-follower ${hovered ? 'hovered' : ''}`}
            />
        </>
    );
};

export default Cursor;
