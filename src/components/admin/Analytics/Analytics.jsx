import { useState, useEffect } from 'react';
import { getAnalyticsStats, getTerminalAnalytics } from '../../../services/api';
const Analytics = ({ token }) => {
    const [analytics, setAnalytics] = useState(null);
    const [terminalAnalytics, setTerminalAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadData();
        // eslint-disable-next-line
    }, []);
    const loadData = async () => {
        setLoading(true);

        try {
            const [analyticsData, terminalAnalyticsData] = await Promise.all([
                getAnalyticsStats(token),
                getTerminalAnalytics(token),
            ]);

            setAnalytics(analyticsData.data);
            setTerminalAnalytics(terminalAnalyticsData.data);
            console.log(analyticsData.data);
        } catch (error) {
            console.error('Error loading data:', error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('adminToken');
                window.location.href = '/admin/login';
            }
        } finally {
            setLoading(false);
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
    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="loading-container">
                    <div className="spinner-large"></div>
                    <p>Loading Analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="analytics-section">
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
                        {analytics.recentEvents
                            .filter(event => event.eventType !== 'terminal_command' && event.eventType !== 'terminal_open')
                            .slice(0, 10)
                            .map((event, index) => (
                                <div key={index} className="activity-item">
                                    <div className="activity-dot"></div>
                                    <div className="activity-content">
                                        <span className="activity-type">{event.eventType}</span>
                                        <span className="activity-time">{formatDate(event.timestamp)}</span>
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
        </div>
    );
};

export default Analytics;