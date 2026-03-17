import { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { getLoveCount, addLove } from '../../../services/api';
import './LoveButton.css';

const LoveButton = () => {
    const [count, setCount] = useState(0);
    const [isLoved, setIsLoved] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const fetchInitialCount = async () => {
            try {
                const data = await getLoveCount();
                setCount(data.count);
            } catch (error) {
                console.error('Failed to fetch loves:', error);
            }
        };

        fetchInitialCount();

        const hasLoved = localStorage.getItem('portfolio_loved');
        if (hasLoved) setIsLoved(true);
    }, []);

    const createParticles = (e) => {
        const button = e.currentTarget;
        const particleCount = 12;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = 50 + Math.random() * 50;
            const x = Math.cos(angle) * velocity;
            const y = Math.sin(angle) * velocity;

            particle.style.setProperty('--x', `${x}px`);
            particle.style.setProperty('--y', `${y}px`);

            // Random size
            const size = 5 + Math.random() * 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            // Random color variation
            const colors = ['#ff4d4d', '#ff7070', '#ffb3b3', '#c792ea'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            button.appendChild(particle);

            // Cleanup
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    };

    const handleLoveClick = async (e) => {
        createParticles(e);
        if (!isLoved) {
            setCount(prev => prev + 1);
            setIsAnimating(true);
            setIsLoved(true);
            localStorage.setItem('portfolio_loved', 'true');


            try {
                await addLove();
                setTimeout(() => setIsAnimating(false), 500);
            } catch (error) {
                console.error('Failed to save love:', error);
                setCount(prev => Math.max(0, prev - 1));
                setIsAnimating(false);
            }
        }
    };

    return (
        <div className="love-button-container" data-aos="fade-up">
            <span className="love-hint">{'// And finally if you liked this portfolio, you can give it a heart'}</span>
            <button
                className={`love-button ${isLoved ? 'loved' : ''} ${isAnimating ? 'animate' : ''}`}
                onClick={handleLoveClick}
                aria-label="Send love"
                title="Spread some love!"
            >
                <FaHeart className="heart-icon" />
            </button>
            <div className="love-count-wrapper">
                <span className="love-count-bracket">{'['}</span>
                <span className="love-count-label">loves</span>
                <span className="love-count-bracket">{': '}</span>
                <span className="love-count-value">{count}</span>
                <span className="love-count-bracket">{']'}</span>
            </div>
        </div>
    );
};

export default LoveButton;
