import { getAnalyticsStats } from "../../../services/api";
import { useEffect, useState } from "react";
const StatsCards = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [keys, setKeys] = useState([]);
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
            setKeys(Object.keys(analyticsData.data.overview));
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
            {
                keys.map((key, index) => (
                    <div className="stat-card-admin" key={index}>
                        <div className="stat-label">
                            <span className="syntax-keyword stat-variable">const</span>{' '}
                            <span className="syntax-variable stat-variable">{key}</span>{' '}
                            <span className="syntax-bracket">=</span>
                        </div>
                        <div className="stat-value">
                            <span className="syntax-number">{analytics?.overview[key]}</span>
                            <span className="syntax-bracket">;</span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default StatsCards;
