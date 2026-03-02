import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../services/api';
import './AdminLogin.css';

const FUNNY_ERRORS = [
    ' ACCESS DENIED. Nice try, hacker.',
    ' Wrong! My cat could guess better.',
    ' Suspicious activity detected... calling the FBI.',
    ' Error 403: You are not Abdulrahman.',
    ' Really? That was your best attempt?',
    ' Captcha failed: are you even human?',
    ' Password rejected. Try "password123" like everyone else.',
    ' Intrusion attempt logged. IP sent to Abdulrahman. Kidding... maybe.',
];

const SCAN_LINES = [
    '> Scanning for intruders...',
    '> Unauthorized access attempt detected.',
    '> Tracing IP address...',
    '> Oh wait, there\'s a login form here.',
    '> Fine. You can try. ',
];

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [errorIdx, setErrorIdx] = useState(0);
    const [loading, setLoading] = useState(false);
    const [scanning, setScanning] = useState(true);
    const [scanLine, setScanLine] = useState(0);
    const navigate = useNavigate();

    // Fake scanning sequence on mount
    useEffect(() => {
        let line = 0;
        const interval = setInterval(() => {
            line++;
            setScanLine(line);
            if (line >= SCAN_LINES.length) {
                clearInterval(interval);
                setTimeout(() => setScanning(false), 2000);
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await adminLogin(credentials);

            // Store token
            localStorage.setItem('adminToken', response.data.token);
            localStorage.setItem('adminUser', JSON.stringify(response.data.user));

            // Redirect to dashboard
            navigate('/admin/dashboard');
        } catch (err) {
            const msg = FUNNY_ERRORS[errorIdx % FUNNY_ERRORS.length];
            setErrorIdx(prev => prev + 1);
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    if (scanning) {
        return (
            <div className="admin-login">
                <div className="login-scan-screen">
                    <div className="scan-warning"> SECURITY ALERT </div>
                    <div className="scan-lines">
                        {SCAN_LINES.slice(0, scanLine).map((line, i) => (
                            <div key={i} className="scan-line">{line}</div>
                        ))}
                        {scanLine < SCAN_LINES.length && (
                            <span className="scan-cursor">█</span>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-login">
            <div className="login-container">
                <div className="login-header-terminal">
                    <div className="terminal-dots">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                    </div>
                    <div className="terminal-title">auth -- system-login</div>
                    <div style={{ width: '52px' }}></div>
                </div>

                <div className="login-content">
                    <div className="login-snarky">
                        <span className="snarky-comment">{'//  You found the secret page.'}</span>
                        <span className="snarky-comment snarky-blink">{'// Now get lost.'}</span>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && (
                            <div className="error-message">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 13H7v-2h2v2zm0-3H7V4h2v6z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <div className="form-field">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                                autoFocus
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    login<span className="syntax-bracket">()</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <a href="/" className="back-link">
                            <span className="accent">←</span> Back to Portfolio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
