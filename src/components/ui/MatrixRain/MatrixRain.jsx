import { useEffect, useRef, useCallback } from 'react';
import './MatrixRain.css';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]()=+-*/\\|;:,.?!@#$%^&';

const MatrixRain = ({ isOpen, onClose }) => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const dropsRef = useRef([]);

    const draw = useCallback((ctx, canvas, fontSize) => {
        // Semi-transparent black overlay → creates the fade trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // const cols = Math.floor(canvas.width / fontSize);

        // Green glowing text
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px 'Fira Code', monospace`;

        for (let i = 0; i < dropsRef.current.length; i++) {
            const char = CHARS[Math.floor(Math.random() * CHARS.length)];

            // Brighter head character
            if (dropsRef.current[i] === 1) {
                ctx.fillStyle = '#ffffff';
            } else {
                // Vary brightness based on how far down the drop is
                const brightness = Math.random() > 0.9 ? '80' : '41';
                ctx.fillStyle = `#00ff${brightness}`;
            }

            ctx.fillText(char, i * fontSize, dropsRef.current[i] * fontSize);

            // Reset drop randomly once it reaches bottom
            if (dropsRef.current[i] * fontSize > canvas.height && Math.random() > 0.975) {
                dropsRef.current[i] = 0;
            }
            dropsRef.current[i]++;
        }
    }, []);

    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const fontSize = 16;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const cols = Math.floor(canvas.width / fontSize);
        dropsRef.current = Array(cols).fill(1);

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const animate = () => {
            draw(ctx, canvas, fontSize);
            animRef.current = requestAnimationFrame(animate);
        };
        animRef.current = requestAnimationFrame(animate);
    }, [draw]);

    // Start / stop animation when open state changes
    useEffect(() => {
        if (isOpen) {
            initCanvas();

            const handleResize = () => {
                cancelAnimationFrame(animRef.current);
                initCanvas();
            };
            window.addEventListener('resize', handleResize);

            return () => {
                cancelAnimationFrame(animRef.current);
                window.removeEventListener('resize', handleResize);
            };
        } else {
            cancelAnimationFrame(animRef.current);
        }
    }, [isOpen, initCanvas]);

    // Esc key to close
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="matrix-overlay" onClick={onClose}>
            <canvas ref={canvasRef} className="matrix-canvas" />
            <div className="matrix-message">
                <span className="matrix-text">Wake up, Neo...</span>
                <span className="matrix-sub">[ Click or press ESC to exit the Matrix ]</span>
            </div>
        </div>
    );
};

export default MatrixRain;
