const StatsCards = ({ analytics }) => {
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
