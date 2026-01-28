import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMessages, getAnalyticsStats, getProjects } from '../services/api';
import ProjectsManager from '../components/admin/ProjectsManager';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('messages');
    const [messages, setMessages] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('adminToken');
        const userData = localStorage.getItem('adminUser');

        if (!token) {
            navigate('/admin/login');
            return;
        }

        setUser(JSON.parse(userData));
        loadData();
    }, [navigate]);

    const loadData = async () => {
        const token = localStorage.getItem('adminToken');
        setLoading(true);

        try {
            const [messagesData, analyticsData, projectsData] = await Promise.all([
                getMessages(token, 1, 50),
                getAnalyticsStats(token),
                getProjects(),
            ]);

            setMessages(messagesData.data.messages);
            setAnalytics(analyticsData.data);
            setProjects(projectsData.data.projects);
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
                        <h1>Dashboard</h1>
                        <span className="user-badge">{user?.username}</span>
                    </div>
                    <div className="header-right">
                        <a href="/" className="home-link" target="_blank" rel="noopener noreferrer">
                            View Portfolio →
                        </a>
                        <button onClick={handleLogout} className="logout-button">
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* Stats Cards */}
            {analytics && (
                <div className="stats-grid">
                    <div className="stat-card-admin">
                        <div className="stat-label">Total Messages</div>
                        <div className="stat-value">{analytics.overview.totalMessages}</div>
                    </div>
                    <div className="stat-card-admin">
                        <div className="stat-label">Unread</div>
                        <div className="stat-value highlight">{analytics.overview.unreadMessages}</div>
                    </div>
                    <div className="stat-card-admin">
                        <div className="stat-label">Page Views</div>
                        <div className="stat-value">{analytics.overview.pageViews}</div>
                    </div>
                    <div className="stat-card-admin">
                        <div className="stat-label">Project Clicks</div>
                        <div className="stat-value">{analytics.overview.projectClicks}</div>
                    </div>
                    <div className="stat-card-admin">
                        <div className="stat-label">Total Projects</div>
                        <div className="stat-value">{projects.length}</div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('messages')}
                >
                    Messages ({messages.length})
                </button>
                <button
                    className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('analytics')}
                >
                    Analytics
                </button>
                <button
                    className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                >
                    Projects ({projects.length})
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
                                <h3>Event Types</h3>
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
                                <h3>Recent Activity</h3>
                                <div className="activity-list">
                                    {analytics.recentEvents.slice(0, 10).map((event, index) => (
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
                        </div>
                    </div>
                )}

                {activeTab === 'projects' && (
                    <ProjectsManager />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
