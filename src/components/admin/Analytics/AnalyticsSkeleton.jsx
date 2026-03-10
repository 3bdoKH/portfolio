import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AnalyticsSkeleton = () => {
    return (
        <SkeletonTheme baseColor="var(--bg-overlay)" highlightColor="var(--border-color)">
            <div className="analytics-grid">
                {/* Event Types Card */}
                <div className="analytics-card">
                    <h3>
                        <Skeleton width={150} height={24} />
                    </h3>
                    <div className="event-list">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="event-item" style={{ border: 'none' }}>
                                <Skeleton width="60%" height={20} />
                                <Skeleton width={40} height={20} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Card */}
                <div className="analytics-card">
                    <h3>
                        <Skeleton width={180} height={24} />
                    </h3>
                    <div className="activity-list">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="activity-item" style={{ border: 'none' }}>
                                <div className="activity-dot" style={{ background: 'var(--border-color)' }}></div>
                                <div className="activity-content">
                                    <Skeleton width="40%" height={16} />
                                    <Skeleton width="30%" height={12} style={{ marginTop: '5px' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Clicks Card */}
                <div className="analytics-card">
                    <h3>
                        <Skeleton width={160} height={24} />
                    </h3>
                    <div className="event-list">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="event-item" style={{ border: 'none' }}>
                                <Skeleton width="50%" height={20} />
                                <Skeleton width={30} height={20} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Terminal Analytics Card */}
                <div className="analytics-card terminal-analytics-card">
                    <h3>
                        <Skeleton width={200} height={24} />
                    </h3>

                    <div className="terminal-stats">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="terminal-stat-item" style={{ border: 'none' }}>
                                <Skeleton width={100} height={14} style={{ marginBottom: '8px' }} />
                                <Skeleton width={60} height={32} />
                            </div>
                        ))}
                    </div>

                    <div className="terminal-commands-section" style={{ marginTop: '30px' }}>
                        <h4>
                            <Skeleton width={180} height={20} />
                        </h4>
                        <div className="event-list">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="event-item" style={{ border: 'none' }}>
                                    <Skeleton width="40%" height={18} />
                                    <Skeleton width={30} height={18} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="terminal-activity-section" style={{ marginTop: '30px' }}>
                        <h4>
                            <Skeleton width={220} height={20} />
                        </h4>
                        <div className="activity-list">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="activity-item" style={{ border: 'none' }}>
                                    <div className="activity-dot" style={{ background: 'var(--border-color)' }}></div>
                                    <div className="activity-content">
                                        <Skeleton width="50%" height={16} />
                                        <Skeleton width="30%" height={12} style={{ marginTop: '5px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default AnalyticsSkeleton;
