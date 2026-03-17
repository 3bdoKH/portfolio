import { useState, useEffect } from 'react';
import { getTerminalAnalytics, getRecentActivities, deleteAnalyticsEvent } from '../../../services/api';
import AnalyticsSkeleton from './AnalyticsSkeleton';
const Analytics = ({ token, analyticsData, analyticsLoading }) => {
    const [analytics, setAnalytics] = useState(analyticsData);
    const [terminalAnalytics, setTerminalAnalytics] = useState(null);
    const [recentActivities, setRecentActivities] = useState(null);
    const [loading, setLoading] = useState(true);
    const isLoading = loading || analyticsLoading || !analytics || !terminalAnalytics || !recentActivities;
    useEffect(() => {
        if (analyticsData) {
            setAnalytics(analyticsData);
        }
    }, [analyticsData]);
    useEffect(() => {
        let cancelled = false;
        const loadData = async () => {
            setLoading(true);
            try {
                const [terminalAnalyticsData, recentActivitiesData] = await Promise.all([
                    getTerminalAnalytics(token),
                    getRecentActivities(token),
                ]);

                if (cancelled) return;
                setTerminalAnalytics(terminalAnalyticsData.data);
                setRecentActivities(recentActivitiesData.data);
            } catch (error) {
                if (cancelled) return;
                console.error('Error loading data:', error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('adminToken');
                    window.location.href = '/admin/login';
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadData();

        return () => { cancelled = true; }; // cleanup

    }, [token, analyticsData]);

    const handleDelete = async (eventId) => {
        try {
            await deleteAnalyticsEvent(token, eventId);
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
        }).format(date);
    };
    const detailsExpander = (event) => (
        event?.eventType === 'page_view' ? (
            <p>{event?.eventData?.page === '/' ? 'Home' : event?.eventData?.page}</p>
        ) : event?.eventType === 'social_click' ? (
            <p>{event?.eventData?.socialLink}</p>
        ) : event?.eventType === 'project_click' ? (
            <p>{event?.eventData?.projectName}</p>
        ) : event?.eventType === 'contact_submit' ? (
            <p>{event?.eventData?.success === true ? 'Success' : 'Error'}</p>
        ) : ''
    );

    const renderUserInfo = (event) => {
        const userInfo = event?.userinfo;
        if (!userInfo) return null;

        return (
            <div className="userinfo-dropdown">
                <h4>User Info</h4>
                <div className="userinfo-content">
                    {event.eventData && (
                        <div className="userinfo-row">
                            <span className="userinfo-label">Event:</span>
                            <span className="userinfo-value">{detailsExpander(event)}</span>
                        </div>
                    )}
                    {userInfo.referrer && (
                        <div className="userinfo-row">
                            <span className="userinfo-label">ref:</span>
                            <span className="userinfo-value">{userInfo.referrer}</span>
                        </div>
                    )}
                    {userInfo.userAgent?.browser?.name && (
                        <div className="userinfo-row">
                            <span className="userinfo-label">Browser:</span>
                            <span className="userinfo-value">
                                {userInfo.userAgent.browser.name}
                            </span>
                        </div>
                    )}
                    {userInfo.userAgent?.os?.name && (
                        <div className="userinfo-row">
                            <span className="userinfo-label">OS:</span>
                            <span className="userinfo-value">
                                {userInfo.userAgent.os.name} {userInfo.userAgent.os.version}
                            </span>
                        </div>
                    )}
                    {userInfo.userAgent?.device?.type && (
                        <div className="userinfo-row">
                            <span className="userinfo-label">Device:</span>
                            <span className="userinfo-value">
                                {userInfo.userAgent.device.type} {userInfo.userAgent.device.model && `(${userInfo.userAgent.device.model})`}
                            </span>
                        </div>
                    )}
                    {userInfo.geo && (
                        <div className="userinfo-row">
                            <span className="userinfo-label">Location:</span>
                            <span className="userinfo-value">
                                {[userInfo.geo.city, userInfo.geo.region, userInfo.geo.country].filter(Boolean).join(', ')}
                            </span>
                        </div>
                    )}
                    {userInfo.uaModel && (
                        <div className="userinfo-row">
                            <span className="userinfo-label">model:</span>
                            <span className="userinfo-value">
                                {userInfo.uaModel}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    };
    return (
        <div className="analytics-section">
            {isLoading ? (
                <AnalyticsSkeleton />
            ) : (
                <div className="analytics-grid">
                    <div className="analytics-card">
                        <h3>
                            <span className="syntax-comment">{'// '}</span>
                            <span className="syntax-keyword">Event Types</span>
                        </h3>
                        <div className="event-list">
                            {analytics.eventsByType.map((event) => (
                                <div key={event.type} className="event-item">
                                    <span className="event-type">{event.type}</span>
                                    <span className="event-count">{event.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="analytics-card">
                        <h3>
                            <span className="syntax-comment">{'// '}</span>
                            <span className="syntax-keyword">Recent Activity</span>
                        </h3>
                        <div className="activity-list">
                            {recentActivities
                                .slice(0, 10)
                                .map((event, index) => (
                                    <div key={index} className="activity-item">
                                        <div className="activity-dot"></div>
                                        <div className="activity-content">
                                            <span className="activity-type">{event.eventType}</span>
                                            <span className="activity-time">{formatDate(event.timestamp)}</span>
                                        </div>
                                        <div className="activity-actions">
                                            {renderUserInfo(event)}
                                            <button
                                                className="delete-button-small"
                                                onClick={() => handleDelete(event._id)}
                                                title="Delete event"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="analytics-card">
                        <h3>
                            <span className="syntax-comment">{'// '}</span>
                            <span className="syntax-keyword">Project Clicks</span>
                        </h3>
                        <div className="event-list">
                            {analytics.projectClicksByProject && analytics.projectClicksByProject.length > 0 ? (
                                analytics.projectClicksByProject.map((project, index) => (
                                    <div key={index} className="event-item">
                                        <span className="event-type">{project.projectName || 'Unknown Project'}</span>
                                        <span className="event-count">{project.clicks}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state-small">
                                    <p>No project clicks yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Terminal Analytics Card */}
                    <div className="analytics-card terminal-analytics-card">
                        <h3>
                            <span className="syntax-comment">{'// '}</span>
                            <span className="syntax-keyword">Terminal Analytics</span>
                        </h3>

                        {/* Terminal Stats */}
                        <div className="terminal-stats">
                            <div className="terminal-stat-item">
                                <span className="terminal-stat-label">Terminal Opens</span>
                                <span className="terminal-stat-value">
                                    {terminalAnalytics.totalOpens || 0}
                                </span>
                            </div>
                            <div className="terminal-stat-item">
                                <span className="terminal-stat-label">Commands Executed</span>
                                <span className="terminal-stat-value">
                                    {terminalAnalytics.totalCommands || 0}
                                </span>
                            </div>
                            <div className="terminal-stat-item">
                                <span className="terminal-stat-label">Successful Commands</span>
                                <span className="terminal-stat-value">
                                    {terminalAnalytics.successfulCommands || 0}
                                </span>
                            </div>
                            <div className="terminal-stat-item">
                                <span className="terminal-stat-label">Failed Commands</span>
                                <span className="terminal-stat-value">
                                    {terminalAnalytics.failedCommands || 0}
                                </span>
                            </div>
                        </div>

                        {/* Top Commands */}
                        <div className="terminal-commands-section">
                            <h4>
                                <span className="syntax-comment">{'// '}</span>
                                <span className="syntax-keyword">Most Used Commands</span>
                            </h4>
                            <div className="event-list">
                                {terminalAnalytics.topCommands.length > 0 ? (
                                    terminalAnalytics.topCommands.map((cmd, index) => (
                                        <div key={index} className="event-item terminal-command-item">
                                            <span className="event-type terminal-command-name">$ {cmd.command}</span>
                                            <span className="event-count">{cmd.count}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state-small">
                                        <p>No commands executed yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Terminal Activity */}
                        <div className="terminal-activity-section">
                            <h4>
                                <span className="syntax-comment">{'// '}</span>
                                <span className="syntax-keyword">Recent Terminal Activity</span>
                            </h4>
                            <div className="activity-list">
                                {terminalAnalytics.recentActivity.map((event, index) => (
                                    <div key={index} className="activity-item terminal-activity-item">
                                        <div className={`activity-dot ${event.eventType === 'terminal_open' ? 'terminal-open-dot' : 'terminal-command-dot'}`}></div>
                                        <div className="activity-content">
                                            <span className="activity-type">
                                                {event.eventType === 'terminal_open'
                                                    ? 'Terminal Opened'
                                                    : `$ ${event.eventData?.command || 'unknown'}`}
                                                {event.eventData?.success === false && ' X '}
                                            </span>
                                            <span className="activity-time">{formatDate(event.timestamp)}</span>
                                        </div>
                                        <div className="activity-actions">
                                            {renderUserInfo(event)}
                                            <button
                                                className="delete-button-small"
                                                onClick={() => handleDelete(event._id)}
                                                title="Delete event"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {terminalAnalytics.recentActivity.length === 0 && (
                                    <div className="empty-state-small">
                                        <p>No terminal activity yet</p>
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