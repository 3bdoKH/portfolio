import { useState, useEffect, useMemo } from 'react';
import { deleteAnalyticsEvent, getRecentActivities } from '../../../services/analyticsService';
import AnalyticsSkeleton from './AnalyticsSkeleton';

// Helper to get SVG icons for different event types
const getEventIcon = (eventType) => {
    switch (eventType) {
        case 'page_view':
            return (
                <svg className="event-icon icon-page-view" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            );
        case 'love_click':
            return (
                <svg className="event-icon icon-love" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            );
        case 'project_click':
            return (
                <svg className="event-icon icon-project" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    <polygon points="12 11 12 17 17 14"></polygon>
                </svg>
            );
        case 'contact_submit':
            return (
                <svg className="event-icon icon-contact" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            );
        case 'terminal_open':
            return (
                <svg className="event-icon icon-terminal-open" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
            );
        case 'terminal_command':
            return (
                <svg className="event-icon icon-terminal-cmd" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 17 10 11 4 5"></polyline>
                    <line x1="12" y1="19" x2="20" y2="19"></line>
                </svg>
            );
        case 'social_click':
            return (
                <svg className="event-icon icon-social" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                </svg>
            );
        case 'cv_view':
            return (
                <svg className="event-icon icon-cv" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
            );
        default:
            return (
                <svg className="event-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            );
    }
};

const getSliceColor = (type) => {
    switch (type) {
        case 'page_view': return 'var(--syntax-comment)'; // blue/cyan
        case 'love_click': return 'var(--syntax-function)'; // pink
        case 'project_click': return 'var(--accent-primary)'; // green
        case 'contact_submit': return '#ff8c00'; // orange
        case 'terminal_open': return 'var(--syntax-variable)'; // gold
        case 'terminal_command': return 'var(--syntax-number)'; // purple
        case 'social_click': return '#da70d6'; // orchid
        case 'cv_view': return '#20b2aa'; // light sea green
        default: return '#888888';
    }
};

const Analytics = ({ token, analyticsData, analyticsLoading, onChange }) => {
    const [analytics, setAnalytics] = useState(analyticsData);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(true);
    const [recentActivities, setRecentActivities] = useState([]);
    const [activitiesLoading, setActivitiesLoading] = useState(false);

    // Filtering states
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [expandedEvents, setExpandedEvents] = useState({});

    // Terminal Activity Filtering
    const [terminalSearchQuery, setTerminalSearchQuery] = useState('');
    const [terminalStatusFilter, setTerminalStatusFilter] = useState('all');
    const [expandedTerminalEvents, setExpandedTerminalEvents] = useState({});

    // Chart interactivity states
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const [hoveredSlice, setHoveredSlice] = useState(null);

    const isLoading = loading || analyticsLoading || !analytics;

    useEffect(() => {
        if (analyticsData) {
            setAnalytics(analyticsData);
            setLoading(false);
        }
    }, [analyticsData]);

    useEffect(() => {
        if (!token) return;
        let active = true;
        const fetchActivities = async () => {
            setActivitiesLoading(true);
            try {
                const res = await getRecentActivities(token, limit);
                if (active && res.success) {
                    setRecentActivities(res.data || []);
                }
            } catch (err) {
                console.error('Failed to load recent activities:', err);
            } finally {
                if (active) setActivitiesLoading(false);
            }
        };
        fetchActivities();
        return () => { active = false; };
    }, [token, limit]);

    const handleDelete = async (eventId) => {
        try {
            await deleteAnalyticsEvent(token, eventId);
            setRecentActivities(prev => prev.filter(e => e._id !== eventId));
            setAnalytics(prev => {
                if (!prev) return prev;
                const newRecent = prev.stats?.recentEvents?.filter(e => e._id !== eventId) || [];
                const newTerminalRecent = prev.terminal?.recentActivity?.filter(e => e._id !== eventId) || [];
                return {
                    ...prev,
                    stats: {
                        ...prev.stats,
                        recentEvents: newRecent
                    },
                    terminal: prev.terminal ? {
                        ...prev.terminal,
                        recentActivity: newTerminalRecent
                    } : undefined
                };
            });
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    };

    const toggleEventExpand = (eventId) => {
        setExpandedEvents(prev => ({ ...prev, [eventId]: !prev[eventId] }));
    };

    const toggleTerminalEventExpand = (eventId) => {
        setExpandedTerminalEvents(prev => ({ ...prev, [eventId]: !prev[eventId] }));
    };

    // Inline event details
    const renderInlineDetails = (event) => {
        const data = event?.eventData;
        if (!data) return null;

        switch (event.eventType) {
            case 'page_view':
                return (
                    <span className="activity-inline-detail">
                        viewed page <code className="code-accent">{data.page === '/' ? 'Home' : data.page}</code>
                    </span>
                );
            case 'project_click':
                return (
                    <span className="activity-inline-detail">
                        clicked project <code className="code-accent">{data.projectName || 'Unknown'}</code>
                    </span>
                );
            case 'love_click':
                return (
                    <span className="activity-inline-detail">
                        liked portfolio! ❤️
                    </span>
                );
            case 'social_click':
                return (
                    <span className="activity-inline-detail">
                        clicked social link <code className="code-accent">{data.socialLink || 'Unknown'}</code>
                    </span>
                );
            case 'contact_submit':
                return (
                    <span className="activity-inline-detail">
                        submitted contact form {data.success ? (
                            <span className="status-success-text">(Success)</span>
                        ) : (
                            <span className="status-fail-text">(Failed)</span>
                        )}
                    </span>
                );
            case 'terminal_open':
                return (
                    <span className="activity-inline-detail">
                        opened CLI terminal session
                    </span>
                );
            case 'terminal_command':
                return (
                    <span className="activity-inline-detail">
                        ran command <code className="code-accent">$ {data.command || 'unknown'}</code>
                    </span>
                );
            case 'cv_view':
                return (
                    <span className="activity-inline-detail">
                        viewed CV
                    </span>
                );
            default:
                return null;
        }
    };

    // Mini metadata badges
    const renderMiniBadges = (event) => {
        const info = event?.userinfo;
        if (!info) return null;

        const badges = [];
        if (info.geo?.country) {
            const countryDesc = [info.geo.city, info.geo.region, info.geo.country].filter(Boolean).join(', ');
            badges.push(
                <span key="geo" className="mini-badge geo-badge" title={countryDesc}>
                    {info.geo.country}
                </span>
            );
        }
        if (info.userAgent?.browser?.name) {
            badges.push(
                <span key="browser" className="mini-badge browser-badge" title={`${info.userAgent.browser.name} ${info.userAgent.browser.version || ''}`}>
                    {info.userAgent.browser.name}
                </span>
            );
        }
        if (info.userAgent?.os?.name) {
            badges.push(
                <span key="os" className="mini-badge os-badge" title={`${info.userAgent.os.name} ${info.userAgent.os.version || ''}`}>
                    {info.userAgent.os.name}
                </span>
            );
        }
        return badges;
    };

    // Standardized metadata object for JSON viewer
    const formatEventDetailsJSON = (event) => {
        const geo = event?.userinfo?.geo ? {
            country: event.userinfo.geo.country,
            region: event.userinfo.geo.region,
            city: event.userinfo.geo.city,
        } : undefined;

        const userAgent = event?.userinfo?.userAgent ? {
            browser: event.userinfo.userAgent.browser?.name ? `${event.userinfo.userAgent.browser.name} ${event.userinfo.userAgent.browser.version || ''}` : undefined,
            os: event.userinfo.userAgent.os?.name ? `${event.userinfo.userAgent.os.name} ${event.userinfo.userAgent.os.version || ''}` : undefined,
            device: event.userinfo.userAgent.device?.type ? `${event.userinfo.userAgent.device.type} ${event.userinfo.userAgent.device.model || ''}` : undefined,
        } : undefined;

        return {
            event_id: event?._id,
            timestamp: event?.timestamp,
            event_type: event?.eventType,
            data: event?.eventData || {},
            user_info: {
                ip: event?.userinfo?.ip || 'hidden',
                referrer: event?.userinfo?.referrer || 'direct',
                location: geo,
                user_agent: userAgent,
            }
        };
    };

    // Computed Recent Events (filtered)
    const filteredRecentEvents = useMemo(() => {
        return recentActivities.filter(event => {
            // Tab Filters
            if (activeFilter === 'page_views' && !['page_view', 'cv_view'].includes(event.eventType)) return false;
            if (activeFilter === 'clicks' && !['love_click', 'project_click', 'social_click'].includes(event.eventType)) return false;
            if (activeFilter === 'terminal' && !['terminal_command', 'terminal_open'].includes(event.eventType)) return false;
            if (activeFilter === 'submissions' && !['contact_submit'].includes(event.eventType)) return false;

            // Search query
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            const type = event.eventType?.toLowerCase() || '';
            const browser = event.userinfo?.userAgent?.browser?.name?.toLowerCase() || '';
            const os = event.userinfo?.userAgent?.os?.name?.toLowerCase() || '';
            const country = event.userinfo?.geo?.country?.toLowerCase() || '';
            const city = event.userinfo?.geo?.city?.toLowerCase() || '';
            const command = event.eventData?.command?.toLowerCase() || '';
            const page = event.eventData?.page?.toLowerCase() || '';
            const projectName = event.eventData?.projectName?.toLowerCase() || '';
            const socialLink = event.eventData?.socialLink?.toLowerCase() || '';

            return type.includes(query) ||
                browser.includes(query) ||
                os.includes(query) ||
                country.includes(query) ||
                city.includes(query) ||
                command.includes(query) ||
                page.includes(query) ||
                projectName.includes(query) ||
                socialLink.includes(query);
        });
    }, [recentActivities, activeFilter, searchQuery]);

    // Computed Terminal Events (filtered)
    const filteredTerminalActivity = useMemo(() => {
        if (!analytics?.terminal?.recentActivity) return [];
        return analytics.terminal.recentActivity.filter(event => {
            if (terminalStatusFilter === 'success' && event.eventData?.success === false) return false;
            if (terminalStatusFilter === 'fail' && event.eventData?.success !== false) return false;

            if (!terminalSearchQuery) return true;
            const query = terminalSearchQuery.toLowerCase();
            const command = event.eventData?.command?.toLowerCase() || '';
            const browser = event.userinfo?.userAgent?.browser?.name?.toLowerCase() || '';
            const os = event.userinfo?.userAgent?.os?.name?.toLowerCase() || '';
            const country = event.userinfo?.geo?.country?.toLowerCase() || '';
            const city = event.userinfo?.geo?.city?.toLowerCase() || '';

            return command.includes(query) ||
                browser.includes(query) ||
                os.includes(query) ||
                country.includes(query) ||
                city.includes(query);
        });
    }, [analytics, terminalStatusFilter, terminalSearchQuery]);

    // Total counts for percentages
    const totalEventsCount = useMemo(() => {
        if (!analytics?.stats?.eventsByType) return 1;
        return analytics.stats.eventsByType.reduce((sum, item) => sum + item.count, 0) || 1;
    }, [analytics]);

    const maxProjectClicks = useMemo(() => {
        if (!analytics?.stats?.projectClicksByProject || analytics.stats.projectClicksByProject.length === 0) return 1;
        return Math.max(...analytics.stats.projectClicksByProject.map(p => p.clicks)) || 1;
    }, [analytics]);

    const maxTerminalCommandUse = useMemo(() => {
        if (!analytics?.terminal?.topCommands || analytics.terminal.topCommands.length === 0) return 1;
        return Math.max(...analytics.terminal.topCommands.map(c => c.count)) || 1;
    }, [analytics]);

    const terminalSuccessRate = useMemo(() => {
        if (!analytics?.terminal) return 0;
        const total = analytics.terminal.totalCommands || 0;
        const success = analytics.terminal.successfulCommands || 0;
        return total > 0 ? Math.round((success / total) * 100) : 0;
    }, [analytics]);

    // Timeline Area Chart Data mapping
    const timelineData = useMemo(() => {
        const days = {};
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            days[dateStr] = 0;
        }

        if (recentActivities) {
            recentActivities.forEach(event => {
                const dateStr = new Date(event.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                if (days[dateStr] !== undefined) {
                    days[dateStr]++;
                }
            });
        }
        return Object.entries(days).map(([date, count]) => ({ date, count }));
    }, [recentActivities]);
    const maxTimelineVal = useMemo(() => Math.max(...timelineData.map(d => d.count), 4), [timelineData]);

    const lineChartPoints = useMemo(() => {
        return timelineData.map((d, index) => {
            const x = 50 + (index / 6) * 410; // SVG Width: 50 to 460
            const y = 170 - (d.count / maxTimelineVal) * 130; // SVG Height: 40 to 170
            return { x, y, date: d.date, count: d.count };
        });
    }, [timelineData, maxTimelineVal]);

    const linePathD = useMemo(() => {
        return lineChartPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    }, [lineChartPoints]);

    const areaPathD = useMemo(() => {
        if (lineChartPoints.length === 0) return '';
        return `${linePathD} L ${lineChartPoints[lineChartPoints.length - 1].x} 170 L ${lineChartPoints[0].x} 170 Z`;
    }, [lineChartPoints, linePathD]);

    // Doughnut segments calculations
    const doughnutSlices = useMemo(() => {
        if (!analytics?.stats?.eventsByType) return [];
        let accumulatedPercentage = 0;
        return analytics.stats.eventsByType.map((item) => {
            const percentage = (item.count / totalEventsCount) * 100;
            const offset = accumulatedPercentage;
            accumulatedPercentage += percentage;
            return {
                ...item,
                percentage,
                offset,
                color: getSliceColor(item.type)
            };
        });
    }, [analytics, totalEventsCount]);



    return (
        <div className="analytics-section">
            {isLoading ? (
                <AnalyticsSkeleton />
            ) : (
                <div className="analytics-layout-wrapper">

                    {/* Visual Charts Row */}
                    <div className="charts-row-container">

                        {/* Area trend chart */}
                        <div className="analytics-card chart-card" style={{ position: 'relative' }}>
                            <h3>
                                <span className="syntax-comment">{'// '}</span>
                                <span className="syntax-keyword">Interaction History</span>
                                <span className="chart-sub-label"> (Last 7 Days)</span>
                            </h3>
                            <div className="svg-chart-container" style={{ position: 'relative', height: '220px', width: '100%' }}>
                                <svg viewBox="0 0 500 220" width="100%" height="100%" style={{ overflow: 'visible' }}>
                                    {/* Grids */}
                                    <line x1="50" y1="40" x2="460" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                                    <line x1="50" y1="105" x2="460" y2="105" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                                    <line x1="50" y1="170" x2="460" y2="170" stroke="var(--border-color)" />

                                    {/* Y Labels */}
                                    <text x="40" y="44" textAnchor="end" fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-mono)">{maxTimelineVal}</text>
                                    <text x="40" y="109" textAnchor="end" fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-mono)">{Math.round(maxTimelineVal / 2)}</text>
                                    <text x="40" y="174" textAnchor="end" fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-mono)">0</text>

                                    {/* Area Fill */}
                                    {areaPathD && (
                                        <path
                                            d={areaPathD}
                                            fill="url(#chart-area-grad)"
                                            opacity="0.15"
                                        />
                                    )}

                                    {/* Line Path */}
                                    {linePathD && (
                                        <path
                                            d={linePathD}
                                            fill="none"
                                            stroke="var(--accent-primary)"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={{
                                                filter: 'drop-shadow(0 0 6px rgba(0, 255, 136, 0.4))'
                                            }}
                                        />
                                    )}

                                    {/* X labels & Guide vertical markers */}
                                    {lineChartPoints.map((p, i) => (
                                        <g key={i}>
                                            <line x1={p.x} y1="40" x2={p.x} y2="170" stroke="rgba(255,255,255,0.02)" />
                                            <text x={p.x} y="192" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-mono)">
                                                {p.date}
                                            </text>
                                        </g>
                                    ))}

                                    {/* Interactive points */}
                                    {lineChartPoints.map((p, i) => (
                                        <g key={i}>
                                            <circle
                                                cx={p.x}
                                                cy={p.y}
                                                r="12"
                                                fill="transparent"
                                                style={{ cursor: 'pointer' }}
                                                onMouseEnter={() => setHoveredPoint(p)}
                                                onMouseLeave={() => setHoveredPoint(null)}
                                            />
                                            <circle
                                                cx={p.x}
                                                cy={p.y}
                                                r={hoveredPoint?.date === p.date ? "6" : "3.5"}
                                                fill={hoveredPoint?.date === p.date ? "var(--accent-primary)" : "var(--bg-card)"}
                                                stroke="var(--accent-primary)"
                                                strokeWidth="2"
                                                pointerEvents="none"
                                                style={{ transition: 'all 0.15s' }}
                                            />
                                        </g>
                                    ))}

                                    <defs>
                                        <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="var(--accent-primary)" />
                                            <stop offset="100%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* HTML Tooltip */}
                                {hoveredPoint && (
                                    <div
                                        className="chart-tooltip animate-slide-down"
                                        style={{
                                            position: 'absolute',
                                            left: `${(hoveredPoint.x / 500) * 100}%`,
                                            top: `${(hoveredPoint.y / 220) * 100 - 18}%`,
                                            transform: 'translate(-50%, -100%)'
                                        }}
                                    >
                                        <div className="tooltip-date font-mono-important">{hoveredPoint.date}</div>
                                        <div className="tooltip-value font-mono-important">{hoveredPoint.count} events</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Interactive doughnut chart */}
                        <div className="analytics-card chart-card doughnut-card">
                            <h3>
                                <span className="syntax-comment">{'// '}</span>
                                <span className="syntax-keyword">Type Breakdown</span>
                            </h3>
                            <div className="doughnut-container-layout">
                                <div className="doughnut-svg-wrapper">
                                    <svg viewBox="0 0 120 120" width="130" height="130">
                                        {/* Background base ring */}
                                        <circle cx="60" cy="60" r="50" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="9" />

                                        {/* Segments */}
                                        {doughnutSlices.map((slice, index) => {
                                            const strokeDashArray = `${(slice.percentage / 100) * 314.159} 314.159`;
                                            const strokeDashOffset = `${- (slice.offset / 100) * 314.159}`;
                                            const isSelected = hoveredSlice?.type === slice.type;
                                            return (
                                                <circle
                                                    key={index}
                                                    cx="60"
                                                    cy="60"
                                                    r="50"
                                                    fill="transparent"
                                                    stroke={slice.color}
                                                    strokeWidth={isSelected ? 11 : 8.5}
                                                    strokeDasharray={strokeDashArray}
                                                    strokeDashoffset={strokeDashOffset}
                                                    transform="rotate(-90 60 60)"
                                                    style={{
                                                        cursor: 'pointer',
                                                        transition: 'stroke-width 0.2s, filter 0.2s',
                                                        filter: isSelected ? `drop-shadow(0 0 3px ${slice.color}dd)` : 'none'
                                                    }}
                                                    onMouseEnter={() => setHoveredSlice(slice)}
                                                    onMouseLeave={() => setHoveredSlice(null)}
                                                />
                                            );
                                        })}

                                        {/* Center texts */}
                                        <text x="60" y="55" textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontWeight="600" fontFamily="var(--font-mono)">
                                            {hoveredSlice ? hoveredSlice.type.replace('_', ' ').toUpperCase() : 'TOTAL LOGS'}
                                        </text>
                                        <text x="60" y="70" textAnchor="middle" fill={hoveredSlice ? hoveredSlice.color : 'var(--text-primary)'} fontSize="11" fontWeight="700" fontFamily="var(--font-mono)">
                                            {hoveredSlice ? `${hoveredSlice.count} (${Math.round(hoveredSlice.percentage)}%)` : `${totalEventsCount}`}
                                        </text>
                                    </svg>
                                </div>
                                <div className="doughnut-legend">
                                    {doughnutSlices.slice(0, 5).map((slice, index) => (
                                        <div
                                            key={index}
                                            className={`doughnut-legend-item ${hoveredSlice?.type === slice.type ? 'active' : ''}`}
                                            onMouseEnter={() => setHoveredSlice(slice)}
                                            onMouseLeave={() => setHoveredSlice(null)}
                                        >
                                            <span className="doughnut-color-dot" style={{ backgroundColor: slice.color }}></span>
                                            <span className="legend-label">{slice.type}</span>
                                            <span className="legend-count">{slice.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Secondary Distribution Cards */}
                    <div className="analytics-grid">

                        {/* Event Types Distribution Card */}
                        <div className="analytics-card">
                            <h3>
                                <span className="syntax-comment">{'// '}</span>
                                <span className="syntax-keyword">Events Distribution</span>
                            </h3>
                            <div className="event-list font-mono-important">
                                {analytics.stats.eventsByType.map((event) => {
                                    const percentage = Math.round((event.count / totalEventsCount) * 100);
                                    return (
                                        <div key={event.type} className="progress-list-item">
                                            <div className="progress-item-meta">
                                                <span className="event-type">
                                                    {getEventIcon(event.type)}
                                                    {event.type}
                                                </span>
                                                <span className="event-count">{event.count} ({percentage}%)</span>
                                            </div>
                                            <div className="progress-bar-track">
                                                <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Project Clicks Card */}
                        <div className="analytics-card">
                            <h3>
                                <span className="syntax-comment">{'// '}</span>
                                <span className="syntax-keyword">Project Click Rates</span>
                            </h3>
                            <div className="event-list font-mono-important">
                                {analytics.stats.projectClicksByProject && analytics.stats.projectClicksByProject.length > 0 ? (
                                    analytics.stats.projectClicksByProject.map((project, index) => {
                                        const percentage = Math.round((project.clicks / maxProjectClicks) * 100);
                                        return (
                                            <div key={index} className="progress-list-item">
                                                <div className="progress-item-meta">
                                                    <span className="event-type">
                                                        {getEventIcon('project_click')}
                                                        {project.projectName || 'Unknown Project'}
                                                    </span>
                                                    <span className="event-count">{project.clicks} clicks</span>
                                                </div>
                                                <div className="progress-bar-track project-clicks-track">
                                                    <div className="progress-bar-fill project-clicks-fill" style={{ width: `${percentage}%` }}></div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="empty-state-small">
                                        <p>No project clicks yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Timeline Activity & Filtering Card */}
                    <div className="analytics-card recent-activity-card" style={{ marginTop: '20px' }}>
                        <div className="analytics-card-header">
                            <h3>
                                <span className="syntax-comment">{'// '}</span>
                                <span className="syntax-keyword">Recent Activity Log</span>
                            </h3>
                            <div className="header-actions">
                                <select
                                    value={limit}
                                    onChange={(e) => {
                                        const val = Number(e.target.value);
                                        setLimit(val);
                                        onChange(val);
                                    }}
                                    className="activity-limit-select"
                                >
                                    <option value={10}>10 items</option>
                                    <option value={20}>20 items</option>
                                    <option value={50}>50 items</option>
                                    <option value={100}>100 items</option>
                                </select>
                            </div>
                        </div>

                        {/* Search & Tabs Filtering */}
                        <div className="filter-controls-container">
                            <div className="search-input-wrapper">
                                <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search logs (type, country, browser, query...)"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="filter-search-input"
                                />
                                {searchQuery && (
                                    <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
                                )}
                            </div>

                            <div className="filter-tabs">
                                {['all', 'page_views', 'clicks', 'terminal', 'submissions'].map(f => (
                                    <button
                                        key={f}
                                        className={`filter-tab-btn ${activeFilter === f ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(f)}
                                    >
                                        {f.replace('_', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Activity logs list */}
                        <div className="timeline-activity-list">
                            {activitiesLoading ? (
                                <div className="loading-container-small" style={{ padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
                                    <div className="spinner-small" style={{ width: '16px', height: '16px', border: '2px solid var(--accent-primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>Loading activities...</span>
                                </div>
                            ) : (
                                <>
                                    {filteredRecentEvents.map((event, index) => {
                                        const isExpanded = !!expandedEvents[event._id];
                                        return (
                                            <div key={event._id || index} className={`timeline-item-wrapper ${isExpanded ? 'expanded' : ''}`}>
                                                <div className="timeline-item-main" onClick={() => toggleEventExpand(event._id)}>
                                                    <div className="timeline-icon-badge">
                                                        {getEventIcon(event.eventType)}
                                                    </div>
                                                    <div className="timeline-info-content">
                                                        <div className="timeline-top-row">
                                                            <span className="timeline-type-tag">{event.eventType}</span>
                                                            <span className="timeline-timestamp">{formatDate(event.timestamp)}</span>
                                                        </div>
                                                        <div className="timeline-detail-row">
                                                            {renderInlineDetails(event)}
                                                        </div>
                                                    </div>
                                                    <div className="timeline-badges-panel">
                                                        {renderMiniBadges(event)}
                                                    </div>
                                                    <div className="timeline-item-actions" onClick={e => e.stopPropagation()}>
                                                        <button
                                                            className={`expand-btn ${isExpanded ? 'active' : ''}`}
                                                            onClick={() => toggleEventExpand(event._id)}
                                                            title={isExpanded ? "Collapse metadata" : "Expand metadata"}
                                                        >
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <polyline points="6 9 12 15 18 9"></polyline>
                                                            </svg>
                                                        </button>
                                                        <button
                                                            className="delete-button-small"
                                                            onClick={() => {
                                                                if (window.confirm("Delete this event log permanently?")) {
                                                                    handleDelete(event._id);
                                                                }
                                                            }}
                                                            title="Delete event log"
                                                        >
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>

                                                {isExpanded && (
                                                    <div className="timeline-expanded-details animate-slide-down">
                                                        <div className="details-header-code">
                                                            <span>{`// Event Metadata (JSON)`}</span>
                                                        </div>
                                                        <pre className="details-code-editor">
                                                            <code>{JSON.stringify(formatEventDetailsJSON(event), null, 2)}</code>
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}

                                    {filteredRecentEvents.length === 0 && (
                                        <div className="empty-state-small">
                                            <p>No matching events found</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    {/* Terminal Analytics Card */}
                    <div className="analytics-card terminal-analytics-card" style={{ marginTop: '20px' }}>
                        <div className="terminal-card-main-header">
                            <h3>
                                <span className="syntax-comment">{'// '}</span>
                                <span className="syntax-keyword">Terminal Suite & CLI Analytics</span>
                            </h3>
                            <div className="terminal-quick-indicator">
                                <span className="status-label">CLI Engine:</span>
                                <span className="status-val online">Online</span>
                            </div>
                        </div>

                        {/* Visual statistics grid */}
                        <div className="terminal-stats-grid">
                            <div className="terminal-stat-widget">
                                <span className="terminal-stat-label">Terminal Sessions</span>
                                <span className="terminal-stat-value">{analytics.terminal.totalOpens || 0}</span>
                            </div>
                            <div className="terminal-stat-widget">
                                <span className="terminal-stat-label">Commands Executed</span>
                                <span className="terminal-stat-value">{analytics.terminal.totalCommands || 0}</span>
                            </div>
                            <div className="terminal-stat-widget success-rate-widget">
                                <div className="success-rate-arc">
                                    <span className="terminal-stat-label">Command Success Rate</span>
                                    <span className="terminal-stat-value success">{terminalSuccessRate}%</span>
                                </div>
                                <div className="success-bar-track">
                                    <div className="success-bar-fill" style={{ width: `${terminalSuccessRate}%` }}></div>
                                </div>
                                <div className="success-breakdown">
                                    <span className="s-success">{analytics.terminal.successfulCommands || 0} ok</span>
                                    <span className="s-failed">{analytics.terminal.failedCommands || 0} fail</span>
                                </div>
                            </div>
                        </div>

                        {/* Top Terminal Commands */}
                        <div className="terminal-commands-section">
                            <h4>
                                <span className="syntax-comment">{'// '}</span>
                                <span className="syntax-keyword">Most Run CLI Commands</span>
                            </h4>
                            <div className="event-list font-mono-important">
                                {analytics.terminal.topCommands.length > 0 ? (
                                    analytics.terminal.topCommands.map((cmd, index) => {
                                        const percentage = Math.round((cmd.count / maxTerminalCommandUse) * 100);
                                        return (
                                            <div key={index} className="progress-list-item">
                                                <div className="progress-item-meta">
                                                    <span className="event-type terminal-command-name">
                                                        <span className="prompt-token">$</span> {cmd.command}
                                                    </span>
                                                    <span className="event-count">{cmd.count} runs</span>
                                                </div>
                                                <div className="progress-bar-track terminal-clicks-track">
                                                    <div className="progress-bar-fill terminal-clicks-fill" style={{ width: `${percentage}%` }}></div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="empty-state-small">
                                        <p>No terminal commands logged yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Terminal Activity Log */}
                        <div className="terminal-activity-section">
                            <div className="terminal-subsection-header">
                                <h4>
                                    <span className="syntax-comment">{'// '}</span>
                                    <span className="syntax-keyword">CLI Session History Log</span>
                                </h4>
                                <div className="terminal-filters-box">
                                    <div className="search-input-wrapper terminal-search-wrap">
                                        <input
                                            type="text"
                                            placeholder="Filter commands..."
                                            value={terminalSearchQuery}
                                            onChange={(e) => setTerminalSearchQuery(e.target.value)}
                                            className="filter-search-input terminal-search"
                                        />
                                    </div>
                                    <div className="terminal-status-tabs">
                                        {['all', 'success', 'fail'].map(status => (
                                            <button
                                                key={status}
                                                className={`status-filter-btn ${terminalStatusFilter === status ? 'active' : ''}`}
                                                onClick={() => setTerminalStatusFilter(status)}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="timeline-activity-list terminal-logs-list">
                                {filteredTerminalActivity.map((event, index) => {
                                    const isExpanded = !!expandedTerminalEvents[event._id];
                                    const isFail = event.eventData?.success === false;
                                    return (
                                        <div key={event._id || index} className={`timeline-item-wrapper terminal-timeline-item ${isExpanded ? 'expanded' : ''} ${isFail ? 'terminal-fail' : ''}`}>
                                            <div className="timeline-item-main" onClick={() => toggleTerminalEventExpand(event._id)}>
                                                <div className={`timeline-icon-badge terminal-badge ${isFail ? 'fail' : 'success'}`}>
                                                    {isFail ? (
                                                        <svg className="cli-status-icon fail" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                        </svg>
                                                    ) : (
                                                        <svg className="cli-status-icon success" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="timeline-info-content">
                                                    <div className="timeline-top-row">
                                                        <span className="terminal-cmd-tag font-mono-important">
                                                            {event.eventType === 'terminal_open' ? 'Session Open' : `$ ${event.eventData?.command || 'unknown'}`}
                                                        </span>
                                                        <span className="timeline-timestamp">{formatDate(event.timestamp)}</span>
                                                    </div>
                                                </div>
                                                <div className="timeline-badges-panel">
                                                    {renderMiniBadges(event)}
                                                </div>
                                                <div className="timeline-item-actions" onClick={e => e.stopPropagation()}>
                                                    <button
                                                        className={`expand-btn ${isExpanded ? 'active' : ''}`}
                                                        onClick={() => toggleTerminalEventExpand(event._id)}
                                                        title="Inspect CLI Session Details"
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="delete-button-small"
                                                        onClick={() => {
                                                            if (window.confirm("Permanently delete this terminal log entry?")) {
                                                                handleDelete(event._id);
                                                            }
                                                        }}
                                                        title="Delete terminal event"
                                                    >
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>

                                            {isExpanded && (
                                                <div className="timeline-expanded-details animate-slide-down">
                                                    <div className="details-header-code">
                                                        <span>{`// CLI Session Log Entry (JSON)`}</span>
                                                    </div>
                                                    <pre className="details-code-editor">
                                                        <code>{JSON.stringify(formatEventDetailsJSON(event), null, 2)}</code>
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {filteredTerminalActivity.length === 0 && (
                                    <div className="empty-state-small">
                                        <p>No matching CLI activity entries found</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Analytics;