import { getAnalyticsStats } from "../../../services/api";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const StatsCards = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadData();
        // eslint-disable-next-line
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

    return (
        <div className="stats-grid">
            <div className="stat-card-admin">
                <div className="stat-label">
                    <span className="syntax-keyword stat-variable">const</span>{' '}
                    <span className="syntax-variable stat-variable">totalMessages</span>{' '}
                    <span className="syntax-bracket">=</span>
                </div>
                <div className="stat-value">
                    <span className="syntax-number">{
                        loading ? <Skeleton count={1} width={100} baseColor="var(--bg-gray)" /> : analytics.overview.totalMessages
                    }</span>

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
                    <span className="syntax-number">{
                        loading ? <Skeleton count={1} width={100} baseColor="var(--bg-gray)" /> : analytics.overview.unreadMessages
                    }</span>
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
                    <span className="syntax-number">{
                        loading ? <Skeleton count={1} width={100} baseColor="var(--bg-gray)" /> : analytics.overview.pageViews
                    }</span>
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
                    <span className="syntax-number">{
                        loading ? <Skeleton count={1} width={100} baseColor="var(--bg-gray)" /> : analytics.overview.projectClicks
                    }</span>
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
                    <span className="syntax-number">{
                        loading ? <Skeleton count={1} width={100} baseColor="var(--bg-gray)" /> : analytics.overview.cvViews
                    }</span>
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
                    <span className="syntax-number">{
                        loading ? <Skeleton count={1} width={100} baseColor="var(--bg-gray)" /> : analytics.overview.cvDownloads
                    }</span>
                    <span className="syntax-bracket">;</span>
                </div>
            </div>
            <div className="stat-card-admin">
                <div className="stat-label">
                    <span className="syntax-keyword stat-variable">const</span>{' '}
                    <span className="syntax-variable stat-variable">contactSubmits</span>{' '}
                    <span className="syntax-bracket">=</span>
                </div>
                <div className="stat-value">
                    <span className="syntax-number">{
                        loading ? <Skeleton count={1} width={100} baseColor="var(--bg-gray)" /> : analytics.overview.contactSubmissions
                    }</span>
                    <span className="syntax-bracket">;</span>
                </div>
            </div>
        </div>
    );
};

export default StatsCards;
