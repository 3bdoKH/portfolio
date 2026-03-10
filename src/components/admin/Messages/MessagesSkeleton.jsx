import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MessagesSkeleton = () => {
    return (
        <SkeletonTheme baseColor="var(--bg-overlay)" highlightColor="var(--border-color)">
            <div className='message-card'>
                <div className="message-header">
                    <div className="message-from">
                        <Skeleton width={120} height={20} />
                        <span className="message-email"><Skeleton width={150} height={16} /></span>
                    </div>
                    <div className="message-meta">
                        <span className="message-date"><Skeleton width={100} height={16} /></span>
                    </div>
                </div>
                <div className="message-body">
                    <Skeleton count={2} height={14} style={{ marginBottom: '6px' }} />
                    <Skeleton width="60%" height={14} />
                </div>
                <div className="message-actions">
                    <Skeleton width={60} height={20} />
                    <Skeleton width={80} height={20} />
                    <Skeleton width={70} height={20} />
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default MessagesSkeleton;
