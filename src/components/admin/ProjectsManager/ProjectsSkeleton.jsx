import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProjectsSkeleton = () => {
    return (
        <SkeletonTheme baseColor="var(--bg-overlay)" highlightColor="var(--border-color)">
            <div className="project-item">
                <div className="project-image-container">
                    <Skeleton width="100%" height="100%" />
                </div>
                <div className="project-info">
                    <Skeleton width="70%" height={24} style={{ marginBottom: '12px' }} />
                    <div className="project-desc">
                        <Skeleton count={2} height={12} style={{ marginBottom: '6px' }} />
                        <Skeleton width="40%" height={12} />
                    </div>
                    <div className="project-tags" style={{ marginTop: '16px' }}>
                        <Skeleton width={60} height={24} borderRadius={4} />
                        <Skeleton width={80} height={24} borderRadius={4} />
                        <Skeleton width={50} height={24} borderRadius={4} />
                    </div>
                </div>
                <div className="project-actions">
                    <div style={{ flex: 1 }}>
                        <Skeleton height={36} borderRadius={6} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Skeleton height={36} borderRadius={6} />
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default ProjectsSkeleton;

