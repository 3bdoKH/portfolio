import { useEffect, useState } from "react";
import StatsCardsSkeleton from "./StatsCardsSkeleton";

// Helper to get SVG icons for stats cards
const getStatIcon = (key) => {
    switch (key) {
        case 'totalEvents':
            return (
                <svg className="stat-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
            );
        case 'pageViews':
            return (
                <svg className="stat-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            );
        case 'projectClicks':
            return (
                <svg className="stat-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    <polygon points="12 11 12 17 17 14"></polygon>
                </svg>
            );
        case 'contactSubmissions':
            return (
                <svg className="stat-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            );
        case 'cvViews':
            return (
                <svg className="stat-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
            );
        case 'cvDownloads':
            return (
                <svg className="stat-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
            );
        case 'totalMessages':
            return (
                <svg className="stat-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
            );
        case 'unreadMessages':
            return (
                <svg className="stat-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <circle cx="18" cy="8" r="3" fill="var(--syntax-function)"></circle>
                </svg>
            );
        default:
            return (
                <svg className="stat-card-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            );
    }
};

const getSparklineColor = (key) => {
    switch (key) {
        case 'totalEvents': return 'var(--syntax-variable)'; // gold
        case 'pageViews': return 'var(--syntax-comment)'; // blue/cyan
        case 'projectClicks': return 'var(--accent-primary)'; // green
        case 'contactSubmissions': return '#ff8c00'; // orange
        case 'cvViews': return 'var(--syntax-function)'; // pink
        case 'cvDownloads': return '#20b2aa'; // teal
        case 'totalMessages': return 'var(--accent-secondary)'; // light blue
        case 'unreadMessages': return '#ff4444'; // red
        default: return 'var(--accent-primary)';
    }
};

const StatsCards = ({ analyticsData, analyticsLoading }) => {
    const [analytics, setAnalytics] = useState(analyticsData);
    const [loading, setLoading] = useState(true);
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        if (analyticsData) {
            setAnalytics(analyticsData);
            setKeys(Object.keys(analyticsData.stats.overview));
            setLoading(false);
        }
    }, [analyticsData]);

    const getSparklinePoints = (key) => {
        let eventType = null;
        if (key === 'totalEvents') eventType = 'all';
        else if (key === 'pageViews') eventType = 'page_view';
        else if (key === 'projectClicks') eventType = 'project_click';
        else if (key === 'contactSubmissions') eventType = 'contact_submit';
        else if (key === 'cvViews') eventType = 'cv_view';
        else if (key === 'cvDownloads') eventType = 'cv_download';

        // 7 days timeline
        const days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            return d.toLocaleDateString('en-US');
        });

        const counts = days.map(() => 0);

        if (analytics?.stats?.recentEvents) {
            analytics.stats.recentEvents.forEach(e => {
                const dateStr = new Date(e.timestamp).toLocaleDateString('en-US');
                const idx = days.indexOf(dateStr);
                if (idx !== -1) {
                    if (eventType === 'all' || e.eventType === eventType) {
                        counts[idx]++;
                    }
                }
            });
        }

        const maxVal = Math.max(...counts, 1);
        // Map to coordinates (80px width, 26px height, margins)
        return counts.map((val, index) => {
            const x = (index / 6) * 80;
            const y = 26 - (val / maxVal) * 22; // max height 22px
            return `${x},${y}`;
        }).join(' ');
    };

    if (loading || analyticsLoading || !analytics || !keys) {
        return <StatsCardsSkeleton />;
    }

    return (
        <div className="stats-grid">
            {keys.map((key, index) => {
                const value = analytics?.stats?.overview[key] ?? 0;
                const isHighlight = key === 'unreadMessages' && value > 0;
                const sparkPoints = getSparklinePoints(key);
                const sparkColor = getSparklineColor(key);
                
                return (
                    <div className={`stat-card-admin ${isHighlight ? 'alert-highlight' : ''}`} key={index}>
                        <div className="stat-card-header-icon-container">
                            {getStatIcon(key)}
                        </div>
                        <div className="stat-label">
                            <span className="syntax-keyword stat-variable">const</span>{' '}
                            <span className="syntax-variable stat-variable">{key}</span>{' '}
                            <span className="syntax-bracket">=</span>
                        </div>
                        <div className="stat-value-container">
                            <div className="stat-value">
                                <span className="syntax-number">{value}</span>
                                <span className="syntax-bracket">;</span>
                            </div>
                            {/* SVG Mini Sparkline */}
                            <div className="stat-sparkline" title="Last 7 Days Trend">
                                <svg width="80" height="26" style={{ overflow: 'visible' }}>
                                    <polyline
                                        fill="none"
                                        stroke={sparkColor}
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        points={sparkPoints}
                                        style={{
                                            filter: `drop-shadow(0px 0px 3px ${sparkColor}80)`
                                        }}
                                    />
                                    {/* Subtle gradient gradient background for sparkline */}
                                    <path
                                        d={`M 0,26 L ${sparkPoints} L 80,26 Z`}
                                        fill={`url(#gradient-${key})`}
                                        opacity="0.1"
                                    />
                                    <defs>
                                        <linearGradient id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={sparkColor} />
                                            <stop offset="100%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsCards;
