import { useEffect, useState, useRef } from 'react';
import { FaGamepad } from 'react-icons/fa';
import './KonamiCode.css';

const KONAMI = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

// Lightweight pure-JS confetti burst
const fireConfetti = () => {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;pointer-events:none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const COLORS = ['#00ff88', '#4a9eff', '#ffd700', '#ff6b9d', '#bd93f9'];
    const particles = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        w: 8 + Math.random() * 8,
        h: 4 + Math.random() * 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: (Math.random() - 0.5) * 6,
        vy: 2 + Math.random() * 4,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.2,
        opacity: 1,
    }));

    let frame;
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        particles.forEach(p => {
            if (p.opacity <= 0) return;
            alive = true;
            p.x += p.vx; p.y += p.vy; p.rot += p.vr;
            p.vy += 0.12; // gravity
            p.opacity -= 0.008;
            ctx.save();
            ctx.globalAlpha = Math.max(p.opacity, 0);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        if (alive) { frame = requestAnimationFrame(animate); }
        else { canvas.remove(); }
    };
    frame = requestAnimationFrame(animate);
    setTimeout(() => { cancelAnimationFrame(frame); canvas.remove(); }, 4000);
};

const KonamiCode = () => {
    const [unlocked, setUnlocked] = useState(false);
    const seqRef = useRef([]);

    useEffect(() => {
        const handleKey = (e) => {
            seqRef.current = [...seqRef.current, e.key].slice(-KONAMI.length);
            if (seqRef.current.join(',') === KONAMI.join(',')) {
                seqRef.current = [];
                setUnlocked(true);
                fireConfetti();
                setTimeout(() => setUnlocked(false), 4000);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    if (!unlocked) return null;

    return (
        <div className="konami-popup">
            <FaGamepad className="konami-icon" />
            <div className="konami-title">Achievement Unlocked</div>
            <div className="konami-sub">
                <span className="code-comment">{'// you are one of us'}</span>
            </div>
            <div className="konami-code-hint">↑↑↓↓←→←→BA</div>
        </div>
    );
};

export default KonamiCode;
