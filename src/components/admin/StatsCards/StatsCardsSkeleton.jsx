import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StatsCardsSkeleton = () => {
    return (
        <SkeletonTheme baseColor="var(--bg-overlay)" highlightColor="var(--border-color)">
            <div className="stats-grid">
                {[...Array(8)].map((_, index) => (
                    <div className="stat-card-admin" key={index}>
                        <div className="stat-label">
                            <span className="syntax-keyword stat-variable">const</span>{' '}
                            <Skeleton width={80} height={20} />{' '}
                        </div>
                        <div className="stat-value" style={{ marginTop: '10px' }}>
                            <Skeleton width={50} height={24} />
                        </div>
                    </div>
                ))}
            </div>
        </SkeletonTheme>
    );
};

export default StatsCardsSkeleton;
