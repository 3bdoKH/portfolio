import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnalyticsStats } from '../services/api';
import './AdminDashboard.css';
import ProjectsManager from '../components/admin/ProjectsManager/ProjectsManager';
import CVManager from '../components/admin/CVManager/CVManager';
import StatsCards from '../components/admin/StatsCards/StatsCards'
import Messages from '../components/admin/Messages/Messages'
import Analytics from '../components/admin/Analytics/Analytics'
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('analytics');
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    // Check authentication
    useEffect(() => {
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
        setLoading(true);

        try {
            const [analyticsData] = await Promise.all([
                getAnalyticsStats(token),
            ]);

            setAnalytics(analyticsData.data);
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

            <StatsCards />

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
                    <Messages />
                )}

                {activeTab === 'analytics' && analytics && (
                    <Analytics token={token} />
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
