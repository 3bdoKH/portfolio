import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CVSkeleton = () => {
    return (
        <SkeletonTheme baseColor="var(--bg-overlay)" highlightColor="var(--border-color)">
            <div className="cv-current-info">
                <h3>
                    <span className="syntax-comment">{'// '}</span>
                    <span className="syntax-keyword">Current CV</span>
                </h3>
                <div className="cv-info-grid">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="cv-info-item" style={{ border: 'none' }}>
                            <Skeleton width={80} height={16} />
                            <Skeleton width="100%" height={24} style={{ marginTop: '8px' }} />
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Skeleton width={120} height={40} borderRadius={6} />
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default CVSkeleton;
