import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessages, getAnalyticsStats, updateMessageStatus, deleteMessage, getTerminalAnalytics } from '../services/api';
import ProjectsManager from '../components/admin/ProjectsManager/ProjectsManager';
import CVManager from '../components/admin/CVManager/CVManager';
import './AdminDashboard.css';
import StatsCards from '../components/admin/StatsCards/StatsCards'
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('analytics');
    const [messages, setMessages] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [terminalAnalytics, setTerminalAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check authentication
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const userData = localStorage.getItem('adminUser');

        if (!token) {
            navigate('/admin/login');
            return;
        }

        setUser(JSON.parse(userData));
        loadData();
        // eslint-disable-next-line
    }, [navigate]);

    const loadData = async () => {
        const token = localStorage.getItem('adminToken');
        setLoading(true);

        try {
            const [messagesData, analyticsData, terminalAnalyticsData] = await Promise.all([
                getMessages(token, 1, 50),
                getAnalyticsStats(token),
                getTerminalAnalytics(token),
            ]);

            setMessages(messagesData.data.messages);
            setAnalytics(analyticsData.data);
            setTerminalAnalytics(terminalAnalyticsData.data);
            console.log(terminalAnalyticsData.data);
        } catch (error) {
            console.error('Error loading data:', error);
            if (error.message.includes('401') || error.message.includes('token')) {
                handleLogout();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
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

    const handleToggleRead = async (messageId, currentStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            await updateMessageStatus(token, messageId, !currentStatus);

            // Update local state
            setMessages(messages.map(msg =>
                msg._id === messageId ? { ...msg, isRead: !currentStatus } : msg
            ));
        } catch (error) {
            console.error('Error updating message status:', error);
            alert('Failed to update message status');
        }
    };

    const handleDeleteMessage = async (messageId) => {
        if (!window.confirm('Are you sure you want to delete this message?')) {
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            await deleteMessage(token, messageId);

            // Remove from local state
            setMessages(messages.filter(msg => msg._id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message');
        }
    };

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="loading-container">
                    <div className="spinner-large"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-content">
                    <div className="header-left">
                        <h1>
                            {'// '}Dashboard
                        </h1>
                        {user && (
                            <span className="user-badge">
                                <span className="syntax-bracket">{'{ '}</span>
                                <span className="syntax-variable">user</span>
                                <span className="syntax-bracket">: </span>
                                <span className="syntax-string">"{user.username}"</span>
                                <span className="syntax-bracket">{' }'}</span>
                            </span>
                        )}
                    </div>
                    <div className="header-right">
                        <a href="/" target="_blank" rel="noopener noreferrer" className="home-link">
                            <span className="syntax-function stat-variable">viewPortfolio</span>
                            <span className="syntax-bracket">()</span>
                            <span className="syntax-keyword"> →</span>
                        </a>
                        <button onClick={handleLogout} className="logout-button">
                            <span className="syntax-function stat-variable">logout</span>
                            <span className="syntax-bracket">()</span>
                        </button>
                    </div>
                </div>
            </header>

            {analytics && (
                <StatsCards analytics={analytics} />
            )}

            {/* Tabs */}
            <div className="tabs">

                <button
                    className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('analytics')}
                >
                    <span className="syntax-function stat-variable">analytics</span>
                    <span className="syntax-bracket">()</span>
                </button>
                <button
                    className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('messages')}
                >
                    <span className="syntax-function stat-variable">messages</span>
                    <span className="syntax-bracket">()</span>
                </button>
                <button
                    className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                >
                    <span className="syntax-function stat-variable">projects</span>
                    <span className="syntax-bracket">()</span>
                </button>
                <button
                    className={`tab ${activeTab === 'cv' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cv')}
                >
                    <span className="syntax-function stat-variable">cv</span>
                    <span className="syntax-bracket">()</span>
                </button>
            </div>

            {/* Content */}
            <div className="dashboard-content">
                {activeTab === 'messages' && (
                    <div className="messages-section">
                        {messages.length === 0 ? (
                            <div className="empty-state">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <h3>No messages yet</h3>
                                <p>Messages from your contact form will appear here</p>
                            </div>
                        ) : (
                            <div className="messages-list">
                                {messages.map((message) => (
                                    <div key={message._id} className={`message-card ${message.isRead ? 'read' : 'unread'}`}>
                                        <div className="message-header">
                                            <div className="message-from">
                                                <strong>{message.name}</strong>
                                                <span className="message-email">{message.email}</span>
                                            </div>
                                            <div className="message-meta">
                                                {!message.isRead && <span className="unread-badge">New</span>}
                                                <span className="message-date">{formatDate(message.createdAt)}</span>
                                            </div>
                                        </div>
                                        <div className="message-body">
                                            {message.message}
                                        </div>
                                        <div className="message-actions">
                                            <a href={`mailto:${message.email}`} className="action-link">
                                                Reply
                                            </a>
                                            <button
                                                onClick={() => handleToggleRead(message._id, message.isRead)}
                                                className="action-link action-button"
                                            >
                                                {message.isRead ? 'Mark Unread' : 'Mark Read'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteMessage(message._id)}
                                                className="action-link action-button delete-button"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'analytics' && analytics && (
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
                )}

                {activeTab === 'projects' && (
                    <ProjectsManager />
                )}

                {activeTab === 'cv' && (
                    <CVManager />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
