import { useState, useCallback, useRef } from 'react';
import './RunawayButton.css';

const DODGE_LIMIT = 5;

const getRandomPosition = () => {
    const padding = 80; // px from edge
    const maxX = window.innerWidth - padding * 2;
    const maxY = window.innerHeight - padding * 2;
    return {
        left: padding + Math.random() * maxX,
        top: padding + Math.random() * maxY,
    };
};

const RunawayButton = ({ scrollToSection }) => {
    const [pos, setPos] = useState(null);      // null = normal flow
    const [dodges, setDodges] = useState(0);
    const [caught, setCaught] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const toastRef = useRef(null);

    const surrendered = dodges >= DODGE_LIMIT;

    const handleMouseEnter = useCallback(() => {
        if (surrendered || caught) return;

        const newPos = getRandomPosition();
        setPos(newPos);
        setDodges(prev => prev + 1);
    }, [surrendered, caught]);

    const handleClick = useCallback(() => {
        setCaught(true);
        setShowToast(true);
        setPos(null);

        if (toastRef.current) clearTimeout(toastRef.current);
        toastRef.current = setTimeout(() => setShowToast(false), 3000);

        if (scrollToSection) scrollToSection('contact');
    }, [scrollToSection]);

    const buttonStyle = pos
        ? { position: 'fixed', left: pos.left, top: pos.top, transition: 'left 0.12s ease, top 0.12s ease', zIndex: 9000 }
        : {};

    const getBtnLabel = (DODGE_LIMIT, dodges) => {
        if (caught) return '✓ caught!()';
        if (surrendered) return 'hireMe() // fine...';
        return `hireMe(${DODGE_LIMIT - dodges})`;
    };

    return (
        <>
            <button
                className={`runaway-btn ${surrendered ? 'surrendered' : ''} ${caught ? 'caught' : ''}`}
                style={buttonStyle}
                onMouseEnter={handleMouseEnter}
                onClick={handleClick}
                title={surrendered ? "Fine, you win! " : `Catch me if you can! (${DODGE_LIMIT - dodges} attempts left)`}
            >
                <span className="runaway-fn-name">{getBtnLabel(DODGE_LIMIT, dodges)}</span>
            </button>

            {showToast && (
                <div className="runaway-toast">
                    <span>Fine, you got me! </span>
                    <span className="toast-sub">Scrolling to contact...</span>
                </div>
            )}
        </>
    );
};

export default RunawayButton;
