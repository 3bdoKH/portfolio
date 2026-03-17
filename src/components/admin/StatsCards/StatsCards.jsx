import { useEffect, useState } from "react";
import StatsCardsSkeleton from "./StatsCardsSkeleton";

const StatsCards = ({ analyticsData, analyticsLoading }) => {
    const [analytics, setAnalytics] = useState(analyticsData);
    const [loading, setLoading] = useState(true);
    const [keys, setKeys] = useState([]);
    useEffect(() => {
        if (analyticsData) {
            setAnalytics(analyticsData);
            setKeys(Object.keys(analyticsData.overview));
            setLoading(false);
        }
    }, [analyticsData]);

    if (loading || analyticsLoading || !analytics || !keys) {
        return <StatsCardsSkeleton />;
    }

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
