import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import ProjectsManager from '../components/admin/ProjectsManager/ProjectsManager';
import CVManager from '../components/admin/CVManager/CVManager';
import StatsCards from '../components/admin/StatsCards/StatsCards'
import Messages from '../components/admin/Messages/Messages'
import Analytics from '../components/admin/Analytics/Analytics'
import ThemeSwitch from '../components/ui/ThemeSwitch'
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('analytics');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');
    const tabs = ['analytics', 'messages', 'projects', 'cv'];

    // Check authentication
    useEffect(() => {
        setLoading(true);
        const userData = localStorage.getItem('adminUser');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        setUser(JSON.parse(userData));
        setLoading(false);
        // eslint-disable-next-line
    }, [navigate]);

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
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        <span className="syntax-function stat-variable">{tab}</span>
                        <span className="syntax-bracket">()</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="dashboard-content">
                {activeTab === 'messages' && (
                    <Messages />
                )}

                {activeTab === 'analytics' && (
                    <Analytics token={token} />
                )}

                {activeTab === 'projects' && (
                    <ProjectsManager />
                )}

                {activeTab === 'cv' && (
                    <CVManager />
                )}
            </div>
            <ThemeSwitch />
        </div>
    );
};

export default AdminDashboard;
