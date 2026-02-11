import { getAnalyticsStats } from "../../../services/api";
import { useEffect, useState } from "react";
const StatsCards = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        const token = localStorage.getItem('adminToken');
        setLoading(true);

        try {
            const [analyticsData] = await Promise.all([
                getAnalyticsStats(token),
            ]);

            setAnalytics(analyticsData.data);
        } catch (error) {
            console.error('Error loading data:', error);
            if (error.message.includes('401') || error.message.includes('token')) {
                localStorage.removeItem('adminToken');
                window.location.href = '/admin/login';
            }
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="loading-container">
                    <div className="spinner-large"></div>
                    <p>Loading stats...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="stats-grid">
            <div className="stat-card-admin">
                <div className="stat-label">
                    <span className="syntax-keyword stat-variable">const</span>{' '}
                    <span className="syntax-variable stat-variable">totalMessages</span>{' '}
                    <span className="syntax-bracket">=</span>
                </div>
                <div className="stat-value">
                    <span className="syntax-number">{analytics.overview.totalMessages}</span>
                    <span className="syntax-bracket">;</span>
                </div>
            </div>
            <div className="stat-card-admin">
                <div className="stat-label">
                    <span className="syntax-keyword stat-variable">const</span>{' '}
                    <span className="syntax-variable stat-variable">unread</span>{' '}
                    <span className="syntax-bracket">=</span>
                </div>
                <div className="stat-value">
                    <span className="syntax-number">{analytics.overview.unreadMessages}</span>
                    <span className="syntax-bracket">;</span>
                </div>
            </div>
            <div className="stat-card-admin">
                <div className="stat-label">
                    <span className="syntax-keyword stat-variable">const</span>{' '}
                    <span className="syntax-variable stat-variable">pageViews</span>{' '}
                    <span className="syntax-bracket">=</span>
                </div>
                <div className="stat-value">
                    <span className="syntax-number">{analytics.overview.pageViews}</span>
                    <span className="syntax-bracket">;</span>
                </div>
            </div>
            <div className="stat-card-admin">
                <div className="stat-label">
                    <span className="syntax-keyword stat-variable">const</span>{' '}
                    <span className="syntax-variable stat-variable">projectClicks</span>{' '}
                    <span className="syntax-bracket">=</span>
                </div>
                <div className="stat-value">
                    <span className="syntax-number">{analytics.overview.projectClicks}</span>
                    <span className="syntax-bracket">;</span>
                </div>
            </div>
            <div className="stat-card-admin">
                <div className="stat-label">
                    <span className="syntax-keyword stat-variable">const</span>{' '}
                    <span className="syntax-variable stat-variable">cvViews</span>{' '}
                    <span className="syntax-bracket">=</span>
                </div>
                <div className="stat-value">
                    <span className="syntax-number">{analytics.overview.cvViews || 0}</span>
                    <span className="syntax-bracket">;</span>
                </div>
            </div>
            <div className="stat-card-admin">
                <div className="stat-label">
                    <span className="syntax-keyword stat-variable">const</span>{' '}
                    <span className="syntax-variable stat-variable">cvDownloads</span>{' '}
                    <span className="syntax-bracket">=</span>
                </div>
                <div className="stat-value">
                    <span className="syntax-number">{analytics.overview.cvDownloads || 0}</span>
                    <span className="syntax-bracket">;</span>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
