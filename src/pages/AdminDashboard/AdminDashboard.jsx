import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCards from '../../components/admin/StatsCards/StatsCards';
import ThemeSwitch from '../../components/ui/ThemeSwitch/ThemeSwitch';
import { getAnalyticsStats, getTerminalAnalytics } from '../../services/analyticsService';
import './AdminDashboard.css';

const Analytics = React.lazy(() => import('../../components/admin/Analytics/Analytics'));
const Messages = React.lazy(() => import('../../components/admin/Messages/Messages'));
const ProjectsManager = React.lazy(() => import('../../components/admin/ProjectsManager/ProjectsManager'));
const CVManager = React.lazy(() => import('../../components/admin/CVManager/CVManager'));


const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('analytics');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(true);
    const [visited, setVisited] = useState(['analytics']);
    const [limit, setLimit] = useState(10)
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    const handleLimitChange = async (newLimit) => {
        setLimit(newLimit);
        setAnalyticsLoading(true);
        try {
            const res = await getAnalyticsStats(token, newLimit);
            setAnalyticsData(prev => ({ ...prev, stats: res.data }));
        } catch (err) {
            console.error(err);
        } finally {
            setAnalyticsLoading(false);
        }
    };

    const tabs = useMemo(() => [{
        name: 'analytics',
        component: <Analytics token={token} analyticsData={analyticsData} analyticsLoading={analyticsLoading} onChange={handleLimitChange} />,
    }, {
        name: 'messages',
        component: <Messages />,
    }, {
        name: 'projects',
        component: <ProjectsManager />,
    }, {
        name: 'cv',
        component: <CVManager />,
    }], [token, analyticsData, analyticsLoading, limit, handleLimitChange]);

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
    }, [navigate, token]);
    // load shared data
    useEffect(() => {
        let cancelled = false;

        const loadSharedData = async () => {
            try {
                const [statsRes, terminalRes] = await Promise.all([
                    getAnalyticsStats(token),
                    getTerminalAnalytics(token),
                ]);
                if (!cancelled) {
                    setAnalyticsData({
                        stats: statsRes.data,
                        terminal: terminalRes.data,
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                if (!cancelled) setAnalyticsLoading(false);
            }
        };

        loadSharedData();
        return () => { cancelled = true; };
    }, [token]);



    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        if (!visited.includes(tabName)) {
            setVisited([...visited, tabName]);
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

            <StatsCards analyticsData={analyticsData} analyticsLoading={analyticsLoading} />
            {console.log(analyticsData)}
            <div className="tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        className={`tab ${activeTab === tab.name ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(tab.name);
                            handleTabClick(tab.name);
                        }}
                    >
                        <span className="syntax-function stat-variable">{tab.name}</span>
                        <span className="syntax-bracket">()</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="dashboard-content">
                <Suspense fallback={<div className="loading-container"><div className="spinner-large"></div></div>}>
                    {tabs.map((tab) => {
                        return (
                            <div key={tab.name} style={{ display: activeTab === tab.name ? 'block' : 'none' }}>
                                {visited.includes(tab.name) ? tab.component : null}
                            </div>
                        );
                    })}
                </Suspense>
            </div>
            <ThemeSwitch />
        </div>
    );
};

export default AdminDashboard;
